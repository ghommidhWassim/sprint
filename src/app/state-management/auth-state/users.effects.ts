    import { Injectable } from '@angular/core';
    import { Actions, ofType, createEffect } from '@ngrx/effects';
    import { of } from 'rxjs';
    import { catchError, map, switchMap } from 'rxjs/operators';
    import * as AuthActions from './users.actions';
    import { User } from 'src/app/models/user';
    import { AuthService } from 'src/app/services/auth.service';
    import { ToastController } from '@ionic/angular';
import { Route, Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';

    @Injectable()
    export class UserEffect {

    login$ = createEffect(() =>
        this.actions$.pipe(
        ofType(AuthActions.GET_LOGIN),
        switchMap(({ email, password }) =>
    {       console.log(email, password);

        return this.authService.login(email, password).pipe(
            switchMap(async (userdata:any) =>{
                console.log('succes ', userdata);
                if(userdata.status==404){
                    this.presentToast(); // Display toast in case of error
                }else{
                     this.storage.set('token',userdata.token)
                     this.storage.set('user',userdata.user)
                    console.log('test effect', this.storage.get('token'));
                    this.route.navigate(['/home'])
                }
                return AuthActions.getLoginSucces({ userdata })}),
                catchError(error => {
                    return of(AuthActions.getLoginFailure()); // Return observable emitting login failure action with error

                })
            )}
        )
        )
    );

    constructor(
        private storage: StorageService,
        private route: Router,
        private actions$: Actions,
        private authService: AuthService,
        private toastController: ToastController
    ) {}
    async presentToast() {
        const toast = await this.toastController.create({
        message: 'Email ou mot de passe incorrect',
        duration: 2500,
        position: 'bottom',
        });

        await toast.present();
    }


    }

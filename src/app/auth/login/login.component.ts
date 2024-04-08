import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router'; // Import Router
import { Store } from '@ngrx/store';
import { getLogin } from 'src/app/state-management/auth-state/users.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent  implements OnInit {
  formLogin = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email,
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });
  constructor(private router: Router,
    private store: Store) { } 

  ngOnInit() {}

  login(){

    if(this.formLogin.value.email && this.formLogin.value.password){
      console.log(this.formLogin.value);
      
      this.store.dispatch(getLogin({email:this.formLogin.value.email, password:this.formLogin.value.password}))    

    }    
    //this.router.navigateByUrl('/home'); 
    
  }
}

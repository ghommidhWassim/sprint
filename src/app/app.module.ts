import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage-angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthModule } from './auth/auth.module';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { StoreModule } from '@ngrx/store';
import { userReducer } from './state-management/auth-state/users.reducers';
import { EffectsModule } from '@ngrx/effects';
import { UserEffect } from './state-management/auth-state/users.effects'
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { Drivers } from '@ionic/storage';
import { TokenInterceptor } from './services/token-interceptor.interceptor';
import { GoogleMapsModule } from '@angular/google-maps'
import { WidgetsModule } from './widgets/widgets.module';
@NgModule({
  declarations: [AppComponent, HomeComponent],
  imports: [
    WidgetsModule,
    GoogleMapsModule,
    HttpClientModule,
    IonicModule, 
    FormsModule,
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule, 
    AuthModule, 
    StoreModule.forRoot({ user: userReducer }),
    EffectsModule.forRoot([UserEffect]),
    StoreDevtoolsModule.instrument({
      maxAge: 5,
    }),
    IonicStorageModule.forRoot({
      name: '__mydb',
      driverOrder: [Drivers.IndexedDB, Drivers.LocalStorage]
    })
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }

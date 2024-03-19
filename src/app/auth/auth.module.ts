import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';


@NgModule({
  declarations: [LoginComponent,HomeComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AuthRoutingModule,
  ],
  exports: [LoginComponent]
})
export class AuthModule { }

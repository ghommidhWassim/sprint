import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {environment as env}  from '../../environments/environment'
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpc: HttpClient) { }

  login(email:string, password: string){
    let formdata = new FormData()
    formdata.append('email',email)
    formdata.append('password',password)
    
    return this.httpc.post(env.backendURl+'/sign-in',formdata)
  }

}

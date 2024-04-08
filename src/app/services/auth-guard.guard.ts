import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {
  constructor(private storage:StorageService, private router: Router){

  }
 async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean | UrlTree> {
    
    // Check if the user is logged in
    if (await this.storage.get('token')) {
      return true; // Allow access
    }
    
    // If not logged in, redirect to login page
    return this.router.createUrlTree(['/auth/login']);
  }

  async getAuthToken(){
    let item = await this.storage.get('token')
    if(item)
      return true
    return false
  }
}
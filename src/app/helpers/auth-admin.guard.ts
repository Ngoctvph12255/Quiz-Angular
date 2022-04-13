import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthAdminGuard implements CanActivate {
  constructor(private router: Router) {}
  canActivate(): boolean {
    const loggedInUser = JSON.parse(localStorage.getItem('login_admin') || '{}');
    if (
      loggedInUser.email == undefined ||
      loggedInUser.email == '' ||
      loggedInUser.googleId == undefined ||
      loggedInUser.googleId == ''
    ) {
      this.router.navigate(['login-admin']);
      return false;
    }
    return true;
  }
}

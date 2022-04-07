import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}
  logInUser: BehaviorSubject<any> = new BehaviorSubject(
    JSON.parse(localStorage.getItem('login_user') || '{}')
  );
  getLoggedInUser() {
    return this.logInUser.value;
  }
  login(email: string, googleId: string): Observable<any> {
    return this.http
      .get<any>(
        `${environment.student_api}?email=${email}&googleId=${googleId}`
      )
      .pipe(
        // can thieu du lieu tra  ve observable
        map((item) => {
          // bien doi du lieu tra ve thanh mot du lieu khac
          // console.log(item);
          // return item;

          if (item.length > 0) {
            this.logInUser.next(item[0]);
            localStorage.setItem('login_user', JSON.stringify(item[0]));
            return item[0];
          }
          localStorage.removeItem('login_user');
          this.logInUser.next({});
          return null;
        })
      );
  }

  logout(): void {
    localStorage.removeItem('login_user');
    this.router.navigate(['/login']);
  }

  logoutAdmin(): void {
    localStorage.removeItem('login_user');
    this.router.navigate(['/login-admin']);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject , Observable, of } from 'rxjs';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from '../../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({'Content-type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url = environment.baseUrl;
  token = new BehaviorSubject('');

  constructor(
    private http: HttpClient,
    private flash: FlashMessagesService,
    private router: Router,
    private jwtHelper: JwtHelperService)
  {
    const userData = JSON.parse(localStorage.getItem('userAuthData'));
    if (userData && userData.token){
      this.token.next(userData.token);
    }
  }


  regHttp(form): Observable<any> {
    return this.http.post<any>(
      `${this.url}/api/auth/register`, form, httpOptions);
  }

  loginHttp(form): Observable<any> {
    return this.http.post<any>(
      `${this.url}/api/auth/login`, form, httpOptions);
  }


  regUser(form) {
    this.regHttp(form)
      .subscribe(
        data => {
          this.flash.show(data.message, {
            cssClass: 'alert-success',
            timeout: 4000
          });
          this.router.navigate(['/login']);
        },
        error => {
          console.log(error);
          this.flash.show(error.error.message, {
            cssClass: 'alert-danger',
            timeout: 4000
          });
          this.router.navigate(['/registration']);
        });
  }

  loginUser(form) {
    this.loginHttp(form)
      .subscribe(
        data => {
          localStorage.setItem('userAuthData', JSON.stringify({user: data.responseUser, token: data.token}));
          this.token.next(data.token);
          this.flash.show(data.message, {
            cssClass: 'alert-success',
            timeout: 4000
          });
          this.router.navigate(['/home']);
        },
        error => {
          console.log(error);
          this.flash.show(error.error.message, {
            cssClass: 'alert-danger',
            timeout: 4000
          });
          this.router.navigate(['/login']);
        }
      );
  }

  logoutUser() {
    localStorage.removeItem('userAuthData');
    this.token.next(null);
    this.flash.show('Logout', {
      cssClass: 'alert-success',
      timeout: 4000
    });
    this.router.navigate(['/login']);
  }

  getToken() {
     return this.token;
  }

}

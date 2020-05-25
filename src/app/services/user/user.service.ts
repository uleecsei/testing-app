import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {Router} from '@angular/router';
import {JwtHelperService} from '@auth0/angular-jwt';
import {environment} from '../../../environments/environment';
import {MessagesService} from '../messages/messages.service';

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
    private router: Router,
    private jwtHelper: JwtHelperService,
    private flash: MessagesService) {
    const userData = JSON.parse(localStorage.getItem('userAuthData'));
    if (userData && userData.token) {
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
          this.flash.showSuccess(data.status);
          this.router.navigate(['/login']);
        },
        error => {
          this.flash.showError(error.error.message);
          this.router.navigate(['/registration']);
        });
  }

  loginUser(form) {
    this.loginHttp(form)
      .subscribe(
        data => {
          localStorage.setItem('userAuthData', JSON.stringify({user: data.responseUser, token: data.token}));
          this.token.next(data.token);
          this.flash.showSuccess(data.status);
          this.router.navigate(['/home']);
        },
        error => {
          console.log(error);
          this.flash.showError(error.error.message);
          this.router.navigate(['/login']);
        }
      );
  }

  logoutUser() {
    localStorage.removeItem('userAuthData');
    this.token.next(null);
    this.flash.showSuccess('Logout');
    this.router.navigate(['/login']);
  }

  getToken() {
    return this.token;
  }

}

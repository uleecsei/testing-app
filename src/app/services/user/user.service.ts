import {Injectable, NgZone} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {Router} from '@angular/router';
import {JwtHelperService} from '@auth0/angular-jwt';
import {environment} from '../../../environments/environment';
import {MessagesService} from '../messages/messages.service';
import {User} from "../../interfaces/user";
// import { error } from '@angular/compiler/src/util';

const httpOptions = {
  headers: new HttpHeaders({'Content-type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url = environment.baseUrl;
  token = new BehaviorSubject('');
  user = new BehaviorSubject<User>(null);

  constructor(
    private http: HttpClient,
    private router: Router,
    private jwtHelper: JwtHelperService,
    private flash: MessagesService,
    private ngZone: NgZone) {
    const userData = JSON.parse(localStorage.getItem('userAuthData'));
    if (userData && userData.token) {
      this.token.next(userData.token);
    }
  }

  private regHttp(form): Observable<any> {
    return this.http.post<any>(
      `${this.url}/api/auth/register`, form, httpOptions);
  }

  private loginHttp(form): Observable<any> {
    return this.http.post<any>(
      `${this.url}/api/auth/login`, form, httpOptions);
  }

  private googleLoginHttp(id_token): Observable<any> {
    return this.http.post<any>(
      `${this.url}/api/auth/google`, {id_token}, httpOptions);
  }

  private getUserHttp(): Observable<any> {
    return this.http.get<any>(`${this.url}/api/auth/user_info`, httpOptions);
  }

  public regUser(form) {
    this.regHttp(form)
      .subscribe(
        data => {
          this.flash.showSuccess(data.status);
          this.router.navigate(['/login']);
        },
        error => {
          this.flash.showError(error.message ? error.message : error);
          this.router.navigate(['/registration']);
        });
  }

  public loginUser(form) {
    this.loginHttp(form)
      .subscribe(
        data => {
          const token = data.token.split(' ')[1];
          localStorage.setItem('userAuthData', JSON.stringify({user: data.responseUser, token}));
          this.token.next(token);
          this.user.next(data.user);
          this.flash.showSuccess(data.status);
          this.router.navigate(['/home']);
        },
        error => {
          const message = error.error.message ? error.error.message
                          : error.message ? error.message : error;
          console.log(message);
          this.flash.showError(message);
          this.router.navigate(['/login']);
        }
      );
  }

  public googleLoginUser(id_token) {
    this.googleLoginHttp(id_token)
      .subscribe(
        data => this.ngZone.run(() => {
          const token = data.token.split(' ')[1];
          localStorage.setItem('userAuthData', JSON.stringify({user: data.responseUser, token}));
          this.token.next(token);
          this.user.next(data.user);
          this.flash.showSuccess(data.status);
          this.router.navigate(['/home']);
        }),
        error => this.ngZone.run(() => {
          console.log(error.message ? error.message : error);
          this.flash.showError(error.message ? error.message : error);
          this.router.navigate(['/login']);
        })
      );
  }

  private getUserInfo() {
    this.getUserHttp().subscribe(
      data => {
        console.log(data.user);
        this.user.next(data.user);
        this.flash.showSuccess(data.status);
      },
      error => {        
        console.log(error.message ? error.message : error);
      }
    )
  }

  public logoutUser() {
    localStorage.removeItem('userAuthData');
    this.token.next(null);
    this.user.next(null);
    this.flash.showSuccess('Logout');
    this.router.navigate(['/login']);
  }

  public getToken() {
    return this.token.value;
  }

  public getUser() {
    if(!this.user.value) {
      this.getUserInfo();
    }
    return this.user.value;
  }

  public isAuthenticated(): boolean {
    return !!this.token.value;
  }
}

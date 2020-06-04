import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpResponse,
  HttpErrorResponse,
  HttpEvent,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { UserService } from '../services/user/user.service';
import { Router } from '@angular/router';
import { MessagesService } from '../services/messages/messages.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private flash: MessagesService,
    private router: Router,
    private userService: UserService
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${this.userService.getToken()}`,
      },
    });

    return next.handle(authReq).pipe(
      tap(
        (event) => {
          if (event instanceof HttpResponse) console.log('Server response');
        },
        (error) => {
          if (error instanceof HttpErrorResponse) {
            if (error.status == 401) {
              console.log('Unauthorized');
              this.flash.showError(error.status ? error.status : error.message);
              this.router.navigate(['/login']);
            }
            if(error.error.message === 'jwt expired') {
              console.log('expired');
              this.userService.logoutUser();
              this.router.navigate(['/login']);
            }
          }   
          return throwError(error);
        }
      )
    );
  }
}

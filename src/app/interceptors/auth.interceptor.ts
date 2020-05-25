import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpResponse,
  HttpErrorResponse,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { UserService } from '../services/user/user.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private userService: UserService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${this.userService.getToken()}`
      },
    });

    return next.handle(authReq).pipe(
      tap(
        (event) => {
          if (event instanceof HttpResponse) console.log('Server response');
        },
        (err) => {
          if (err instanceof HttpErrorResponse) {
            if (err.status == 401) console.log('Unauthorized');
          }
        }
      )
    );
  }
}

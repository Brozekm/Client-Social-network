import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UserInterface} from "../dataTypes/user-interface";


@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor() {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    let userRaw = localStorage.getItem('user');
    if (userRaw) {
      let user: UserInterface = JSON.parse(userRaw);
      if (user) {
        request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${user.token}`
          }
        });
      }
    }

    return next.handle(request);
  }
}

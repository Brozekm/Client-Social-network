import {Injectable, Injector} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UserInterface} from "../_dataTypes/user-interface";
import {tap} from "rxjs/operators";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";


@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private _snackBar: MatSnackBar,
              private router: Router) {
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

    return next.handle(request).pipe(
      tap((res: any) => {
        return res;
      }, e => {
          console.log('Handling error');
          if (e instanceof HttpErrorResponse){
            console.log('ERROR is http response');
            switch (e.status){
              case (0):
              case (HttpError.InternalServerError):
                this._snackBar.open('Server is down, try again later', 'OK');
                this.router.navigate(['/login']);
                break
              case (HttpError.Unauthorized):
                this._snackBar.open('Server is down, try again later', 'OK');
                this.router.navigate(['/login']);
                break;
            }
          }else{
            return e;
          }
      })
    );
  }
}
export class HttpError{
  static BadRequest = 400;
  static Unauthorized = 401;
  static Forbidden = 403;
  static NotFound = 404;
  static TimeOut = 408;
  static Conflict = 409;
  static InternalServerError = 500;
}

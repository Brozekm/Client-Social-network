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
import {AuthenticationService} from "../_service/auth/authentication.service";


@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private _snackBar: MatSnackBar,
              private router: Router,
              private auth: AuthenticationService) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    let userRaw = localStorage.getItem('user');
    if (userRaw) {
      let user: UserInterface = JSON.parse(userRaw);
      if (user) {
        request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${user.jwttoken}`
          }
        });
      }
    }

    return next.handle(request).pipe(
      tap((res: any) => {
        return res;
      }, e => {
          if (e instanceof HttpErrorResponse){
            switch (e.status){
              case (0):
              case (HttpError.InternalServerError):
                this._snackBar.open('Server is down! Try again later', 'OK');
                this.router.navigate(['/login']);
                break
              case (HttpError.Unauthorized):
                this._snackBar.open('Unauthorized', 'OK');
                this.router.navigate(['/login']);
                break;
              case (HttpError.BadRequest):
                // login and register has its own error handling
                console.log("Bad request");
                if (e.url?.endsWith('login') || e.url?.endsWith('register')){
                  break;
                }else{
                  this._snackBar.open('Bad request! Try again later', 'OK');
                }
                break
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

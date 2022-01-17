import { Injectable } from '@angular/core';
import {AuthenticationService} from "../_service/auth/authentication.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class ResponseHandlerService {

  constructor(private auth: AuthenticationService,
              private _snackbar: MatSnackBar,
              private router: Router) { }

  public handleResponse(error: any){
    if (error.status){
      if (error.status >= 500){
        this._snackbar.open('Server is down', 'OK');
        this.auth.logout();
        this.router.navigate(['/login']);
      }else if (error.status === 401){
        this._snackbar.open('User token expired, please login again', 'OK');
        this.auth.logout();
        this.router.navigate(['/login']);
      }
    }
  }

}

import { Component, OnInit } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {RegisterDialogComponent} from "./register-dialog/register-dialog.component";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthenticationService} from "../../core/_service/auth/authentication.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  hidePassword: boolean = true;

  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });


  constructor(public dialog: MatDialog,
              private authService: AuthenticationService,
              private router: Router,
              private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.authService.logout();
  }

  openRegisterDialog(): void{
    const dialogRef = this.dialog.open(RegisterDialogComponent,{
      width: '500px'
    })
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    })
  }

  loginUser(value: any) {
    if (this.loginForm.valid){
      this.authService.login(value.email, value.password)
        .subscribe(value => {
          if (value){
            this.router.navigate(['../'])
          }
        }, error => {
          if (error instanceof HttpErrorResponse && error.status === 400){
            this._snackBar.open('Wrong credentials', 'OK', {duration: 2000});
          }
        })
    }
  }
}

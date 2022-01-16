import { Component, OnInit } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {RegisterDialogComponent} from "./register-dialog/register-dialog.component";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthenticationService} from "../../core/_service/auth/authentication.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  hidePassword: boolean = true;

  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.maxLength(20)])
  });

  constructor(public dialog: MatDialog,
              private authService: AuthenticationService,
              private router: Router,
              private snackbar: MatSnackBar) { }

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
    this.authService.login(value.email, value.password)
      .subscribe(value => {
        if (value){
          this.router.navigate(['../'])
        }
      }, error => {
        if (error.status == 500){
          this.snackbar.open('Server is not working', '', {duration: 2000});
        }else{
          this.snackbar.open('Wrong credentials', '', {duration: 2000}) ;
        }
      })
  }
}

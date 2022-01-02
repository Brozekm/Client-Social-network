import { Component, OnInit } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {RegisterDialogComponent} from "./register-dialog/register-dialog.component";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {TmpUsersService} from "../../core/services/tmp-users.service";
import {AuthUserService} from "../../core/services/auth-user.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.maxLength(20)])
  });

  constructor(public dialog: MatDialog,
              private authService: AuthUserService) { }

  ngOnInit(): void {
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
    this.authService.login(value.email, value.password).subscribe(value1 => {
      console.log(value1);
    }, error => {
      console.error(error);
    });
  }
}

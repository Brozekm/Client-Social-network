import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";
import {AuthenticationService} from "../../../core/_service/auth/authentication.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-register-dialog',
  templateUrl: './register-dialog.component.html',
  styleUrls: ['./register-dialog.component.scss']
})
export class RegisterDialogComponent implements OnInit {
  hide: boolean = true;

  registerForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(7),
      this.checkPassword()]),
    username: new FormControl('', [Validators.required, Validators.maxLength(20)])
  });

  constructor(public dialogRef: MatDialogRef<RegisterDialogComponent>,
              private authService: AuthenticationService,
              private _snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
  }

  registerUser(value: any) {
    if (!this.registerForm.valid) return;

    this.authService.register(value.email, value.password, value.username).subscribe(() => {
        this._snackBar.open("Account created", "OK", {duration: 3000});
        this.dialogRef.close();
      }, error => {
        if (error instanceof HttpErrorResponse) {
          switch (error.status) {
            case (200):
              this._snackBar.open("Weak password", "OK");
              break;
            case (400):
              this._snackBar.open("Email taken", "OK");
              break;
            default:
              this._snackBar.open("Registration failed", "OK");
              this.dialogRef.close();
              break;
          }
        }
      }
    )
  }

  private checkPassword(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      let hasNumber = /\d/.test(control.value);
      let hasUpper = /[A-Z]/.test(control.value);
      let hasLower = /[a-z]/.test(control.value);
      const valid = hasLower && hasUpper && hasNumber;
      if (!valid) {
        return {'strong': true};
      }
      return null;
    };
  }

  close() {
    this.dialogRef.close();
  }

  isEmailTaken() {
    if (this.registerForm.controls['email'].valid) {
      let email = this.registerForm.controls['email'].value;
      this.authService.isEmailTaken(email).then(value => {
        if (value) {
          this.registerForm.controls['email'].setErrors({'taken': true});
        } else {
          this.registerForm.controls['email'].setErrors(null);
        }
      })
    }
  }
}


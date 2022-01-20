import { Component, OnInit } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {CreatePostDialogComponent} from "./create-post-dialog/create-post-dialog.component";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import {UserInterface} from "../../../core/_dataTypes/user-interface";
import {AuthenticationService} from "../../../core/_service/auth/authentication.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  faPlus = faPlus;

  constructor(private dialog: MatDialog,
              private router: Router) { }

  ngOnInit(): void {
  }

  openDialog() {
    let userRaw = localStorage.getItem('user');
    if (userRaw){
      let user: UserInterface = JSON.parse(userRaw);
      this.dialog.open(CreatePostDialogComponent,{
        data:{
          role: user.role
        }
      });
    }else{
      this.router.navigate(['/login']);
    }
  }
}

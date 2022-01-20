import { Component, OnInit } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {CreatePostDialogComponent} from "./create-post-dialog/create-post-dialog.component";
import {UserInterface} from "../../../core/_dataTypes/user-interface";
import {Router} from "@angular/router";
import {Subject} from "rxjs";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  obs: Subject<boolean> = new Subject<boolean>();

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
      }).afterClosed().subscribe(value => {
        if (value) {
          this.obs.next(true);
        }
      });
    }else{
      this.router.navigate(['/login']);
    }
  }
}

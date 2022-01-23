import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {CreatePostDialogComponent} from "./create-post-dialog/create-post-dialog.component";
import {UserInterface} from "../../../core/_dataTypes/user-interface";
import {Router} from "@angular/router";
import {Subject, Subscription} from "rxjs";
import {WebSocketService} from "../../../core/_service/protected/web-socket.service";
import {OnlineFriendsService} from "../../../core/_service/protected/onlineFriends.service";
import {OnlineFriendInterface} from "../../../core/_dataTypes/online-friend.interface";
import {ChatService} from "../../../core/_service/protected/chat.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  obs: Subject<boolean> = new Subject<boolean>();

  online: OnlineFriendInterface[] = [];

  data: Subscription = new Subscription();

  constructor(private dialog: MatDialog,
              private router: Router,
              private onlineFriends: OnlineFriendsService,
              private chatService: ChatService) {
  }

  ngOnInit(): void {
    this.online = this.onlineFriends.online$.getValue();
    this.data = this.onlineFriends.online$.subscribe(value => {
      this.online = value;
    });
  }

  ngOnDestroy(): void{
    this.data.unsubscribe();
  }




  openDialog() {
    let userRaw = localStorage.getItem('user');
    if (userRaw) {
      let user: UserInterface = JSON.parse(userRaw);
      this.dialog.open(CreatePostDialogComponent, {
        data: {
          role: user.role
        }
      }).afterClosed().subscribe(value => {
        if (value) {
          this.obs.next(true);
        }
      });
    } else {
      this.router.navigate(['/login']);
    }
  }
}

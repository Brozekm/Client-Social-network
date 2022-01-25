import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {CreatePostDialogComponent} from "./create-post-dialog/create-post-dialog.component";
import {EnumRole, UserInterface} from "../../../core/_dataTypes/user-interface";
import {Router} from "@angular/router";
import {Subject, Subscription} from "rxjs";
import {OnlineFriendsService} from "../../../core/_service/protected/onlineFriends.service";
import {EnumOnlineStatus, OnlineFriendInterface} from "../../../core/_dataTypes/online-friend.interface";
import {ChatService} from "../../../core/_service/protected/chat.service";
import {ChangeRoleDialogComponent} from "./change-role-dialog/change-role-dialog.component";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  obs: Subject<boolean> = new Subject<boolean>();

  online: OnlineFriendInterface[] = [];

  data: Subscription = new Subscription();

  displayChat: boolean = false;
  onlineFriend: OnlineFriendInterface = {
    email: '',
    userName: '',
    status: EnumOnlineStatus.ONLINE
  }

  chat: Subscription = new Subscription();

  isAdmin: boolean = false;

  constructor(private dialog: MatDialog,
              private router: Router,
              private onlineFriends: OnlineFriendsService,
              private chatService: ChatService) {
  }

  ngOnInit(): void {
    let userRaw = localStorage.getItem('user');
    if (userRaw) {
      let user: UserInterface = JSON.parse(userRaw);
      if (user.roles?.some(role => role === EnumRole.ADMIN)) {
        this.isAdmin = true;
      }
    }

    this.online = this.onlineFriends.online$.getValue();
    this.data = this.onlineFriends.online$.subscribe(value => {
      this.online = value;
    });

    this.chat = this.chatService.newMessage$.subscribe(value => {
      if (!this.displayChat) {
        if (this.online.length > 0) {
          let user: OnlineFriendInterface | undefined = this.online.find(x => x.email === value.targetUser);
          if (user) {
            this.openChat(user);
          }
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.data.unsubscribe();
    this.chat.unsubscribe();
  }


  openDialog() {
    this.dialog.open(CreatePostDialogComponent, {
      data: this.isAdmin
    }).afterClosed().subscribe(value => {
      if (value) {
        this.obs.next(true);
      }
    });
  }

  openChat(friend: OnlineFriendInterface) {
    this.onlineFriend = friend;
    this.displayChat = true;
  }

  closeChat() {
    this.displayChat = false;
  }

  openChangeRoleDialog() {
    this.dialog.open(ChangeRoleDialogComponent);
  }

}

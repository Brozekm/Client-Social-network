import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {CreatePostDialogComponent} from "./create-post-dialog/create-post-dialog.component";
import {UserInterface} from "../../../core/_dataTypes/user-interface";
import {Router} from "@angular/router";
import {Subject} from "rxjs";
import {WebSocketService} from "../../../core/_service/protected/web-socket.service";
import {OnlineFriendsService} from "../../../core/_service/protected/onlineFriends.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  obs: Subject<boolean> = new Subject<boolean>();

  constructor(private dialog: MatDialog,
              private router: Router,
              private onlineFriends: OnlineFriendsService) {
  }

  ngOnInit(): void {
    // const client = new Client({brokerURL: 'http://localhost:8080/app/socket/online',
    // reconnectDelay: 5000,
    // onDisconnect: receipt => {console.log(receipt)}});
    // client.activate();

    // this.wsService.connect('ws://localhost:8080/ws/online').subscribe(client => {
    //   console.log('got Client');
    // });
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

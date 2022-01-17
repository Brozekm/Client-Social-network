import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {SearchedUserInterface} from "../../../core/_dataTypes/searchedUser-interface";


@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.scss']
})
export class FriendsComponent implements OnInit {
  showNewRequests:boolean = false;
  showFriendList:boolean = false;
  showBlockedUsers:boolean = false;
  show:string = '';

  constructor() {
  }

  ngOnInit(): void {
  }

  tabChange($event: number) {
    switch ($event) {
      case 0:
        this.show = '';
        break;
      case 1:
        this.show = FriendsManagement.FRIENDLIST;
        this.showFriendList = true;
        this.showNewRequests = false;
        this.showBlockedUsers = false;
        break;
      case 2:
        this.show = FriendsManagement.NEW_REQUESTS;
        this.showFriendList = false;
        this.showNewRequests = true;
        this.showBlockedUsers = false;
        break;
      case 3:
        this.show = FriendsManagement.BLOCKED_USERS;
        this.showFriendList = false;
        this.showNewRequests = false;
        this.showBlockedUsers = true;
        break;
    }
  }
}

export enum FriendsManagement{
  FRIENDLIST = 'Friends',
  NEW_REQUESTS = 'Requests',
  BLOCKED_USERS = 'Blocked'
}

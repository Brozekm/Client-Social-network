import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {SearchedUserInterface} from "../../../core/_dataTypes/searchedUser-interface";


@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.scss']
})
export class FriendsComponent implements OnInit {
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
        break;
      case 2:
        this.show = FriendsManagement.NEW_REQUESTS;
        break;
      case 3:
        this.show = FriendsManagement.BLOCKED_USERS;
        break;
    }
  }
}

export enum FriendsManagement{
  FRIENDLIST = 'Friends',
  NEW_REQUESTS = 'Requests',
  BLOCKED_USERS = 'Blocked'
}

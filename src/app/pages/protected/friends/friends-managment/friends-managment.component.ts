import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {SearchedUserInterface} from "../../../../core/_dataTypes/searchedUser-interface";
import {BehaviorSubject} from "rxjs";
import {FriendshipsService} from "../../../../core/_service/protected/friendships.service";
import {EmailUsernameInterface} from "../../../../core/_dataTypes/emailUsername-interface";
import {faTrashAlt, faCheck, faBan, faUnlock} from "@fortawesome/free-solid-svg-icons";
import {FriendsManagement} from "../friends.component";

@Component({
  selector: 'app-friends-managment',
  templateUrl: './friends-managment.component.html',
  styleUrls: ['./friends-managment.component.scss']
})
export class FriendsManagmentComponent implements OnInit, AfterViewInit {
  @Input() show: string = '';

  faTrashAlt = faTrashAlt;
  faCheck = faCheck;
  faBan = faBan;
  faUnlock = faUnlock;


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns: string[] = ['user', 'action'];
  dataSource = new MatTableDataSource<SearchedUserInterface>();

  data: SearchedUserInterface[] = [];

  loaded$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private friendshipService: FriendshipsService) {
  }

  ngOnInit(): void {
    this.loaded$.next(false);

    switch (this.show) {
      case (FriendsManagement.FRIENDLIST):
        this.friendshipService.getFriends().then(value => {
          this.setData(value);
        });
        break;
      case (FriendsManagement.NEW_REQUESTS):
        this.friendshipService.getFriendRequests().then(value => {
          this.setData(value);
        });
        break;
      case (FriendsManagement.BLOCKED_USERS):
        this.friendshipService.getBlockedUsers().then(value => {
          this.setData(value);
        });
        break;
    }

  }

  setData(value: SearchedUserInterface[]) {
    this.data = value;
    this.dataSource.data = this.data;
    this.loaded$.next(true);
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  acceptFriendship(element: EmailUsernameInterface) {
    this.friendshipService.acceptFriendship(element.email).then(() => {
      this.deleteElementAndReloadData(element);
    }, reason => {
      //TODO add error handling
      console.log(reason);
    });
  }

  private deleteElementAndReloadData(element: EmailUsernameInterface) {
    const index = this.data.indexOf(element, 0);
    if (index > -1) {
      this.data.splice(index, 1);
    }
    this.dataSource.data = this.data;
  }

  rejectFriendship(element: EmailUsernameInterface) {
    this.friendshipService.deleteFriendship(element.email).then(() => {
      this.deleteElementAndReloadData(element);
    });
  }

  blockUser(element: EmailUsernameInterface) {
    this.friendshipService.blockUser(element.email).then(() => {
      this.deleteElementAndReloadData(element);
    }, reason => {
      //TODO add error handling
      console.log(reason);
    });
  }

  unblockUser(element: EmailUsernameInterface) {

  }
}

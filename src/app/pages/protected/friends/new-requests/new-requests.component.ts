import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {SearchedUserInterface} from "../../../../core/_dataTypes/searchedUser-interface";
import {faTrashAlt, faCheck, faStopCircle} from "@fortawesome/free-solid-svg-icons";
import {FriendshipsService} from "../../../../core/_service/protected/friendships.service";
import {BehaviorSubject} from "rxjs";
import {EmailUsernameInterface} from "../../../../core/_dataTypes/emailUsername-interface";

@Component({
  selector: 'app-new-requests',
  templateUrl: './new-requests.component.html',
  styleUrls: ['./new-requests.component.scss']
})
export class NewRequestsComponent implements OnInit, AfterViewInit {
  faTrashAlt = faTrashAlt;
  faCheck = faCheck;
  faStopCircle = faStopCircle;


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns: string[] = ['user', 'action'];
  dataSource = new MatTableDataSource<SearchedUserInterface>();

  data: SearchedUserInterface[] = [];

  loaded$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private friendshipService: FriendshipsService) {
  }

  ngOnInit(): void {
    this.loaded$.next(false);
    this.friendshipService.getFriendRequests().then(value => {
      this.data = value;
      this.dataSource.data = this.data;
      this.loaded$.next(true);
    });
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
}

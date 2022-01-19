import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {SearchedUserInterface} from "../../../../core/_dataTypes/searchedUser-interface";
import {BehaviorSubject} from "rxjs";
import {FriendshipsService} from "../../../../core/_service/protected/friendships.service";
import {faSearch, faPlus} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-search-friend',
  templateUrl: './search-friend.component.html',
  styleUrls: ['./search-friend.component.scss']
})
export class SearchFriendComponent implements OnInit, AfterViewInit {
  faSearch = faSearch;
  faPlus = faPlus;

  searchForm: FormGroup;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns: string[] = ['user', 'action'];
  dataSource = new MatTableDataSource<SearchedUserInterface>();

  data: SearchedUserInterface[] = [];

  loaded$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private formBuilder: FormBuilder,
              private friendshipService: FriendshipsService) {
    this.searchForm = this.formBuilder.group({
      username: ['', Validators.minLength(3)]
    });
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngSubmit() {
    let user: string = this.searchForm.controls.username.value
    if (!user || user.length < 3) {
      this.loaded$.next(false);
      return;
    }

    this.friendshipService.getUsersLike(user).subscribe(value => {
      console.log(value);
      this.data = value;
      this.dataSource.data = this.data;
      this.loaded$.next(true);
    });
  }

  addFriend(element: SearchedUserInterface) {
    this.friendshipService.sendFriendshipRequest(element.email).then(() => {
      const index = this.data.indexOf(element, 0);
      this.data[index].status = 'NEW';
      this.dataSource.data = this.data;
    })
  }
}

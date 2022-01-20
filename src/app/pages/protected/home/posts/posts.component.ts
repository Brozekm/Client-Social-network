import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {PostsService} from "../../../../core/_service/protected/posts.service";
import {PostInterface} from "../../../../core/_dataTypes/post-interface";
import {BehaviorSubject, interval, Observable, Subscription} from "rxjs";
import {UserInterface} from "../../../../core/_dataTypes/user-interface";
import {faArrowDown} from "@fortawesome/free-solid-svg-icons";
import {data} from "autoprefixer";

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit, OnDestroy {
  @Input() obs$: Observable<boolean> = new Observable<boolean>();

  faArrowDown = faArrowDown;
  pagination: number = 10;

  olderExist: boolean = false;

  offset: number = 0;
  data: PostInterface[] = [];
  loaded$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  loggedEmail: string;

  intervalTimer = interval(20000);
  subscription: Subscription;

  constructor(private postService: PostsService) {
    let userRaw = localStorage.getItem('user');
    if (userRaw){
      let user: UserInterface = JSON.parse(userRaw);
      this.loggedEmail = user.email;
    }else{
      this.loggedEmail = '';
    }

    this.subscription = this.intervalTimer.subscribe(() => {
      this.loadNewer();
    });

  }

  ngOnInit(): void {
    this.loaded$.next(false);
    this.offset = 0;
    this.postService.getPosts(this.offset).then(value => {
      this.olderExist = value.length < this.pagination;
      this.data = value;
      this.loaded$.next(true);
    });


    this.obs$.subscribe(() => {
      this.subscription.unsubscribe();
      this.subscription = this.intervalTimer.subscribe(() => {
        this.loadNewer();
      });
      this.loadNewer();
    })
  }



  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  loadOlderPosts() {
    this.offset += this.pagination;
    this.loadData();
  }

  loadData(){
    this.postService.getPosts(this.offset).then(value => {
      this.olderExist = value.length < this.pagination;
      this.data = this.data.concat(value);
    });
  }

  loadNewer(){
    this.postService.getNewerPosts(this.data[0].createdAt).then(value => {
      if (value.length > 0 ){
        this.data = value.concat(this.data);
      }
    });
  }
}

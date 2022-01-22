import {Injectable} from '@angular/core';
import {SocketClientState, WebSocketService} from "./web-socket.service";
import {filter} from "rxjs/operators";
import {EnumOnlineStatus, OnlineFriendInterface} from "../../_dataTypes/online-friend.interface";
import {BehaviorSubject, Subscription} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class OnlineFriendsService {

  private onlineFriends: OnlineFriendInterface[] = [];

  private _online$: BehaviorSubject<OnlineFriendInterface[]>;

  sub: Subscription;

  constructor(private wsService: WebSocketService) {
    this._online$ = new BehaviorSubject<OnlineFriendInterface[]>([]);
    this.sub = wsService.socketState.subscribe(value => {
      if (value === SocketClientState.ATTEMPTING){
        this.deleteData();
      }
      if (value === SocketClientState.CONNECTED){
        this.subscribeToOnlineFriends();
      }
    });
  }

  private deleteData() {
    this.onlineFriends = [];
    this._online$ = new BehaviorSubject<OnlineFriendInterface[]>([]);
  }

  private subscribeToOnlineFriends() {
    let token = this.wsService.token;
    if (token) {
      if (this.wsService.client) {
        this.wsService.client.subscribe('/user/queue/online-friends', message => {

          let response: OnlineFriendInterface[] = JSON.parse(message.body) as OnlineFriendInterface[];
          if (response.length != 0) {
            if (response[0].status === EnumOnlineStatus.OFFLINE) {
              response.forEach((element, index) => {
                if (element.status === EnumOnlineStatus.OFFLINE) {
                  this.onlineFriends.splice(index, 1);
                }
              });
            } else {
              this.onlineFriends = this.onlineFriends.concat(response);
            }
          }

          this._online$.next(this.onlineFriends);

        }, {Authorization: token});
      }
    }
  }

  get online$(): BehaviorSubject<OnlineFriendInterface[]> {
    return this._online$;
  }

}

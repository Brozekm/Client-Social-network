import { Injectable } from '@angular/core';
import {BehaviorSubject, Subscription} from "rxjs";
import {EnumOnlineStatus, OnlineFriendInterface} from "../../_dataTypes/online-friend.interface";
import {SocketClientState, WebSocketService} from "./web-socket.service";

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  sub: Subscription;

  constructor(private wsService: WebSocketService) {

    this.sub = wsService.socketState.subscribe(value => {
      if (value === SocketClientState.ATTEMPTING){
        this.deleteData();
      }
      if (value === SocketClientState.CONNECTED){
        this.subscribeToChat();
      }
    });
  }

  private deleteData() {

  }

  private subscribeToChat() {
    let token = this.wsService.token;
    if (token) {
      if (this.wsService.client) {
        this.wsService.client.subscribe('/user/queue/chat', message => {

          console.log(message);

        }, {Authorization: token});
      }
    }
  }
}

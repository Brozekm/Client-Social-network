import {Injectable} from '@angular/core';
import {SocketClientState, WebSocketService} from "./web-socket.service";
import {filter} from "rxjs/operators";
import {AuthenticationService} from "../auth/authentication.service";

@Injectable({
  providedIn: 'root'
})
export class OnlineFriendsService {

  constructor(private wsService: WebSocketService) {
    wsService.socketState.pipe(filter(state => state === SocketClientState.CONNECTED))
      .subscribe(() => {
        console.log("Break");
        let token = wsService.token;
        if(token){
          if (this.wsService.client){
            this.wsService.client.subscribe('/user/queue/online-friends', message => {
              console.log('Online friends message');
              console.log(message);
            }, {Authorization: token});
          }
        }
      });
  }

}

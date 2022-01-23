import {Injectable, OnInit} from '@angular/core';
import {Client} from "@stomp/stompjs";
import {BehaviorSubject} from "rxjs";
import {UserInterface} from "../../_dataTypes/user-interface";

export enum SocketClientState {
  ATTEMPTING, CONNECTED
}

@Injectable({
  providedIn: 'root'
})
export class WebSocketService{

  private _client?: Client;

  private _socketState: BehaviorSubject<SocketClientState>;

  private readonly socketConnectionUrl = 'ws://localhost:8080/ws/online';

  private _token?: string;


  constructor() {
    this._socketState = new BehaviorSubject<SocketClientState>(SocketClientState.ATTEMPTING);
    if (localStorage.getItem('user')){
      if (!this._client){
        this.createConnection();
      }
    }
  }



  get client(): Client | null {
    if (this._socketState.getValue() === SocketClientState.CONNECTED && this._client) {
      return this._client;
    }
    return null;
  }

  public createConnection() {
    this._token = this.getToken();
    if (this._token) {
      this._client = new Client({
        brokerURL: this.socketConnectionUrl,
        reconnectDelay: 5000,
        onDisconnect: receipt => {
          console.log(receipt)
        },
        connectHeaders: {
          Authorization: this._token
        },
        onConnect: receipt => {
          if (receipt.command === "CONNECTED") {
            this._socketState.next(SocketClientState.CONNECTED);
          }
        }
      });
      this._client.activate();
    }
  }

  private getToken() {
    let userRaw = localStorage.getItem('user');
    if (userRaw) {
      let user: UserInterface = JSON.parse(userRaw);
      if (user) {
        return `Bearer ${user.jwttoken}`;
      }
    }
    return undefined;
  }

  public wsDisconnect() {
    this._socketState.next(SocketClientState.ATTEMPTING);
    if (this._client) {
      this._client.deactivate();
    }
  }

  get token(): string | undefined {
    return this._token;
  }

  get socketState(): BehaviorSubject<SocketClientState> {
    return this._socketState;
  }


}

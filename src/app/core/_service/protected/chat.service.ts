import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, Subscription} from "rxjs";
import {SocketClientState, WebSocketService} from "./web-socket.service";
import {UserMessage} from "../../_dataTypes/userMessage";
import {Conversation} from "../../_dataTypes/conversation";
import {ClientMessage, EnumMessageState} from "../../_dataTypes/client-message";

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private conversationMap: Map<string, Conversation>;

  private _newMessage$: BehaviorSubject<UserMessage>;

  private sub: Subscription;

  constructor(private wsService: WebSocketService) {
    this._newMessage$ = new BehaviorSubject<UserMessage>(new UserMessage("",""));
    this.conversationMap = new Map<string, Conversation>();

    this.sub = wsService.socketState.subscribe(value => {
      if (value === SocketClientState.ATTEMPTING) {
        this.deleteData();
      }
      if (value === SocketClientState.CONNECTED) {
        this.subscribeToChat();
      }
    });
  }

  private deleteData() {
    this.conversationMap = new Map<string, Conversation>();
    this._newMessage$ = new BehaviorSubject<UserMessage>(new UserMessage("",""));
  }

  private subscribeToChat() {
    let token = this.wsService.token;
    if (token) {
      if (this.wsService.client) {
        this.wsService.client.subscribe('/user/queue/chat', message => {

          let userMessage = JSON.parse(message.body) as UserMessage;
          if (!userMessage) return;

          if (!this.conversationMap.has(userMessage.targetUser)){
            this.conversationMap.set(userMessage.targetUser, new Conversation());
          }

          this.conversationMap.get(userMessage.targetUser)?.addMessage(
            new ClientMessage(EnumMessageState.INGOING, userMessage.message));

          this._newMessage$.next(userMessage);
        }, {Authorization: token});
      }
    }
  }


  public sendMessage(to: string, message: string) {
    let token = this.wsService.token;
    let userMessage = new UserMessage(to, message);
    if (!token) return;

    if (!this.conversationMap.has(to)){
      this.conversationMap.set(to, new Conversation());
    }

    this.conversationMap.get(to)?.addMessage(
      new ClientMessage(EnumMessageState.OUTGOING, message));

    this.wsService.client?.publish({
      destination: '/ws/chat',
      body: JSON.stringify(userMessage),
      headers: {
        Authorization: token
      }
    })
  }

  get newMessage$(): Observable<UserMessage> {
    return this._newMessage$.asObservable();
  }

  getConversation(withWho: string): Conversation | undefined{
    return this.conversationMap.get(withWho);
  }

}

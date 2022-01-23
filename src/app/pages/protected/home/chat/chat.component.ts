import {Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges} from '@angular/core';
import {faPaperPlane, faTimes, faUser} from "@fortawesome/free-solid-svg-icons";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ChatService} from "../../../../core/_service/protected/chat.service";
import {Subscription} from "rxjs";
import {filter} from "rxjs/operators";
import {Conversation} from "../../../../core/_dataTypes/conversation";
import {ClientMessage, EnumMessageState} from "../../../../core/_dataTypes/client-message";
import {EnumOnlineStatus, OnlineFriendInterface} from "../../../../core/_dataTypes/online-friend.interface";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnDestroy, OnChanges {
  @Input() targetUser: OnlineFriendInterface = {
    email: '',
    userName: '',
    status: EnumOnlineStatus.ONLINE
  };

  @Output() closeChatEvent = new EventEmitter<boolean>();

  faUser = faUser;
  faTimes = faTimes;
  faPaperPlane = faPaperPlane;


  sub: Subscription = new Subscription();

  conversation: Conversation = new Conversation();

  messageForm: FormGroup = new FormGroup({
    message: new FormControl('', [Validators.required, Validators.min(1)])
  })

  constructor(private chatService: ChatService) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.conversation = new Conversation();
    let first: boolean = true;
    let tmpConv = this.chatService.getConversation(this.targetUser.email);
    if (tmpConv) {
      this.conversation.messages = this.conversation.messages.concat(tmpConv.messages);
    } else {
      first = false;
    }

    this.sub = this.chatService.newMessage$
      .pipe(filter(value => value.targetUser === this.targetUser.email))
      .subscribe(value => {
        first ? first = false : this.conversation.addMessage(new ClientMessage(EnumMessageState.INGOING, value.message));
      })
  }

  ngOnInit(): void {
    console.log("OPENING CHAT");
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  sendMessage() {
    let message: string = this.messageForm.controls['message'].value;
    if (!message || message.length === 0) return;

    this.conversation.addMessage(new ClientMessage(EnumMessageState.OUTGOING, message));
    this.messageForm.controls['message'].setValue('');
    this.chatService.sendMessage(this.targetUser.email, message);
  }
}

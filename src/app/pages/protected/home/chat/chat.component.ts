import {Component, OnInit} from '@angular/core';
import {faUser, faTimes, faPaperPlane} from "@fortawesome/free-solid-svg-icons";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  faUser = faUser;
  faTimes = faTimes;
  faPaperPlane = faPaperPlane;

  targetUser:string = 'test1@gmail.com';

  messageForm: FormGroup = new FormGroup({
    message: new FormControl('', [Validators.required, Validators.min(1)])
  })

  constructor() {
  }

  ngOnInit(): void {
  }

  sendMessage() {
    console.log(this.messageForm.controls['message'].value);

    this.messageForm.controls['message'].setValue('');
  }
}

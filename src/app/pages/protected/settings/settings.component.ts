import { Component, OnInit } from '@angular/core';
import {UserInterface} from "../../../core/_dataTypes/user-interface";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  user: UserInterface = {
    token: '',
    email: '',
    firstName: '',
    surname: ''
  };

  constructor() { }

  ngOnInit(): void {
    let userRaw = localStorage.getItem('user');
    if (userRaw){
      this.user = JSON.parse(userRaw);
    }
  }

}

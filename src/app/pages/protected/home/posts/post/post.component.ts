import {Component, Input, OnInit} from '@angular/core';
import {faUser, faInfo} from "@fortawesome/free-solid-svg-icons";
import {PostInterface} from "../../../../../core/_dataTypes/post-interface";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  @Input() post?: PostInterface;
  @Input() logged:string = ''

  faInfo = faInfo;
  faUser = faUser;

  constructor() { }

  ngOnInit(): void {
  }

}

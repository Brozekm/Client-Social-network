import { Component, OnInit } from '@angular/core';
import {faTrashAlt} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  faTrashAlt = faTrashAlt;

  constructor() { }

  ngOnInit(): void {
  }

}

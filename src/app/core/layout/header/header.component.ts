import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";
import {Observable} from "rxjs";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  title: string = '';

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    this.resolveHeader(this.router.url.toString());
    this.router.events.subscribe(value => {
      if (value instanceof NavigationEnd) {
        this.resolveHeader(value.url);
      }
    })
  }

  private resolveHeader(url: string) {
    switch (url) {
      case ('/'):
        this.changeHeader('Wall');
        console.log('Wall');
        break;
      case ('/friendsManagement'):
        this.changeHeader('Friends');
        console.log('Friends');
        break;
      case ('/settings'):
        this.changeHeader('Settings');
        console.log('Settings');
        break;
      case ('/messenger'):
        this.changeHeader('Messages');
        console.log('Messages')
        break;
      default:
        this.changeHeader('Unknown');
        console.log('Unknown url');
    }
  }

  private changeHeader(titleFromUrl: string) {
    this.title = titleFromUrl;
  }


}

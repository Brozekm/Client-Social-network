import {Component, OnInit} from '@angular/core';
import {faCog, faHome, faUsers, faEnvelopeOpen, faEnvelope, faArrowRight, faArrowLeft} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  faHome = faHome;
  faCog = faCog;
  faUsers = faUsers;
  faArrow = faArrowRight;
  faEnvelope = faEnvelope;
  faArrowRight = faArrowRight;
  faArrowLeft = faArrowLeft;

  constructor() {
  }

  ngOnInit(): void {
  }

  changeIcon() {
    this.faEnvelope = faEnvelopeOpen;
  }

  changeIconClose() {
    this.faEnvelope = faEnvelope
  }

  changeIconOpen() {
    this.faEnvelope = faEnvelopeOpen;
  }
}

import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UserInterface} from "../../_dataTypes/user-interface";
import {Observable} from "rxjs";
import {Router} from "@angular/router";
import {OnlineFriendsService} from "../protected/onlineFriends.service";
import {WebSocketService} from "../protected/web-socket.service";


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  readonly URL = 'http://localhost:8080';

  constructor(private http: HttpClient,
              private wsService: WebSocketService) {
  }

  public login(email: string, password: string): Observable<boolean> {
    return new Observable(subscriber => {
      this.http.post(this.URL + '/login', {email: email, password: password})
        .subscribe(value => {
          let user: UserInterface = value as UserInterface;
          if (user) {
            localStorage.setItem('user', JSON.stringify(user));
            this.wsService.createConnection();
            subscriber.next(true);
            subscriber.complete();
          } else {
            console.log('Error occurred while parsing server login response');
            subscriber.next(false);
          }
        }, error => {
          subscriber.error(error);
        })
    });
  }

  public register(email: string, password: string, username: string): Observable<boolean> {
    return new Observable(subscriber => {
      this.http.post(this.URL + '/register', {email: email, password: password, userName: username})
        .subscribe(value => {
          console.log(value);
          subscriber.next(true);
          subscriber.complete();
        }, error => {
          console.log(error);
          subscriber.error(error);
        })
    });
  }

  public getJwtToken(): string | null {
    let userRaw = localStorage.getItem('user');
    if (userRaw) {
      let user: UserInterface = JSON.parse(userRaw);
      if (user) {
        return `Bearer ${user.jwttoken}`;
      }
    }
    return null;
  }



  public logout() {
    this.wsService.wsDisconnect();
    // this.onlineService.
    localStorage.removeItem('user');
  }
}

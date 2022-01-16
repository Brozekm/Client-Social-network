import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {SearchedUserInterface} from "../../_dataTypes/searchedUser-interface";
import {AuthenticationService} from "../auth/authentication.service";
import {EmailUsernameInterface} from "../../_dataTypes/emailUsername-interface";

@Injectable({
  providedIn: 'root'
})
export class FriendshipsService {

  readonly URL = 'http://localhost:8080';

  constructor(private http: HttpClient,
              private auth: AuthenticationService) {
  }

  public getUsersLike(username: string): Observable<SearchedUserInterface[]> {
    let params = new HttpParams()
      .set('name', username);
    return new Observable(subscriber => {
      this.http.get(this.URL + '/findUsersLike', {params: params})
        .subscribe(value => {
          let users: SearchedUserInterface[] = value as SearchedUserInterface[];
          subscriber.next(users);
          subscriber.complete();
        }, error => {
          console.log(error.status);
          this.auth.logoutAndReload();
        })
    })
  }


  public sendFriendshipRequest(email: string): Promise<boolean> {
    return new Promise(((resolve, reject) => {
      this.http.post(this.URL + '/sendFriendshipRequest', {email: email}).subscribe(value => {
        resolve(true);
      }, error => {
        if (error.status === 401 || error.status >= 500) {
          this.auth.logoutAndReload();
        }
        reject(error);
      })
    }));
  }

  public getFriendRequests(): Promise<EmailUsernameInterface[]> {
    return new Promise<EmailUsernameInterface[]>((resolve, reject) => {
      this.http.get(this.URL + '/getFriendshipRequests').subscribe(value => {
        let requests: EmailUsernameInterface[] = value as EmailUsernameInterface[];
        resolve(requests);
      }, error => reject(error));
    });
  }

  public deleteFriendship(targetEmail: string): Promise<boolean>{
    let params = new HttpParams()
      .set('email', targetEmail);
    return new Promise<boolean>((resolve, reject) => {
      this.http.delete(this.URL + '/deleteRelationship', {params: params}).subscribe(value => {
        resolve(true);
      }, error => {
        reject(error);
      })
    });
  }
}

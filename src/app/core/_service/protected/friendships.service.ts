import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {SearchedUserInterface} from "../../_dataTypes/searchedUser-interface";
import {AuthenticationService} from "../auth/authentication.service";

@Injectable({
  providedIn: 'root'
})
export class FriendshipsService {

  readonly URL = 'http://localhost:8080';

  constructor(private http: HttpClient,
              private auth: AuthenticationService) { }

  public getUsersLike(username: string): Observable<SearchedUserInterface[]>{
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
}

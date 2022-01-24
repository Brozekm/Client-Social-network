import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {SearchedUserInterface} from "../../_dataTypes/searchedUser-interface";
import {EmailUsernameInterface} from "../../_dataTypes/emailUsername-interface";

@Injectable({
  providedIn: 'root'
})
export class FriendshipsService {

  readonly URL = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {
  }

  public getUsersLike(username: string): Observable<SearchedUserInterface[]> {
    let params = new HttpParams()
      .set('name', username);
    return new Observable(subscriber => {
      this.http.get(this.URL + '/users', {params: params})
        .subscribe(value => {
          let users: SearchedUserInterface[] = value as SearchedUserInterface[];
          subscriber.next(users);
          subscriber.complete();
        }, error => {
          subscriber.error(error);
        })
    })
  }


  public getFriendRequests(): Promise<EmailUsernameInterface[]> {
    return new Promise<EmailUsernameInterface[]>((resolve, reject) => {
      this.http.get(this.URL + '/relationships/request').subscribe(value => {
        let requests: EmailUsernameInterface[] = value as EmailUsernameInterface[];
        resolve(requests);
      }, error => reject(error));
    });
  }


  public getFriends(): Promise<EmailUsernameInterface[]> {
    return new Promise<EmailUsernameInterface[]>((resolve, reject) => {
      this.http.get(this.URL + '/relationships/friend').subscribe(value => {
        let requests: EmailUsernameInterface[] = value as EmailUsernameInterface[];
        resolve(requests);
      }, error => reject(error));
    });
  }


  public getBlockedUsers(): Promise<EmailUsernameInterface[]> {
    return new Promise<EmailUsernameInterface[]>((resolve, reject) => {
      this.http.get(this.URL + '/relationships/blocked').subscribe(value => {
        let requests: EmailUsernameInterface[] = value as EmailUsernameInterface[];
        resolve(requests);
      }, error => reject(error));
    });
  }


  public sendFriendshipRequest(email: string): Promise<boolean> {
    return new Promise(((resolve, reject) => {
      this.http.post(this.URL + '/relationships/request', {email: email}).subscribe(value => {
        resolve(true);
      }, error => {
        reject(error);
      })
    }));
  }


  public deleteFriendship(targetEmail: string): Promise<boolean> {
    let params = new HttpParams()
      .set('email', targetEmail);
    return new Promise<boolean>((resolve, reject) => {
      this.http.delete(this.URL + '/relationships', {params: params}).subscribe(value => {
        resolve(true);
      }, error => {
        reject(error);
      })
    });
  }

  public acceptFriendship(targetEmail: string): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
        this.http.put(this.URL + '/relationships/friend', {email: targetEmail}).subscribe(() => {
          resolve(true);
        }, error => {
          reject(error);
        })
    });
  }

  public blockUser(targetEmail: string): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.http.put(this.URL + '/user/block', {email: targetEmail}).subscribe(() => {
        resolve(true);
      }, error => {
        reject(error);
      })
    });
  }

  public unblockUser(targetEmail: string): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.http.put(this.URL + '/user/unblock', {email: targetEmail}).subscribe(() => {
        resolve(true);
      }, error => {
        reject(error);
      })
    });
  }
}

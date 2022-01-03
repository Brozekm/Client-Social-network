import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UserInterface} from "../../_dataTypes/user-interface";
import {Observable} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  readonly URL = 'http://localhost:8080';

  constructor(private http: HttpClient) {
  }

  public login(email: string, password: string): Observable<boolean> {
    return new Observable(subscriber => {
      this.http.post(this.URL + '/login', {email: email, password: password})
        .subscribe(value => {
          let user: UserInterface = value as UserInterface;
          if (user) {
            localStorage.setItem('user', JSON.stringify(user));
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

  public logout() {
    localStorage.removeItem('user');
  }
}

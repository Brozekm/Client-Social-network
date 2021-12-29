import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TmpUsersService {
  readonly URL = 'http://localhost:8080';

  constructor(private http: HttpClient) {
  }

  public getAllUsers(): Observable<object> {
    return new Observable(subscriber => {
      this.http.get(this.URL + '/getAllUsers').subscribe(value => {
        console.log(value);
        subscriber.next(value);
        subscriber.complete();
      }, error => {
        console.log(error);
        subscriber.error(error);
      });
    });
  }

}

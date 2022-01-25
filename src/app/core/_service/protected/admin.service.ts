import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {EnumRole} from "../../_dataTypes/user-interface";
import {UserWithRoles} from "../../_dataTypes/user-with-roles";

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  readonly URL = 'http://localhost:8080/api/admin';

  constructor(private http: HttpClient) { }

  public getFriendsWithRoles(): Promise<UserWithRoles[]> {
    return new Promise<UserWithRoles[]>((resolve, reject) => {
      this.http.get(this.URL + '/friend').subscribe(value => {
        let requests: UserWithRoles[] = value as UserWithRoles[];
        resolve(requests);
      }, error => reject(error));
    });
  }

  public removeRole(user: string, role: EnumRole): Promise<boolean>{
    return new Promise<boolean>((resolve, reject) => {
      this.http.put(this.URL + '/friend/role/remove', {user: user, role: role}).subscribe(() => {
        resolve(true);
      },error => {
        console.log(error);
        reject(error);
      })
    });
  }

  public addRole(user: string, role: EnumRole): Promise<boolean>{
    return new Promise<boolean>((resolve, reject) => {
      this.http.put(this.URL + '/friend/role/add', {user: user, role: role}).subscribe(() => {
        resolve(true);
      },error => {
        console.log(error);
        reject(error);
      })
    });
  }

}

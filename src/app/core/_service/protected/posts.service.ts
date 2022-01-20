import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {PostRequest} from "../../_dataTypes/PostRequest";

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  readonly URL = 'http://localhost:8080';

  constructor(private http: HttpClient) {
  }


  public createPost(post: PostRequest): Promise<boolean>{
    return new Promise<boolean>((resolve, reject) => {
      this.http.post(this.URL + '/api/posts', {message: post.message, type: post.type}).subscribe(() => {
        resolve(true);
      }, error => {
        reject(error);
      })
    })
  }

}

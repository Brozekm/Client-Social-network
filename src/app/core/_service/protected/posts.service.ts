import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {PostRequest} from "../../_dataTypes/postRequest";
import {PostInterface} from "../../_dataTypes/post-interface";

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  readonly URL = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {
  }


  public createPost(post: PostRequest): Promise<boolean>{
    return new Promise<boolean>((resolve, reject) => {
      this.http.post(this.URL + '/posts', {message: post.message, type: post.type}).subscribe(() => {
        resolve(true);
      }, error => {
        reject(error);
      })
    })
  }

  public getPosts(offset: number): Promise<PostInterface[]>{
    let params = new HttpParams()
      .set('offset', offset);
    return new Promise<PostInterface[]>((resolve, reject) => {
      this.http.get(this.URL + '/posts', {params: params}).subscribe(value => {
        let posts: PostInterface[] = value as PostInterface[];
        resolve(posts);
      },error => {
        reject(error);
      })
    });
  }

  public getNewerPosts(date: Date): Promise<PostInterface[]>{
    let params = new HttpParams()
      .set('from', date.toString());
    return new Promise<PostInterface[]>((resolve, reject) => {
      this.http.get(this.URL + '/posts/new', {params: params}).subscribe(value => {
        let posts: PostInterface[] = value as PostInterface[];
        resolve(posts);
      },error => {
        reject(error);
      })
    });
  }

}

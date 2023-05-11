import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit, Optional, Injector } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Post } from '../models/post.model';

@Injectable({
  providedIn: 'root'
})
export class PostsService implements OnInit {

  httpClient: HttpClient;

  constructor(@Optional() httpClient: HttpClient, private injector: Injector) {
    this.httpClient = httpClient;
  }

  ngOnInit() {
    if (!this.httpClient) {
      this.httpClient = this.injector.get(HttpClient);
    }
  }

  getPost() {
    return this.httpClient.get(environment.baseUrl + environment.posts);
  }

  createPost(post: Post) {
    return this.httpClient.post(environment.baseUrl + environment.posts, post);
  }
}

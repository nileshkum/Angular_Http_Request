import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from './post.model';
import { PostService } from './post.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy{
  loadedPosts: Post[] = [];
  isFetching = false;
  error = null;

  private errorSubs: Subscription;

    constructor(private http: HttpClient,
              private postService: PostService) {}

  ngOnInit() {
   this.errorSubs =  this.postService.error.subscribe(errorMessage => {
      this.error = errorMessage;
    });

     this.isFetching = true;
    this
    .postService
    .fetchPpost()
    .subscribe(posts => {
      this.isFetching = false;
      this.loadedPosts = posts;
    },error => {
       this.isFetching = false;
      this.error = error.statusText;
      // console.log(error);
    });
  }

  ngOnDestroy(){
    this.errorSubs.unsubscribe();
  }

  onCreatePost(postData: Post) {
    this
    .postService
    .createAndStorePost(postData.title,postData.content);
    // .subscribe(result => {
    //   console.log(result,'Created Successfully');
    //   this.onFetchPosts();
    // }
    // , error => {
    //   console.log(error);
    // }
    // );
  }

  onFetchPosts() {
    // Send Http request
    this.isFetching = true;
    this
    .postService
    .fetchPpost()
    .subscribe(posts => {
      this.isFetching = false;
      this.loadedPosts = posts;
    }, error => {
      this.isFetching = false;
      // this.loadedPosts = [];
      this.error = error.message;

    });
  }

  onClearPosts() {
    // Send Http request
    this.isFetching = true;
    this
    .postService
    .deletePosts()
    .subscribe(result => {
      console.log(result, 'All Posts Deleted');
       this.isFetching = false;
       this.loadedPosts = [];
    })
  }
  onHandleError(){
    this.error= null;
  }

}

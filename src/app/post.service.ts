import { Injectable } from "@angular/core";
import { HttpClient, HttpEventType, HttpHeaders, HttpParams } from '@angular/common/http';
import { Post } from "./post.model";
import { map, catchError,tap } from 'rxjs/operators';
import {Subject, throwError} from 'rxjs';

@Injectable({
  providedIn:'root'
})
export class PostService {

  error = new Subject<string>();


  constructor(private http: HttpClient) {}
  createAndStorePost(title:string,content: string){
    const postData: Post = {title:title, content:content};

    //Use type script synatx
    this.http.post<{name: string}>(
      'https://ng-complete-guide-22576-default-rtdb.firebaseio.com/posts.json',
      postData,
      {
        // observe: 'body'
        observe: 'response' // these values depend on API
      }
      )
      .subscribe(responseData => {
        console.log(responseData);
      },
      error => {
        this.error.next(error.statusText);
      }
      );
  }

  fetchPpost(){
    //Multiple query params
    let searchParams = new HttpParams();
    searchParams = searchParams.append('print','pretty');
    searchParams = searchParams.append('custom','key');
      return  this.http
    // .get('https://ng-complete-guide-22576-default-rtdb.firebaseio.com/posts.json')
    // Using type script syntax for clean code
    .get<{[key:string]: Post}>('https://ng-complete-guide-22576-default-rtdb.firebaseio.com/posts.json',
      {
        headers: new HttpHeaders({ 'Custom-Headers': 'Hello' }),
        params: searchParams
        // params: new HttpParams().set('print','pretty')
      }
    )
    .pipe(
      // Using type script syntax for clean code , can also be done here
      // map((responseData: {  [key:string]: Post}) => {
      map((responseData: {  [key:string]: Post}) => {
      const postArray= [];
      for (const key in responseData){
        if(responseData.hasOwnProperty(key)){
        postArray.push({...responseData[key],id:key});
        }
      }
      return postArray;
    }),
    catchError(errorRes => {
        //... error handle
       return  throwError(errorRes);
    })
    );
  }

  deletePosts(){
    return this
    .http
    .delete('https://ng-complete-guide-22576-default-rtdb.firebaseio.com/posts.json',
    {
      observe: 'events',
      responseType: 'json'
    })
    .pipe(tap(event => {
      // console.log(event);

      if(event.type === HttpEventType.Sent){
        ///...
      }
      if(event.type === HttpEventType.Response){
        console.log(event.body);
      }
    }));
  }
}


import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers, Request, RequestMethod} from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { Post } from '../classes/post/post';
import { ThreadPosts } from '../classes/thread-posts/thread-posts';
import { Thread } from '../classes/thread/thread';
import { User } from '../classes/user/user';

//import { POSTS } from '../test-data/posts-test'; // test data


@Injectable()
export class ForumPostsService {

    private handleError (error: Response | any) {
        // In a real world app, we might use a remote logging infrastructure
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Promise.reject(errMsg);
    }

    constructor(private http: Http) { }

    private headers = new Headers({'Content-Type': 'application/json'});

    // local development urls

    private savePostURL = 'http://localhost:8080/api/savePost';  // URL to web api
    private getThreadPostsURL = 'http://localhost:8080/api/getThreadPosts';  // URL to web api

    // production urls

    // private savePostURL = 'http://goproject.ukwest.cloudapp.azure.com:8080/api/savePost';  // URL to web api
    // private getThreadPostsURL = 'http://goproject.ukwest.cloudapp.azure.com:8080/api/getThreadPosts';  // URL to web api

    private extractData(res: Response) {
        let body = res.json();

        //console.log(body);
        return body || { };
    
    }


    getPostsByThreadId(id: string): Promise<ThreadPosts> {
        // POST sourced from angulars docs: https://angular.io/docs/ts/latest/guide/server-communication.html#!#update

        var user: User;

        user = JSON.parse(localStorage.getItem("user"));

        // create object to send to server, including session cookie
        var data = {"Cookie": user.cookie, "Id": id};

        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(this.getThreadPostsURL, JSON.stringify(data), options)
                    .toPromise()
                    .then(this.extractData)
                    .catch(this.handleError);

    } // getPostsByThreadId()


    createPost(post: Post): Promise<ThreadPosts> {
        // POST sourced from angulars docs: https://angular.io/docs/ts/latest/guide/server-communication.html#!#update

        var user: User;

        user = JSON.parse(localStorage.getItem("user"));

        // create object to send data to server including session cookie
        var data = {"Cookie": user.cookie, "post": post};

        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(this.savePostURL, JSON.stringify(data), options)
                    .toPromise()
                    .then(this.extractData)
                    .catch(this.handleError);

    } // createPost()

} // class
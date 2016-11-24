//adapted from http://jasonwatmore.com/post/2016/09/29/angular-2-user-registration-and-login-example-tutorial
import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers, Request, RequestMethod } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';

import { User } from '../classes/user/user';
import { SessionCookie } from '../classes/session-cookie/session-cookie';
 
 
@Injectable()
export class AuthenticationService {

    private extractData(res: Response) {

        let body = res.json();
        console.log(body);
        return body || { };
    }

    constructor(private http: Http) { }

    private headers = new Headers({'Content-Type': 'application/json'});

    private loginUrl = 'http://localhost:8080/api/login';
    private logoutUrl = 'http://localhost:8080/api/logout';

    userName: string = "";
    userNameMessage: string = "";


    // logs the user in, returns the user object
    login(username: string, password: string): Promise<User> {

        // clear the cached user
        localStorage.removeItem("user");

        // set the headers for POST
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        var user: User = new User(); // create user object

        user.username = username; // set username

        // create new cookie object
        var cookie: SessionCookie = new SessionCookie();
        cookie.AuthToken = ""; // set defualt value

        // post login details to Go server
        return this.http.post(this.loginUrl, JSON.stringify({username: username, password: password}), options)
                .toPromise()
                .then((res: Response) => {

                    cookie = this.extractData(res); // get the cookie
                    user.cookie = cookie; // set the cookie in user object

                    this.userName = user.username;
                    this.userNameMessage = "Hello, " + user.username;

                    return user; // return the user object to caller
                });

    } // login()

    
    // log the current user out
    logout() {
        
        this.userName = "";
        this.userNameMessage = "";

        // make a new instance of user object
        var user: User = new User();

        // get the current logged in user
        user = JSON.parse(localStorage.getItem("user"));

        console.log(user);

        // if already logged out
        if(user == null){
            console.log("YES");
            return;
        }

         // clear the cached user
        localStorage.removeItem("user");

        // set the headers for POST
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        // post login details to Go server
        return this.http.post(this.logoutUrl, JSON.stringify(user.cookie), options)
                .toPromise()
                .catch();
    } // logout()
}
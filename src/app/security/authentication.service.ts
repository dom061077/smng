import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { RestDataSource,REST_URL } from "../services/rest.datasource";

import { User } from '../model/security/user.model';

@Injectable({ providedIn: 'root' })
export class AuthenticationService extends RestDataSource {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;


    
    constructor( public http: HttpClient,@Inject(REST_URL) public url: string)  {
        super(http,url);
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
        
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    login(username,password){
        console.log('Ingresando a login authentication service '+username+' password: '+password);

        return this.sendRequest<any>("POST",this.url+"/login"
            ,{"username": username,"password": password})
            .pipe(map(user => {
                if (user && user.access_token){
                    localStorage.setItem('currentUser',JSON.stringify(user));

                    this.currentUserSubject.next(user);
                }
                console.log('User Information: '+localStorage.getItem('userInformation'));

                return user;
            })
            );

        
    }    

    getUserInformation(username:string){

        return this.sendRequest<any>("GET",this.url+"/showuser?userName="+username)
            .subscribe(data=>{
                localStorage.setItem('userInformation',JSON.stringify(data));
                
            });
    }

    /*login(username: string, password: string) {
        return this.http.post<any>(`${this.url}/users/authenticate`, { username, password })
            .pipe(map(user => {
                // login successful if there's a jwt token in the response
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    this.currentUserSubject.next(user);
                }

                return user;
            }));
    }*/

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }
}
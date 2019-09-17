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
        console.log('Constructor de authentication XXXXXXX');
        
    }

    public get currentUserObservableValue(){
        
        return this.currentUser;
    
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
            .pipe(map(data=>{
               let user = this.currentUserValue; 
               user.id = data.id               
               user.apellido = data.apellido
               user.nombre = data.nombre
               this.currentUserSubject.next(user);
               localStorage.setItem('currentUser',JSON.stringify(user));
            }));
    }

    validateOldPassword(username:string,oldPassword:string){
        return this.sendRequest<any>("POST",this.url+"validateoldpassword"
            ,{"username":username,"oldPassword":oldPassword})
            .pipe(map(data=>{
                return data.success
            }));
            ;
    }


    changePassword(id:number,newPassword:string){
        return this.sendRequest<any>("PUT",this.url+"/changepassword"
            ,{"id":id,"newPassword":newPassword})
            .pipe(map(data=>{
                console.log("Response: "+data);
            }));
    }


    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }


}
import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { RestDataSource, REST_URL } from "../services/rest.datasource";

import { User } from '../model/security/user.model';
import { Authority } from './authority.model';

@Injectable({ providedIn: 'root' })
export class AuthenticationService extends RestDataSource {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;
    private currentRestError: BehaviorSubject<any>;
    public menuSubject: BehaviorSubject<any>;




    constructor(public http: HttpClient, @Inject(REST_URL) public url: string) {
        super(http, url);
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
        this.currentRestError = new BehaviorSubject<any>(null);
        this.menuSubject = new BehaviorSubject<any>([]);
        console.log('Constructor de authentication XXXXXXX');

    }

    public get currentUserObservableValue() {

        return this.currentUser;

    }

    public get currentRestSubError() {
        return this.currentRestError;
    }

    public get currentObservableValue() {
        return this.menuSubject;
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    login(username, password) {
        console.log('Ingresando a login authentication service ' + username + ' password: ' + password);

        return this.sendRequest<any>("POST", this.url + "/login"
            , { "username": username, "password": password })
            .pipe(map(user => {
                if (user && user.access_token) {
                    localStorage.setItem('currentUser', JSON.stringify(user));

                    this.currentUserSubject.next(user);
                    this.getMenu().toPromise().then(data => {
                        this.menuSubject.next(data);
                    });
                }
                console.log('User Information: ' + localStorage.getItem('userInformation'));

                return user;
            })
            );


    }

    getUserInformation(username: string) {

        return this.sendRequest<any>("GET", this.url + "/showuser?userName=" + username)
            .pipe(map(data => {
                let user = this.currentUserValue;
                user.id = data.id
                user.apellido = data.apellido
                user.nombre = data.nombre
                this.currentUserSubject.next(user);
                localStorage.setItem('currentUser', JSON.stringify(user));
            }));
    }

    validateOldPassword(oldPassword: string) {
        return this.sendRequest<any>("POST", this.url + "/validateoldpassword"
            , { "oldPassword": oldPassword })
            .pipe(map(data => {
                return data.success ? null : { wrongOldPassword: true }
            }

            ));
    }


    changePassword(oldPassword: string, newPassword: string) {
        return this.sendRequest<any>("PUT", this.url + "/changepassword"
            , { "oldPassword": oldPassword, "newPassword": newPassword })
            .pipe(map(data => {
                console.log("Response: " + data);
            }));
    }


    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }

    getMenu() {
        return this.sendRequest<any>("GET", this.url + "/getmenu")
            .pipe(map(data => {
                return data;
            }));
    }

    getAuthorities() {
        return this.sendRequest<any>("GET", this.url + "/getresturls")
            .toPromise().then(data => {
                return data.authorities;
            });
    }

    saveUsuario(usuario) {
        return this.sendRequest<any>("POST", this.url + "/saveusuario"
            , usuario).pipe(map(data => {
                return data.success
            }));
    }

    savePerfil(perfil) {
        return this.sendRequest<any>("POST", this.url + "/saveperfil"
            , perfil).pipe(map(data => {
                return data
            }));
    }

    updatePerfil(perfil){
        return this.sendRequest<any>("POST",this.url + "/updateperfil/"+perfil.id
            ,perfil).pipe(map(data=>{
                return data;    
            }));
    }


    getCantidadPerfiles(filter: string) {
        return this.sendRequest<any>("GET", this.url + "/perfilcount?filter="+filter
            ).pipe(map(data => {
                return data.count;    
            }));

    }
    
    getPerfiles(filter:string,start:number,limit:number){
        return this.sendRequest<any>("GET",this.url+"/getperfiles?filter="
            +filter+"&start="+start+"&limit="+limit)
                .toPromise().then(data=>{
                    
                    return data.perfiles;
        });
    }

    getPerfil(id:number){
        return this.sendRequest<any>("GET"
                ,this.url+"/getperfil/"+id
            ).toPromise().then(data=>{
                return data;
            });
    }    
    getAuthoritiesbyPerfil(id:number){
        return this.sendRequest<any>("GET"
                ,this.url+"/getroles/"+id
            ).toPromise().then(data=>{
                return data.authorities;
            });
    }

}
import { HttpClient } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { RestDataSource,REST_URL } from "../services/rest.datasource";

@Injectable()
export class AuthenticationService extends RestDataSource{
    constructor( public http: HttpClient,@Inject(REST_URL) public url: string)  {
        super(http,url);
    }

    getProvincias(search:string){
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

}
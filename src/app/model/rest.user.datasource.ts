import { RestDataSource,REST_URL } from "./rest.datasource";
import { Injectable, Inject, InjectionToken } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, throwError} from "rxjs";
import { catchError } from "rxjs/operators";
import { User } from "./user.model";
import { AuthenticatedUser } from "./authenticated.user.model";

@Injectable()
export class RestUserDataSource extends RestDataSource {
   constructor( public http: HttpClient,@Inject(REST_URL) public url: string) { 
            super(http,url);
    }
    
    getData():Observable<User[]>{
        return this.sendRequest<User[]>("GET",this.url);
    }

    login(username,password){
        console.log('Ingresando a login RestUserDataSource');

        return this.sendRequest("POST",this.url+"/login",{"username": username,"password": password}).subscribe(p=>{
            console.log('UserName: '+p.username);
            //console.log('Roles: '+p.roles);
            //console.log('access_token: '+p.access_token);
            //console.log('expires_in: '+p.expires_in);

        });
    }
}
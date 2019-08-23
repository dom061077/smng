import { RestDataSource,REST_URL } from "./rest.datasource";
import { Injectable, Inject, InjectionToken } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, throwError} from "rxjs";
import { catchError } from "rxjs/operators";
import { User } from "./user.model";

@Injectable()
export class RestUserDataSource extends RestDataSource {
   constructor( public http: HttpClient,REST_URL) { 
            super(http,REST_URL);
    }
    
    getData():Observable<User[]>{
        return this.sendRequest<User>("GET",this.url);
    }
}
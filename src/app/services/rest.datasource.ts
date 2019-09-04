import { Injectable, Inject, InjectionToken } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, throwError } from "rxjs";

import { catchError } from "rxjs/operators";

export const REST_URL = new InjectionToken("rest_url");

@Injectable()
export  class RestDataSource{
    private myHeaders = new HttpHeaders();
    constructor(public http: HttpClient,
        @Inject(REST_URL) public url: string) { }
    
        public sendRequest<T>(verb: string, url: string, bodyParm?: any) : Observable<any> {

            console.log('Ingresando a sendRequest');
            console.log('verb: '+verb);
            console.log('url: '+url);
            console.log('body: '+JSON.stringify(bodyParm));
            //this.myHeaders = this.myHeaders.set("Access-Key", "<secret>");
            //this.myHeaders = this.myHeaders.set("Application-Names", ["exampleApp", "proAngular"]);

            return this.http.request<any>(verb, url, {
                body:JSON.stringify(bodyParm),
                headers: this.myHeaders
            });//.pipe(catchError((error: Response) => 
               // throwError(`Network Error: ${error.statusText} (${error.status})`)));
        }        
}
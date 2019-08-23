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
    
        public sendRequest<T>(verb: string, url: string, body?: T) : Observable<T> {

            console.log('Ingresando a sendRequest');
            console.log('verb: '+verb);
            console.log('url: '+url);
            this.myHeaders = this.myHeaders.set("Access-Key", "<secret>");
            this.myHeaders = this.myHeaders.set("Application-Names", ["exampleApp", "proAngular"]);

            return this.http.request<T>(verb, url, {
                body: body,
                headers: this.myHeaders
            }).pipe(catchError((error: Response) => 
                throwError(`Network Error: ${error.statusText} (${error.status})`)));
        }        
}
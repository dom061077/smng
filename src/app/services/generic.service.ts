import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { RestDataSource, REST_URL } from "../services/rest.datasource";
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class GenericService extends RestDataSource{
    constructor(public http: HttpClient, @Inject(REST_URL) public url: string) {    
        super(http, url);
    }

    public getObjectCount(restApiStr:string,filter:string){
        return this.sendRequest<any>("GET",this.url + "/"+restApiStr+"?filter="+filter
            ).pipe(map((data:any) => {
                return data.count;
            }));
    }

    public getObjects(restApiStr:string,filter:string
            ,start:number,limit:number,sortField:string,ascDesc:string){
        return this.sendRequest<any>("GET",this.url+"/"+restApiStr+"?filter="
            +filter+"&start="+start+"&limit="+limit+"&sortField="+sortField
                +"&ascDesc="+ascDesc);
    }
}
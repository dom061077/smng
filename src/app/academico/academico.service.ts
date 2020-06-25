import { HttpClient } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { RestDataSource,REST_URL } from "../services/rest.datasource";
import { map } from 'rxjs/operators';
//import { Alumno } from './alumno.model';
import { Observable } from 'rxjs';

@Injectable()
export class AcademicoService extends RestDataSource{
    constructor (public http:HttpClient,@Inject(REST_URL) public url: string)  {
        super(http,url);
    }

}

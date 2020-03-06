import { HttpClient } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { RestDataSource,REST_URL } from "../services/rest.datasource";
import { map } from 'rxjs/operators';


@Injectable()
export class IncripcionService extends RestDataSource{
    constructor (public http: HttpClient,@Inject(REST_URL) public url: string){
        super(http,url);
    }

    getPeriodos(){
        return this.sendRequest<any>("GET",this.url+"/getperiodos")
            .pipe(map(data=>{
                return data.periodos;
            }));
    }

    getTurnos(){
        return this.sendRequest<any>("GET",this.url+"/getturnos")
            .pipe(map(data=>{
                return data.turnos;
            }));
    }

    getCursos(){
        return this.sendRequest<any>("GET",this.url+"/getcursos")
            .pipe(map(data=>{
                return data.cursos;
            }));
    }

    getDivisiones(){
        return this.sendRequest<any>("GET",this.url+"/getdivisiones")
            .pipe(map(data=>{
                return data.divisiones;
            }));
    }

}
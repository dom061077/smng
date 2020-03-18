import { HttpClient } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { RestDataSource,REST_URL } from "../services/rest.datasource";
import { map } from 'rxjs/operators';


@Injectable()
export class InscripcionService extends RestDataSource{
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

    getCursos(turnoId:number){
        return this.sendRequest<any>("GET",this.url+"/getcursos?turnoId="+turnoId)
            .pipe(map(data=>{
                return data.cursos;
            }));
    }

    getDivisiones(cursoId:number,turnoId:number){
        return this.sendRequest<any>("GET",this.url+"/getdivisiones?cursoId="
            +cursoId+"&turnoId="+turnoId)
            .pipe(map(data=>{
                return data.divisiones;
            }));
    }

    saveInscripcion(inscripcion){
        return this.sendRequest<any>("POST",this.url+"/saveinscripcion"
            ,inscripcion).pipe(map(data=>{
                return data.success;
            }));
    }

    getCantidadInscripciones(filter: string){
        return this.sendRequest<any>("GET",this.url + "/insccount?filter="+filter
            ).pipe(map(data => {
                return data.count;
            }));
    }    

    getInscripciones(filter:string,start:number,limit:number,sortField:string,ascDesc:string){
        return this.sendRequest<any>("GET",this.url+"/getinscripciones?filter="
            +filter+"&start="+start+"&limit="+limit+"&sortField="+sortField
                +"&ascDesc="+ascDesc)
                .toPromise().then(data=>{
                    return data.usuarios;
                    
                });
    }    

}
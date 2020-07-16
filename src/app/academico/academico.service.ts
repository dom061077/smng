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

    getCantidadExamenesAsig(asigId:number,filter:string){
        return this.sendRequest<any>("GET",this.url+"/countExamenesAsig"
            +"?&asigId="+asigId+"&filter="+filter);
    }

    getExamenesAsig(asigId:number,filter:string
            ,start:number,limit:number){
        return this.sendRequest<any>("GET",this.url+"/getalumnoexamenes"
            +"?asigId="+asigId+"&filter="+filter
            +"&start="+start+"&limit="+limit
            );
    }

    getAsignaturasCurrentUser(){
        return this.sendRequest<any>("GET",this.url+"/getasignaturascurrentuser");
    }

    getTurnosPorCurso(cursoId:number){
        return this.sendRequest<any>("GET",this.url+"/getasignaturaturnos/cursoId="
            +cursoId);
    }

    getAlumnoExamenes(asigId:number,alumnoId:number){
        return this.sendRequest<any>("GET",this.url+"/getalumnoexamenes?alumnoId="
            +alumnoId+"&asigId="+asigId);
    }

    savePromedios(promedios){
        return this.sendRequest<any>("POST",this.url+"/savepromedios"
            ,promedios);
    }

}

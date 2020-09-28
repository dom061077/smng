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

    getAlumnoExamenes(asigId:number,alumnoId:number,perId:number){
        return this.sendRequest<any>("GET",this.url+"/showalumnoexamenes?alumnoId="
            +alumnoId+"&asigId="+asigId+"&perId="+perId);
    }

    savePromedios(promedios){
        return this.sendRequest<any>("POST",this.url+"/savepromedios"
            ,promedios);
    }

    getPromedioPorPeriodo(inscId:number,asigId:number){
        return this.sendRequest<any[]>("GET",this.url+"/getpromediosperi?inscId="
            +inscId+"&asigId="+asigId).pipe(map(data=>{
                let prom:any;//Observable<any[]>;
                prom = data.promedios;
                return prom;
            }));
    }

    saveExamen(examId:number,puntuacion:number){
        return this.sendRequest<any>("POST",this.url+"/saveexam"
                ,{
                    examId:examId,
                    puntuacion:puntuacion
                })
    }

    getAsignaturas(filter:string){
        if(!filter)
            filter="";
        return this.sendRequest<any[]>("GET",this.url+"/getasignaturas?filter="
            +filter)
            .pipe(map(data=>{
                return data.asignaturas;
            }));
    }

    getXlsCompendio(asignaturaId:number,periLectivoId:number
            ,turnoId:number,cursoId:number,divisionId:number){
                 
        console.log("Division: "+divisionId);
        return this.sendRequest<any>("POST",this.url+"/compendio"
                ,{  asigId:asignaturaId, periLectivoId:periLectivoId 
                    ,turnoId:turnoId,cursoId:cursoId,divisionId:divisionId
                })
                .pipe(map(data=>{
                    return data.report
                }));
    }   

    isComplementarioValid(perId:number,puntuacion:number){
        return this.sendRequest<boolean>("GET"
            ,this.url+"/invalidcomp?perId="+perId
                +"&puntuacion="+puntuacion).pipe(map(data=>data));
    } 

}

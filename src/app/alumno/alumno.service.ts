import { HttpClient } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { RestDataSource,REST_URL } from "../services/rest.datasource";
import { map } from 'rxjs/operators';
import { Alumno } from './alumno.model';
import { Observable } from 'rxjs';

@Injectable()
export class AlumnoService extends RestDataSource{
    constructor( public http: HttpClient,@Inject(REST_URL) public url: string)  {
        super(http,url);
    }

    getProvincias(search:string){
        return this.sendRequest<any>("GET",this.url+"/autocprov?search="+search)
            .pipe(map(data=>{
                return data.provincias;
            }));          
    }

    getLocalidades(provinciaId:number,search:string){
        return this.sendRequest<any>("GET",this.url+"/autocloc?search="+search
            +"&provincia="+provinciaId)
            .pipe(map(data=>{
                return data.localidades;
            }));
    }

    getParentesco(){
        return this.sendRequest<any>("GET",this.url+"/autocparentesco")
            .pipe(map(data=>{
                return data.parentescos;
            }));
    }

    saveAlumno(alumno){
        return this.sendRequest<any>("POST",this.url+"/savealumno"
        ,alumno).pipe(map(data=>{
            return data.success;    
        }));
        
    }

    updateAlumno(alumno){
        return this.sendRequest<any>("PUT",this.url+"/updatealumno/"+alumno.id
        ,alumno).pipe(map(data=>{
            return data
        }));
    }


    getCantidad(filterField:string,filter: string){
        return this.sendRequest<any>("GET",this.url
            +"/alumnocount?filter="+filter+"&filterField="+filterField)
        .pipe(map(data=>{
            return data.count;
        }));

    }
    

    getAlumnos(filterField:string, filter:string,start:number,limit:number
            ,sortField:string,ascDesc:string){
        
        return this.sendRequest<any>("GET"
                ,this.url+"/getalumnos?filterField="+filterField
                    +"&filter="+filter
                    +"&start="+start+"&limit="+limit
                    +"&sortField="+sortField
                    +"&ascDesc="+ascDesc)
                .toPromise().then(data=>{
                    
                    return data.alumnos;
                });
        /*return this.sendRequest<any>("GET",this.url+"/listalumnos?filter="+filter)
        .pipe(map(data=>{
            return data;
        }));*/

    }

    getAlumno(id:number){
        return this.sendRequest<any>("GET"
                ,this.url+"/getalumno/"+id
            ).toPromise().then(data=>{
                return data;
            });
    }

    /*dniExists(dni:any){
        return this.sendRequest<any>("GET"
                ,this.url+"/getalumnobydni?dni=/"+dni
                ).toPromise().then(data=>{
                    return data;
                });
    }*/

    getAlumnoByDni(dni:any)/*: Observable<boolean>*/{
        if(!dni)
            dni='';
        dni = dni+'';
        const dniInt = dni.split('.').join('').split('_').join('');
        console.log("dniInt: "+dniInt);
        return this.sendRequest<any>("GET"
                ,this.url+"/getalumnobydni?dni="+dniInt)
                ;
    }

    getReporte(filterField:string, filter:string
            ,sortField:string,ascDesc:string){
        return this.sendRequest<any>("GET",this.url+"/reporteinsc?filterField="
            +filterField+"&filter="+filter+"&start="
            +"&sortField="+sortField
                +"&ascDesc="+ascDesc        
        )
            .pipe(map(data=>{
                return data.report;
            }));
    }     
}
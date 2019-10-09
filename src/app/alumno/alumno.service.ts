import { HttpClient } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { RestDataSource,REST_URL } from "../services/rest.datasource";
import { map } from 'rxjs/operators';
import { Alumno } from './alumno.interface';

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

    getCantidad(){
        return this.sendRequest<any>("GET",this.url+"/alumnocount")
        .pipe(map(data=>{
            return data.count;
        }));

    }
    

    getAlumnos(filter:string,start:number,limit:number){
        return this.sendRequest<any>("GET"
                ,this.url+"/getalumnos?filter="+filter
                    +"&start="+start+"&limit="+limit)
                .toPromise().then(data=>{
                    
                    return data.alumnos;
                });
        /*return this.sendRequest<any>("GET",this.url+"/listalumnos?filter="+filter)
        .pipe(map(data=>{
            return data;
        }));*/

    }


}
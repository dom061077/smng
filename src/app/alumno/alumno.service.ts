import { HttpClient } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { RestDataSource,REST_URL } from "../services/rest.datasource";
import { map } from 'rxjs/operators';
import { Alumno } from './alumno.model';

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


    getCantidad(filter:string ){
        return this.sendRequest<any>("GET",this.url+"/alumnocount?filter="+filter)
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

    getAlumnoByDni(dni:any){
        if(!dni)
            dni='';
        const dniInt = dni.split('.').join('').split('_').join('');
        console.log("dniInt: "+dniInt);
        return this.sendRequest<any>("GET"
                ,this.url+"/getalumnobydni?dni="+dniInt)
                .toPromise().then(data=>{
                    return data;
                });
    }
}
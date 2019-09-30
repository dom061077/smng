import { HttpClient } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { RestDataSource,REST_URL } from "../services/rest.datasource";
import { map } from 'rxjs/operators';

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

}
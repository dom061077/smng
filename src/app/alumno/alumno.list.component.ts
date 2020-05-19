import { Component,OnInit } from '@angular/core';
import { Alumno  } from './alumno.model';
import { AlumnoService } from './alumno.service';
import { FormControl } from '@angular/forms';
import { debounceTime,distinctUntilChanged } from 'rxjs/operators';
import { CrudCodes } from "../util/crud.enum";

import {SelectItem} from 'primeng/api';

@Component({
    //selector: 'ggg',
    templateUrl: './alumno.list.component.html'
})
export class AlumnoList implements OnInit{ 
    alumnos: Alumno[];
    editOpt:any;
    totalLazyAlumnoLength:number;
    public searchControl: FormControl;
    private debounce: number = 400;
    filterOptions:SelectItem[];

    sortOptions:SelectItem[];
    ascSort:boolean;
    sortKey:string;
    filterKey:string;
    selfFilter:string;
    first:number;
    rows:number;    

    constructor(private alumnoService:AlumnoService){
        this.totalLazyAlumnoLength=3;
    }

    private filtrar(query){
            let qJson;
            if (query && query instanceof Object)
                qJson=query.toJSON();
            else
                qJson=query.split('.').join('').split('_').join('');
            this.selfFilter=qJson //sirve para lazyLoad de la grilla
            this.cargarListInsc(this.filterKey,qJson,0,10,this.sortKey,(this.ascSort?'asc':'desc'));    

            this.inscService.getCantidadInscripciones(this.filterKey
                    ,qJson).toPromise().then(data=>{
                this.totalLazyInscripcionesLength = data;
            });  

    }

    private cargarListInsc(filterField:string, filter:string,start:number,limit:number,sortField:string,ascDesc:string){
        this.alumnoService.getAlumnos(filterField,filter,start,limit
                ,this.sortKey,(this.ascSort?'asc':'desc'))
            .then(data=>{
                this.alumnos = data;
                this.alumnoService.getReporte(filterField
                    ,filter,this.sortKey,(this.ascSort?'asc':'desc'))
                .subscribe(data=>{
                    const linkSource = 'data:application/pdf;base64,' +data;
                    const downloadLink = document.createElement("a");
                    const fileName = "sample.pdf";
                    //console.log('Print Id:'+this.printId);
                    this.printId.nativeElement.href = linkSource;
                    this.printId.nativeElement.download = fileName;
                    //this.printId.nativeElement.target='_blank';
                    //this.printId.nativeElement.click();                        
                });
            });
        
    }
    

    ngOnInit(){
        this.editOpt=CrudCodes.EDIT;
        this.alumnoService.getCantidad("").toPromise().then(data=>{
            console.log("Cantidad de alumnos "+data);
            this.totalLazyAlumnoLength = data;
        });

        this.ascSort=true;
        this.sortOptions = [
            {label: 'Apellido y nombre', value: 'apellidonombre'},
            {label: 'Identificador',value:'id'}
        ];

        this.filterOptions = [
            {label:'Apellido',value:'apellido'},
            {label:'Nombre',value:'nombre'},
            {label:'D.N.I',value:'dni'}
            //{label:'Fecha Insc.',value:'fecha'}
        ];        
        /*this.alumnoService.getAlumnos('',0
                ,20).then(data=>
            {   this.alumnos=data;
                console.log("Probando");
                console.log("Alumnos:  "+this.alumnos.length);


            });*/
            this.searchControl = new FormControl('');
            this.searchControl.valueChanges
              .pipe(debounceTime(this.debounce), distinctUntilChanged())
              .subscribe(query => {
                this.alumnoService.getAlumnos(this.searchControl.value,0,20).then(data=>
                    {   this.alumnos=data;
                        console.log("Probando");
                        console.log("Alumnos:  "+this.alumnos.length);
        
        
                    });   
                this.alumnoService.getCantidad(this.searchControl.value).toPromise().then(data=>{
                        console.log("Cantidad de alumnos");
                        this.totalLazyAlumnoLength = data;
                    });                    
              });            
        
    }

    loadData(event) {
        //event.first = First row offset
        //event.rows = Number of rows per page
        //this.lazyCars = load new chunk between first index and (first + rows) last index
        this.alumnoService.getAlumnos(this.searchControl.value,event.first,event.rows).then(data=>
            {   this.alumnos=data;
                console.log("Probando");
                console.log("Alumnos:  "+this.alumnos.length);


            });        
        console.log('Evento: first: '+event.first+' numero de filas: '+event.rows);
    }    

    selectAlumno(event:Event){
    }

    onChange(a){
        console.log(a);
    }

}
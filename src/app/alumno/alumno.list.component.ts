import { Component,OnInit,ViewChild,ElementRef } from '@angular/core';
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
    @ViewChild('printInsc') printId: ElementRef;
    alumnos: Alumno[];
    editOpt:any;
    totalLazyAlumnoLength:number;
    public searchControl: FormControl;
    searchDniControl : FormControl;
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
            this.cargarListAlumnos(this.filterKey,qJson,0,10,this.sortKey,(this.ascSort?'asc':'desc'));    

            this.alumnoService.getCantidad(this.filterKey
                    ,qJson).toPromise().then(data=>{
                this.totalLazyAlumnoLength = data;
            });  

    }

    private cargarListAlumnos(filterField:string, filter:string,start:number,limit:number,sortField:string,ascDesc:string){
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
        this.alumnoService.getCantidad("","").toPromise().then(data=>{
            console.log("Cantidad de alumnos "+data);
            this.totalLazyAlumnoLength = data;
        });

        this.ascSort=true;
        this.sortOptions = [
            {label: 'Apellido y nombre', value: 'apellidoNombre'},
            {label: 'Identificador',value:'id'}
        ];

        this.filterOptions = [
            {label:'Apellido',value:'apellidoNombre'},
            
            {label:'D.N.I',value:'dni'}
            //{label:'Fecha Insc.',value:'fecha'}
        ];        

        this.searchDniControl = new FormControl('');
        this.searchDniControl.valueChanges
            .pipe(debounceTime(this.debounce),distinctUntilChanged())
            .subscribe((query:any)=>{
                this.filtrar(query);
            });
        this.searchControl = new FormControl('');
        this.searchControl.valueChanges
        .pipe(debounceTime(this.debounce), distinctUntilChanged())
        .subscribe(query=>{
            this.filtrar(query);
        });

        
        
    }

    loadData(event) {
        this.first = event.first;
        this.rows = event.rows;
        this.cargarListAlumnos(this.filterKey, this.selfFilter,event.first,event.rows,this.sortKey,(this.ascSort?'asc':'desc'));
        console.log("Loaddata");

    }    

    selectAlumno(event:Event){
    }

    onChange(a){
        console.log(a);
    }

    onSortChange(event){
        
        
        this.alumnoService.getAlumnos(this.sortKey,this.searchControl.value,this.first,this.rows,this.sortKey,(this.ascSort?'asc':'desc'))
            .then(data=>{
                this.alumnos = data;
            });
    }

    onFilterChange(event){
        this.filtrar('');
        this.searchControl.setValue('');
        this.searchDniControl.setValue('');
        //this.searchFechaControl.setValue('');
    }


}
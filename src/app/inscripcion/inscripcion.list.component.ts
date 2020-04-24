import { Component,OnInit } from '@angular/core';
import { Inscripcion } from './inscripcion.model';
import { InscripcionService } from './inscripcion.service';
import { FormControl } from '@angular/forms';
import { debounceTime,distinctUntilChanged } from 'rxjs/operators';


import {SelectItem} from 'primeng/api';

@Component({
    //selector: 'ggg',
    templateUrl: './inscripcion.list.component.html',
        //styles: [`        `]
    

})
export class InscripcionList   implements OnInit{ 
    inscripciones : Inscripcion[];
    sortOptions:SelectItem[];
    totalLazyInscripcionesLength:number;
    public searchControl : FormControl;
    private debounce: number = 400;
    ascSort:boolean;//true= orden ascendente, false= orden descendente
    sortKey:string;
    first:number;
    rows:number;

    

    constructor(private inscService:InscripcionService){

    }

    ngOnInit(){
        this.ascSort=true;
        this.sortOptions = [
            {label: 'Apellido y nombre', value: 'apellidonombre'},
            {label: 'Nombre de Usuario', value: 'username'},
            {label: 'Identificador',value:'id'}
        ];

        this.inscService.getCantidadInscripciones("").toPromise().then(data=>{
            
            this.totalLazyInscripcionesLength = data;
            console.log("Total de registros: "+this.totalLazyInscripcionesLength);
        });          

        this.searchControl = new FormControl('');
        this.searchControl.valueChanges
        .pipe(debounceTime(this.debounce), distinctUntilChanged())
        .subscribe(query=>{
            
            this.inscService.getInscripciones(this.searchControl.value,0,10,this.sortKey,(this.ascSort?'asc':'desc')).then(data=>{
                this.inscripciones = data;


            })
            this.inscService.getCantidadInscripciones(this.searchControl.value).toPromise().then(data=>{
                this.totalLazyInscripcionesLength = data;
            });   
        });
     
                 
    }

    loadData(event){
        console.log('SorKey: '+this.sortKey);
        this.first = event.first;
        this.rows = event.rows;
        this.inscService.getInscripciones("",event.first,event.rows,this.sortKey,(this.ascSort?'asc':'desc'))
            .then(data=>{
                this.inscripciones = data;
            });
    }
    
    selectPerfil(event){
        
    }

    onSortChange(event){
        console.log('Valor del campo seleccionado: '+event.value);
        
        this.inscService.getInscripciones(this.searchControl.value,this.first,this.rows,this.sortKey,(this.ascSort?'asc':'desc'))
            .then(data=>{
                this.inscripciones = data;
            });
    }


}
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
    filterOptions:SelectItem[];
    totalLazyInscripcionesLength:number;
    searchControl : FormControl;
    searchFechaControl : FormControl;
    searchDniControl : FormControl;
    private debounce: number = 400;
    ascSort:boolean;//true= orden ascendente, false= orden descendente
    sortKey:string;
    filterKey:string;
    first:number;
    rows:number;
    es:any;
    fechaFiltro:Date=new Date();

    

    constructor(private inscService:InscripcionService ){

    }

    ngOnInit(){
        this.es = {
            firstDayOfWeek: 0,
            dayNames: ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"],
            dayNamesShort: ["Dom", "Lun", "Mar", "Mie", "Jue", "Vie", "Sab"],
            dayNamesMin: ["Do","Lu","Ma","Mi","Ju","Vi","Sa"],
            monthNames: [ "Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre" ],
            monthNamesShort: [ "Ene", "Feb", "Mar", "Abr", "May", "Jun","Jul", "Ago", "Sep", "Oct", "Nov", "Dic" ],
            today: 'Hoy',
            clear: 'Limpiar',
            dateFormat: 'dd/mm/yy',
            weekHeader: 'Semana'
        };          
        this.ascSort=true;
        this.sortOptions = [
            {label: 'Apellido y nombre', value: 'apellidonombre'},
            {label: 'Identificador',value:'id'}
        ];

        this.filterOptions = [
            {label:'Apellido',value:'apellido'},
            {label:'Nombre',value:'nombre'},
            {label:'D.N.I',value:'dni'},
            {label:'Fecha Insc.',value:'fecha'}
        ];

        this.inscService.getCantidadInscripciones("","").toPromise().then(data=>{
            
            this.totalLazyInscripcionesLength = data;
            console.log("Total de registros: "+this.totalLazyInscripcionesLength);
        });          

        this.searchDniControl = new FormControl('');
        

        this.searchFechaControl = new FormControl('');
        
        this.searchFechaControl.valueChanges
        .pipe(debounceTime(this.debounce), distinctUntilChanged())
        .subscribe((query:any)=>{
            this.inscService.getInscripciones(this.filterKey
                    ,query.toJSON(),0,10
                    ,this.sortKey,(this.ascSort?'asc':'desc')).then(data=>{
                this.inscripciones = data;


            })
            this.inscService.getCantidadInscripciones(this.filterKey
                    ,query.toJSON()).toPromise().then(data=>{
                this.totalLazyInscripcionesLength = data;
            });  

        });

        this.searchControl = new FormControl('');
        this.searchControl.valueChanges
        .pipe(debounceTime(this.debounce), distinctUntilChanged())
        .subscribe(query=>{
            
            this.inscService.getInscripciones(this.filterKey
                    ,this.searchControl.value,0,10
                    ,this.sortKey,(this.ascSort?'asc':'desc')).then(data=>{
                this.inscripciones = data;


            })
            this.inscService.getCantidadInscripciones(this.filterKey
                    ,this.searchControl.value).toPromise().then(data=>{
                this.totalLazyInscripcionesLength = data;
            });   
        });


     
                 
    }

    loadData(event){
        console.log('SorKey: '+this.sortKey);
        this.first = event.first;
        this.rows = event.rows;
        this.inscService.getInscripciones("","",event.first,event.rows,this.sortKey,(this.ascSort?'asc':'desc'))
            .then(data=>{
                this.inscripciones = data;
            });
    }
    
    selectPerfil(event){
        console.log("FilterKey: "+this.filterKey);
    }

    onSortChange(event){
        
        
        this.inscService.getInscripciones(this.sortKey,this.searchControl.value,this.first,this.rows,this.sortKey,(this.ascSort?'asc':'desc'))
            .then(data=>{
                this.inscripciones = data;
            });
    }

    onFilterChange(event){
        console.log('Valor del campo seleccionado: '+event.value);
    }


}
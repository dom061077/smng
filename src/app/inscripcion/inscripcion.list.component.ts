import { Component,OnInit,ViewChild,ElementRef} from '@angular/core';
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
    @ViewChild('printInsc') printId: ElementRef;


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
    selfFilter:string;
    first:number;
    rows:number;
    es:any;
    fechaFiltro:Date=new Date();

    

    constructor(private inscService:InscripcionService ){

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
            {label:'Apellido y Nombre',value:'apellidoNombre'},
            {label:'D.N.I',value:'dni'},
            {label:'Fecha Insc.',value:'fecha'}
        ];

        this.inscService.getCantidadInscripciones("","").toPromise().then(data=>{
            
            this.totalLazyInscripcionesLength = data;
            console.log("Total de registros: "+this.totalLazyInscripcionesLength);
        });          

        this.searchDniControl = new FormControl('');
        this.searchDniControl.valueChanges
            .pipe(debounceTime(this.debounce),distinctUntilChanged())
            .subscribe((query:any)=>{
                this.filtrar(query);
            });

        this.searchFechaControl = new FormControl('');
        
        this.searchFechaControl.valueChanges
        .pipe(debounceTime(this.debounce), distinctUntilChanged())
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

    loadData(event){
        console.log('Evento loadData ');
        this.first = event.first;
        this.rows = event.rows;
        this.cargarListInsc(this.filterKey, this.selfFilter,event.first,event.rows,this.sortKey,(this.ascSort?'asc':'desc'));

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
        this.filtrar('');
        this.searchControl.setValue('');
        this.searchDniControl.setValue('');
        this.searchFechaControl.setValue('');
    }

    private print(){
        const linkSource = 'data:application/pdf;base64,' + 'JVBERi0xLjQKJeLjz9MKMyAwIG9iago8PC9Db2xvclNwYWNlL0';
        const downloadLink = document.createElement("a");
        const fileName = "sample.pdf";
        //console.log('Print Id:'+this.printId);
        this.printId.nativeElement.href = linkSource;
        this.printId.nativeElement.download = fileName;
        //this.printId.nativeElement.target='_blank';
        //this.printId.nativeElement.click();    
        
    }

    onPrintClick(){
        window.open('data:application/pdf;' 
            +'JVBERi0xLjQKJeLjz9MKMyAwIG9iago8PC9Db2xvclNwYWNlL0');            
        return false;
    }

    onExportXlsClick(){
        //this.cargarListInsc(this.filterKey, this.selfFilter
        //,event.first,event.rows,this.sortKey,(this.ascSort?'asc':'desc'));
        this.inscService.getXlsBase64(
            this.filterKey,this.selfFilter,this.sortKey
            ,(this.ascSort?'asc':'desc')
        ).subscribe(data=>{
            window.open('data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,' 
                +data
             );

        })
        return false;
    }


    private cargarListInsc(filterField:string, filter:string,start:number,limit:number,sortField:string,ascDesc:string){
        this.inscService.getInscripciones(filterField,filter,start,limit
                ,this.sortKey,(this.ascSort?'asc':'desc'))
            .then(data=>{
                this.inscripciones = data;
                this.inscService.getReporteBase64(filterField
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

}
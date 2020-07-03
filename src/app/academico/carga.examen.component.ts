import { Component,OnInit,ViewChild,ElementRef} from '@angular/core';
import { CargaExamen } from './carga.examen.model';
import { AcademicoService } from './academico.service';
import { FormControl } from '@angular/forms';
import { debounceTime,distinctUntilChanged } from 'rxjs/operators';




import {SelectItem} from 'primeng/api';

@Component({
    //selector: 'ggg',
    templateUrl: './carga.examen.component.html',
        //styles: [`        `]
    
 
})
export class CargaExamenList   implements OnInit{ 
    @ViewChild('printInsc') printId: ElementRef;


    examenes:CargaExamen[];//inscripciones : Inscripcion[];
    sortOptions:SelectItem[];
    filterOptions:SelectItem[];
    totalLazyExamenesLength:number;
    searchControl : FormControl;
    searchFechaControl : FormControl;
    searchDniControl : FormControl;
    
    private debounce: number = 400;
    ascSort:boolean;//true= orden ascendente, false= orden descendente
    sortKey:string;
    filterKey:number;
    selfFilter:string;
    first:number;
    rows:number;
    es:any;
    fechaFiltro:Date=new Date();
    searchPeriodo:number;
    

    constructor(private acadService:AcademicoService ){

    }

    private filtrar(query){
            let qJson;
            if (query && query instanceof Object)
                qJson=query.toJSON();
            else
                qJson=query.split('.').join('').split('_').join('');
            this.selfFilter=qJson //sirve para lazyLoad de la grilla
            this.cargarListExamenes(this.filterKey,'',0,10);    

            /*this.acadService.getCantidadExamenes(query).toPromise().then(data=>{
                this.totalLazyExamenesLength = data;
            });  */

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

        this.acadService.getAsignaturasCurrentUser().subscribe(data=>{
            this.filterOptions = data.asignaturas;
        });

        /*this.filterOptions = [
            {label:'Apellido y Nombre',value:'apellidoNombre'},
            {label:'D.N.I',value:'dni'},
            {label:'Fecha Insc.',value:'fecha'},
            {label:'Periodo',value:'periodoLectivo'}
        ];*/

        this.acadService.getCantidadExamenesAsig(this.filterKey,'').toPromise().then(data=>{
            console.log("Cantidad de filas: "+data.count);
            this.totalLazyExamenesLength = data.count;
            
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
        this.cargarListExamenes(this.filterKey,'',event.first,event.rows);


    }
    /*
    selectPerfil(event){
        console.log("FilterKey: "+this.filterKey);
    }

    onSortChange(event){
        
        
        this.inscService.getInscripciones(this.sortKey,this.searchControl.value,this.first,this.rows,this.sortKey,(this.ascSort?'asc':'desc'))
            .then(data=>{
                this.inscripciones = data;
            });
    }*/

    onFilterChange(event){
        this.filtrar('');
        //this.searchControl.setValue('');
        //this.searchDniControl.setValue('');
        //this.searchFechaControl.setValue('');
    }

    /*
    onPrintClick(){
        this.inscService.getReporteBase64(this.filterKey
            ,this.selfFilter,this.sortKey,(this.ascSort?'asc':'desc'))
        .subscribe(data=>{
            const linkSource = 'data:application/pdf;base64,' +data;
            window.open(linkSource);
            //const downloadLink = document.createElement("a");
            //const fileName = "sample.pdf";
            //this.printId.nativeElement.href = linkSource;
            //this.printId.nativeElement.download = fileName;
        });   
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

    onPeriodoChange(event){totalLazyExamenesLength
        this.filtrar(this.searchPeriodo+'');
    }
    */


    private cargarListExamenes(asigId:number,filter:string
        ,start:number,limit:number){
        this.acadService.getExamenesAsig(asigId,filter,start,limit)
            .subscribe(data=>{
                this.examenes = data.examenes;

            });
        
    }

}
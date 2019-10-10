import { Component,OnInit } from '@angular/core';
import { Alumno  } from './alumno.interface';
import { AlumnoService } from './alumno.service';


@Component({
    //selector: 'ggg',
    templateUrl: './alumno.list.component.html',
    styles: [`
        .car-item .ui-md-3 {
            text-align: center;
        }
        
        .car-item .ui-g-10 {
            font-weight: bold;
        }

        .empty-car-item-index {
            background-color: #f1f1f1;
            width: 60px;
            height: 60px;
            margin: 36px auto 0 auto;
            animation: pulse 1s infinite ease-in-out;
        }

        .empty-car-item-image {
            background-color: #f1f1f1;
            width: 120px;
            height: 120px;
            animation: pulse 1s infinite ease-in-out;
        }

        .empty-car-item-text {
            background-color: #f1f1f1;
            height: 18px;
            animation: pulse 1s infinite ease-in-out;
        }

        .title-container {
            padding: 1em;
            text-align: right;
        }

        .sort-container {
            text-align: left;
        }

        @media (max-width: 40em) {
            .car-item {
                text-align: center;
            }
        }
    `]
    

})
export class AlumnoList implements OnInit{ 
    alumnos: Alumno[];
    totalLazyAlumnoLength:number;

    constructor(private alumnoService:AlumnoService){
        this.totalLazyAlumnoLength=3;
    }


    ngOnInit(){
        this.alumnoService.getCantidad().toPromise().then(data=>{
            console.log("Cantidad de alumnos");
            this.totalLazyAlumnoLength = data;
        });
        /*this.alumnoService.getAlumnos('',0
                ,20).then(data=>
            {   this.alumnos=data;
                console.log("Probando");
                console.log("Alumnos:  "+this.alumnos.length);


            });*/
        
    }

    loadData(event) {
        //event.first = First row offset
        //event.rows = Number of rows per page
        //this.lazyCars = load new chunk between first index and (first + rows) last index
        this.alumnoService.getAlumnos('',event.first,event.rows).then(data=>
            {   this.alumnos=data;
                console.log("Probando");
                console.log("Alumnos:  "+this.alumnos.length);


            });        
        console.log('Evento: first: '+event.first+' numero de filas: '+event.rows);
    }    

}
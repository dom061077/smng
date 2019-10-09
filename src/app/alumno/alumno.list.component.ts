import { Component,OnInit } from '@angular/core';
import { Alumno  } from './alumno.interface';
import { AlumnoService } from './alumno.service';


@Component({
    //selector: 'ggg',
    templateUrl: './alumno.list.component.html'

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
        this.alumnoService.getAlumnos('').then(data=>
            {   this.alumnos=data;
                console.log("Probando");
                console.log("Alumnos:  "+this.alumnos.length);


            });
        
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
import { Component,OnInit } from '@angular/core';
import { Alumno  } from './alumno.interface';
import { AlumnoService } from './alumno.service';


@Component({
    //selector: 'ggg',
    templateUrl: './alumno.list.component.html'

})
export class AlumnoList implements OnInit{ 
    alumnos: Alumno[];

    constructor(private alumnoService:AlumnoService){

    }


    ngOnInit(){
        this.alumnoService.getAlumnos('').then(data=>
            {   this.alumnos=data;
                console.log("Alumnos:  "+this.alumnos.length);


            });
        
    }

}
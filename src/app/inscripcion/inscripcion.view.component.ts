import {Component,OnInit} from '@angular/core';
import {Inscripcion} from './inscripcion.model';
import {InscripcionService} from './inscripcion.service';
import {Router,ActivatedRoute} from '@angular/router';

@Component({
    templateUrl: './inscripcion.view.component.html'
})

export class InscripcionView implements OnInit {
    insc:any;

    constructor(private inscService:InscripcionService,private router:Router
        ,activatedRoute:ActivatedRoute){

    }

    ngOnInit(){
        this.inscService.getInscripcion(1).subscribe(data=>{
            this.insc = data;

        });
    }
}
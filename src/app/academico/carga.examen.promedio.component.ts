import { Component,OnInit,ViewChild,ElementRef} from '@angular/core';
import {Validators,ValidationErrors,ValidatorFn,AbstractControl,FormControl,FormGroup,FormBuilder} from '@angular/forms';
import {MessageService} from 'primeng/api';
import {AcademicoService} from './academico.service';
import {Router,ActivatedRoute} from "@angular/router";
import {Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
    templateUrl:'./carga.examen.promedio.component.html'
})
export class CargaExamenPromedio implements OnInit{
    examenesForm:FormGroup;
    examenes:any;//Observable <Array<any>>;
    constructor(private fb:FormBuilder,private acadService:AcademicoService
        ,private messageService:MessageService,private router:Router
        ,private activateRoute:ActivatedRoute){

    }

    ngOnInit(){
        this.examenesForm = this.fb.group({});
        const asigId=this.activateRoute.snapshot.params["asigId"];
        const alumnoId=this.activateRoute.snapshot.params["alumnoId"]
        //this.examenes = this.acadService.getAlumnoExamenes(asigId,alumnoId)
        //        .pipe(map(data=>{ return data.examenes;}));
        this.acadService.getAlumnoExamenes(asigId,alumnoId)
            .subscribe(data=>{
                this.examenes=data.examenes;
                for(let exam of data.examenes){
                    
                    this.examenesForm.addControl('exam'+exam.id
                        ,new FormControl('',Validators.required));
                    //this.myForm.addControl('newControl', new FormControl('', Validators.required));
                }
            });

    }

    onSubmit(valuesForm){
        console.log("Valor fomrulario: "+valuesForm);
    }

}
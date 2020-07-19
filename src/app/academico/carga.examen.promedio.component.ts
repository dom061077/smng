import { Component,OnInit,ViewChild,ElementRef} from '@angular/core';
import {Validators,ValidationErrors,ValidatorFn,AbstractControl,FormControl,FormGroup,FormBuilder} from '@angular/forms';
import {MessageService} from 'primeng/api';
import {AcademicoService} from './academico.service';
import {Router,ActivatedRoute} from "@angular/router";
import {Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {CustomValidators} from '../util/custom-validators';



@Component({
    templateUrl:'./carga.examen.promedio.component.html'
})
export class CargaExamenPromedio implements OnInit{
     promRegex:RegExp =/^\s*(?=.*[1-9])\d*(?:\.\d{1,2})?\s*$/;
    ccRegex= new RegExp ('/[0-9]{4}-[0-9]{4}-[0-9]{4}-[0-9]{4}$/'); 
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
                        ,new FormControl(exam.puntuacion,[Validators.required],
                            [(control: AbstractControl): Observable<ValidationErrors | null> => 
                            
                                    CustomValidators.validatePromedio(control)]  )      
                             );
                    //this.myForm.addControl('newControl', new FormControl('', Validators.required));
                }
            });

    }

    onSubmit(valuesForm){
        console.log("Valor fomrulario: "+valuesForm);
        this.acadService.savePromedios(valuesForm).subscribe(data=>{
            if(data.success){
              this.messageService.add({severity:'info',summary:'Mensaje',detail:'Los datos fueron registrados correctamente'});
              this.router.navigateByUrl("/cargaexamen");                
            }
        });
    }

}
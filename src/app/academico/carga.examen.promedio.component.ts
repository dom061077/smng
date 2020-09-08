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
    Object = Object;
    //examenes:any;//Observable <Array<any>>;
    periodosEval:any={
        periodos:[],
        keyFormControls:[],
        labelArray:[]
    };
    alumno:any;
    asignatura:any={};
    labelArray=[];
    examKeys=[];
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
                console.log('Retornarno examenes');
                //this.examenes=data.examenes;
                this.periodosEval.periodos=data.periodos;
                this.periodosEval.keyFormControls=[];
                this.periodosEval.labelArray=[];
                this.alumno = data.alumno;
                this.asignatura = data.asignatura;
                
                console.log("antes del error "+this.periodosEval[0]);
                for(let per of this.periodosEval.periodos){ 
                    var i=0,examId=0,tipoExamen='';
                    for(let exam of per.examenes){
                        this.examenesForm.addControl(i+'_exam_'+exam.id+'_'
                                +per.id+'_'+'exam'
                            ,new FormControl(exam.puntuacion,[Validators.required],
                                [(control: AbstractControl): Observable<ValidationErrors | null> => 
                                
                                        CustomValidators.validatePromedio(control)]  )      
                                );
                        this.periodosEval.keyFormControls.push(i+'_exam_'+exam.id+'_'
                                    +per.id+'_'+'exam'
                                );                                
                        
                        this.periodosEval.labelArray.push(per.descripcion+' '+exam.tipoExamen+':');


                        examId=exam.id;
                        i++;
                    }
                    examId=per.examenes[per.examenes.length-1].id;
                    tipoExamen=per.examenes[per.examenes.length-1].tipoExamen.descripcion
                    this.examenesForm.addControl(i+'_exam_'+examId+'_'
                            +per.id+'_'+'inas'
                        ,new FormControl(per.cantInasist,[Validators.required],
                            [(control: AbstractControl): Observable<ValidationErrors | null> => 
                            
                                    CustomValidators.validatePromedio(control)]  )      
                            );
                    this.periodosEval.keyFormControls.push(i+'_exam_'+examId+'_'
                                +per.id+'_'+'inas'
                            );                                
                    
                    this.periodosEval.labelArray.push(per.descripcion+' '+tipoExamen+':');
                

                    /*this.examenesForm.addControl((i-1)+'_exam_'+exam.id+'_'
                                +per.id+'_'+'inas'
                        ,new FormControl(this.examenes[i-1].inasistencia,[Validators.required],
                            [(control: AbstractControl): Observable<ValidationErrors | null> => 
                            
                                    CustomValidators.validatePromedio(control)]  )      
                            );   
                    this.labelArray.push(exam.periodoEval+' Inasistencia:' );   
                    this.examKeys=Object.keys(this.examenesForm.controls);
                    */
                }

            });
            console.log('Periodos: '+this.periodosEval.periodos);
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
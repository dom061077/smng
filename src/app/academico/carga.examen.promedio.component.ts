import { Component,OnInit,ViewChild,ElementRef} from '@angular/core';
import {Validators,ValidationErrors,ValidatorFn,AbstractControl,FormControl,FormGroup,FormBuilder} from '@angular/forms';
import {MessageService} from 'primeng/api';
import {AcademicoService} from './academico.service';
import {Router,ActivatedRoute} from "@angular/router";
import {Observable, BehaviorSubject } from 'rxjs';
import { map,debounceTime,distinctUntilChanged } from 'rxjs/operators';
import {CustomValidators} from '../util/custom-validators';



@Component({
    templateUrl:'./carga.examen.promedio.component.html'
})
export class CargaExamenPromedio implements OnInit{
     promRegex:RegExp =/^\s*(?=.*[1-9])\d*(?:\.\d{1,2})?\s*$/;
    ccRegex= new RegExp ('/[0-9]{4}-[0-9]{4}-[0-9]{4}-[0-9]{4}$/'); 
    examenesForm:FormGroup;
    Object = Object;
    private debounce: number = 500;
    //examenes:any;//Observable <Array<any>>;
    periodosEval:BehaviorSubject<any> = new BehaviorSubject({
           periodos:[] ,
           keyFormControls:[],
           labelArray:[]
           
    });
    alumno:BehaviorSubject<any> = new BehaviorSubject({});
    asignatura:BehaviorSubject<any> = new BehaviorSubject({});
    periodoLectivo:BehaviorSubject<any> = new BehaviorSubject(0);
    cursoDivision:BehaviorSubject<any> = new BehaviorSubject('');
    $promedios:BehaviorSubject<any> = new BehaviorSubject([5,4]);

    

    constructor(private fb:FormBuilder,private acadService:AcademicoService
        ,private messageService:MessageService,private router:Router
        ,private activateRoute:ActivatedRoute){

    }

    private addExamValueChanges(control,examId:number,perIndex:number){
        control.valueChanges.pipe(debounceTime(this.debounce), distinctUntilChanged())
            .subscribe(query=>{
               this.acadService.saveExamen(examId,query).subscribe(data=>{
                    console.log('Salida de saveExamen: '+data);
                    var promedios = this.$promedios.value;
                    promedios[perIndex]=data.promedio;
                    this.$promedios.next(promedios);
               });
               
               
               
            });
        
        
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
                let periodos=data.periodos;
                let keyFormControls;
                let labelArray;
                this.alumno.next(data.alumno);
                this.asignatura.next(data.asignatura);
                this.periodoLectivo.next(data.periodoLectivo);
                this.cursoDivision.next(data.cursoDivision);
                let promedio ;
                
                console.log("antes del error "+this.periodosEval[0]);
                var perIndex=0;
                promedio = [];
                for(let per of periodos){ 
                    var i=0,examId=0,tipoExamen='';
                    keyFormControls=[];
                    labelArray=[];
                    let control ;
                    
                    for(let exam of per.examenes){
                        control = new FormControl(exam.puntuacion,[Validators.required],
                                [(control: AbstractControl): Observable<ValidationErrors | null> => 
                                  CustomValidators.validatePromedio(control)]);

                        this.examenesForm.addControl(i+'_exam_'+exam.id+'_'
                                +per.id+'_'+'exam'
                            ,control);
                        this.addExamValueChanges(control,exam.id,perIndex);    
                        keyFormControls.push(i+'_exam_'+exam.id+'_'
                                    +per.id+'_'+'exam'
                                );                                
                        
                        labelArray.push(exam.descripcion+':');


                        examId=exam.id;
                        i++;
                    }
                    
                    examId=per.examenes[per.examenes.length-1].id;
                    tipoExamen=per.examenes[per.examenes.length-1].descripcion
                    this.examenesForm.addControl(i+'_exam_'+examId+'_'
                            +per.id+'_'+'inas'
                        ,new FormControl(per.cantInasist,[Validators.required])      
                            );
                    keyFormControls.push(i+'_exam_'+examId+'_'
                                +per.id+'_'+'inas'
                            );                                
                    
                    labelArray.push(' Inasistencias:');
                    per.keyFormControls = keyFormControls;
                    per.labelArray=labelArray;
                    //per.promedio= new BehaviorSubject(per.promedio)


                    /*this.examenesForm.addControl((i-1)+'_exam_'+exam.id+'_'
                                +per.id+'_'+'inas'
                        ,new FormControl(this.examenes[i-1].inasistencia,[Validators.required],
                            [(control: AbstractControl): Observable<ValidationErrors | null> => 
                            
                                    CustomValidators.validatePromedio(control)]  )      
                            );   
                    this.labelArray.push(exam.periodoEval+' Inasistencia:' );   
                    this.examKeys=Object.keys(this.examenesForm.controls);
                    */
                    promedio.push(per.promedio);
                    perIndex++;
                }
                this.$promedios.next(promedio);
                this.periodosEval.next({periodos:periodos
                    ,keyFormControls:keyFormControls,labelArray:labelArray
                    });

            });
            //console.log('Periodos: '+this.periodosEval.periodos);
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
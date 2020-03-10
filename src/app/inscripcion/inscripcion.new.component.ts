import { Component, OnInit, ViewChild } from '@angular/core';
import {Validators,ValidationErrors,ValidatorFn,AbstractControl,FormControl,FormGroup,FormBuilder} from '@angular/forms';
import {MessageService} from 'primeng/api';
import {Router,ActivatedRoute} from "@angular/router";
import {CustomValidators} from '../util/custom-validators';
import { CrudCodes } from "../util/crud.enum";
import { DatePipe } from '@angular/common';
import { debounceTime,distinctUntilChanged } from 'rxjs/operators';
import { AlumnoService } from '../alumno/alumno.service';
import { InscripcionService } from './inscripcion.service';
import { ThrowStmt } from '@angular/compiler';
import { Observable } from 'rxjs';
    
@Component({
  //selector: 'alumno-page',
  templateUrl: './inscripcion.new.component.html'
})
export class InscripcionNew implements OnInit {
    inscripcionForm : FormGroup;
    private debounce: number = 400;
    headerTitle:string;
    filteredPeriodos:any[];
    filteredTurnos:any[];
    filteredCursos:any[];
    filteredDivisiones:any[];

    private apellido:string;
    private nombre:string;


    constructor(private fb:FormBuilder
        , private messageService:MessageService,private router:Router
        , private activeRoute:ActivatedRoute
        , private datepipe:DatePipe, private alumnoService:AlumnoService
        , private inscripcionService: InscripcionService){

    }

    ngOnInit(){
      this.inscripcionForm = this.fb.group({
        id:[null,[]],
        dni:['',[Validators.required],
                [(control: AbstractControl): Observable<ValidationErrors | null> => 
                
                        CustomValidators.validateDniAlumno$(control,this.alumnoService)]        
        ],
        periodoLectivo:['',[Validators.required]],
        turno:['',[Validators.required]],
        curso:['',[Validators.required]],
        division:['',[Validators.required]]


      });

      this.inscripcionForm.get('dni').valueChanges
      .pipe(debounceTime(this.debounce), distinctUntilChanged())
      .subscribe(query=>{
          this.alumnoService.getAlumnoByDni(query).toPromise().then(data=>{
              console.log("Data getalumnobydni "+data) ;
              if(data){
                  this.apellido = data.apellido;
                  this.nombre = data.nombre;
              }else{
                this.apellido='';
                this.nombre='';
              }
          });
      });


      this.headerTitle='Alta de Inscripción';

    }

    filterPeriodos(event){
        this.inscripcionService.getPeriodos().subscribe(data=>{
            console.log("Periodos devueltos: "+data);
            this.filteredPeriodos = data;
        });
    }

    filterTurnos(event){
        this.inscripcionService.getTurnos().subscribe(data=>{
            this.filteredTurnos = data;
        });
    }

    filterCursos(event){
        this.inscripcionService.getCursos(this.inscripcionForm.get("turno").value.id).subscribe(data=>{     
            this.filteredCursos = data;
        });
    }

    filterDivisiones(event){
        this.inscripcionService.getDivisiones(this.inscripcionForm.get("curso").value.id,this.inscripcionForm.get("turno").value.id).subscribe(data=>{
            this.filteredDivisiones = data;
        });
    }
}
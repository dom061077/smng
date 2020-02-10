import { Component, OnInit, ViewChild } from '@angular/core';
import {Validators,ValidationErrors,ValidatorFn,AbstractControl,FormControl,FormGroup,FormBuilder} from '@angular/forms';
import {MessageService} from 'primeng/api';
import {Router,ActivatedRoute} from "@angular/router";
import {CustomValidators} from '../util/custom-validators';
import { CrudCodes } from "../util/crud.enum";
import { DatePipe } from '@angular/common';
import { debounceTime,distinctUntilChanged } from 'rxjs/operators';
import { AlumnoService } from '../alumno/alumno.service';

@Component({
  //selector: 'alumno-page',
  templateUrl: './inscripcion.new.component.html'
})
export class InscripcionNew implements OnInit {
    inscripcionForm : FormGroup;
    private debounce: number = 400;
    headerTitle:string;
    public dniCtrl:FormControl;

    constructor(private fb:FormBuilder
        , private messageService:MessageService,private router:Router
        , private activeRoute:ActivatedRoute
        , private datepipe:DatePipe, private alumnoService:AlumnoService){

    }

    ngOnInit(){
      this.dniCtrl = new FormControl('');
      this.dniCtrl.valueChanges
      .pipe(debounceTime(this.debounce), distinctUntilChanged())
      .subscribe(query=>{
          this.alumnoService.getAlumnoByDni(query).then(data=>{
              console.log("Data getalumnobydni"+data) ;
          });
      });

      this.inscripcionForm = this.fb.group({
        id:[null,[]],
        dni:['',[]]

      },{validator:CustomValidators.validateDniAlumno});
      this.headerTitle='Alta de Inscripción';
    }
}
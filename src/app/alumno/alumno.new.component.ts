import { Component, OnInit } from '@angular/core';
import {Validators,ValidationErrors,ValidatorFn,AbstractControl,FormControl,FormGroup,FormBuilder} from '@angular/forms';
import {MessageService} from 'primeng/api';
import { AlumnoService  } from './alumno.service';


@Component({
  selector: 'alumno-page',
  templateUrl: './alumno.new.component.html'
  //styleUrls: ['./alumno.component.css']
})
export class AlumnoNew implements OnInit {
  alumnoForm : FormGroup;
  filteredProvinces:any[]  ;
  
  constructor(private fb:FormBuilder, private alumnoService:AlumnoService) {}

  ngOnInit(){
    this.alumnoForm = this.fb.group({
        dni:['',[Validators.required]],
        apellido:['',[Validators.required]],
        nombre: ['',[Validators.required]],
        provincia: ['',[Validators.required]]

    });

  }

  onSubmit(valuesForm){
    console.log('Formulario: '+valuesForm);

  }

  filterProvince(event){
     this.alumnoService.getProvincias(event.query).subscribe(data=>{
        this.filteredProvinces = data;
     });
  }  

  filterLocalidad(event){
    
  }

}
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
  filteredLocalidades:any[];
  cc: string; 
  //KeyFilter.DEFAULT_MASKS['currencyRegex'] =  /^-?(?:0|[1-9]\d{0,2}(?:,?\d{3})*)(?:\.\d+)?$/;
  noSpecial: RegExp = /^[^<>1234567890!"#%&/$()=?¡[._*{}!]+$/;
  
  constructor(private fb:FormBuilder, private alumnoService:AlumnoService) {}

  ngOnInit(){
    this.alumnoForm = this.fb.group({
        dni:['',[Validators.required]],
        apellido:['',[Validators.required]],
        nombre: ['',[Validators.required]],
        provincia: ['',[Validators.required]],
        localidad:['',[Validators.required]],
        direccion:['',[Validators.required]],
        cuil: ['',[Validators.required]],
        dniTutor: ['',[Validators.required]],
        apellidoTutor: ['',[Validators.required]],
        nombreTutor: ['',[Validators.required]],
        cuilTutor: ['',[Validators.required]],
        parentescoTutor: ['',[Validators.required]]

    },{validator:this.provinceEntryRequired}
    );
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
    console.log('Provincia id: '+this.alumnoForm.get('provincia').value.id);
    console.log('Provincia nombre: '+this.alumnoForm.get('provincia').value.nombre);
    this.alumnoService.getLocalidades(this.alumnoForm.get('provincia').value.id
        ,event.query).subscribe(data=>{
            this.filteredLocalidades = data;
        });
  }

  provinceEntryRequired(control:AbstractControl){
      if(!control.get('provincia').value.id){
        control.get('provincia').setErrors({NoProvince:true});
      }
  }

  

}
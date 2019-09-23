import { Component, OnInit } from '@angular/core';
import {Validators,ValidationErrors,ValidatorFn,AbstractControl,FormControl,FormGroup,FormBuilder} from '@angular/forms';
import {MessageService} from 'primeng/api';
import {MenuItem} from 'primeng/api';


@Component({
  selector: 'alumno-page',
  templateUrl: './alumno.new.component.html'//,
  //styleUrls: ['./alumno.component.css']
})
export class AlumnoNew implements OnInit {
  alumnoForm : FormGroup;
  items: MenuItem[];
  
  constructor(private fb:FormBuilder) {}

  ngOnInit(){
    this.alumnoForm = this.fb.group({
        dni:['',[Validators.required]],
        apellido:['',[Validators.required]],
        nombre: ['',[Validators.required]]

    });
    this.items = [
      {label: 'Step 1'},
      {label: 'Step 2'},
      {label: 'Step 3'}
    ];    

  }

  

}
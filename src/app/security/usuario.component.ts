import { Component, OnInit } from '@angular/core';
import {Validators,ValidationErrors,ValidatorFn,AbstractControl,FormControl,FormGroup,FormBuilder} from '@angular/forms';
import {MessageService} from 'primeng/api';
import {Router,ActivatedRoute} from "@angular/router";
import { CrudCodes } from "../util/crud.enum";
import { DatePipe } from '@angular/common';

@Component({
    selector:'usuario-page',
    templateUrl:'./usuario.component.html'
})
export class UsuarioNew implements OnInit{
    usuarioForm : FormGroup;
    headerTitle:string;

    constructor(private fb:FormBuilder){

    }
    ngOnInit(){
        this.headerTitle='Alta de Usuario';
        this.usuarioForm = this.fb.group({
            id:[null,[]],
            userName:['',[Validators.required]],
            password:['',[Validators.required]],
            apellido:['',[Validators.required]],
            nombre:['',[Validators.required]]
        });
    }

    
}
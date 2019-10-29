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
export class Usuario implements OnInit{
    usuarioForm : FormGroup;
    header
    ngOnInit(){


    }

    constructor(private fb:FormBuilder){
        this.usuarioForm = this.fb.group({

        });
    }

    
}
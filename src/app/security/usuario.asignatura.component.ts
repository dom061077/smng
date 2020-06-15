import { Component, OnInit } from '@angular/core';
import {Validators,ValidationErrors,ValidatorFn,AbstractControl,FormControl,FormGroup,FormBuilder} from '@angular/forms';
import {MessageService} from 'primeng/api';
import {Router,ActivatedRoute} from "@angular/router";
import { AuthenticationService } from './authentication.service';

@Component({
    selector:'',
    templateUrl:'./usuario.asignatura.component.html'
})

export class UsuarioAsignatura implements OnInit{

    constructor(private fb:FormBuilder,authService:AuthenticationService
        ,private messageService:MessageService,private router:Router
        ,private activeRoute: ActivatedRoute){

    }

    ngOnInit(){

    }
}
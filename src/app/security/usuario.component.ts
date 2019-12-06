import { Component, OnInit } from '@angular/core';
import {Validators,ValidationErrors,ValidatorFn,AbstractControl,FormControl,FormGroup,FormBuilder} from '@angular/forms';
import {MessageService} from 'primeng/api';
import {Router,ActivatedRoute} from "@angular/router";
import { CrudCodes } from "../util/crud.enum";
import { DatePipe } from '@angular/common';
import { AuthenticationService } from './authentication.service';

@Component({
    selector:'usuario-page',
    templateUrl:'./usuario.component.html'
})
export class UsuarioNew implements OnInit{
    usuarioForm : FormGroup;
    headerTitle:string;
    isPassword:boolean;
    typeInputPassword:string;
    constructor(private fb:FormBuilder,private authService:AuthenticationService
        ,private messageService:MessageService,private router:Router
        ,private activeRoute:ActivatedRoute){
        this.typeInputPassword='password';
        this.isPassword=true;
    }
    ngOnInit(){
        this.headerTitle='Alta de Usuario';

        this.showPassword();
        this.usuarioForm = this.fb.group({
            id:[null,[]],
            userName:['',[Validators.required]],
            password:['',[Validators.required]],
            apellido:['',[Validators.required]],
            nombre:['',[Validators.required]]
        });
        console.log("Mode: "+this.activeRoute.snapshot.params);

        if(this.activeRoute.snapshot.params["mode"]==CrudCodes.EDIT){
            this.assignFormValues(this.activeRoute.snapshot.params["id"]);
            this.headerTitle="Modificación de Usuario"

        }
    }

    assignFormValues(id:number){
        this.authService.getUser(id).then(data=>{
            this.usuarioForm.patchValue(data);
        });
    }

    showPassword(){

        this.isPassword = false;

    }

    hidePassword(){

        this.isPassword = true;

    }

    togglePassword(){
        console.log('Toggle password: '+this.isPassword);
        
        if (this.isPassword)
            this.typeInputPassword='password';
        else
            this.typeInputPassword='input';    
        this.isPassword = !this.isPassword;    
    }

    onSubmit(valuesForm){
        if(this.activeRoute.snapshot.params["mode"]==CrudCodes.EDIT){
            
        }else{
            
        }
    }
    
}
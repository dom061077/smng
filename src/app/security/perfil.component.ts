import {Component,OnInit} from '@angular/core';
import {Validators,ValidationErrors,ValidatorFn,AbstractControl,FormControl,FormGroup,FormBuilder} from '@angular/forms';
import {MessageService} from 'primeng/api';
import {Router,ActivatedRoute} from "@angular/router";
import { CrudCodes } from "../util/crud.enum";
import { AuthenticationService } from './authentication.service';


@Component({
    selector:'perfil-page',
    templateUrl:'./perfil.component.html'
})

export class PerfilNew implements OnInit{
    headerTitle:string;
    perfilForm:FormGroup;
    noSpecial: RegExp = /^[^<>1234567890!"#%&/$()=?¡[._*{}!]+$/;
    constructor(private fb:FormBuilder,private authService:AuthenticationService
        ,private messageService:MessageService,private router:Router
        ,private activeRoute:ActivatedRoute){
        //this.typeInputPassword='password';
        //this.isPassword=true;
    }

    ngOnInit(){
       this.headerTitle='Alta de Perfil';     
       this.perfilForm = this.fb.group({
           id:[null,[]],
           descripcion:['',[Validators.required]]
       });
       if(this.activeRoute.snapshot.params["mode"]==CrudCodes.EDIT){
            this.assignFormValues(this.activeRoute.snapshot.params["id"]);
            this.headerTitle='Modificación de Perfil';
       }
    }

    assignFormValues(id:number){

    }

    onSubmit(valuesForm){

    }

}
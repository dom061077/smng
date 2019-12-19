import { Component, OnInit } from '@angular/core';
import {Validators,ValidationErrors,ValidatorFn,AbstractControl,FormControl,FormGroup,FormBuilder} from '@angular/forms';
import {MessageService} from 'primeng/api';
import {Router,ActivatedRoute} from "@angular/router";
import { CrudCodes } from "../util/crud.enum";
import { DatePipe } from '@angular/common';
import { AuthenticationService } from './authentication.service';
import { Perfil } from './perfil.model';

@Component({
    selector:'usuario-page',
    templateUrl:'./usuario.component.html'
})
export class UsuarioNew implements OnInit{
    usuarioForm : FormGroup;
    perfiles : Perfil[];
    perfilesAdded : Perfil[];
    headerTitle:string;
    isPassword:boolean;
    typeInputPassword:string;
    mode:any;
    constructor(private fb:FormBuilder,private authService:AuthenticationService
        ,private messageService:MessageService,private router:Router
        ,private activeRoute:ActivatedRoute){
        this.typeInputPassword='password';
        this.isPassword=true;
        this.perfilesAdded = [];
    }
    ngOnInit(){
        this.headerTitle='Alta de Usuario';
        console.log("Mode: "+this.activeRoute.snapshot.params);
        this.mode=this.activeRoute.snapshot.params["mode"];

        this.showPassword();
        if(this.mode==CrudCodes.EDIT){
            this.usuarioForm = this.fb.group({
                id:[null,[]],
                username:['',[Validators.required]],
                apellido:['',[(Validators.required)]],
                nombre:['',[Validators.required]],
                perfiles:[null,[Validators.required]]
            });

        }else{
            this.usuarioForm = this.fb.group({
                id:[null,[]],
                username:['',[Validators.required]],
                password:['',[Validators.required]],
                apellido:['',[(Validators.required)]],
                nombre:['',[Validators.required]],
                perfiles:['',[Validators.required]]
            });
        }
        if(this.activeRoute.snapshot.params["mode"]==CrudCodes.EDIT){
            
            this.headerTitle="Modificación de Usuario"

        }
        this.assignFormValues(this.activeRoute.snapshot.params["id"]);
    }

    assignFormValues(id:number){
        this.authService.getUser(id).then(data=>{
            this.usuarioForm.patchValue(data);
        });
        this.authService.getPerfilesByUser(id).then(data=>{
            this.perfilesAdded = data;
            this.usuarioForm.get('perfiles').setValue(data);
            this.getPerfiles();
        });
        
    }


    getPerfiles(){
        this.authService.getAllPerfiles().then(data=>{
            this.perfiles = data.filter(url=>{
                var found = false;
                for(var i=0;i < this.perfilesAdded.length;i++){
                    if(this.perfilesAdded[i].id==url.id)
                        return found;
                }
                return !found;                
            });

        });
    }

    OnMoveTarget(event){
        this.usuarioForm.get('perfiles').setValue(this.perfilesAdded);

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
        return false; 
    }

    onSubmit(valuesForm){
        if(this.activeRoute.snapshot.params["mode"]==CrudCodes.EDIT){
            this.authService.updateUsuario(valuesForm).subscribe(data=>{
                if(data){
                    this.messageService.add({severity:'info',summary:'Mensaje'
                        ,detail:'Los datos fueron registrados correctamente'});
                    this.router.navigateByUrl("/userlist");
                }else{
                    this.messageService.add({severity:"error",summary:'Error'
                        ,detail:'Error al registrar la información'});
                }
            });
        }else{
            this.authService.saveUsuario(valuesForm).subscribe(data=>{
                if(data){
                    this.messageService.add({severity:'info',summary:'Mensaje'
                            ,detail:'Los datos fueron registrados correctamente'});
                    this.router.navigateByUrl("/userlist");
                }else{
                    this.messageService.add({severity:'error',summary:'Error'
                            ,detail:'Error al registrar la información'});
                }
            });            
        }
    }
    
}
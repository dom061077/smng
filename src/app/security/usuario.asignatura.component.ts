import { Component, OnInit } from '@angular/core';
import {Validators,ValidationErrors,ValidatorFn,AbstractControl,FormControl,FormGroup,FormBuilder} from '@angular/forms';
import {MessageService} from 'primeng/api';
import {Router,ActivatedRoute} from "@angular/router";
import { AuthenticationService } from './authentication.service';
import {Asignatura} from './asignatura.model';

@Component({
    selector:'',
    templateUrl:'./usuario.asignatura.component.html'
})

export class UsuarioAsignatura implements OnInit{
    headerTitle:string;
    usuarioAsigForm:FormGroup;
    asignaturas: Asignatura[];
    asignaturasAdded : Asignatura[];
    constructor(private fb:FormBuilder,private authService:AuthenticationService
        ,private messageService:MessageService,private router:Router
        ,private activeRoute: ActivatedRoute){
        this.asignaturas=[];
        this.asignaturasAdded=[];
        
    }

    getAsignaturas(){
        this.authService.getAllAsignaturas().then(data=>{
            this.asignaturas = data.filter(asig=>{
                var found=false;
                for(var i=0;i<this.asignaturasAdded.length;i++){
                    if(this.asignaturasAdded[i].id==asig.id)
                        return found;
                }
                return !found;
            });
        });
    }

    ngOnInit(){
        this.headerTitle='Asignación de materias';
        console.log("Id de usuario: "+this.activeRoute.snapshot.params["id"]);
        this.usuarioAsigForm = this.fb.group({
            id:['',[]],
            apellido:['',[]],
            nombre:['',[]],
            asignaturas:['',[Validators.required]]
        });
        this.authService.getUserAsignaturas(this.activeRoute
            .snapshot.params["id"]).subscribe(data=>{
                this.usuarioAsigForm.get('id').setValue(data.id);
                this.usuarioAsigForm.get('apellido').setValue(data.apellido);
                this.usuarioAsigForm.get('nombre').setValue(data.nombre);
                this.usuarioAsigForm.get('asignaturas').setValue(data.asignaturas);
                this.asignaturasAdded = data.asignaturas;
                
        });
        this.getAsignaturas()
    }

    OnMoveTarget(){
       this.usuarioAsigForm.get('asignaturas').setValue(this.asignaturasAdded); 
    }

    onSubmit(userFormAsig){
        console.log("userFormAsig: "+userFormAsig);
        this.authService.linkAsignaturaUsuarios(userFormAsig)
            .subscribe(data=>{
                if(data.success){
                    this.messageService.add({
                        severity:'info',summary:'Mensaje'
                        ,detail:'Los datos fueron registrados correctamente'
                    });
                    this.router.navigateByUrl("/userlist");
                }else{
                    this.messageService.add({
                        severity:'error',summary:'Error'
                        ,detail:'Error al registrar la información'                        
                    });
                }
            });
    }
}
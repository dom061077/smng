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
            this.asignaturas = data;
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
                console.log("Data getUserAsignaturas "+data);
        }).su;
        this.getAsignaturas()
    }

    OnMoveTarget(){
       this.usuarioAsigForm.get('asignaturas').setValue(this.asignaturasAdded); 
    }

    onSubmit(userFormAsig){
        console.log("userFormAsig: "+userFormAsig);
        this.authService.linkAsignaturaUsuarios(userFormAsig)
            .subscribe(data=>{
                console.log("Resultado de linkear usuario con asignatura: "
                    +data);
            });
    }
}
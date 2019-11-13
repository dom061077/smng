import {Component,OnInit} from '@angular/core';
import {Validators,ValidationErrors,ValidatorFn,AbstractControl,FormControl,FormGroup,FormBuilder} from '@angular/forms';
import {MessageService} from 'primeng/api';
import {Router,ActivatedRoute} from "@angular/router";
import { CrudCodes } from "../util/crud.enum";
import { AuthenticationService } from './authentication.service';
import { Authority } from './authority.model';

@Component({
    selector:'perfil-page',
    templateUrl:'./perfil.component.html'
})

export class PerfilNew implements OnInit{
    headerTitle:string;
    totalLazyAuthoritiesLength:number;
    totalLazyAuthoritiesAddedLength:number;
    perfilForm:FormGroup;
    authorities: Authority[];
    authoritiesAdded:Authority[];
    noSpecial: RegExp = /^[^<>1234567890!"#%&/$()=?¡[._*{}!]+$/;
    constructor(private fb:FormBuilder,private authService:AuthenticationService
        ,private messageService:MessageService,private router:Router
        ,private activeRoute:ActivatedRoute){
        //this.typeInputPassword='password';
        //this.isPassword=true;
        this.authoritiesAdded=[];
    }

    ngOnInit(){
       this.headerTitle='Alta de Perfil';     
       this.perfilForm = this.fb.group({
           id:[null,[]],
           descripcion:['',[Validators.required]]
       });
       /*this.authService.getAuthorities().then(data=>{
           this.authorities=data;
       });*/
       this.getAuthorities();
       if(this.activeRoute.snapshot.params["mode"]==CrudCodes.EDIT){
            this.assignFormValues(this.activeRoute.snapshot.params["id"]);
            this.headerTitle='Modificación de Perfil';
       }
    }

    assignFormValues(id:number){

    }

    onSubmit(valuesForm){

    }

    getAuthorities(){
        this.authService.getAuthorities().then(data=>{
            this.authorities=data.filter(auth=>{
                console.log("Auth filtrado: "+auth.descripcion);
                var found=false;
                for(var i=0;i < this.authoritiesAdded.length;i++){
                    if(this.authoritiesAdded[i]==auth.descripcion)
                        return found;
                }
                return !found;
 
            });
            console.log("Auth dsata: "+this.authorities);
        });        
    }

    addAuthority(authority){
        console.log("Id: "+authority.id+" descripción: "+authority.descripcion);
        this.authoritiesAdded.push(authority)
        this.totalLazyAuthoritiesAddedLength = this.authoritiesAdded.length;
        this.authorities.splice(0,1);
        console.log("Authorityadded: "+this.authoritiesAdded);
    }


    loadData(event) {
        //event.first = First row offset
        //event.rows = Number of rows per page
        //this.lazyCars = load new chunk between first index and (first + rows) last index
        this.authService.getAuthorities().then(data=>
            {   this.authorities=data;
                console.log("Probando");


            });        
        console.log('Evento: first: '+event.first+' numero de filas: '+event.rows);
    }     

}
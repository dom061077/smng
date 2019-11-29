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
           descripcion:['',[Validators.required]],
           authorities:[null,[Validators.required]]
       } /*,{validator:this.authoritiesAddedRequired()}*/);
       /*this.authService.getAuthorities().then(data=>{
           this.authorities=data;
       });*/
       
       if(this.activeRoute.snapshot.params["mode"]==CrudCodes.EDIT){
            this.assignFormValues(this.activeRoute.snapshot.params["id"]);
            this.headerTitle='Modificación de Perfil';
       }
       
    }

    assignFormValues(id:number){
        this.authService.getPerfil(id).then(data=>{
            this.perfilForm.patchValue(data);
        });
        this.authService.getAuthoritiesbyPerfil(id).then(data=>{
            this.authoritiesAdded = data;
            this.perfilForm.get('authorities').setValue(data);
            this.getAuthorities();
        });

    }
    

    onSubmit(valuesForm){
        console.log('valuesForm: '+valuesForm);
        valuesForm.authorities = this.authoritiesAdded;  
        
        if(this.activeRoute.snapshot.params["mode"]==CrudCodes.EDIT){
            this.authService.updatePerfil(valuesForm).subscribe(data=>{
                if(data.success){
                    this.messageService.add({severity:'info',summary:'Mensanje',detail:'Los datos fueron guardados correctamente'});
                }
            });
            
        }else{
            this.authService.savePerfil(valuesForm).subscribe(data=>{
                console.log("Resultado: "+data);
                if(data.success){
                    this.messageService.add({severity:'info',summary:'Mensaje',detail:'Los datos fueron guardados correctamente'});
                    this.router.navigateByUrl("/listperfil");                    
                }else
                    this.messageService.add({severity:'error',summary:'Error',detail:data.message});
            });              

        }



    }

    getAuthorities(){
        this.authService.getAuthorities().then(data=>{
            this.authorities=data.filter(auth=>{
                console.log("Auth filtrado: "+auth.authority);
                var found=false;
                for(var i=0;i < this.authoritiesAdded.length;i++){
                    if(this.authoritiesAdded[i].id==auth.id)
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


    /*authoritiesAddedRequired(control:AbstractControl){
    
            control.get('descripcion').setErrors({authoritiesAddedRequired:true});
          
    }    */

    OnMoveTarget(event){
        this.perfilForm.get('authorities').setValue(this.authoritiesAdded);

    }
}
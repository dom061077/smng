import {Component,OnInit} from '@angular/core';
import {Validators,ValidationErrors,ValidatorFn,AbstractControl,FormControl,FormGroup,FormBuilder} from '@angular/forms';
import {MessageService} from 'primeng/api';
import {Router,ActivatedRoute} from "@angular/router";
import { CrudCodes } from "../util/crud.enum";
import { AuthenticationService } from './authentication.service';
import { NgUrl } from './ngurl.model';


@Component({
    selector:'perfil-page',
    templateUrl:'perfil.usuario.component.html'
})
export class PerfilUsuario implements OnInit{
    headerTitle:string;
    urls: NgUrl[];
    urlsAdded: NgUrl[];
    perfilUsuarioForm:FormGroup;

    constructor(private fb:FormBuilder,private authService:AuthenticationService
        ,private messageService:MessageService,private router:Router
        ,private activeRoute:ActivatedRoute){
        this.urlsAdded = [];
        this.perfilUsuarioForm = this.fb.group({
            id:[null,[]],
            username:['',[Validators.required]],
            ngurls:[null,[Validators.required]]
        } );        

    }

    ngOnInit(){
        this.headerTitle='Asignación de Perfiles';
        this.assignFormValues(this.activeRoute.snapshot.params["id"]);
    }

    assignFormValues(id:number){
        this.authService.getPerfil(id).then(data=>{
            if(data)
                this.perfilNgUrlForm.patchValue(data);
        });
        this.authService.getUrlsbyPerfil(id).then(data=>{
            this.urlsAdded = data;
            this.perfilNgUrlForm.get('ngurls').setValue(data);
            this.getNgUrls();
        });

    }   
    
    getNgUrls(){
        this.authService.getNgUrls().then(data=>{
            this.urls = data.filter(url=>{
                var found = false;
                for(var i=0;i < this.urlsAdded.length;i++){
                    if(this.urlsAdded[i].id==url.id)
                        return found;
                }
                return !found;                
            });
        });
    }

    OnMoveTarget(event){
        this.perfilNgUrlForm.get('ngurls').setValue(this.urlsAdded);

    }    

    onSubmit(valuesForm){
        this.authService.savePerfilUrl(valuesForm).subscribe(data=>{
            if(data.success){
                this.messageService.add({severity:'info',summary:'Mensaje',detail:'Los datos fueron guardados'});
                this.router.navigateByUrl("/listperfil");
            }else
                this.messageService.add({severity:'error',summary:'Error',detail:''});

        });
    }


}    

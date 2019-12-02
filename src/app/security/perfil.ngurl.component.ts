import {Component,OnInit} from '@angular/core';
import {Validators,ValidationErrors,ValidatorFn,AbstractControl,FormControl,FormGroup,FormBuilder} from '@angular/forms';
import {MessageService} from 'primeng/api';
import {Router,ActivatedRoute} from "@angular/router";
import { CrudCodes } from "../util/crud.enum";
import { AuthenticationService } from './authentication.service';
import { NgUrl } from './ngurl.model';


@Component({
    selector:'perfil-page',
    templateUrl:'perfil.ngurl.component.html'
})
export class PerfilNgUrl implements OnInit{
    headerTitle:string;
    urls: NgUrl[];
    urlsAdded: NgUrl[];
    perfilNgUrlForm:FormGroup;

    constructor(private fb:FormBuilder,private authService:AuthenticationService
        ,private messageService:MessageService,private router:Router
        ,private activeRoute:ActivatedRoute){
        this.urlsAdded = [];
        this.perfilNgUrlForm = this.fb.group({
            id:[null,[]],
            descripcion:['',[Validators.required]],
            ngurls:[null,[Validators.required]]
        } );        

    }

    ngOnInit(){
        this.headerTitle='Alta de Perfil y URLs';
    }

    assignFormValues(id:number){
        this.authService.getPerfil(id).then(data=>{
            if(data)
                this.perfilNgUrlForm.patchValue(data);
        });
        this.authService.getAuthoritiesbyPerfil(id).then(data=>{
            this.urlsAdded = data;
            this.perfilNgUrlForm.get('ngurls').setValue(data);
            this.getNgUrls();
        });

    }   
    
    getNgUrls(){

    }


}    

import { Component,OnInit } from '@angular/core';
import { Perfil } from './perfil.model';
import { AuthenticationService } from './authentication.service';
import { FormControl } from '@angular/forms';
import { debounceTime,distinctUntilChanged } from 'rxjs/operators';

@Component({
    //selector: 'ggg',
    templateUrl: './usuario.list.component.html',
    //styles: []
    

})
export class UsuarioList implements OnInit{ 
    perfiles : Perfil[];
    totalLazyPerfilLength:number;
    public searchControl : FormControl;
    private debounce: number = 400;

    constructor(private authService:AuthenticationService){

    }

    ngOnInit(){

        this.searchControl = new FormControl('');
        this.searchControl.valueChanges
        .pipe(debounceTime(this.debounce), distinctUntilChanged())
        .subscribe(query=>{
            this.authService.getPerfiles(this.searchControl.value,0,20).then(data=>{
                this.perfiles = data;


            })
        });
        this.authService.getCantidadPerfiles(this.searchControl.value).toPromise().then(data=>{
            this.totalLazyPerfilLength = data;
        })        
                 
    }

    loadData(event){
        this.authService.getPerfiles("",event.first,event.rows)
            .then(data=>{
                this.perfiles = data;
            });
    }
    
    selectPerfil(event){
        
    }

}
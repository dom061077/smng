import { Component,OnInit } from '@angular/core';
import { Perfil } from './perfil.model';
import { AuthenticationService } from './authentication.service';
import { FormControl } from '@angular/forms';
import { debounceTime,distinctUntilChanged } from 'rxjs/operators';
import { Usuario } from './usuario.model';

@Component({
    //selector: 'ggg',
    templateUrl: './usuario.list.component.html',
        //styles: [`        `]
    

})
export class UsuarioList implements OnInit{ 
    usuarios : Usuario[];
    totalLazyUsuariosLength:number;
    public searchControl : FormControl;
    private debounce: number = 400;
    

    constructor(private authService:AuthenticationService){

    }

    ngOnInit(){
        this.authService.getCantidadUsuarios("").toPromise().then(data=>{
            
            this.totalLazyUsuariosLength = data;
            console.log("Total de registros: "+this.totalLazyUsuariosLength);
        });          

        this.searchControl = new FormControl('');
        this.searchControl.valueChanges
        .pipe(debounceTime(this.debounce), distinctUntilChanged())
        .subscribe(query=>{
            this.authService.getUsuarios(this.searchControl.value,0,10).then(data=>{
                this.usuarios = data;


            })
            this.authService.getCantidadUsuarios(this.searchControl.value).toPromise().then(data=>{
                this.totalLazyUsuariosLength = data;
            });   
        });
     
                 
    }

    loadData(event){
        this.authService.getUsuarios("",event.first,event.rows)
            .then(data=>{
                this.usuarios = data;
            });
    }
    
    selectPerfil(event){
        
    }

}
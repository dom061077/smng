import { Component,OnInit } from '@angular/core';
import { Perfil } from './perfil.model';
import { AuthenticationService } from './authentication.service';
import { FormControl } from '@angular/forms';
import { debounceTime,distinctUntilChanged } from 'rxjs/operators';
import { Usuario } from './usuario.model';

import {SelectItem} from 'primeng/api';

@Component({
    //selector: 'ggg',
    templateUrl: './usuario.list.component.html',
        //styles: [`        `]
    

})
export class UsuarioList implements OnInit{ 
    usuarios : Usuario[];
    sortOptions:SelectItem[];
    totalLazyUsuariosLength:number;
    public searchControl : FormControl;
    private debounce: number = 400;
    ascSort:boolean;//true= orden ascendente, false= orden descendente
    sortKey:string;

    constructor(private authService:AuthenticationService){

    }

    ngOnInit(){
        this.ascSort=true;
        this.sortOptions = [
            {label: 'Apellido y nombre', value: 'apellidonombre'},
            {label: 'Nombre de Usuario', value: 'username'}
        ];

        this.authService.getCantidadUsuarios("").toPromise().then(data=>{
            
            this.totalLazyUsuariosLength = data;
            console.log("Total de registros: "+this.totalLazyUsuariosLength);
        });          

        this.searchControl = new FormControl('');
        this.searchControl.valueChanges
        .pipe(debounceTime(this.debounce), distinctUntilChanged())
        .subscribe(query=>{
            
            this.authService.getUsuarios(this.searchControl.value,0,10,this.sortKey,(this.ascSort?'asc':'desc')).then(data=>{
                this.usuarios = data;


            })
            this.authService.getCantidadUsuarios(this.searchControl.value).toPromise().then(data=>{
                this.totalLazyUsuariosLength = data;
            });   
        });
     
                 
    }

    loadData(event){
        console.log('SorKey: '+this.sortKey);
        this.authService.getUsuarios("",event.first,event.rows,this.sortKey,(this.ascSort?'asc':'desc'))
            .then(data=>{
                this.usuarios = data;
            });
    }
    
    selectPerfil(event){
        
    }

    onSortChange(event){
        console.log('Valor del campo seleccionado: '+event.value);
    }

    handleChange(event){
        console.log('Evento: '+event.value);
    }

}
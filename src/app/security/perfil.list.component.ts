import { Component,OnInit } from '@angular/core';
import { Perfil } from './perfil.model';
import { AuthenticationService } from './authentication.service';
import { FormControl } from '@angular/forms';
import { debounceTime,distinctUntilChanged } from 'rxjs/operators';

@Component({
    //selector: 'ggg',
    templateUrl: './perfil.list.component.html',
    //styles: []
    

})
export class PerfilList implements OnInit{ 
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
        /*.subscribe(query => {
          this.alumnoService.getAlumnos(this.searchControl.value,0,20).then(data=>
              {   this.alumnos=data;
                  console.log("Probando");
                  console.log("Alumnos:  "+this.alumnos.length);
  
  
              });   
          this.alumnoService.getCantidad(this.searchControl.value).toPromise().then(data=>{
                  console.log("Cantidad de alumnos");
                  this.totalLazyAlumnoLength = data;
              });                    
        });*/                   
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
import { Component,OnInit } from '@angular/core';
import { Perfil } from './perfil.model';
import { AuthenticationService } from './authentication.service';
import {}

@Component({
    //selector: 'ggg',
    templateUrl: './perfil.list.component.html',
    styles: [`
        .car-item .ui-md-3 {
            text-align: center;
        }
        
        .car-item .ui-g-10 {
            font-weight: bold;
        }

        .empty-car-item-index {
            background-color: #f1f1f1;
            width: 60px;
            height: 60px;
            margin: 36px auto 0 auto;
            animation: pulse 1s infinite ease-in-out;
        }

        .empty-car-item-image {
            background-color: #f1f1f1;
            width: 120px;
            height: 120px;
            animation: pulse 1s infinite ease-in-out;
        }

        .empty-car-item-text {
            background-color: #f1f1f1;
            height: 18px;
            animation: pulse 1s infinite ease-in-out;
        }

        .title-container {
            padding: 1em;
            text-align: right;
        }

        .sort-container {
            text-align: left;
        }

        @media (max-width: 40em) {
            .car-item {
                text-align: center;
            }
        }
    `]
    

})
export class PerfilList implements OnInit{ 
    perfiles : Perfil[];
    totalLazyPerfilLength:number;
    constructor(private authService:AuthenticationService){

    }

    ngOnInit(){
        this.authService.getCantidadPerfiles("").toPromise().then(data=>{
            this.totalLazyPerfilLength = data;
        });
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
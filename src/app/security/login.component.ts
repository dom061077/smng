import {Component} from '@angular/core'
import { AuthenticationService } from "./authentication.service";

import { NgForm } from "@angular/forms";

import {MessageService} from 'primeng/api';
import {Router} from "@angular/router";

//import {InputTextModule} from 'primeng/inputtext';
//import {PasswordModule} from 'primeng/password';


@Component({
    //selector: 'login-page',
    templateUrl: './login.component.html'
    
})

export class LoginComponent{
    
    username:string;
    password:string='';
    
    constructor( private authService:AuthenticationService,private msgService:MessageService
                    ,private router:Router){

    }

    public login(){
        console.log('Procedure login en login component');
        this.authService.login(this.username,this.password)
       
            .subscribe(
                data =>{
                    console.log("Aplicación logueada ");
                    console.log("currentUserValue: "+this.authService.currentUserValue.username);
                    this.getUserInformation(this.authService.currentUserValue.username);
                    this.router.navigateByUrl("/");
                    
                }/*,
                error => {
                    this.msgService.clear;
                    this.msgService.add({severity:'error', summary:'Mensaje', detail:error.message});
                    

                    console.log("Error json: "+error.message);
                }*/

            );
    }

    private getUserInformation(username:string){
        this.authService.getUserInformation(username)
            .subscribe(
                data => {
                    console.log("Subscribe getUserInformation");
                },
                error=>{
                    console.log("Subscribe getUserInformation ERROR");
                }
            );
        
    }

    public ngOnInit() {
        this.authService.logout();
    }

    public showmsg(){
        this.msgService.add({severity:'error', summary:'Mensaje', detail:'PROBANDO DE NUEVO'});
        // let item = JSON.parse(localStorage.getItem('currentUser'));
        // console.log('Token: '+item.access_token);
        // console.log('Actual usuario: '+localStorage.getItem('currentUser'));
    }
}

/* PARA HACER REFRESH TOKEN
    if (jwtHelper.isTokenExpired(ariaAccessJWT)) {
      // A promise of a JWT id_token
      return $http({
        url: 'http://localhost:8080/oauth/access_token',
        skipAuthorization: true,
        method: 'POST',
        data: {
            grant_type: 'refresh_token',
            refresh_token: ariaRefreshJWT
        }
      }).then(function(response) {
        var ariaAccessJWT = response.data.access_token;
        localStorage.setItem('ARIA_access_jwt', ariaAccessJWT);
        return ariaAccessJWT;
      });
    } 


*/
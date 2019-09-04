import {Component} from '@angular/core'
import { AuthenticationService } from "./authentication.service";
import { NgForm } from "@angular/forms";


//import {InputTextModule} from 'primeng/inputtext';
//import {PasswordModule} from 'primeng/password';


@Component({
    //selector: 'login-page',
    templateUrl: './login.component.html'
})

export class LoginComponent{
    username:string;
    password:string='';
    
    constructor( private authService:AuthenticationService){

    }

    public login(){
        console.log('Procedure login en login component');
        this.authService.login(this.username,this.password)
       
            .subscribe(
                data =>{
                    console.log("Aplicación logueada ");
                    
                },
                error => {
                    console.log("Error json: "+error.status);
                }

            );
    }
}


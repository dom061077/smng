import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
<<<<<<< HEAD
import { Observable,throwError } from 'rxjs';

import { AuthenticationService } from './authentication.service';
import { catchError } from 'rxjs/operators';


=======
import { Observable, throwError } from 'rxjs';

import { AuthenticationService } from './authentication.service';
import { catchError } from 'rxjs/operators';
import {MessageService} from 'primeng/api';
import {Router} from "@angular/router";
>>>>>>> f61ee273b975d41c03c8e21fd3ae4ad0a1c5073c

@Injectable({
  providedIn: 'root'
})
export class JwtInterceptor implements HttpInterceptor {
<<<<<<< HEAD
    constructor(private authenticationService: AuthenticationService
            ) { }
=======
    constructor(private authenticationService: AuthenticationService 
        ,private msgService:MessageService,private router:Router) { }
>>>>>>> f61ee273b975d41c03c8e21fd3ae4ad0a1c5073c
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      // add authorization header with jwt token if available
      let currentUser = this.authenticationService.currentUserValue;
      if (currentUser && currentUser.access_token) {
          request = request.clone({
              setHeaders: {
                  Authorization: `${currentUser.token_type} ${currentUser.access_token}`
              }
          });
      }

      return next.handle(request)
        .pipe(
            catchError(error =>{
<<<<<<< HEAD
                    console.log('Catch error en interceptor');
                            let msg ='';//= error.message;
                            let title = error.name;
                            if (error.status == 401){
                                msg = 'Usuario o Contraseña incorrectos';
                                title = 'Error';
                            }           
                            if(error.status == 400){
                                msg = 'Ingrese usuario y contraseña';
                                title = 'Error';
                            }     
                            if(error.status == 422){
                                title = 'Error en ingreso de datos';
                                if(error.error.total>1){
                                    msg='<ul>'
                                    error.error._embedded.errors.forEach(element=>{
                                        msg=msg+'<li>'+element.message+'</li>';
                                    });     
                                    msg=msg+'</ul>';                                       
                                }else{
                                    msg = msg+ '<ul><li>'+error.error.message+'</li></ul>';
                                }
                            }
     

                            	
=======
                if (error.status == 401){
                    // msg = 'Usuario o Contraseña incorrectos';
                    // title = 'Error';
                    // if(currentUser && currentUser.access_token){
                        console.log('Se envió un mensaje de ERROR!!!');
                        this.router.navigateByUrl("/login");
                        //error=null;
                    // }else{                    
                         error.msgobj = {title:'Error',msg:'Usuario o contraseñ incorrectos'}
                    // }
                    
                }           
                if(error.status == 400){

                        error.msgobj = {title:'Error',msg:'Ingrese usuario y contraseña'}
                    
                }     
                if(error.status == 422){
                    // title = 'Error en ingreso de datos';
                    // if(error.error.total>1){
                    //     msg='<ul>'
                    //     error.error._embedded.errors.forEach(element=>{
                    //         msg=msg+'<li>'+element.message+'</li>';
                    //     });     
                    //     msg=msg+'</ul>';                                       
                    // }else{
                    //     msg = msg+ '<ul><li>'+error.error.message+'</li></ul>';
                    // }
                }
                this.authenticationService.currentRestSubError.next(error);

>>>>>>> f61ee273b975d41c03c8e21fd3ae4ad0a1c5073c
                return throwError (error);
            })
            
        );
  }
}

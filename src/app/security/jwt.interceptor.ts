import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

import { AuthenticationService } from './authentication.service';
import { catchError } from 'rxjs/operators';
import {MessageService} from 'primeng/api';
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class JwtInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService 
        ,private msgService:MessageService,private router:Router) { }
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

                return throwError (error);
            })
            
        );
  }
}
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable,throwError } from 'rxjs';

import { AuthenticationService } from './authentication.service';
import { catchError } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class JwtInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService
            ) { }
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
     

                            	
                return throwError (error);
            })
            
        );
  }
}

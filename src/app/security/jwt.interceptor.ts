import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthenticationService } from './authentication.service';
@Injectable({
  providedIn: 'root'
})
export class JwtInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService) { }
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

      return next.handle(request);
  }
}

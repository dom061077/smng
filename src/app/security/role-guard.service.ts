import { AuthenticationService } from './authentication.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, Route } from '@angular/router';
import { Observable } from 'rxjs';
import {MessageService} from 'primeng/api';


@Injectable()
export class RoleGuard implements CanActivate {


  constructor(private authService: AuthenticationService, private _router: Router) {
  }

   canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const user = this.authService.currentUserValue;
    console.log('User: '+user);
    console.log('Role: '+next.data.role);
    console.log('Cantidad de ngurl: '+this.authService.ngUrlsSubject.value);
    console.log('Cantidad de items menu: '+this.authService.menuSubject.value);
    console.log('Url: '+this._router.url);
    let urls = this.authService.ngUrlsSubject.value.ngurls;
    if(!urls){
      this._router.navigateByUrl(this._router.url);
      return true;
    }
    for(var i = 0;i<urls.length;i++){
        let stringToSplit = urls[i].ngurl;
        let s = stringToSplit.split("/");
        if(next.url.length == s.length
            && next.url[0]==s[0]){
          return true;
        }
    }
    //this._router.navigate(['/404']);
    let error={msgobj:{}};
    error.msgobj = {title:'Acceso denegado',msg:'No tiene permisos para acceder a esta opción'};    
    this.authService.currentRestSubError.next(error);
    return false;

    //for (let rol in user.roles){
    //    console.log('Rol iteracion: '+user.roles[0]);
    //}
    /*if (user.Role === next.data.role) {
      return true;
    }

    // navigate to not found page
    this._router.navigate(['/404']);
    return false;
    */
    
  }

}
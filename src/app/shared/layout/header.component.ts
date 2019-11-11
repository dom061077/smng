import { Component,ElementRef, ViewChild,AfterViewInit } from '@angular/core';
import { AuthenticationService } from "../../security/authentication.service";
import {MenuItem} from 'primeng/api';
import { User } from "../../model/security/user.model";

@Component({
  selector: 'layout-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements AfterViewInit{
   items: MenuItem[];
   //display:boolean;
   @ViewChild("overlay_yo") overlayYo: ElementRef;
  constructor(public authService:AuthenticationService) {

  }


  ngAfterViewInit() {
        this.authService.getMenu().toPromise().then(data=>{
            this.items = data;
         });      
  }

  public clickOverlay(event){
      //console.log("OVERLAY PRUEBA");
    (<any>this.overlayYo).toggle(event);
    return false;
  }

  public get currentMenu(){
      return this.authService.currentObservableValue;
  }

  public get currentUser(){
        return this.authService.currentUserObservableValue;
  }
  
    ngOnInit() {
        console.log('On init de header components');

        /*this.items = [
            {
                label: 'Alumnos',
                icon: 'fa fa-graduation-cap',
                
                items: [
                    {label: 'Nuevo', icon: 'fa fa-plus',routerLink : '/alumno'},                    
                    {label: 'Listado', icon: 'fa fa-list',routerLink:'/listalumno'}
                ]
            },
            {
                label: 'Help',
                icon: 'pi pi-fw pi-question',
                items: [
                    {
                        label: 'Contents',
                        icon: 'pi pi-pi pi-bars'
                    },
                    {
                        label: 'Search', 
                        icon: 'pi pi-pi pi-search', 
                        items: [
                            {
                                label: 'Text', 
                                items: [
                                    {
                                        label: 'Workspace'
                                    }
                                ]
                            },
                            {
                                label: 'User',
                                icon: 'pi pi-fw pi-file',
                            }
                    ]}
                ]
            },
            {
                label: 'Actions',
                icon: 'pi pi-fw pi-cog',
                items: [
                    {
                        label: 'Edit',
                        icon: 'pi pi-fw pi-pencil',
                        items: [
                            {label: 'Save', icon: 'pi pi-fw pi-save'},
                            {label: 'Update', icon: 'pi pi-fw pi-save'},
                        ]
                    },
                    {
                        label: 'Other',
                        icon: 'pi pi-fw pi-tags',
                        items: [
                            {label: 'Delete', icon: 'pi pi-fw pi-minus'}
                        ]
                    }
                ]
            }
        ];*/
    }  

}
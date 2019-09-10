import { Component } from '@angular/core';
import { AuthenticationService } from "../../security/authentication.service";
import {MenuItem} from 'primeng/api';
import { User } from "../../model/security/user.model";

@Component({
  selector: 'layout-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {
   items: MenuItem[];
   //display:boolean;
  constructor(public authService:AuthenticationService) {

  }

  public get currentUser(){
        return this.authService.currentUserObservableValue;
  }
  
    ngOnInit() {

        
        this.items = [
            {
                label: 'Alumnos',
                icon: 'fa fa-graduation-cap',
                
                items: [
                    {label: 'Nuevo', icon: 'fa fa-newspaper-o',routerLink : ['/newalumno'],},
                    
                    {label: 'Refresh', icon: 'pi pi-fw pi-refresh'}
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
            },
            {
                label:'Salir',
                icon:'fa fa-sign-out',
                routerLink : ['/login']
                
            }
        ];
    }  

}
import { NgModule } from "@angular/core";
import { CommonModule  } from "@angular/common";
import { FormsModule,ReactiveFormsModule  } from "@angular/forms";
import { RouterModule } from "@angular/router";
import {ButtonModule} from 'primeng/button';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {KeyFilterModule} from 'primeng/keyfilter';


import { LoginComponent } from './login.component';
import { AuthenticationService  } from "./authentication.service";
import { JwtInterceptor  } from "./jwt.interceptor";
import { ChangePasswordComponent } from "./change.password.component";

import { UsuarioNew } from "./usuario.component";
import { PerfilNew } from "./perfil.component";
import { PerfilList } from "./perfil.list.component";

import {PanelModule} from 'primeng/panel';
import {ToastModule} from 'primeng/toast';

import {PickListModule} from 'primeng/picklist';
import {VirtualScrollerModule} from 'primeng/virtualscroller';


let routing = RouterModule.forChild([
    {path:"login",component: LoginComponent},
    {path:"logout",component: LoginComponent},
    {path:"changepass",component:ChangePasswordComponent},
    {path:"user",component:UsuarioNew},
    {   path:"perfil/:mode/:id",component: PerfilNew
        //,canActivate:[RoleGuard]
        ,data:{role:'ROLE_USER'}
    },    
    {path:"perfil",component:PerfilNew},
    {path:"listperfil",component:PerfilList}
]);

@NgModule({
    imports: [CommonModule, FormsModule,ReactiveFormsModule , ButtonModule
        ,routing,PanelModule,ToastModule,MessagesModule,MessageModule,KeyFilterModule
        ,PickListModule,VirtualScrollerModule
        ],
    providers:[AuthenticationService,JwtInterceptor],
    declarations:[
        LoginComponent,ChangePasswordComponent,UsuarioNew
        ,PerfilNew,PerfilList
    ]

})

export class SecurityModule{}
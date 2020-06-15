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
import { PerfilNgUrl } from "./perfil.ngurl.component";
import { UsuarioList } from "./usuario.list.component";
import { UsuarioList2 } from "./usuario.list2.component";
import { PerfilUsuario } from "./perfil.usuario.component";
import { UsuarioAsignatura } from "./usuario.asignatura.component";

import {PanelModule} from 'primeng/panel';
import {ToastModule} from 'primeng/toast';

import {PickListModule} from 'primeng/picklist';
import {VirtualScrollerModule} from 'primeng/virtualscroller';
import {DataViewModule} from 'primeng/dataview';
import {DropdownModule} from 'primeng/dropdown';
import {ToggleButtonModule} from 'primeng/togglebutton';
import {CalendarModule} from 'primeng/calendar';

let routing = RouterModule.forChild([
    {path:"login",component: LoginComponent},
    {path:"logout",component: LoginComponent},
    {path:"changepass",component:ChangePasswordComponent},
    {path:"changepass/:mode/:id",component:ChangePasswordComponent},
    {path:"user",component:UsuarioNew},
    {path:"userlist",component:UsuarioList},
    {path:"userlist2",component:UsuarioList2},
    {path:"user/:mode/:id",component:UsuarioNew},
    {   path:"perfil/:mode/:id",component: PerfilNew
        //,canActivate:[RoleGuard]
        ,data:{role:'ROLE_USER'}
    },    
    {path:"perfil",component:PerfilNew},
    {path:"listperfil",component:PerfilList},
    {path:"perfilurl/:id",component:PerfilNgUrl},
    {path:"perfilusuario/:id",component:PerfilUsuario},
    {path:"usuarioasignatura/:id",component:UsuarioAsignatura}

    
]);

@NgModule({
    imports: [CommonModule, FormsModule,ReactiveFormsModule , ButtonModule
        ,routing,PanelModule,ToastModule,MessagesModule,MessageModule,KeyFilterModule
        ,PickListModule,VirtualScrollerModule,DataViewModule
        ,DropdownModule,ToggleButtonModule,CalendarModule   
        ],
    providers:[AuthenticationService,JwtInterceptor],
    declarations:[
        LoginComponent,ChangePasswordComponent,UsuarioNew
        ,PerfilNew,PerfilList,PerfilNgUrl,UsuarioList
        ,UsuarioList2
        ,PerfilUsuario
        ,UsuarioAsignatura
    ]

})

export class SecurityModule{}
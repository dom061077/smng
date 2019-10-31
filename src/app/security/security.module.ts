import { NgModule } from "@angular/core";
import { CommonModule  } from "@angular/common";
import { FormsModule,ReactiveFormsModule  } from "@angular/forms";
import { RouterModule } from "@angular/router";
import {ButtonModule} from 'primeng/button';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';

import { LoginComponent } from './login.component';
import { AuthenticationService  } from "./authentication.service";
import { JwtInterceptor  } from "./jwt.interceptor";
import { ChangePasswordComponent } from "./change.password.component";
import { UsuarioNew } from "./usuario.component";
import {PanelModule} from 'primeng/panel';
import {ToastModule} from 'primeng/toast';

let routing = RouterModule.forChild([
    {path:"login",component: LoginComponent},
    {path:"logout",component: LoginComponent},
    {path:"changepass",component:ChangePasswordComponent},
    {path:"user",component:UsuarioNew}
]);

@NgModule({
    imports: [CommonModule, FormsModule,ReactiveFormsModule , ButtonModule
        ,routing,PanelModule,ToastModule,MessagesModule,MessageModule],
    providers:[AuthenticationService,JwtInterceptor],
    declarations:[
        LoginComponent,ChangePasswordComponent,UsuarioNew
    ]

})

export class SecurityModule{}
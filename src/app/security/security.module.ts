import { NgModule } from "@angular/core";
import { CommonModule  } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import {ButtonModule} from 'primeng/button';

import { LoginComponent } from './login.component';
import { AuthenticationService  } from "./authentication.service";
import { JwtInterceptor  } from "./jwt.interceptor";

let routing = RouterModule.forChild([
    {path:"login",component: LoginComponent},
    {path:"logout",component: LoginComponent}
]);

@NgModule({
    imports: [CommonModule, FormsModule, ButtonModule,routing],
    providers:[AuthenticationService,JwtInterceptor],
    declarations:[
        LoginComponent
    ]

})

export class SecurityModule{}
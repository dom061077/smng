import { BrowserModule } from '@angular/platform-browser';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from "@angular/router";

import { ModelModule } from "./model/model.module";
import { SecurityModule } from "./security/security.module";

//import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HomeModule } from "./home/home.module";
import { HomeComponent } from "./home/home.component";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
//import { LoginComponent } from "./security/login.component";
import { AuthenticationService } from "./security/authentication.service";


import {
  FooterComponent,
  HeaderComponent,
  SharedModule

} from "./shared";

import { ButtonModule } from 'primeng/button';
import { JwtInterceptor } from './security/jwt.interceptor';
//import {PasswordModule} from 'primeng/button';

const rootRouting: ModuleWithProviders =
  RouterModule.forRoot([
     {
       path:"login",loadChildren:"./security/security.module#SecurityModule"
     },
    {
      path: "home", component: HomeComponent
    }, {
      path: "**", component: HomeComponent
    }

  ], { useHash: true });

@NgModule({
  
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent
    
    

  ],
  imports: [
    BrowserModule,
    ButtonModule,
    //AppRoutingModule,
    ModelModule,
    HomeModule,
    SecurityModule,
    rootRouting,
    SharedModule,
    
    //,
    //PasswordModule

  ],
  providers: [
      {provide : HTTP_INTERCEPTORS,useClass: JwtInterceptor, multi:true
        
      },
      ,AuthenticationService
      
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

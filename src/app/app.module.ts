import { BrowserModule } from '@angular/platform-browser';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule  } from "@angular/router";

import { ModelModule } from "./model/model.module";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HomeModule } from "./home/home.module";
import { 
    FooterComponent,
    HeaderComponent,
    SharedModule

 } from "./shared";

 import {ButtonModule} from 'primeng/button';
 //import {PasswordModule} from 'primeng/button';

 const rootRouting: ModuleWithProviders = RouterModule.forRoot([], { useHash: true });

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
    rootRouting,
    SharedModule
    //,
    //PasswordModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

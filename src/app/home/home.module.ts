import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HomeComponent } from './home.component';

import { SharedModule } from '../shared'; 
//import { LoginComponent } from './login.component';
import {ButtonModule} from 'primeng/button';
import {PasswordModule} from 'primeng/password';
import {CardModule} from 'primeng/card';





@NgModule({
  imports: [
    ButtonModule,
    PasswordModule,
    CardModule,
    SharedModule
    
  ],
  declarations: [
    HomeComponent//,
    //LoginComponent
  ],
 // exports: [HomeComponent],
  providers: []
})
export class HomeModule {}
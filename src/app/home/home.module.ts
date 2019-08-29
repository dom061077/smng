import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HomeComponent } from './home.component';

import { SharedModule } from '../shared'; 
import { LoginComponent } from './login.component';
import {ButtonModule} from 'primeng/button';
import {PasswordModule} from 'primeng/password';
import {CardModule} from 'primeng/card';




const homeRouting: ModuleWithProviders = RouterModule.forChild([
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    component: HomeComponent
  }

]);

@NgModule({
  imports: [
    ButtonModule,
    PasswordModule,
    CardModule,
    homeRouting,
    SharedModule
    
  ],
  declarations: [
    HomeComponent,
    LoginComponent
  ],
  providers: []
})
export class HomeModule {}
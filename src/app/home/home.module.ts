import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HomeComponent } from './home.component';

import { SharedModule } from '../shared'; 
import { LoginComponent } from '../security/login/login.component';




const homeRouting: ModuleWithProviders = RouterModule.forChild([
  {
    path: 'prueba',
    component: LoginComponent
  },
  {
    path: '',
    component: LoginComponent
  }

]);

@NgModule({
  imports: [
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
import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HomeComponent } from './home.component';

import { SharedModule } from '../shared'; 
import { LoginComponent } from './login.component';




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
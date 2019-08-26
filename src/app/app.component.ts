import { Component } from '@angular/core';
import { RestUserDataSource } from './model/rest.user.datasource';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'smng';
  constructor(private dsuser:RestUserDataSource){

  }

  login(){
      console.log('Iniciando logueo');
      localStorage.setItem('localStorageItem','Probando localStorage');
      console.log('Local storage item: '+localStorage.getItem('localStorageItem'));
      this.dsuser.login("user1","user1");
  }
}

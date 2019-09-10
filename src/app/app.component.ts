import { Component } from '@angular/core';
import { RestUserDataSource } from './model/rest.user.datasource';
import {MessageService} from 'primeng/api';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
  ,providers:[MessageService]
})
export class AppComponent {
  title = 'smng';
  
  constructor(private dsuser:RestUserDataSource,private messageService:MessageService){

  }

  public login() {
    this.messageService.add({severity:'error', summary:'Mensaje', detail:'prueba de toast'});
}  

}

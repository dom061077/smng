import { Component } from '@angular/core';
import { RestUserDataSource } from './model/rest.user.datasource';
import {MessageService} from 'primeng/api';
import { AuthenticationService } from './security/authentication.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
  ,providers:[MessageService]
})
export class AppComponent {
  title = 'smng';
  
  
  constructor(private dsuser:RestUserDataSource,private messageService:MessageService
      ,private authService:AuthenticationService){
      console.log("constructor AppComponent XXXXXX");
      authService.currentRestSubError.subscribe(data=>{
          if(data!=null){
            this.messageService.clear;
            this.messageService.add({severity:'error',summary:data.msgobj.title,detail:data.msgobj.msg});
          }

      });
  }

  public login() {
    this.messageService.add({severity:'error', summary:'Mensaje', detail:'prueba de toast'});
  }  

}

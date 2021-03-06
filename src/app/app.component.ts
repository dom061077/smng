import { Component } from '@angular/core';

import {MessageService} from 'primeng/api';
import { AuthenticationService } from './security/authentication.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
  ,providers:[MessageService]
})
export class AppComponent {
  title = 'Escuela Pedro de Mendoza';
  
  
  constructor(private messageService:MessageService
      ,private authService:AuthenticationService){
      authService.currentRestSubError.subscribe(data=>{
          //console.log("Mostrando error");
          if(data!=null){
            this.messageService.clear;
              if(data.error && data.error.total>1){
                data.error._embedded.errors.forEach(element=>{
                    this.messageService.add({
                        severity:'error',
                        summary: 'Error',
                        detail: element.message
                    });
                });                 
                
            }else{
              this.messageService.add({severity:'error',summary:data.msgobj.title,detail:data.msgobj.msg}); 
            }
          }

      });
  }

  public login() {
    this.messageService.add({severity:'error', summary:'Mensaje', detail:'prueba de toast'});
  }  

}

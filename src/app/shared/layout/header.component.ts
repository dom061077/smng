import { Component } from '@angular/core';
import { AuthenticationService } from "../../security/authentication.service";

@Component({
  selector: 'layout-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {

  constructor(public authService:AuthenticationService) {

  }

}
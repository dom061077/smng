import { ObjectListForm } from '../shared/forms/object.list.component';
import { Component } from '@angular/core';
import { AuthenticationService } from './authentication.service';

@Component({
    
})
export class UsuarioList extends ObjectListForm{
    constructor(public authService:AuthenticationService){
        super(authService,'usercount','getusuarios');
    }
}
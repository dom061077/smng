import { ObjectListForm } from '../shared/forms/object.list.component';
import { Component,Input } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { Object } from '../model/object.model';

@Component({

    templateUrl:'../shared/forms/object.list.component.html'
})
export class UsuarioList2 extends ObjectListForm{
    @Input() object: Object;
    constructor(public authService:AuthenticationService){
        super(authService,'usercount','getusuarios');
    }
}
import {NgModule} from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule,ReactiveFormsModule  } from "@angular/forms";
import { AlumnoNew } from "./alumno.new.component";
import { RouterModule  } from "@angular/router";
import {InputMaskModule} from 'primeng/inputmask';
import {PanelModule} from 'primeng/panel';
import {ButtonModule} from 'primeng/button';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {KeyFilterModule} from 'primeng/keyfilter';
import {TabViewModule} from 'primeng/tabview';
import {AutoCompleteModule} from 'primeng/autocomplete';
import { AlumnoService } from './alumno.service';




let routing=RouterModule.forChild([
    {path:"newalumno",component: AlumnoNew}
]);

@NgModule({
    imports : [
        CommonModule,routing,InputMaskModule,FormsModule
        ,ReactiveFormsModule,PanelModule,PanelModule
        ,MessagesModule,MessageModule,InputMaskModule
        ,ButtonModule,KeyFilterModule,TabViewModule
        ,AutoCompleteModule
        
    ],
    providers: [AlumnoService],
    declarations: [
        AlumnoNew
    ]

})

export class AlumnoModule{

}
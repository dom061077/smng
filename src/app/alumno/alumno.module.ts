import {NgModule} from "@angular/core";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from "@angular/common";
import { FormsModule,ReactiveFormsModule  } from "@angular/forms";
import { AlumnoNew } from "./alumno.new.component";
import { AlumnoList } from "./alumno.list.component";
import { RouterModule  } from "@angular/router";
import {InputMaskModule} from 'primeng/inputmask';
import {PanelModule} from 'primeng/panel';
import {ButtonModule} from 'primeng/button';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {KeyFilterModule} from 'primeng/keyfilter';
import {TabViewModule} from 'primeng/tabview';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {CheckboxModule} from 'primeng/checkbox';
import { AlumnoService } from './alumno.service';
import {CalendarModule} from 'primeng/calendar';
import {VirtualScrollerModule} from 'primeng/virtualscroller';



let routing=RouterModule.forChild([
    {path:"alumno/:mode/:id",component: AlumnoNew},
    
    {path:"alumno",component:AlumnoNew},
    
    {path:"listalumno",component: AlumnoList}
]);

@NgModule({
    imports : [
        CommonModule,routing,InputMaskModule,FormsModule
        ,ReactiveFormsModule,PanelModule,PanelModule
        ,MessagesModule,MessageModule,InputMaskModule
        ,ButtonModule,KeyFilterModule,TabViewModule
        ,AutoCompleteModule,CheckboxModule
        ,CalendarModule, VirtualScrollerModule
        ,BrowserAnimationsModule
        
        
    ],
    providers: [AlumnoService],
    declarations: [
        AlumnoNew,AlumnoList
    ]

})

export class AlumnoModule{

}
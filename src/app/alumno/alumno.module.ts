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
import {DatePipe} from '@angular/common';
import {RoleGuard} from '../security/role-guard.service';
import {DropdownModule} from 'primeng/dropdown';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {DataViewModule} from 'primeng/dataview';
import {ToggleButtonModule} from 'primeng/togglebutton';




let routing=RouterModule.forChild([
    {   path:"alumno/:mode/:id",component: AlumnoNew
        ,canActivate:[RoleGuard]
        ,data:{role:'ROLE_USER'}
    },
    
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
        ,BrowserAnimationsModule,DropdownModule
        ,ProgressSpinnerModule
        ,DataViewModule
        ,ToggleButtonModule
        
    ],
    providers: [AlumnoService,DatePipe,RoleGuard],
    declarations: [
        AlumnoNew,AlumnoList
    ]

})

export class AlumnoModule{

}
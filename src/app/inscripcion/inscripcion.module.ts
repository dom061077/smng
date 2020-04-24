import {NgModule} from "@angular/core";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from "@angular/common";
import { FormsModule,ReactiveFormsModule  } from "@angular/forms";
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
import {CalendarModule} from 'primeng/calendar';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {DataViewModule} from 'primeng/dataview';
import {DropdownModule} from 'primeng/dropdown';
import {ToggleButtonModule} from 'primeng/togglebutton';


import { InscripcionNew } from './inscripcion.new.component';
import { InscripcionList } from './inscripcion.list.component';
import { InscripcionService } from './inscripcion.service';

let routing=RouterModule.forChild([
 
    {path:"inscripcion",component:InscripcionNew},
    
    {path:"listinsc",component: InscripcionList}
]);

@NgModule({
    imports : [
        CommonModule,routing,InputMaskModule,FormsModule
        ,ReactiveFormsModule,PanelModule
        ,MessagesModule,MessageModule,InputMaskModule
        ,ButtonModule,KeyFilterModule,TabViewModule
        ,AutoCompleteModule,CheckboxModule
        ,CalendarModule
        ,BrowserAnimationsModule
        ,ProgressSpinnerModule
        ,DataViewModule
        ,DropdownModule
        ,ToggleButtonModule

    ],
    providers: [
        InscripcionService
    ],
    declarations: [InscripcionNew,InscripcionList]
})

export class InscripcionModule{

}
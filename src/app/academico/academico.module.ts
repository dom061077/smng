import {NgModule} from "@angular/core";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from "@angular/common";
import { FormsModule,ReactiveFormsModule  } from "@angular/forms";
import { RouterModule  } from "@angular/router";

import {DataViewModule} from 'primeng/dataview';
import {DropdownModule} from 'primeng/dropdown';
import {ToggleButtonModule} from 'primeng/togglebutton';
import {PanelModule} from 'primeng/panel';

import {AcademicoService} from './academico.service';
import {CargaExamenList} from './carga.examen.component';

let routing=RouterModule.forChild([
 
    {path:"cargaexamen",component:CargaExamenList}
    
]);

@NgModule({
    imports:[
        CommonModule,routing,RouterModule
        ,FormsModule,ReactiveFormsModule
        ,BrowserAnimationsModule
        ,DataViewModule
        ,DropdownModule
        ,ToggleButtonModule
        ,PanelModule
    ],
    providers:[
        AcademicoService
    ],
    declarations:[
        CargaExamenList
    ]

})

export class AcademicoModule{



}
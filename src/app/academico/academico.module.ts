import {NgModule} from "@angular/core";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from "@angular/common";
import { FormsModule,ReactiveFormsModule  } from "@angular/forms";
import { RouterModule  } from "@angular/router";

import {DataViewModule} from 'primeng/dataview';
import {DropdownModule} from 'primeng/dropdown';
import {ToggleButtonModule} from 'primeng/togglebutton';
import {PanelModule} from 'primeng/panel';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {FieldsetModule} from 'primeng/fieldset';
import {KeyFilterModule} from 'primeng/keyfilter';
import {ButtonModule} from 'primeng/button';

import {AcademicoService} from './academico.service';
import {CargaExamenList} from './carga.examen.component';
import {CargaExamenPromedio} from './carga.examen.promedio.component';
import {DialogModule} from 'primeng/dialog';
import {Compendio} from './compendio.component';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {InscripcionService} from '../inscripcion/inscripcion.service';
import {DisableDirective} from '../util/disable.directive';

let routing=RouterModule.forChild([
 
    {path:"cargaexamen",component:CargaExamenList},
    {path:"cargaexamenpromedio/:asigId/:alumnoId/:perId",component:CargaExamenPromedio},
    {path:"compendio",component:Compendio}
    
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
        ,MessagesModule
        ,FieldsetModule
        ,KeyFilterModule
        ,MessagesModule
        ,MessageModule
        ,ButtonModule
        ,DialogModule
        ,AutoCompleteModule
        
    ],
    providers:[
        AcademicoService,
        InscripcionService
    ],
    declarations:[
        DisableDirective,
        CargaExamenList,
        CargaExamenPromedio,
        Compendio
    ]

})

export class AcademicoModule{



}
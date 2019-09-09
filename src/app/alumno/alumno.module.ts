import {NgModule} from "@angular/core";
import { CommonModule } from "@angular/common";
import { AlumnoNew } from "./alumno.new.component";
import { RouterModule  } from "@angular/router";

let routing=RouterModule.forChild([
    {path:"newalumno",component: AlumnoNew}
]);

@NgModule({
    imports : [
        CommonModule,routing
    ],
    declarations: [
        AlumnoNew
    ]

})

export class AlumnoModule{

}
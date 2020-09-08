import { Component,OnInit,ViewChild,ElementRef} from '@angular/core';
import {Validators,ValidationErrors,ValidatorFn,AbstractControl,FormControl,FormGroup,FormBuilder} from '@angular/forms';
import {AcademicoService} from './academico.service';
import {InscripcionService} from '../inscripcion/inscripcion.service';

@Component({
    //selector: 'ggg',
    templateUrl: './compendio.component.html',
        //styles: [`        `]
    
 
})
export class Compendio   implements OnInit{ 
    busquedaForm:FormGroup;
    filteredPeriodos:any[];
    filteredTurnos:any[];
    filteredAsignaturas:any[];
    filteredCursos:any[];
    filteredDivisiones:any[];
    constructor(private fb: FormBuilder,private acadService: AcademicoService
        ,private inscService:InscripcionService){
        this.busquedaForm = this.fb.group({
            periodoLectivo:['',Validators.required],
            asignatura:['',Validators.required],
            turno:['',Validators.required],
            curso:['',Validators.required],
            division:['',Validators.required]
        });
    }
    ngOnInit(){
        //this.busquedaForm = 

    }

    filterPeriodos(event){
        this.inscService.getPeriodos().subscribe(data=>{
            this.filteredPeriodos=data;
        });

    }



    filterTurnos(event){
        this.inscService.getTurnos().subscribe(data=>{
            this.filteredTurnos = data;
        });        
    }

    filterCursos(event){
        this.inscService.getCursos(this.busquedaForm.get("turno").value.id).subscribe(data=>{     
            this.filteredCursos = data;
        });
    }

    filterDivisiones(event){
        this.inscService.getDivisiones(this.busquedaForm.get("curso").value.id
            ,this.busquedaForm.get("turno").value.id).subscribe(data=>{
            this.filteredDivisiones = data;
        });
    }    

    filterAsignaturas(event){
        this.acadService.getAsignaturas(event.query).subscribe(data=>{
            this.filteredAsignaturas = data;
        });
    }
 
    onSubmit(valuesForm){
        console.log("onSubmit "+valuesForm);
        this.acadService.getXlsCompendio(
                valuesForm.asignatura.id
                ,valuesForm.periodoLectivo.id
                ,valuesForm.turno.id
                ,valuesForm.curso.id
                ,valuesForm.division.id
        ).subscribe(data=>{
            window.open('data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,' 
                +data
             );

        })
        return false; 
    }
    
}
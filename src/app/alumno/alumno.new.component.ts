import { Component, OnInit } from '@angular/core';
import {Validators,ValidationErrors,ValidatorFn,AbstractControl,FormControl,FormGroup,FormBuilder} from '@angular/forms';
import {MessageService} from 'primeng/api';
import { AlumnoService  } from './alumno.service';


@Component({
  selector: 'alumno-page',
  templateUrl: './alumno.new.component.html'
  //styleUrls: ['./alumno.component.css']
})
export class AlumnoNew implements OnInit {
  alumnoForm : FormGroup;
  filteredProvinces:any[]  ;
  filteredLocalidades:any[];
  filteredParentesco:any[];
  //KeyFilter.DEFAULT_MASKS['currencyRegex'] =  /^-?(?:0|[1-9]\d{0,2}(?:,?\d{3})*)(?:\.\d+)?$/;
  noSpecial: RegExp = /^[^<>1234567890!"#%&/$()=?¡[._*{}!]+$/;
  es: any;
  
  constructor(private fb:FormBuilder, private alumnoService:AlumnoService) {}

  ngOnInit(){
        this.es = {
            firstDayOfWeek: 0,
            dayNames: ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"],
            dayNamesShort: ["Dom", "Lun", "Mar", "Mie", "Jue", "Vie", "Sab"],
            dayNamesMin: ["Do","Lu","Ma","Mi","Ju","Vi","Sa"],
            monthNames: [ "Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre" ],
            monthNamesShort: [ "Ene", "Feb", "Mar", "Abr", "May", "Jun","Jul", "Ago", "Sep", "Oct", "Nov", "Dic" ],
            today: 'Hoy',
            clear: 'Limpiar',
            dateFormat: 'dd/mm/yy',
            weekHeader: 'Semana'
        };    
    this.alumnoForm = this.fb.group({
        dni:['',[Validators.required]],
        apellido:['',[Validators.required]],
        nombre: ['',[Validators.required]],
        provincia: [{id:24,nombre:'TUCUMAN'},[Validators.required]],
        localidad:['',[Validators.required]],
        direccion:['',[Validators.required]],
        cuil: ['',[Validators.required]],
        dniTutor: ['',[Validators.required]],
        apellidoTutor: ['',[Validators.required]],
        nombreTutor: ['',[Validators.required]],
        cuilTutor: ['',[Validators.required]],
        parentescoTutor: ['',[Validators.required]],
        telefono1:['',[Validators.required]],
        telefono2:['',[]],
        fotoDni:[false,[]],
        constanciaCuil:[false,[]],
        constancia6grado:[false,[]],
        actaNacimiento:[false,[]],
        constaciaRegular:[false,[]],
        foto4x4:[false,[]],
        fotoCarnetVac:[false,[]],
        fichaMedica:[false,[]],
        aptitudFisica:[false,[]],
        grupoSanguineo:[false,[]],
        fichaInscripcion:[false,[]],
        libreta6grado:[false,[]],
        fotocopiaLibroMatriz:[false,[]],
        fotocopiaDniTutor:[false,[]],
        constanciaCuilTutor:[false,[]],
        fechaNacimientoUnbinding:['',[Validators.required]]

    },{validator:this.provinceEntryRequired}
    );
  
    console.log('Provinica: '+this.alumnoForm.get('provincia').value);
    //this.alumnoForm.get('provincia').value.id=24;


  }

  onSubmit(valuesForm){
    console.log('ValuesForm: '+valuesForm);
    this.alumnoService.saveAlumno(valuesForm).subscribe(data=>{
        console.log("Resultado: "+data);   
    });

  }

  filterProvince(event){
     this.alumnoService.getProvincias(event.query).subscribe(data=>{
        this.filteredProvinces = data;
     });
  }

  filterParentesco(event){
    this.alumnoService.getParentesco().subscribe(data=>{
        this.filteredParentesco = data;
    });
  }  

  filterLocalidad(event){
    console.log('Provincia id: '+this.alumnoForm.get('provincia').value.id);
    console.log('Provincia nombre: '+this.alumnoForm.get('provincia').value.nombre);
    this.alumnoService.getLocalidades(this.alumnoForm.get('provincia').value.id
        ,event.query).subscribe(data=>{
            this.filteredLocalidades = data;
        });
  }

  provinceEntryRequired(control:AbstractControl){
      if(!control.get('provincia').value.id){
        control.get('provincia').setErrors({NoProvince:true});
      }
  }

  

}
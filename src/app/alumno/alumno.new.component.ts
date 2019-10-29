import { Component, OnInit } from '@angular/core';
import {Validators,ValidationErrors,ValidatorFn,AbstractControl,FormControl,FormGroup,FormBuilder} from '@angular/forms';
import {MessageService} from 'primeng/api';
import { AlumnoService  } from './alumno.service';
import {Router,ActivatedRoute} from "@angular/router";
import { CrudCodes } from "../util/crud.enum";
import { DatePipe } from '@angular/common';



@Component({
  selector: 'alumno-page',
  templateUrl: './alumno.new.component.html'
  //styleUrls: ['./alumno.component.css']
})
export class AlumnoNew implements OnInit {
  alumnoForm : FormGroup;
  headerTitle: string;
  
  filteredProvinces:any[]  ;
  filteredLocalidades:any[];
  filteredParentesco:any[];
  //KeyFilter.DEFAULT_MASKS['currencyRegex'] =  /^-?(?:0|[1-9]\d{0,2}(?:,?\d{3})*)(?:\.\d+)?$/;
  noSpecial: RegExp = /^[^<>1234567890!"#%&/$()=?¡[._*{}!]+$/;
  es: any;
  
  constructor(private fb:FormBuilder, private alumnoService:AlumnoService
        , private messageService:MessageService,private router:Router
        , private activeRoute:ActivatedRoute
        , private datepipe:DatePipe
        ) {}

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
        id:[null,[]],
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
        constanciaRegular:[false,[]],
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
  
    console.log('Provincia: '+this.alumnoForm.get('provincia').value);
    //this.alumnoForm.get('provincia').value.id=24;
    console.log('Parametros route mode: '+this.activeRoute.snapshot.params["mode"]);
    console.log('Parámetros route id: '+this.activeRoute.snapshot.params["id"]);
    this.headerTitle="Alta de Alumno";
    if(this.activeRoute.snapshot.params["mode"]==CrudCodes.EDIT){
       this.assignFormValues(this.activeRoute.snapshot.params["id"]);
       this.headerTitle="Modificación de Alumno";
    }
  }

  assignFormValues(id:number){
        /*dni:['',[Validators.required]],
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
        fechaNacimientoUnbinding:['',[Validators.required]]*/
        //this.alumnoForm.controls[''].setValue();
    
    this.alumnoService.getAlumno(id).then(data=>{
        
        /*this.alumnoForm.controls['fechaNacimientoUnbinding'].setValue(data.fechaNacimiento);        
        this.alumnoForm.controls['apellido'].setValue(data.apellido);
        this.alumnoForm.controls['nombre'].setValue(data.apellido);
        this.alumnoForm.controls['direccion'].setValue(data.direccion);
        this.alumnoForm.controls['cuil'].setValue(data.cuil);  
        if(data.localidad!=null){
          this.alumnoForm.controls['provincia'].setValue(data.localidad.provincia);                      
          this.alumnoForm.controls['localidad'].setValue(data.localidad);                      
        }

        /*this.alumnoForm.controls['dniTutor'].setValue(data.dniTutor);  
        this.alumnoForm.controls['apellidoTutor'].setValue(data.apellidoTutor);  
        this.alumnoForm.controls['dniTutor'].setValue(data.dniTutor);  
        this.alumnoForm.controls['apellidoTutor'].setValue(data.apellidoTutor);  
        this.alumnoForm.controls['nombreTutor'].setValue(data.nombreTutor);                  
        this.alumnoForm.controls['parentescoTutor'].setValue(data.parentescoTutor);       
        
        this.alumnoForm.controls['telefono1'].setValue(data.telefono1);                  
        this.alumnoForm.controls['telefono2'].setValue(data.telefono2);     
        
        this.alumnoForm.controls['fotoDni'].setValue(data.fotoDni);                  
        this.alumnoForm.controls['constanciaCuil'].setValue(data.constanciaCuil);                          
        this.alumnoForm.controls['constacia6grado'].setValue(data.constancia6grado);        
        
        this.alumnoForm.controls['actaNacimiento'].setValue(data.actaNacimiento);                  
        this.alumnoForm.controls['constanciaRegular'].setValue(data.constanciaRegular);                          
        this.alumnoForm.controls['constanciaRegular'].setValue(data.constanciaRegular); */ 
        //this.alumnoForm.controls['fechaNacimientoUnbinding'].setValue('31/01/1978');     
           
        this.alumnoForm.controls['fechaNacimientoUnbinding'].setValue(this.datepipe.transform(data.fechaNacimiento,'dd/MM/yyyy'));
        this.alumnoForm.patchValue(data) ;        
        console.log('Fecha nacimiento: '+data.fechaNacimiento);
        
    });      
  }

  onSubmit(valuesForm){
    console.log('ValuesForm: '+valuesForm);

    if(this.activeRoute.snapshot.params["mode"]==CrudCodes.EDIT){
        this.alumnoService.updateAlumno(valuesForm).subscribe(data=>{
            console.log('Data: '+data);
            if(data.success){
              this.messageService.add({severity:'info',summary:'Mensaje',detail:'Los datos fueron modificados correctamente'});
              this.router.navigateByUrl("/listalumno");
            }else
              this.messageService.add({severity:'error',summary:'Error',detail:data.msg});
        });
    }else{

        this.alumnoService.saveAlumno(valuesForm).subscribe(data=>{
            console.log("Resultado: "+data);   
            if(data){
              this.messageService.add({severity:'info',summary:'Mensaje',detail:'Los datos fueron registrados correctamente'});
              this.router.navigateByUrl("/listalumno");
            }else
              this.messageService.add({severity:'error',summary:'Error',detail:'Error al registrar la información'});          
        });
    }

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
import { Component, OnInit } from '@angular/core';
import {Validators,ValidationErrors,ValidatorFn,AbstractControl,FormControl,FormGroup,FormBuilder} from '@angular/forms';
import {MessageService} from 'primeng/api';
import { AlumnoService  } from './alumno.service';
import {Router,ActivatedRoute} from "@angular/router";
import { CrudCodes } from "../util/crud.enum";
import { DatePipe } from '@angular/common';
import { Observable, BehaviorSubject } from 'rxjs';
import {CustomValidators} from '../util/custom-validators';
import { debounceTime,distinctUntilChanged } from 'rxjs/operators';


@Component({
  selector: 'alumno-page',
  templateUrl: './alumno.new.component.html'
  //styleUrls: ['./alumno.component.css']
})
export class AlumnoNew implements OnInit {
  alumnoForm : FormGroup;
  headerTitle: string;
  private debounce: number = 400;
  
  filteredProvinces:any[]  ;
  filteredLocalidades:any[];
  filteredParentesco:any[];
  estudiosTutor= [
            {descripcion: 'Completo', code: 'ESTUDIO_COMPLETO'},
            {descripcion: 'Incompleto', code: 'ESTUDIO_INCOMPLETO'}
        ];

  //KeyFilter.DEFAULT_MASKS['currencyRegex'] =  /^-?(?:0|[1-9]\d{0,2}(?:,?\d{3})*)(?:\.\d+)?$/;
  noSpecial: RegExp = /^[^<>1234567890!"#%&/$()=?¡[._*{}!]+$/;
  es: any;

  private showLoading$:BehaviorSubject<boolean>;
  
  constructor(private fb:FormBuilder, public alumnoService:AlumnoService
        , private messageService:MessageService,private router:Router
        , private activeRoute:ActivatedRoute
        , private datepipe:DatePipe
        ) {
            this.showLoading$ = new BehaviorSubject(false);          
        }

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
        dni:['',[Validators.required],
                [(control: AbstractControl): Observable<ValidationErrors | null> => 
                        CustomValidators.validateDniAlumno$(control,this.alumnoService,false)]],        
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
        estudioPrimarioTutor_parm:[ {descripcion: 'Completo', code: 'ESTUDIO_INCOMPLETO'},[Validators.required]],
        estudioSecundarioTutor_parm:[ {descripcion: 'Completo', code: 'ESTUDIO_COMPLETO'},[Validators.required]],
        estudioUniversitarioTutor_parm:[ {descripcion: 'Completo', code: 'ESTUDIO_COMPLETO'},[Validators.required]],
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

    }//,{validator:this.provinceEntryRequired}
    );
  
    console.log('Provincia: '+this.alumnoForm.get('provincia').value);
    //this.alumnoForm.get('provincia').value.id=24;
    console.log('Parametros route mode: '+this.activeRoute.snapshot.params["mode"]);
    console.log('Parámetros route id: '+this.activeRoute.snapshot.params["id"]);
    this.headerTitle="Alta de Alumno";
    if(this.activeRoute.snapshot.params["mode"]==CrudCodes.EDIT){
       this.assignFormValues(this.activeRoute.snapshot.params["id"]);
       this.alumnoForm.controls['dni'].clearAsyncValidators();
       this.alumnoForm.controls['dni'].disable();

       this.headerTitle="Modificación de Alumno";
    }else{

      this.alumnoForm.get('dni').valueChanges
      .pipe(debounceTime(this.debounce), distinctUntilChanged())
      .subscribe(query=>{


              this.showLoading$.next(true);
              setTimeout(() => {
                    this.showLoading$.next(false);
              }, 1000);              


      });
    }
    
  }

  assignFormValues(id:number){
    
    this.alumnoService.getAlumno(id).then(data=>{
        
        console.log(data);
        if(data.dniTutor){
          if(data.dniTutor.toString().length<8)
            data.dniTutor='0'+data.dniTutor.toString();
        }
        if(data.fechaNacimiento){
          const fNac = data.fechaNacimiento;
          const fNacZ = fNac.substring(0,fNac.length - 1);
          
          const formattedDate = new Date(this.datepipe.transform(fNacZ));
          this.alumnoForm.controls['fechaNacimientoUnbinding'].setValue(formattedDate);
        }
        this.alumnoForm.controls["provincia"].setValue(data.localidad.provincia);
        this.alumnoForm.patchValue(data) ;        
        console.log('Id: '+this.alumnoForm.controls['id'].value);
        console.log('Fecha nacimiento: '+data.fechaNacimiento);

        
        
    });      
  }

  onSubmit(valuesForm){
    console.log('ValuesForm: '+valuesForm);

    if(this.activeRoute.snapshot.params["mode"]==CrudCodes.EDIT){
        this.alumnoService.updateAlumno(valuesForm).subscribe(data=>{
            console.log('Data Edit: '+data);
            if(data.success){
              this.messageService.add({severity:'info',summary:'Mensaje',detail:'Los datos fueron modificados correctamente'});
              this.router.navigateByUrl("/listalumno");
            }else
              this.messageService.add({severity:'error',summary:'Error',detail:data.msg});
        });
    }else{

        this.alumnoService.saveAlumno(valuesForm).subscribe(data=>{
            console.log("Resultado INS: "+data);   
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
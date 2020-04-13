import { TestBed,tick,fakeAsync, inject,ComponentFixture,async} from '@angular/core/testing';
//import {NgModule} from "@angular/core";
import { NO_ERRORS_SCHEMA  } from '@angular/core';
import { FormsModule,ReactiveFormsModule  } from "@angular/forms";
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { AlumnoNew } from './alumno.new.component';
import { AlumnoService } from './alumno.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CrudCodes } from "../util/crud.enum";
import { DatePipe } from '@angular/common';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {CheckboxModule} from 'primeng/checkbox';
import {CalendarModule} from 'primeng/calendar';
import {KeyFilterModule} from 'primeng/keyfilter';
import {InputMaskModule} from 'primeng/inputmask';
import {PanelModule} from 'primeng/panel';
import {Subject,of,Observable,Observer} from 'rxjs';
import {Router,ActivatedRoute} from "@angular/router";
import { CommonModule } from "@angular/common";
import { RestDataSource,REST_URL } from "../services/rest.datasource"; 
import { map } from 'rxjs/operators';
import {MessageService} from 'primeng/api';
import {Validators,ValidationErrors,ValidatorFn,AbstractControl,FormControl,FormGroup,FormBuilder} from '@angular/forms';
import { HttpClient, HttpHeaders } from "@angular/common/http";


//import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import {RouterTestingModule} from "@angular/router/testing"; 

let mockAlumnoData = {
   "id":1,
   "constanciaRegular":false,
   "nombreTutor":"nombre tutor",
   "fechaNacimiento":"1977-10-06T00:00:00Z",
   "dni":11111111,
   "fotocopiaLibroMatriz":false,
   "dniTutor":33333333,
   "fotocopiaDniTutor":false,
   "constanciaCuil":true,
   "foto4x4":false,
   "aptitudFisica":false,
   "apellido":"Borré",
   "fichaMedica":false,
   "fotoCarnetVac":false,
   "libreta6grado":false,
   "trabaja":false,
   "cuilTutor":"44-44.444.444-4",
   "constancia6grado":true,
   "apellidoTutor":"apellido tutor",
   "fotoDni":true,
   "cuil":"22-22.222.222-2",
   "fichaInscripcion":false,
   "planSocial":false,
   "localidad":{
      "id":1,
      "provincia":{
         "id":3,
         "nombre":"TUCUMAN"
      },
      "codigoPostal":400,
      "nombre":"SAN MIGUEL DE TUCUMAN"
   },
   "telefono2":"6666-6666666",
   "nombre":"Rafael",
   "parentescoTutor":{
      "id":1,
      "descripcion":"PADRE/MADRE"
   },
   "grupoSanguineo":false,
   "constanciaCuilTutor":false,
   "actaNacimiento":true,
   "telefono1":"5555-5555555",
   "direccion":"direccion alumno"
};

let mockProvinciasData =[{id:1,nombre:'Buenos Aires'},{id:2,nombre:'Catamarca'}
    ,{id:3,nombre:'Chaco'},{id:4,nombre:'Chubut'}] ;

let mockLocalidadedData = [{id:1,nombre:'San Ferando del valle de Catamarca'}
    ,{id:2,nombre:'Portozuelo'},{id:3,nombre:'El Rodeo'}];
const provinceFilter={id:2,nombre:'Catamarca'};

class MockAlumnoService  {
  getAlumno(id:number) {
    return of(mockAlumnoData).toPromise();
  }

  getLocalidades(provinciaId:number,search:any){
    return this.getWithFilter(mockLocalidadedData,search);
  }

  getProvincias(search:any){
    return this.getWithFilter(mockProvinciasData,search);
  }

  private getWithFilter(mockData:any,search:any):Observable<any>{
    
    if (search)
      return of(mockData)
                
                .pipe(map(data=>{
                    let r=[];
                    /*for(let i = 0;i<data.length;i++){

                        if(data[i].nombre.indexOf(search.toString())!=-1)
                          r.push(data[i]);
                    }*/
                    return r;
                }));
    else
      return of(mockData);
  }
}

describe('AlamnoNew, Alumno',()=>{
    let mockRoute: any = { snapshot: {}};

    mockRoute.parent = { params: new Subject<any>()};
    mockRoute.params = new Subject<any>();
    mockRoute.queryParams = new Subject<any>();


    let component: AlumnoNew;
    let element : HTMLElement;
    let fixture : ComponentFixture<AlumnoNew>;
    let debugElement: DebugElement;
    //let alumnoService : AlumnoService=new AlumnoService(new HttpClient(null),'');

    /*beforeEach(()=>{
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule
                ,ReactiveFormsModule,FormsModule,AutoCompleteModule
                ,RouterTestingModule
                ,KeyFilterModule,CheckboxModule
                ],
            providers: [AlumnoService,CrudCodes,DatePipe
                    ,{provide:ActivatedRoute,useValue:mockRoute}],
            schemas: [NO_ERRORS_SCHEMA]
        }).compileComponents();

    });*/
    beforeAll(()=>{
       // TestBed.initTestEnvironment(BrowserDynamicTestingModule
       //     , platformBrowserDynamicTesting());

    });

    beforeEach(() => {    

        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule
                ,FormsModule,ReactiveFormsModule,AutoCompleteModule
                ,BrowserAnimationsModule
                ,RouterTestingModule
                ,CalendarModule
                ,InputMaskModule
                
                ,KeyFilterModule,CheckboxModule,CommonModule
                ,PanelModule
                ],
            declarations:[AlumnoNew],    
            providers: [ DatePipe,MessageService
                    ,FormBuilder
                    ,{
                        provide: ActivatedRoute,
                        useValue: {snapshot: {params: {id: 1,mode:CrudCodes.EDIT}}}                 
                    }
                    ,{provide:AlumnoService,useClass:MockAlumnoService}//new AlumnoService(null,null)}
                    //,{provide:ActivatedRoute,useValue:mockRoute}
                    ,{ provide: REST_URL, useValue: `http://localhost:8080/smr/api` }
                    ],
            schemas: [NO_ERRORS_SCHEMA]
        }).compileComponents()


    });     

    it('',()=>{

    });


    it('should create with INS Mode and NOT call assignFormValues',()=>{
        TestBed.overrideProvider( ActivatedRoute, 
            {useValue: {snapshot: {params: {id: 1,mode:CrudCodes.INS}}}});
        TestBed.compileComponents();
        
        fixture = TestBed.createComponent(AlumnoNew);
        component = fixture.debugElement.componentInstance; // The component instantiation 
        element = fixture.nativeElement; // The HTML reference

              // spyOn(component.alumnoService, 'getAlumno').and.callThrough();
              //tick(2000); 
        spyOn(component,'assignFormValues').and.callThrough();              
        fixture.detectChanges();              
        expect(component.assignFormValues).not.toHaveBeenCalled()

    });

     it('should create with EDIT Mode and call assignFormValues',()=>{
              fixture = TestBed.createComponent(AlumnoNew);
              component = fixture.debugElement.componentInstance; // The component instantiation 
              element = fixture.nativeElement; // The HTML reference

              // spyOn(component.alumnoService, 'getAlumno').and.callThrough();
              //tick(2000); 
        spyOn(component,'assignFormValues').and.callThrough();              
        fixture.detectChanges();              
              
        expect(component).toBeTruthy();

        expect(component.assignFormValues).toHaveBeenCalled();
        
        expect(component.alumnoForm.controls['apellido'].value).not.toBeNull("el campo Id no debe ser nulo");

    });   

     it('should trigger event on select provincia by click in edit Mode',fakeAsync (()=>{
              fixture = TestBed.createComponent(AlumnoNew);
              component = fixture.debugElement.componentInstance; // The component instantiation 
              element = fixture.nativeElement; // The HTML reference

              // spyOn(component.alumnoService, 'getAlumno').and.callThrough();
              //tick(2000); 
        spyOn(component,'assignFormValues').and.callThrough();              
        fixture.detectChanges();              
              
        expect(component).toBeTruthy();

        const provinciaComp = fixture.debugElement.query(By.css('#provinciaId')).nativeElement;
        const buttonProvincia=provinciaComp.querySelector('button');
        buttonProvincia.click();
        //autoComp.triggerEventHandler('completeMethod',null);
        expect(component.filteredProvinces.length).toEqual(4);
        
        fixture.detectChanges();
        //console.log('Elemento: '+provinciaComp.innerHTML  );
        
        const itemList = fixture.debugElement.query(By.css('.ui-autocomplete-list-item')).nativeElement;
        itemList.click();
        //console.log('Elemento: '+itemList.innerHTML);
        expect(component.alumnoForm.controls['localidad'].value).toBeNull();
        

        


    }));   

     it('should trigger event keydown on provincia in edit Mode and filter list',fakeAsync(()=>{
              fixture = TestBed.createComponent(AlumnoNew);
              component = fixture.debugElement.componentInstance; // The component instantiation 
              element = fixture.nativeElement; // The HTML reference

              // spyOn(component.alumnoService, 'getAlumno').and.callThrough();
              //tick(2000); 
       spyOn(component.alumnoService,'getProvincias').and.callThrough();
        fixture.detectChanges();              
              
        expect(component).toBeTruthy();

      const provinciaComp = fixture.debugElement.query(By.css('#provinciaId')).nativeElement;

      const inputEl = provinciaComp.querySelector('input');
      inputEl.dispatchEvent(new Event('focus'));  
      inputEl.focus();
      inputEl.click();
      fixture.detectChanges();


      inputEl.value = "Ch";
      inputEl.dispatchEvent(new Event('keydown'));
      inputEl.dispatchEvent(new Event('input'));
      inputEl.dispatchEvent(new Event('keyup'));
      tick(300);
      
      fixture.detectChanges();
      expect(component.alumnoService.getProvincias).toHaveBeenCalled();                           
    }));       

    it('should filter Localidades by provincia id ',fakeAsync(()=>{
        TestBed.overrideProvider( ActivatedRoute, 
            {useValue: {snapshot: {params: {id: 1,mode:CrudCodes.INS}}}});
        TestBed.compileComponents();
        
        fixture = TestBed.createComponent(AlumnoNew);
        component = fixture.debugElement.componentInstance; // The component instantiation 
        element = fixture.nativeElement; // The HTML reference
        fixture.detectChanges();
        expect(component).toBeTruthy();
        component.alumnoForm.controls['provincia'].setValue(provinceFilter);
        const localidadComp = fixture.debugElement.query(By.css('#localidadId')).nativeElement;
        const buttonLocalidad = localidadComp.querySelector('button');
        buttonLocalidad.click();   
        //component.filteredLocalidades=mockLocalidadedData;

        expect(component.filteredLocalidades.length).toEqual(3);  
    }));

    it('should raise validation messages',()=>{
        TestBed.overrideProvider( ActivatedRoute, 
            {useValue: {snapshot: {params: {id: 1,mode:CrudCodes.INS}}}});
        TestBed.compileComponents();
        
        fixture = TestBed.createComponent(AlumnoNew);
        component = fixture.debugElement.componentInstance; // The component instantiation 
        element = fixture.nativeElement; // The HTML reference
        fixture.detectChanges();

        expect(component).toBeTruthy();
        const inputs = fixture.debugElement.query(By.css('input'));
        console.log(inputs);
        const el = fixture.debugElement.nativeElement;
        let apellido = el.querySelector('input[formControlName=apellido]');
        console.log(apellido);


});

});


/*
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { Type } from '@angular/core';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SendSmsComponent } from './send-sms/send-sms.component';
import { ApiService } from '@services/api.service';

describe('SendSmsComponent ', () => {
  let fixture: ComponentFixture<SendSmsComponent>;
  let app: SendSmsComponent;
  let httpMock: HttpTestingController;

  describe('SendSmsComponent ', () => {
    beforeEach(async () => {
      TestBed.configureTestingModule({
        imports: [
          HttpClientTestingModule,
        ],
        declarations: [
          SendSmsComponent,
        ],
        providers: [
          ApiService,
        ],
      });

      await TestBed.compileComponents();

      fixture = TestBed.createComponent(SendSmsComponent);
      app = fixture.componentInstance;
      httpMock = fixture.debugElement.injector.get<HttpTestingController>(HttpTestingController as Type<HttpTestingController>);

      fixture.detectChanges();
    });

    afterEach(() => {
      httpMock.verify();
    });

    it('test your http call', () => {
      const dummyUsers = [
        { name: 'John' },
      ];

      app.getUsers();
      const req = httpMock.expectOne(`${url}/users`);
      req.flush(dummyUsers);

      expect(req.request.method).toBe('GET');
      expect(app.users).toEqual(dummyUsers);
    });
  });
});

 */
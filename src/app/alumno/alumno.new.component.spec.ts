import { TestBed, inject,ComponentFixture,async} from '@angular/core/testing';
import {RouterTestingModule} from "@angular/router/testing";
import { NO_ERRORS_SCHEMA  } from '@angular/core';
import { FormsModule,ReactiveFormsModule  } from "@angular/forms";
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
import {Subject} from 'rxjs';
import {Router,ActivatedRoute} from "@angular/router";
import { CommonModule } from "@angular/common";

describe('AlamnoNew, Create and Edit Alumno',()=>{
    let mockRoute: any = { snapshot: {}};

    mockRoute.parent = { params: new Subject<any>()};
    mockRoute.params = new Subject<any>();
    mockRoute.queryParams = new Subject<any>();


    let component: AlumnoNew;
    let element : HTMLElement;
    let fixture : ComponentFixture<AlumnoNew>;
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

    beforeEach(() => {    
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule
                ,ReactiveFormsModule,FormsModule,AutoCompleteModule
                ,RouterTestingModule
                ,BrowserAnimationsModule
                ,KeyFilterModule,CheckboxModule,CommonModule
                ],
            declarations:[AlumnoNew],    
            providers: [AlumnoService//,CrudCodes,DatePipe
                    //,{provide:ActivatedRoute,useValue:mockRoute}
                    ],
            schemas: [NO_ERRORS_SCHEMA]
        });

        fixture = TestBed.createComponent(AlumnoNew);
        component = fixture.componentInstance; // The component instantiation 
        element = fixture.nativeElement; // The HTML reference
    });     

    it('should create with Mode Alta',()=>{
        mockRoute.parent.params.next({ mode: CrudCodes.EDIT });
        expect(component).toBeTruthy();
    });
});




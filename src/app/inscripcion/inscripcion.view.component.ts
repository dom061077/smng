import {Component,OnInit} from '@angular/core';
import {Inscripcion} from './inscripcion.model';
import {InscripcionService} from './inscripcion.service';
import {Router,ActivatedRoute} from '@angular/router';
import * as moment from 'moment';
import {ConfirmationService} from 'primeng/api';
import {MessageService} from 'primeng/api';

@Component({
    templateUrl: './inscripcion.view.component.html'
})

export class InscripcionView implements OnInit {
    insc:any;
    fechaInsc:string;

    constructor(private inscService:InscripcionService,private router:Router
        ,private actRoute:ActivatedRoute,
         private confirmationService: ConfirmationService
         ,private messageService: MessageService){

    }

    ngOnInit(){
        console.log('OnInit');
        this.inscService.getInscripcion(this.actRoute.snapshot.params["id"]).subscribe(data=>{
            this.insc = data;
            this.fechaInsc = moment(data.fecha).locale('es').format('L');
            

        });
    }

    onClickAnular(){
        console.log('Click anular');
        this.confirmationService.confirm({
            message: 'Are you sure that you want to proceed?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.messageService.add({severity:'info',summary:'Mensaje',detail:'La inscripción fue anulada correctamente'});
            },
            reject: () => {
                this.messageService.add({severity:'info',summary:'Mensaje',detail:'Los datos fueron registrados correctamente'});
            },
             key: "positionDialog"
        });        
    }
}
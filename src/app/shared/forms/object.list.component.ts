import { Component,OnInit } from '@angular/core';
import { GenericService } from '../../services/generic.service';
import { FormControl } from '@angular/forms';
import { debounceTime,distinctUntilChanged } from 'rxjs/operators';
import { Object } from '../../model/object.model';
import {SelectItem} from 'primeng/api';

@Component({
    templateUrl:'./object.list.component.html'
})
export class ObjectListForm implements OnInit{
    objects : Object[];
    sortOptions:SelectItem[];
    totalLazyObjectLength:number;
    public searchControl : FormControl;
    private debounce: number = 400;
    ascSort:boolean;//true= orden ascendente, false= orden descendente
    sortKey:string;
    first:number;
    rows:number;

    constructor (protected genericService:GenericService
            ,protected apiCountUrl:string,protected apiObjectUrl:string){

    }

    ngOnInit(){
        this.ascSort=true;
        this.sortOptions = [
            {label: 'Apellido y nombre', value: 'apellidonombre'},
            {label: 'Nombre de Usuario', value: 'username'},
            {label: 'Identificador',value:'id'}
        ];

        
        this.genericService.getObjectCount(this.apiCountUrl,"").subscribe((data:any)=>{
            
            this.totalLazyObjectLength = data;
            console.log("Total de registros: "+this.totalLazyObjectLength);
        });          

        this.searchControl = new FormControl('');
        this.searchControl.valueChanges
        .pipe(debounceTime(this.debounce), distinctUntilChanged())
        .subscribe(query=>{
            
            this.genericService.getObjects(this.apiObjectUrl
                ,this.searchControl.value,0,10,this.sortKey
                ,(this.ascSort?'asc':'desc')).subscribe(data=>{
                this.objects = data;


            })
            this.genericService.getObjectCount(this.apiCountUrl,this.searchControl.value).toPromise().then(data=>{
                this.totalLazyObjectLength = data;
            });   
        });
     
                 
    }

    loadData(event){
        console.log('SorKey: '+this.sortKey);
        this.first = event.first;
        this.rows = event.rows;
        this.genericService.getObjects(this.apiObjectUrl,"",event.first,event.rows
            ,this.sortKey,(this.ascSort?'asc':'desc')).subscribe(data=>{
                this.objects = data;
            });
    }
    

    onSortChange(event){
        console.log('Valor del campo seleccionado: '+event.value);
        
        this.genericService.getObjects(this.apiObjectUrl,this.searchControl.value
            ,this.first,this.rows,this.sortKey,(this.ascSort?'asc':'desc'))
            .subscribe(data=>{
                this.objects = data;
            });
    }

}
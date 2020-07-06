import {Object} from '../model/object.model';

export class CargaExamen extends Object{
    constructor (public id:number , public apellido:string
        ,nombre:string,curso:string,division:string
        ,periodoEvaluacion:string,promedio:number
        ,complementario:number
        ){
            super();
    }
}
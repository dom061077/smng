import {Object} from '../model/object.model';

export class Inscripcion extends Object{
    constructor(public id:number,public alumno:string
        ,public periodoLectivo:number, public fecha:Date){
            super();
        }
}
export class Alumno{
   constructor(
    public id:number,
    public dni:number,
    public cuil:string,
    public apellido:string,
    public nombre:string,
    public localidad:Localidad
    ){}
}

export class Localidad{
    constructor(
        public id:number,
        public nombre:string,
        public provincia:Provincia
    ){}
}

export class Provincia{
    constructor(
        public id:number,
        public nombre:string
    ){}
}
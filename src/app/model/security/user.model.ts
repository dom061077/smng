export class User{
    constructor(public id?: number,
            public username?:string,
            public apellido?:string,
            public nombre?:string,
            public roles?:Array<string>

        ){}
}
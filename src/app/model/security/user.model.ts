export class User{
    constructor(public id?: number,
            public username?:string,
            public roles?:Array<string>,

            public apellido?:string,
            public nombre?:string,

            public token_type?:string,
            public access_token?:string,
            public refresh_token?:string



        ){}
}
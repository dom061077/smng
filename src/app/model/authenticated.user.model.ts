export class AuthenticatedUser{
    constructor(public username?:string,
        public roles?:Array<string>,
        public token_type?:string,
        public access_token?:string,
        public expires_in?:number,
        public refresh_token?:string
    ){}
}

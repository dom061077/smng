import { Component,OnInit } from "@angular/core";
import {Validators,FormControl,FormGroup,FormBuilder} from '@angular/forms';
import {MessageService} from 'primeng/api';

@Component({
    //selector: 'login-page',
    templateUrl: './change.password.component.html',
    providers: [MessageService]
    
})

export class ChangePasswordComponent  implements OnInit{
    changePassForm: FormGroup;
    submitted: boolean;
    constructor(private fb: FormBuilder, private messageService: MessageService) {
        console.log("Constructor changepassword");
    }
    ngOnInit() {
        /*this.changePassForm = this.fb.group({
            'passwordAnterior': new FormControl('', Validators.required),
            'password': new FormControl('',Validators.required),
            'confirmPassword': new FormControl('',Validators.required)
            //'lastname': new FormControl('', Validators.required),
            //'password': new FormControl('', Validators.compose([Validators.required, Validators.minLength(6)])),
            //'description': new FormControl(''),
            //'gender': new FormControl('', Validators.required)
        });*/
        this.changePassForm = this.fb.group({
            passwordAnterior:[],
            password:[],
            confirmPassword:[]
        },{});

       /* this.genders = [];
        this.genders.push({label:'Select Gender', value:''});
        this.genders.push({label:'Male', value:'Male'});
        this.genders.push({label:'Female', value:'Female'});*/
    }
    onSubmit(value: string) {
        this.submitted = true;
        this.messageService.add({severity:'info', summary:'Success', detail:'Form Submitted'});
    }    

    validarNewPassword(){

    }




}
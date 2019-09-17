import { Component,OnInit } from "@angular/core";
import {Validators,ValidationErrors,ValidatorFn,AbstractControl,FormControl,FormGroup,FormBuilder} from '@angular/forms';
import {MessageService} from 'primeng/api';
import {CustomValidators} from '../util/custom-validators';
import { AuthenticationService } from './authentication.service';


@Component({
    //selector: 'login-page',
    templateUrl: './change.password.component.html',
    providers: [MessageService]
    
})

export class ChangePasswordComponent  implements OnInit{
    changePassForm: FormGroup;
    submitted: boolean;
    constructor(private fb: FormBuilder, private messageService: MessageService
        ,private authService:AuthenticationService) {
        console.log("Constructor changepassword");
    }
    ngOnInit() {
        this.changePassForm = this.fb.group({
            passwordAnterior: new FormControl('', Validators.required),
            password: new FormControl('',Validators.required),
            confirmPassword: 
                new FormControl('',[Validators.required])
            //'lastname': new FormControl('', Validators.required),
            //'password': new FormControl('', Validators.compose([Validators.required, Validators.minLength(6)])),
            //'description': new FormControl(''),
            //'gender': new FormControl('', Validators.required)
             }
            ,{validator: CustomValidators.passwordMatchValidator}
        );


       /* this.genders = [];
        this.genders.push({label:'Select Gender', value:''});
        this.genders.push({label:'Male', value:'Male'});
        this.genders.push({label:'Female', value:'Female'});*/
    }
    onSubmit(value: string) {
        this.submitted = true;
        //this.authService.changePassword();
        this.messageService.add({severity:'info', summary:'Success', detail:'Form Submitted'});
    }    




}
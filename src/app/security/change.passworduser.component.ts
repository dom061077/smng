import { Component,OnInit } from "@angular/core";
import {Validators,ValidationErrors,ValidatorFn,AbstractControl,FormControl,FormGroup,FormBuilder} from '@angular/forms';
import {MessageService} from 'primeng/api';
import {CustomValidators} from '../util/custom-validators';
import { AuthenticationService } from './authentication.service';
import {Router,ActivatedRoute} from "@angular/router";
import { CrudCodes } from '../util/crud.enum';


@Component({
    //selector: 'login-page',
    templateUrl: './change.password.component.html',
    providers: [MessageService]
    
})

export class ChangePasswordComponent  implements OnInit{
    changePassForm: FormGroup;
    submitted: boolean;
    headerTitle: string;
    constructor(private fb: FormBuilder, private messageService: MessageService
        ,private authService:AuthenticationService,private router:Router
        ,private activeRoute:ActivatedRoute
        ) {
        console.log("Constructor changepassword");
    }
    ngOnInit() {
        this.changePassForm = this.fb.group({
            id:[null,[]],
            username:['',[]],
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
        this.headerTitle = 'Cambia tu propia contraseña';
        if(this.activeRoute.snapshot.params["mode"]==CrudCodes.EDIT){
            this.headerTitle = 'Modificación de Contraseña de Usuario';      
            this.assignFormValues(this.activeRoute.snapshot.params["id"]);          
        }

       /* this.genders = [];
        this.genders.push({label:'Select Gender', value:''});
        this.genders.push({label:'Male', value:'Male'});
        this.genders.push({label:'Female', value:'Female'});*/
    }

    assignFormValues(id:number){
        this.authService.getUser(id).then(data=>{
            this.changePassForm.patchValue(data);
        });

        
    }

    onSubmit(valuesForm: any) {
        this.submitted = true;
        if(this.activeRoute.snapshot.params["mode"]==CrudCodes.EDIT){
            this.authService.changeUserPassword(
                valuesForm.id,valuesForm.password
            ).subscribe(data=>{
                if(data.success){
                    this.messageService.add({severity:'info',summary:'Mensaje',detail:'Los datos fueron modificados correctamente'});
                    this.router.navigateByUrl("/listuser");
                }else
                    this.messageService.add({severity:'error',summary:'Error',detail:data.msg});

            },
            error=>{
                this.messageService.add({severity:'error',summary:'Error',detail:'ERROR EN HTTP'});
            });
        }

    }    




}
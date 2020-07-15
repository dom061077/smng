import { ValidationErrors, ValidatorFn, AbstractControl } from '@angular/forms';
import { AuthenticationService  } from '../security/authentication.service';
import { AlumnoService } from '../alumno/alumno.service';
import { Observable,of } from 'rxjs';
import { map } from 'rxjs/operators';

export class CustomValidators {
  static patternValidator(regex: RegExp, error: ValidationErrors): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (!control.value) {
        // if control is empty return no error
        return null;
      }

      // test the value of the control against the regexp supplied
      const valid = regex.test(control.value);

      // if true, return no error (no error), else return error passed in the second parameter
      return valid ? null : error;
    };
  }

  static passwordMatchValidator(control: AbstractControl) {
    const password: string = control.get('password').value; // get password from our password form control
    const confirmPassword: string = control.get('confirmPassword').value; // get password from our confirmPassword form control
    // compare is the password math

    if (password !== confirmPassword) {
      // if they don't match, set an error in our confirmPassword form control
      control.get('confirmPassword').setErrors({ NoPassswordMatch: true });
    }
  }

  static validateOldPassword(authService:AuthenticationService){
      
      return (control:AbstractControl) =>{
                return authService.validateOldPassword(control.value);
            };
  }

  /*static validateDniAlumno(alumnoService:AlumnoService):ValidatorFn{
      return (control:AbstractControl): {[key:string]:boolean}|null=>{
                //const dniInt = control.value.split('.').join('').split('_').join('');
                return {
                  'dniExist':true//(alumnoService.getAlumnoByDni(control.value.id)?false:true)
                };
                
      }
  }*/
  static validatePromedio(control:AbstractControl)
    : Observable<ValidationErrors | null>{
      let val = control.value;
      if(val === null || val === '')
        return of(null);
      if(!val.toString().match(/^\s*(?=.*[1-9])\d*(?:\.\d{1,2})?\s*$/)
          || val<0 || val>10)  
        return of({'invalidPromedio':true});
      return of(null);  
  }

  static validateDniAlumno$(control: AbstractControl
      ,alumnoService:AlumnoService,validaExiste:boolean)
      : Observable<ValidationErrors | null>{
        if(control)
          return alumnoService.getAlumnoByDni(control.value).pipe(map(
              response=>{
                if(validaExiste){
                    if(!response){
                      return {dniExist:'El D.N.I no existe'};
                      
                    }else{
                      return null;
                    }
                }else{
                    if(response){
                      return {dniExist:'El D.N.I ya existe'};
                      
                    }else{
                      return null;
                    }
                }
            }));
                   
        else
          return null;           
                
            
  }

  /*public checkFruitIsApproved$(control: AbstractControl,alumnoService:AlumnoService): 
      Observable<ValidationErrors | null> {
    return this.alumnoService.getAlumnoByDni(control.value)
      /// CODE OMITTED //
      }*/

  
}
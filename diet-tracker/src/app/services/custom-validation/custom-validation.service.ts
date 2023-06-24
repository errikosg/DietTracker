import { Injectable } from '@angular/core';
import { AbstractControl, ValidatorFn } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CustomValidationService {

  passwordMatch(controlName: string, matchControlName: string): ValidatorFn {
    return (controls: AbstractControl) => {
      const control= controls.get(controlName);
      const matchControl = controls.get(matchControlName);

      // do match + validation here!
      if (!matchControl?.errors && control?.value !== matchControl?.value) {
        matchControl?.setErrors({
          matching: {
            actualValue: matchControl?.value,
            requiredValue: control?.value
          }
        });
        return { matching:true };
      }
      return null;
    }
  }
}

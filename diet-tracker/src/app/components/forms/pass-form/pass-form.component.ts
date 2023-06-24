import { Component } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { take, map, switchMap } from 'rxjs';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CustomValidationService } from 'src/app/services/custom-validation/custom-validation.service';


@Component({
  selector: 'app-pass-form',
  templateUrl: './pass-form.component.html',
  styleUrls: ['./pass-form.component.css']
})
export class PassFormComponent {
  currentUser: User = null;
  passForm: FormGroup;
  error: string = null;

  constructor(
    private authService: AuthService,
    private customValidation: CustomValidationService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    // get current user
    this.authService.currentUser$.pipe(
      take(1),
      map(user => {
        this.currentUser = user

        // initialize form
        this.passForm = new FormGroup({
          'currentPass': new FormControl(null, Validators.required),
          'newPass': new FormControl(null, [Validators.required]),
          'confirmPass': new FormControl(null, [Validators.required])
        }, { validators: [this.customValidation.passwordMatch('newPass','confirmPass')] })
      })
    ).subscribe()
  }

  get passFormControls() {
    return this.passForm.controls
  }

  onSubmit(formDirective: FormGroupDirective) {
    if(this.passForm.valid){
      const { currentPass, newPass, confirmPass } = this.passForm.value;
      // password match check (again)
      if(newPass !== confirmPass){
        this.error = "Please confirm new password correctly";
      }
      else{
        // current password check
        this.authService.confirmPassword(currentPass)
          .pipe(
            switchMap(() => {
              return this.authService.updatePassword(newPass);
            })
          )
        .subscribe({
          next: () => this.nextHandler(formDirective),
          error: (err) => this.errorHandler(err)
        })
      }
    }
  }

  nextHandler(formDirective: FormGroupDirective) {
    this.error = null;
    this.passForm.reset();
    formDirective.resetForm();
    this.snackBar.open("Password updated successfully", null, { duration: 1500 });

  }

  errorHandler(err: string){
    this.error = err;
  }
}

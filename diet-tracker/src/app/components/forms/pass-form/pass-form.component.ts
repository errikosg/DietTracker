import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { take, map } from 'rxjs';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';
import { CustomValidationService } from 'src/app/services/custom-validation.service';

@Component({
  selector: 'app-pass-form',
  templateUrl: './pass-form.component.html',
  styleUrls: ['./pass-form.component.css']
})
export class PassFormComponent {
  currentUser: User = null;
  passForm: FormGroup;

  constructor(
    private authService: AuthService,
    private customValidation: CustomValidationService
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

  onSubmit() {
    console.log(this.passForm.value)
    console.log(this.passForm.valid)
  }
}

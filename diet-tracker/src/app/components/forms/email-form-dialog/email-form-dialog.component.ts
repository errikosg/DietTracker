import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-email-form-dialog',
  templateUrl: './email-form-dialog.component.html',
  styleUrls: ['./email-form-dialog.component.css']
})
export class EmailFormDialogComponent implements OnInit{
  authorized: boolean = false;
  password: string = "";
  error: string = null;
  emailForm: FormGroup;

  constructor(
    private authService: AuthService,
    public dialogRef: MatDialogRef<EmailFormDialogComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public loadedUser: User
  ) {}

  ngOnInit(): void {
    this.emailForm = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email])
    })
  }

  onEnterPassword() {
    if(this.password === "") {
      this.error = "Please enter your password"
    }
    else{
      this.authService.confirmPassword(this.password).subscribe({
        next: () => this.nextHandler(),
        error: (err) => this.errorHandler(err)
      })
    }
  }

  nextHandler() {
    this.error = null;
    this.authorized = true;
  }

  errorHandler(err: string){
    this.error = err;
  }

  onSubmit() {
    if(this.emailForm.valid){
      const {email} = this.emailForm.value
      this.authService.updateEmail(email).subscribe(() => {
        this.dialogRef.close({ event: 'submit'});
      })
    }
  }

  onCancel() {
    this.dialogRef.close({ event: 'cancel'});
  }
}

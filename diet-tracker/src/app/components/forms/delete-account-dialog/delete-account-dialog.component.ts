import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-delete-account-dialog',
  templateUrl: './delete-account-dialog.component.html',
  styleUrls: ['./delete-account-dialog.component.css']
})
export class DeleteAccountDialogComponent implements OnInit{
  passForm: FormGroup
  error: string = null;

  constructor(
    private authService: AuthService,
    public dialogRef: MatDialogRef<DeleteAccountDialogComponent>
  ){}

  ngOnInit(): void {
    this.passForm = new FormGroup({
      password: new FormControl(null, Validators.required)
    })
  }

  onSubmit(){
    console.log(this.passForm.value)
    if(this.passForm.valid) {
      const {password} = this.passForm.value
      this.authService.confirmPassword(password).subscribe({
        next: () => this.nextHandler(),
        error: (err) => this.errorHandler(err)
      })
    }
  }

  nextHandler() {
    this.error = null;
    this.dialogRef.close({ event: 'submit'});
  }

  errorHandler(err: string){
    this.error = err;
  }

  onCancel() {
    this.dialogRef.close({ event: 'cancel'});
  }
}

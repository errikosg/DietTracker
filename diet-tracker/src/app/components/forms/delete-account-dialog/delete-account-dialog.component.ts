import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-delete-account-dialog',
  templateUrl: './delete-account-dialog.component.html',
  styleUrls: ['./delete-account-dialog.component.css']
})
export class DeleteAccountDialogComponent {
  password:string = null;
  error: string = null;

  constructor(
    private authService: AuthService,
    public dialogRef: MatDialogRef<DeleteAccountDialogComponent>
  ){}

  onEnterPassword(){
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
    this.dialogRef.close({ event: 'submit'});
  }

  errorHandler(err: string){
    this.error = err;
  }

  onCancel() {
    this.dialogRef.close({ event: 'cancel'});
  }
}

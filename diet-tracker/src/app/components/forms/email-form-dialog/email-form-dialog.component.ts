import { Component, Inject, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-email-form-dialog',
  templateUrl: './email-form-dialog.component.html',
  styleUrls: ['./email-form-dialog.component.css']
})
export class EmailFormDialogComponent {
  authorized: boolean = false;
  password: string = null;

  constructor(
    public dialogRef: MatDialogRef<EmailFormDialogComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public loadedUser: User
  ) {}

  onEnterPassword() {
    console.log(this.password)
    // authservice...... continue
  }

  onCancel() {
    this.dialogRef.close({ event: 'cancel'});
  }
}

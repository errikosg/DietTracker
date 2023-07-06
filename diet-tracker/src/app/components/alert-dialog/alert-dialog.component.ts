import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-alert-dialog',
  templateUrl: './alert-dialog.component.html',
  styleUrls: ['./alert-dialog.component.css']
})
export class AlertDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<AlertDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public alertText: string
  ){}

  onAccept() {
    this.dialogRef.close({ 'event': 'submit' })
  }

  onCancel() {
    this.dialogRef.close({ 'event': 'cancel' })
  }
}

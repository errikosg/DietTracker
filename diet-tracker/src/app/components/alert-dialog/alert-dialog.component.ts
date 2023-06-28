import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MacroGoalService } from 'src/app/services/macro-goal/macro-goal.service';

@Component({
  selector: 'app-alert-dialog',
  templateUrl: './alert-dialog.component.html',
  styleUrls: ['./alert-dialog.component.css']
})
export class AlertDialogComponent {

  constructor(
    private macroGoalService: MacroGoalService,
    public dialogRef: MatDialogRef<AlertDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public alertText: string
  ){}

  onAccept() {
    // delete macros
    this.macroGoalService.deleteMacroGoals().subscribe(res => {
      this.dialogRef.close({ 'event': 'submit' })
    })
  }

  onCancel() {
    this.dialogRef.close({ 'event': 'cancel' })
  }
}

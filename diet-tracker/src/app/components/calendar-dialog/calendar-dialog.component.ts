import { Component, Inject, Optional } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-calendar-dialog',
  templateUrl: './calendar-dialog.component.html',
  styleUrls: ['./calendar-dialog.component.css']
})
export class CalendarDialogComponent {

  constructor(
    private dialogRef: MatDialogRef<CalendarDialogComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedDate: Date
  ){}


  onSelect(date: Date) {
    if(date !== this.selectedDate)
      this.dialogRef.close({ event: 'submit', data: date });
  }
}

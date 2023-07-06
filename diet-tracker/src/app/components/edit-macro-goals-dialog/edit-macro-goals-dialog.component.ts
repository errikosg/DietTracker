import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MacroGoals } from 'src/app/models/MacroGoals';
import { MacroGoalService } from 'src/app/services/macro-goal/macro-goal.service';

@Component({
  selector: 'app-edit-macro-goals-dialog',
  templateUrl: './edit-macro-goals-dialog.component.html',
  styleUrls: ['./edit-macro-goals-dialog.component.css']
})
export class EditMacroGoalsDialogComponent implements OnInit{
  macrosForm: FormGroup;
  updateOption: boolean = false;

  constructor(
    private macroGoalService: MacroGoalService,
    public dialogRef: MatDialogRef<EditMacroGoalsDialogComponent>,
  ) {}

  ngOnInit(): void {
    this.macrosForm = new FormGroup({
      calories: new FormControl(0, Validators.required),
      protein: new FormControl(0, Validators.required),
      fat: new FormControl(0, Validators.required),
      carbs: new FormControl(0, Validators.required)
    })
    this.macroGoalService.getMacroGoals().subscribe(macros => {
      if(macros !== null){
        this.updateOption = true;
        this.macrosForm.setValue({
          calories: macros.calories,
          protein: macros.protein,
          fat: macros.fat,
          carbs: macros.carbs
        })
      }
    })
  }

  onSubmit() {
    if(this.macrosForm.valid){
      if(this.updateOption){
        // update existing goals
        this.macroGoalService.updateMacroGoals(this.macrosForm.value).subscribe(() => {
          this.dialogRef.close({ event: 'submit' })
        })
      }
      else{
        // create new goals
        this.macroGoalService.createMacroGoals(this.macrosForm.value).subscribe(() => {
          this.dialogRef.close({ event: 'submit' })
        })
      }
    }
  }

  onCancel() {
    this.dialogRef.close({ event: 'cancel'});
  }
}

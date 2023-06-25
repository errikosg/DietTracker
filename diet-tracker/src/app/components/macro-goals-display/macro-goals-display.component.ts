import { Component, OnInit } from '@angular/core';
import { MacroGoals } from 'src/app/models/MacroGoals';
import { MacroGoalService } from 'src/app/services/macro-goal/macro-goal.service';

@Component({
  selector: 'app-macro-goals-display',
  templateUrl: './macro-goals-display.component.html',
  styleUrls: ['./macro-goals-display.component.css']
})
export class MacroGoalsDisplayComponent implements OnInit{
  userMacroGoals: MacroGoals = {
    calories: 0,
    protein: 0,
    fat: 0,
    carbs:0
  };

  constructor(
    private macroGoalService: MacroGoalService
  ){}

  ngOnInit(): void {
    this.macroGoalService.getMacroGoals().subscribe(macros => {
      this.userMacroGoals = macros
    })
  }
}

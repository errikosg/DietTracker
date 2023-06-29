import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MacroGoals } from 'src/app/models/MacroGoals';
import { MacroGoalService } from 'src/app/services/macro-goal/macro-goal.service';

@Component({
  selector: 'app-macro-goals-display',
  templateUrl: './macro-goals-display.component.html',
  styleUrls: ['./macro-goals-display.component.css']
})
export class MacroGoalsDisplayComponent implements OnInit, OnDestroy{
  userMacroGoals: MacroGoals = {
    calories: 0,
    protein: 0,
    fat: 0,
    carbs:0
  };
  alertText: string = null;
  isLoading: boolean = true;
  subscription: Subscription

  constructor(
    private macroGoalService: MacroGoalService
  ){}

  ngOnInit(): void {
    // set up macro-goal subscription
    this.subscription = this.macroGoalService.macroGoals$.subscribe(macros => {
      if(macros !== null){
        this.userMacroGoals = macros
        this.alertText = null;
      }
      else{
        this.alertText = "You haven't added daily Macro Goals yet!"
      }
      this.isLoading = false;
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
}

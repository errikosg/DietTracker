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
  initialization: boolean = true;
  subscription: Subscription

  constructor(
    public macroGoalService: MacroGoalService
  ){}

  ngOnInit(): void {
    console.log(this.alertText)
    this.macroGoalService.getMacroGoals().subscribe(macros => {
      if(macros !== null){
        this.userMacroGoals = macros
        this.alertText = null;
      }
      else{
        this.alertText = "You haven't added daily Macro Goals yet!"
      }
      this.initialization = false;
    })

    // set up macro-goal subscription
    this.subscription = this.macroGoalService.macroGoals$.subscribe(macros => {
      if(!this.initialization){
        if(macros !== null){
          this.userMacroGoals = macros
          this.alertText = null;
        }
        else{
          this.alertText = "You haven't added daily Macro Goals yet!"
        }
      }
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
}

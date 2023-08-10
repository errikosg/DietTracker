import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, switchMap } from 'rxjs';
import { Consumptions } from 'src/app/models/Consumption';
import { MacroGoals } from 'src/app/models/MacroGoals';
import { ConsumptionService } from 'src/app/services/consumption/consumption.service';
import { MacroGoalService } from 'src/app/services/macro-goal/macro-goal.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy{
  userMacroGoals: MacroGoals = {
    calories: 0,
    protein: 0,
    fat: 0,
    carbs:0
  };
  macroGoalsAdded: boolean = false;
  subscription: Subscription;
  consumptions: Consumptions = null;
  remainCalories: number = null;

  constructor(
    private macroGoalService: MacroGoalService,
    private consumptionService: ConsumptionService
  ) {}

  ngOnInit(): void {
    // chain macro goals and consumptions
    this.subscription = this.macroGoalService.macroGoals$.pipe(
      switchMap(macros => {
        if(macros !== null){
          this.userMacroGoals = macros
          this.macroGoalsAdded = true;
        }
        return this.consumptionService.getTodaysConsumptions()
      })
    ).subscribe(cons => {
        if(cons !== null){
          this.consumptions = cons;
          this.remainCalories = this.calcRemainCalories()
        }
        else{
          this.remainCalories = this.userMacroGoals.calories;
        }
    })
  }

  calcRemainCalories() {
    const remain = this.userMacroGoals.calories - this.consumptions.totalMacros.calories
    return remain > 0 ? remain : 0;
  }

  getCalorieColor() {
    return this.remainCalories>0 ? 'var(--check-color)' : 'var(--warn-color)'
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
}

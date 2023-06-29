import { Component, Input, OnInit } from '@angular/core';
import { Nutrients } from 'src/app/models/Nutrients'
import { Subscription } from 'rxjs';
import { MacroGoals } from 'src/app/models/MacroGoals';
import { MacroGoalService } from 'src/app/services/macro-goal/macro-goal.service';

@Component({
  selector: 'app-food-info',
  templateUrl: './food-info.component.html',
  styleUrls: ['./food-info.component.css']
})
export class FoodInfoComponent implements OnInit{
  @Input() nutrients: Nutrients
  subscription: Subscription
  macroGoals: MacroGoals = {
    calories: 0,
    protein: 0,
    carbs: 0,
    fat:0
  };
  foodPercentages = {
    calories: 0,
    protein: 0,
    carbs: 0,
    fat:0
  }

  constructor(
    private macroGoalService: MacroGoalService
  ) {}

  ngOnInit(): void {
    this.subscription = this.macroGoalService.macroGoals$.subscribe(macros => {
      if(macros !== null){
        this.macroGoals = macros;
        this.calculatePercentages();
      }
    })
  }

  calculatePercentages() {
    const {calories,carbs,fat,protein} = this.nutrients;
    this.foodPercentages.calories = (calories/this.macroGoals.calories)*100;
    this.foodPercentages.carbs = (carbs/this.macroGoals.carbs)*100;
    this.foodPercentages.fat = (fat/this.macroGoals.fat)*100;
    this.foodPercentages.protein = (protein/this.macroGoals.protein)*100;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
}

import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Nutrients } from 'src/app/models/Nutrients'
import { Subscription } from 'rxjs';
import { MacroGoals } from 'src/app/models/MacroGoals';
import { MacroGoalService } from 'src/app/services/macro-goal/macro-goal.service';

@Component({
  selector: 'app-food-info',
  templateUrl: './food-info.component.html',
  styleUrls: ['./food-info.component.css']
})
export class FoodInfoComponent implements OnInit, OnChanges {
  @Input() nutrients: Nutrients;  //per 100g
  @Input() grams: number;
  subscription: Subscription;
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
  shownNutrients = {
    calories: 0,
    protein: 0,
    carbs: 0,
    fat:0
  } // per given g

  constructor(
    private macroGoalService: MacroGoalService
  ) {}

  ngOnInit(): void {
    this.subscription = this.macroGoalService.macroGoals$.subscribe(macros => {
      if(macros !== null){
        this.macroGoals = macros;
        this.calculateNutrientValues();
        this.calculatePercentages();
      }
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['grams'].previousValue !== undefined){
      // console.log(changes['grams'])
      this.calculateNutrientValues();
      this.calculatePercentages();
    }
  }

  calculateNutrientValues() {
    // the given nutrients are always for 100g (from API)
    // given the measures, calculate the actual nutrient values
    const mult = (this.grams/100);
    for(let key in this.nutrients){
      this.shownNutrients[key] = this.nutrients[key]*mult
    }
  }

  calculatePercentages() {
    const {calories,carbs,fat,protein} = this.shownNutrients;
    this.foodPercentages.calories = (calories/this.macroGoals.calories)*100;
    this.foodPercentages.carbs = (carbs/this.macroGoals.carbs)*100;
    this.foodPercentages.fat = (fat/this.macroGoals.fat)*100;
    this.foodPercentages.protein = (protein/this.macroGoals.protein)*100;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
}

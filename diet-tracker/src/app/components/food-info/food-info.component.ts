import { Component, Input, OnInit } from '@angular/core';
import { Food } from 'src/app/models/Food';
import { faPhotoFilm, faDotCircle } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-food-info',
  templateUrl: './food-info.component.html',
  styleUrls: ['./food-info.component.css']
})
export class FoodInfoComponent implements OnInit{
  @Input() food: Food;
  panelOpenState: boolean = false;
  faPhoto = faPhotoFilm; faDotCircle=faDotCircle

  // temp
  // input...
  macroGoals = {
    calories: 500,
    protein: 10,
    carbs: 50,
    fat: 5
  }
  foodPercentages = {
    calories: 0,
    protein: 0,
    carbs: 0,
    fat:0
  }

  ngOnInit(): void {
    this.calculatePercentages()
  }

  calculatePercentages() {
    const {calories,carbs,fat,protein} = this.food.nutrients;
    this.foodPercentages.calories = (calories/this.macroGoals.calories)*100;
    this.foodPercentages.carbs = (carbs/this.macroGoals.carbs)*100;
    this.foodPercentages.fat = (fat/this.macroGoals.fat)*100;
    this.foodPercentages.protein = (protein/this.macroGoals.protein)*100;
    console.log(typeof(this.foodPercentages.calories))
  }
}

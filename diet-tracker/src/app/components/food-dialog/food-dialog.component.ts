import { Component, Inject, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Food } from 'src/app/models/Food';

@Component({
  selector: 'app-food-dialog',
  templateUrl: './food-dialog.component.html',
  styleUrls: ['./food-dialog.component.css']
})
export class FoodDialogComponent {
  weight: number = 0;

  constructor(
    public dialogRef: MatDialogRef<FoodDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public food: Food
  ) {}

  onWeightInput(weight: number) {
    this.weight = weight
  }

  onCancel() {
    this.dialogRef.close( {'event':'cancel'} )
  }

  onSubmit() {
    if(this.weight > 0) {
      // change current food nutrients according to current weight
      this.updateFoodNutrients()
      this.food.weight = this.weight;
      this.dialogRef.close({ event: 'submit', data: this.food });
    }
    else {
      this.onCancel();
    }
  }

  updateFoodNutrients() {
    this.food.nutrients.calories = this.food.nutrients.calories * (this.weight/100);
    this.food.nutrients.protein = this.food.nutrients.protein * (this.weight/100);
    this.food.nutrients.fat = this.food.nutrients.fat * (this.weight/100);
    this.food.nutrients.carbs = this.food.nutrients.carbs * (this.weight/100);
  }
}

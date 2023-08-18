import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Food } from 'src/app/models/Food';
import { FoodDialogComponent } from '../food-dialog/food-dialog.component';
import { Recipe } from 'src/app/models/Recipe';

@Component({
  selector: 'app-recipe-dialog',
  templateUrl: './recipe-dialog.component.html',
  styleUrls: ['./recipe-dialog.component.css']
})
export class RecipeDialogComponent {
  portions: number = 1;

  constructor(
    public dialogRef: MatDialogRef<FoodDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public recipe: Recipe
  ) {}

  onCancel() {
    this.dialogRef.close( {'event':'cancel'} )
  }

  onSubmit() {
    if(this.portions > 0) {
      // change current food nutrients according to current weight
      this.updateRecipeNutrients();
      this.dialogRef.close({ event: 'submit', data: this.recipe });
    }
  }

  updateRecipeNutrients() {
    this.recipe.nutrients.calories = this.recipe.nutrients.calories * this.portions;
    this.recipe.nutrients.protein = this.recipe.nutrients.protein * this.portions;
    this.recipe.nutrients.fat = this.recipe.nutrients.fat * this.portions;
    this.recipe.nutrients.carbs = this.recipe.nutrients.carbs * this.portions;
  }
}

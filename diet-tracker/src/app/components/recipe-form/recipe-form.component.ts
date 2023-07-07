import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';
import { Food } from 'src/app/models/Food';
import { MacroGoals } from 'src/app/models/MacroGoals';
import { Recipe } from 'src/app/models/Recipe';
import { EditingRecipeService } from 'src/app/services/editing-recipe/editing-recipe.service';
import { MacroGoalService } from 'src/app/services/macro-goal/macro-goal.service';
import { RecipeService } from 'src/app/services/recipe/recipe.service';

@Component({
  selector: 'app-recipe-form',
  templateUrl: './recipe-form.component.html',
  styleUrls: ['./recipe-form.component.css']
})
export class RecipeFormComponent implements OnInit, OnDestroy{
  isEditing: boolean = false;
  subscription: Subscription
  recipe: Recipe = {
    name: "",
    ingredients: [],
    nutrients: { 
      calories: 0, protein: 0, fat: 0, carbs: 0
    }
  };
  // macroGoals: MacroGoals = {
  //   calories: 0, protein: 0, carbs: 0, fat:0
  // };
  macroGoals: MacroGoals = null;
  foodPercentages = {
    calories: 0, protein: 0, carbs: 0, fat:0
  } //for % bars

  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute, 
    private router: Router,
    private editingRecipeService: EditingRecipeService,
    private macroGoalService: MacroGoalService
  ){}

  ngOnInit(): void {
    // check if on editing or adding mode
    const recipe = this.editingRecipeService.getEditingRecipe();
    if(recipe !== null){
      this.recipe = recipe
      this.isEditing = this.editingRecipeService.getEditingMode();

      // calculate nutrients by adding all ingredients'
      this.resetNutrients(this.recipe)
      this.updateTotalNutrients(this.recipe)
    }

    this.subscription = this.macroGoalService.macroGoals$.subscribe(macros => {
      console.log(macros)
      if(macros !== null){
        this.macroGoals = macros;
        this.calculatePercentages();
      }
    })
  }

  onAddIngredient(){
    this.router.navigate(['add-ingredient'], {relativeTo: this.route })
  }

  onCancel(){
    this.navigateBack();
  }

  onSubmit() {
    console.log(this.recipe)
    if(this.isEditing){
      // if updating recipe
      if(this.recipe.name === ""){
        this.recipeService.getRecipesCount().pipe(
          switchMap(count => {
            this.recipe.name = `Recipe ${count+1}`
            return this.recipeService.updateRecipe(this.recipe)
          })
        ).subscribe(() => {
          this.navigateBack()
        })
      }
      else{
        this.recipeService.updateRecipe(this.recipe).subscribe(() => {
          this.navigateBack();
        })
      }
    }
    else {
      // if adding recipe
      if(this.recipe.name === ""){
        this.recipeService.getRecipesCount().pipe(
          switchMap(count => {
            this.recipe.name = `Recipe ${count+1}`
            return this.recipeService.addRecipe(this.recipe)
          })
        ).subscribe(() => {
          this.navigateBack()
        })
      }
      else{
        this.recipeService.addRecipe(this.recipe).subscribe(() => {
          this.navigateBack();
        })
      }
    }
  }

  onIngredientDeleted(index: number) {
    console.log(`deleting ingr in index ${index}`)
    this.recipe.ingredients.splice(index,1)
    this.resetNutrients(this.recipe)
    this.updateTotalNutrients(this.recipe);
     // update local storage
     this.editingRecipeService.deleteIngredient(index)
  }

  onBlur() {
    this.editingRecipeService.updateRecipeName(this.recipe.name);
  }

  // helper functions
  resetNutrients(recipe: Recipe) {
    for(let nutr of Object.keys(recipe.nutrients)){
      if(nutr !== "_id")
        recipe.nutrients[nutr] = 0
    }
  }

  updateTotalNutrients(recipe: Recipe) {
    for(let ingr of recipe.ingredients){
      for(let nutr of Object.keys(recipe.nutrients)){
        if(nutr !== "_id")
          recipe.nutrients[nutr] += ingr.nutrients[nutr]
      }
    }
  }

  calculatePercentages() {
    const {calories,carbs,fat,protein} = this.recipe.nutrients;
    this.foodPercentages.calories = (calories/this.macroGoals.calories)*100;
    this.foodPercentages.carbs = (carbs/this.macroGoals.carbs)*100;
    this.foodPercentages.fat = (fat/this.macroGoals.fat)*100;
    this.foodPercentages.protein = (protein/this.macroGoals.protein)*100;
  }

  navigateBack() {
    this.router.navigate(['./recipes']);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
}

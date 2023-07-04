import { Injectable } from '@angular/core';
import { Food } from 'src/app/models/Food';
import { Recipe } from 'src/app/models/Recipe';

@Injectable({
  providedIn: 'root'
})
export class EditingRecipeService {

  constructor() { }

  setEditingRecipe(recipe: Recipe) {
    localStorage.setItem("editingRecipe", JSON.stringify(recipe))
  }

  getEditingRecipe(): Recipe | null {
    return JSON.parse(localStorage.getItem("editingRecipe"))
  }

  removeEditingRecipe() {
    localStorage.removeItem("editingRecipe");
  }

  // update recipe
  addIngredient(food: Food) {
    const recipe = <Recipe>JSON.parse(localStorage.getItem("editingRecipe"));
    recipe.ingredients.push(food)
    localStorage.setItem("editingRecipe", JSON.stringify(recipe))
  }

  deleteIngredient(index: number) {
    const recipe = <Recipe>JSON.parse(localStorage.getItem("editingRecipe"));
    recipe.ingredients.splice(index,1);
    localStorage.setItem("editingRecipe", JSON.stringify(recipe))
  }

  // mode
  setEditingMode(editingMode: boolean){
    localStorage.setItem("editingMode", JSON.stringify(editingMode))
  }

  getEditingMode() {
    return JSON.parse(localStorage.getItem("editingMode"))
  }

  removeEditingMode() {
    localStorage.removeItem("editingMode");
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Recipe } from 'src/app/models/Recipe';
import { EditingRecipeService } from 'src/app/services/editing-recipe/editing-recipe.service';
import { RecipeService } from 'src/app/services/recipe/recipe.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit{
  recipeList: Recipe[] = []

  constructor(
    private recipeService: RecipeService,
    private editingRecipeService: EditingRecipeService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.recipeService.getRecipes().subscribe(recipes => {
      this.recipeList = recipes
    })
  }

  onAddRecipe(){
    // set as editing an empty recipe
    const recipe: Recipe = {
      name: "",
      ingredients: [],
      nutrients: {
        calories: 0,
        protein: 0,
        fat: 0,
        carbs: 0
      }
    };
    this.editingRecipeService.setEditingRecipe(recipe)
    this.editingRecipeService.setEditingMode(false)
    this.router.navigate(['edit'], { relativeTo: this.route });
  }

  onRecipeDeleted(recipe: Recipe) {
    this.recipeService.deleteRecipe(recipe._id).subscribe(() => {
      this.recipeList = this.recipeList.filter(rec => {
        rec._id !== recipe._id
      })
    })
  }
}

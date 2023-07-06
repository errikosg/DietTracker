import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Recipe } from 'src/app/models/Recipe';
import { EditingRecipeService } from 'src/app/services/editing-recipe/editing-recipe.service';
import { RecipeService } from 'src/app/services/recipe/recipe.service';
import { AlertDialogComponent } from '../alert-dialog/alert-dialog.component';
import { switchMap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

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
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
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
    const alertDialog = this.dialog.open(AlertDialogComponent, {
      width: '50%',
      data: `Are you sure you want to delete recipe '${recipe.name}'?`
    })

    let mode = "cancel";
    alertDialog.afterClosed().pipe(
      switchMap(res => {
        if(res && res.event === 'submit'){
          mode = res.event
          return this.recipeService.deleteRecipe(recipe._id)
        }
        else return []
      })
      ).subscribe(() => {
        if(mode === "submit"){
          this.recipeList = this.recipeList.filter(rec => {
            return rec._id !== recipe._id
          })
          this.snackBar.open("Recipe deleted successfully", null, { duration: 1500 });
        }
      })
  }
}

import { Component, Input } from '@angular/core';
import { Recipe } from 'src/app/models/Recipe';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { RecipeService } from 'src/app/services/recipe/recipe.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recipe-list-item',
  templateUrl: './recipe-list-item.component.html',
  styleUrls: ['./recipe-list-item.component.css']
})
export class RecipeListItemComponent {
  @Input() recipe: Recipe;
  faPen = faPen; faTrash = faTrash;

  constructor(
    private recipeService: RecipeService,
    private router: Router,
    private route: ActivatedRoute
  ){}

  onUpdateRecipe(){
    this.recipeService.recipe$.next(this.recipe);
    this.router.navigate(['edit'], { relativeTo: this.route });
  }

  onDeleteRecipe(){

  }
}

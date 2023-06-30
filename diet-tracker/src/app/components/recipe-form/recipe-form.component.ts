import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, take } from 'rxjs/operators';
import { RecipeService } from 'src/app/services/recipe/recipe.service';

@Component({
  selector: 'app-recipe-form',
  templateUrl: './recipe-form.component.html',
  styleUrls: ['./recipe-form.component.css']
})
export class RecipeFormComponent implements OnInit{
  isEditing: boolean = false;

  constructor(
    private recipeService: RecipeService
  ){}

  ngOnInit(): void {
    this.recipeService.recipe$.pipe(
      take(1),
      map(recipe => {
        if(recipe !== null){
          this.isEditing = true;
        }
      })
    ).subscribe()
  }

}

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Recipe } from 'src/app/models/Recipe';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Router, ActivatedRoute } from '@angular/router';
import { EditingRecipeService } from 'src/app/services/editing-recipe/editing-recipe.service';

@Component({
  selector: 'app-recipe-list-item',
  templateUrl: './recipe-list-item.component.html',
  styleUrls: ['./recipe-list-item.component.css']
})
export class RecipeListItemComponent implements OnInit{
  @Input() recipe: Recipe;
  @Output() deleted = new EventEmitter<Recipe>()
  faPen = faPen; faTrash = faTrash;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private editingRecipeService: EditingRecipeService
  ){}

  ngOnInit(): void {
    this.editingRecipeService.removeEditingRecipe();
    this.editingRecipeService.removeEditingMode()
  }

  onUpdateRecipe(){
    // set the recipe for edit
    this.editingRecipeService.setEditingRecipe(this.recipe)
    this.editingRecipeService.setEditingMode(true)
    this.router.navigate(['edit'], { relativeTo: this.route });
  }

  onDeleteRecipe(){
    this.deleted.emit(this.recipe)
  } 
}

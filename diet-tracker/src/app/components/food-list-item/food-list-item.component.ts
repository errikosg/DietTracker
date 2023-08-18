import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Food } from 'src/app/models/Food';
import { RecipeService } from 'src/app/services/recipe/recipe.service';
import { FoodDialogComponent } from '../food-dialog/food-dialog.component';
import { EditingRecipeService } from 'src/app/services/editing-recipe/editing-recipe.service';
import { Router } from '@angular/router';
import { faPlus } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-food-list-item',
  templateUrl: './food-list-item.component.html',
  styleUrls: ['./food-list-item.component.css']
})
export class FoodListItemComponent {
  @Input() food: Food;
  faPlus=faPlus;

  constructor(
    private editingRecipeService: EditingRecipeService,
    private dialog: MatDialog,
    private router: Router
  ) {}

  onAdd() {
    // open food info modal
    const foodDialog = this.dialog.open(FoodDialogComponent, {
      data: this.food,
      maxHeight: '90vh',
      width: '80%'
    })
    foodDialog.afterClosed().subscribe((res) => {
      if(res && res.event === 'submit'){
        // update local storage
        this.editingRecipeService.addIngredient(res.data)
        this.router.navigate(['./recipes/edit'])
      }
    })
  }
}

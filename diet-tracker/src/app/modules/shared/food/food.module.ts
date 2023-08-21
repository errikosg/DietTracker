import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FoodDisplayComponent } from 'src/app/components/food-display/food-display.component';
import { FoodInfoComponent } from 'src/app/components/food-info/food-info.component';
import { MacroModule } from '../macro/macro.module';
import { MaterialModule } from '../material/material.module';
import { FontsModule } from '../fonts/fonts.module';
import { RecipeDisplayComponent } from 'src/app/components/recipe-display/recipe-display.component';



@NgModule({
  declarations: [
    FoodInfoComponent,
    FoodDisplayComponent,
    RecipeDisplayComponent
  ],
  imports: [
    CommonModule,
    MacroModule,
    MaterialModule,
    FontsModule
  ],
  exports: [
    FoodInfoComponent,
    FoodDisplayComponent,
    RecipeDisplayComponent
  ]
})
export class FoodModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FoodBaseListItemComponent } from 'src/app/components/foodbase/foodbase-list-item/foodbase-list-item.component';
import { FoodBaseListComponent } from 'src/app/components/foodbase/foodbase-list/foodbase-list.component';
import { FontsModule } from '../shared/fonts/fonts.module';
import { FoodModule } from '../shared/food/food.module';
import { MacroModule } from '../shared/macro/macro.module';
import { MaterialModule } from '../shared/material/material.module';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthGuardService } from 'src/app/services/auth-guard/auth-guard.service';

const routes: Routes = [
  { path: '', component: FoodBaseListComponent, canActivate: [AuthGuardService] },
]

@NgModule({
  declarations: [
    FoodBaseListComponent,
    FoodBaseListItemComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    FoodModule,
    MacroModule,
    MaterialModule,
    FontsModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    FoodBaseListComponent,
    FoodBaseListItemComponent
  ]
})
export class FoodbaseModule { }

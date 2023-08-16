import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../components/home/home.component';
import { AuthGuardService } from '../services/auth-guard/auth-guard.service';
import { ProfileComponent } from '../components/profile/profile.component';
import { DashboardComponent } from '../components/dashboard/dashboard.component';
import { RecipesComponent } from '../components/recipes/recipes.component';
import { FoodBaseListComponent } from '../components/foodbase/foodbase-list/foodbase-list.component';
import { RecipeFormComponent } from '../components/recipe-form/recipe-form.component';
import { AddIngredientFormComponent } from '../components/add-ingredient-form/add-ingredient-form.component';
import { LogHistoryComponent } from '../components/log-history/log-history.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '', pathMatch: 'full' },
  { path: '', component: HomeComponent, canActivate: [AuthGuardService], children: [
    { path: '', component: DashboardComponent, canActivate: [AuthGuardService] },
    { path: 'profile', component: ProfileComponent, canActivate: [AuthGuardService] },
    { path: 'recipes', children:[
      { path: '', component: RecipesComponent, canActivate: [AuthGuardService] },
      { path: 'edit', children:[
        { path: '', component: RecipeFormComponent, canActivate: [AuthGuardService] },
        { path: 'add-ingredient', component: AddIngredientFormComponent, canActivate: [AuthGuardService] }
      ] },
    ] },
    { path: 'foodbase', component: FoodBaseListComponent, canActivate: [AuthGuardService] },
    { path: 'log-history', component: LogHistoryComponent, canActivate: [AuthGuardService] }
  ] },
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }

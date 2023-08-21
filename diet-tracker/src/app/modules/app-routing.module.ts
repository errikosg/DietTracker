import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../components/home/home.component';
import { AuthGuardService } from '../services/auth-guard/auth-guard.service';
import { ProfileComponent } from '../components/profile/profile.component';
import { DashboardComponent } from '../components/dashboard/dashboard.component';
import { RecipesComponent } from '../components/recipes/recipes.component';
import { FoodBaseListComponent } from '../components/foodbase/foodbase-list/foodbase-list.component';
import { RecipeFormComponent } from '../components/recipe-form/recipe-form.component';
import { AddIngredientFormComponent } from '../components/add-ingredient-form/add-ingredient-form.component';
import { AddLogComponent } from '../components/add-log/add-log.component';
import { NotFoundComponent } from '../components/not-found/not-found.component';
import { MacroGoalResolver } from '../services/resolvers/macro-goal-resolver.service';

const appRoutes: Routes = [
  { path: '', redirectTo: '', pathMatch: 'full' },
  { path: '', component: HomeComponent, canActivate: [AuthGuardService], resolve:{macroGoals: MacroGoalResolver}, children: [
    { path: '', component: DashboardComponent, canActivate: [AuthGuardService] },
    { path: 'profile', loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule) },
    { path: 'recipes', children:[
      { path: '', component: RecipesComponent, canActivate: [AuthGuardService] },
      { path: 'edit', children:[
        { path: '', component: RecipeFormComponent, canActivate: [AuthGuardService] },
        { path: 'add-ingredient', component: AddIngredientFormComponent, canActivate: [AuthGuardService] }
      ] },
    ] },
    { path: 'foodbase', loadChildren: () => import('./foodbase/foodbase.module').then(m => m.FoodbaseModule) },
    { path: 'log-history', loadChildren: () => import('./log-history/log-history.module').then(m => m.LogHistoryModule) },
    { path: 'add-log', component: AddLogComponent, canActivate: [AuthGuardService] },
    { path: '**', component: NotFoundComponent, pathMatch: 'full', canActivate: [AuthGuardService] }
  ] },
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }

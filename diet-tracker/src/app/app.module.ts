import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './modules/shared/material/material.module';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { AuthModule } from './modules/auth/auth.module';
import { AppRoutingModule } from './modules/app-routing.module';
import { AuthInterceptorService } from './services/auth-interceptor/auth-interceptor.service';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RecipesComponent } from './components/recipes/recipes.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlertDialogComponent } from './components/alert-dialog/alert-dialog.component';
import { RecipeListItemComponent } from './components/recipe-list-item/recipe-list-item.component';
import { RecipeDisplayComponent } from './components/recipe-display/recipe-display.component';
import { RecipeFormComponent } from './components/recipe-form/recipe-form.component';
import { IngredientComponent } from './components/ingredient/ingredient.component';
import { AddIngredientFormComponent } from './components/add-ingredient-form/add-ingredient-form.component';
import { FoodListItemComponent } from './components/food-list-item/food-list-item.component';
import { FoodDialogComponent } from './components/food-dialog/food-dialog.component';
import { MeasureFormComponent } from './components/measure-form/measure-form.component';
import { AddLogComponent } from './components/add-log/add-log.component';
import { LogHistoryComponent } from './components/log-history/log-history.component';
import { CalendarDialogComponent } from './components/calendar-dialog/calendar-dialog.component';
import { RecipeDialogComponent } from './components/recipe-dialog/recipe-dialog.component';
import { LogHistoryItemComponent } from './components/log-history-item/log-history-item.component';
import { FoodModule } from './modules/shared/food/food.module';
import { MacroModule } from './modules/shared/macro/macro.module';
import { FontsModule } from './modules/shared/fonts/fonts.module';
import { FoodbaseModule } from './modules/foodbase/foodbase.module';
import { ExtraModule } from './modules/shared/extra/extra.module';
import { LogHistoryModule } from './modules/log-history/log-history.module';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    NotFoundComponent,
    DashboardComponent,
    RecipesComponent,
    AlertDialogComponent,
    RecipeListItemComponent,
    RecipeFormComponent,
    IngredientComponent,
    AddIngredientFormComponent,
    FoodListItemComponent,
    FoodDialogComponent,
    MeasureFormComponent,
    AddLogComponent,
    CalendarDialogComponent,
    RecipeDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    FontsModule,
    ExtraModule,
    AuthModule,
    FoodModule,
    MacroModule,
    AppRoutingModule,
    FoodbaseModule,
    LogHistoryModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

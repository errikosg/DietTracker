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
import { ProfileComponent } from './components/profile/profile.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FoodBaseListComponent } from './components/foodbase/foodbase-list/foodbase-list.component';
import { RecipesComponent } from './components/recipes/recipes.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FoodBaseListItemComponent } from './components/foodbase/foodbase-list-item/foodbase-list-item.component';
import { NameFormComponent } from './components/forms/name-form/name-form.component';
import { EmailFormComponent } from './components/forms/email-form/email-form.component';
import { EmailFormDialogComponent } from './components/forms/email-form-dialog/email-form-dialog.component';
import { PassFormComponent } from './components/forms/pass-form/pass-form.component';
import { DeleteAccountComponent } from './components/forms/delete-account/delete-account.component';
import { DeleteAccountDialogComponent } from './components/forms/delete-account-dialog/delete-account-dialog.component';
import { MacroGoalsDisplayComponent } from './components/macro-goals-display/macro-goals-display.component';
import { EditMacroGoalsDialogComponent } from './components/edit-macro-goals-dialog/edit-macro-goals-dialog.component';
import { MacroDisplayComponent } from './components/macro-display/macro-display.component';
import { AlertDialogComponent } from './components/alert-dialog/alert-dialog.component';
import { FoodInfoComponent } from './components/food-info/food-info.component';
import { RecipeListItemComponent } from './components/recipe-list-item/recipe-list-item.component';
import { RecipeDisplayComponent } from './components/recipe-display/recipe-display.component';
import { RecipeFormComponent } from './components/recipe-form/recipe-form.component';
import { IngredientComponent } from './components/ingredient/ingredient.component';
import { FoodDisplayComponent } from './components/food-display/food-display.component';
import { AddIngredientFormComponent } from './components/add-ingredient-form/add-ingredient-form.component';
import { FoodListItemComponent } from './components/food-list-item/food-list-item.component';
import { FoodDialogComponent } from './components/food-dialog/food-dialog.component';
import { MeasureFormComponent } from './components/measure-form/measure-form.component';
import { PercentBarComponent } from './components/percent-bar/percent-bar.component';
import { DateHeaderComponent } from './components/date-header/date-header.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { DonutChartComponent } from './components/donut-chart/donut-chart.component';
import { AddLogComponent } from './components/add-log/add-log.component';
import { LogHistoryComponent } from './components/log-history/log-history.component';
import { CalendarCardComponent } from './components/calendar-card/calendar-card.component';
import { CalendarDialogComponent } from './components/calendar-dialog/calendar-dialog.component';
import { RecipeDialogComponent } from './components/recipe-dialog/recipe-dialog.component';
import { LogHistoryItemComponent } from './components/log-history-item/log-history-item.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    ProfileComponent,
    NotFoundComponent,
    DashboardComponent,
    FoodBaseListComponent,
    RecipesComponent,
    FoodBaseListItemComponent,
    NameFormComponent,
    EmailFormComponent,
    EmailFormDialogComponent,
    PassFormComponent,
    DeleteAccountComponent,
    DeleteAccountDialogComponent,
    MacroGoalsDisplayComponent,
    EditMacroGoalsDialogComponent,
    MacroDisplayComponent,
    AlertDialogComponent,
    FoodInfoComponent,
    RecipeListItemComponent,
    RecipeDisplayComponent,
    RecipeFormComponent,
    IngredientComponent,
    FoodDisplayComponent,
    AddIngredientFormComponent,
    FoodListItemComponent,
    FoodDialogComponent,
    MeasureFormComponent,
    PercentBarComponent,
    DateHeaderComponent,
    DonutChartComponent,
    AddLogComponent,
    LogHistoryComponent,
    CalendarCardComponent,
    CalendarDialogComponent,
    RecipeDialogComponent,
    LogHistoryItemComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    AuthModule,
    MaterialModule,
    FontAwesomeModule,
    NgApexchartsModule
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

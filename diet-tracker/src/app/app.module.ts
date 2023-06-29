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
import { FoodListComponent } from './components/food-list/food-list.component';
import { RecipesComponent } from './components/recipes/recipes.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FoodListItemComponent } from './components/foodlist-item/foodlist-item.component';
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


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    ProfileComponent,
    NotFoundComponent,
    DashboardComponent,
    FoodListComponent,
    RecipesComponent,
    FoodListItemComponent,
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
    FoodInfoComponent
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
    FontAwesomeModule
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

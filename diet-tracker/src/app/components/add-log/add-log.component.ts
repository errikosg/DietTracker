import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CalendarDialogComponent } from '../calendar-dialog/calendar-dialog.component';
import { faCalendar, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FoodAPIService } from 'src/app/services/food-api/food-api.service';
import { Food } from 'src/app/models/Food';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { FoodDialogComponent } from '../food-dialog/food-dialog.component';
import { ConsumptionService } from 'src/app/services/consumption/consumption.service';
import { ConsumptionItem } from 'src/app/models/ConsumptionItem';
import { switchMap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RecipeService } from 'src/app/services/recipe/recipe.service';
import { Recipe } from 'src/app/models/Recipe';
import { RecipeDialogComponent } from '../recipe-dialog/recipe-dialog.component';


@Component({
  selector: 'app-add-log',
  templateUrl: './add-log.component.html',
  styleUrls: ['./add-log.component.css']
})
export class AddLogComponent implements OnInit{
  selectedDate: Date | null = new Date();
  faCalendar=faCalendar;faPlus=faPlus
  mode: string = "FOOD";

  searchText: string = "";
  foodList: Food[] = [];
  shownFoodList: Food[] = [];
  pageIndex: number = 0;
  pageSize: number = 5;
  isLoading: boolean = false;
  errorMsg: string = "";

  recipeList: Recipe[] = [];
  emptyMessage: string = "";

  constructor(
    private dialog: MatDialog,
    private foodApiService: FoodAPIService,
    private consumptionService: ConsumptionService,
    private recipeService: RecipeService,
    private snackBar: MatSnackBar,
    private router: Router
  ){}

  ngOnInit(): void {
    // this.shownFoodList = this.foodApiService.getMockData();
    // load recipes
    this.recipeService.getRecipes().subscribe(recipes => {
      if(recipes.length > 0) {
        this.recipeList = recipes
        this.emptyMessage = ""
      }
      else {
        this.emptyMessage = "You haven't added any recipes yet."
      }
    })
  }

  onChangeDate(){
    const dialogWidth = window.innerWidth > 500 ? "30%" : "60%";
    const calendarDialog = this.dialog.open(CalendarDialogComponent, {
      data: this.selectedDate,
      maxHeight: "80vh",
      width: dialogWidth
    })
    calendarDialog.afterClosed().subscribe((res) => {
      if(res && res.event === 'submit'){
        this.selectedDate = res.data
      }
    })
  }

  onTabClick() {
    this.mode = this.mode==="FOOD" ? "RECIPE" : "FOOD"
  }

  onSubmitSearch() {
    if(this.searchText !== ""){
      this.isLoading = true;
      this.foodList = [];
      this.shownFoodList = [];
      this.errorMsg = ""

      // send request
      this.foodApiService.getFoods(this.searchText).subscribe(foods => {
        if(foods.length > 0){
          this.foodList = foods
          this.calculateShownFoods()
        }
        else{
          this.errorMsg = `No results found for '${this.searchText}'.`
        }
        this.isLoading = false;
      })
    }
  }

  onClearList() {
    this.foodList = [];
    this.shownFoodList = [];
    this.searchText = ""
  }

  onPageChange(pageEvent: PageEvent){
    this.pageIndex = pageEvent.pageIndex;
    this.calculateShownFoods()
  }

  calculateShownFoods() {
    // manage shown tasks in page
    let startIndex = this.pageIndex * this.pageSize;
    this.shownFoodList = this.foodList.slice(startIndex, startIndex+this.pageSize)
  }

  getSpinnerDiameter() {
    return window.innerWidth > 500 ? 70 : 50;
  }

  onAddFoodLog(food: Food) {
    const foodDialog = this.dialog.open(FoodDialogComponent, {
      data: food,
      maxHeight: '90vh',
      width: '80%'
    })
    foodDialog.afterClosed().pipe(switchMap(res => {
        if(res && res.event === 'submit'){
          const item:ConsumptionItem = {
            type: "food",
            log: res.data
          }
          return this.consumptionService.addConsumptionItem(this.selectedDate, item)
        }
    })).subscribe(item => {
      this.snackBar.open("Food logged successfully", null, { duration: 1500 });
      this.router.navigate(['./'])
    })
  }

  // recipes
  onAddRecipeLog(recipe:Recipe) {
    const recipeDialog = this.dialog.open(RecipeDialogComponent, {
      data: recipe,
      maxHeight: '90vh',
      width: '80%'
    })
    recipeDialog.afterClosed().pipe(switchMap(res => {
        if(res && res.event === 'submit'){
          const item:ConsumptionItem = {
            type: "recipe",
            log: res.data
          }
          return this.consumptionService.addConsumptionItem(this.selectedDate, item)
        }
    })).subscribe(item => {
      this.snackBar.open("Recipe logged successfully", null, { duration: 1500 });
      this.router.navigate(['./'])
    })
  }
}

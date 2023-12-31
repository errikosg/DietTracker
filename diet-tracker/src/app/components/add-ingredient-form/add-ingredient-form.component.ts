import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { Food } from 'src/app/models/Food';
import { FoodAPIService } from 'src/app/services/food-api/food-api.service';

@Component({
  selector: 'app-add-ingredient-form',
  templateUrl: './add-ingredient-form.component.html',
  styleUrls: ['./add-ingredient-form.component.css']
})
export class AddIngredientFormComponent implements OnInit{
  searchText: string = "";
  foodList: Food[] = [];
  shownFoodList: Food[] = [];
  pageIndex: number = 0;
  pageSize: number = 5;
  isLoading: boolean = false;
  errorMsg: string = "";

  constructor(
    private foodApiService: FoodAPIService,
    private router: Router
  ){}

  ngOnInit(): void {
    // this.shownFoodList = this.foodApiService.getMockData();
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

  onCancel() {
    this.router.navigate(['./recipes/edit'])
  }

  getSpinnerDiameter() {
    return window.innerWidth > 500 ? 70 : 50;
  }
}

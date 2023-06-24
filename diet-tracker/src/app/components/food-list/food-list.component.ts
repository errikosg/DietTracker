import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Food } from 'src/app/models/Food';
import { FoodAPIService } from 'src/app/services/food-api/food-api.service';

@Component({
  selector: 'app-food-list',
  templateUrl: './food-list.component.html',
  styleUrls: ['./food-list.component.css']
})
export class FoodListComponent implements OnInit{
  searchText: string = "";
  foodList: Food[] = [];
  shownFoodList: Food[] = [];
  pageIndex: number = 0;
  pageSize: number = 5;
  isLoading: boolean = false;

  constructor(
    private foodapiService: FoodAPIService
  ){}

  ngOnInit(): void {
  }

  onSubmit() {
    if(this.searchText !== ""){
      this.isLoading = true;
      this.foodList = [];
      this.shownFoodList = [];

      // send request
      this.foodapiService.getFoods(this.searchText).subscribe(foods => {
        this.foodList = foods
        this.isLoading = false;
        this.calculateShownFoods()
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
}

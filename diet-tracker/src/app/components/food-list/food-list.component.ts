import { Component, OnInit } from '@angular/core';
import { Food } from 'src/app/models/Food';
import { FoodAPIService } from 'src/app/services/food-api.service';

@Component({
  selector: 'app-food-list',
  templateUrl: './food-list.component.html',
  styleUrls: ['./food-list.component.css']
})
export class FoodListComponent implements OnInit{
  searchText: string = "";
  foodList: Food[] = []

  constructor(
    private foodapiService: FoodAPIService
  ){}

  ngOnInit(): void {
    // delete!!!!
    this.foodList = this.foodapiService.getFoods("some")
  }

  onSubmit() {
    console.log(this.searchText)
    this.foodList = this.foodapiService.getFoods(this.searchText)
  }
}

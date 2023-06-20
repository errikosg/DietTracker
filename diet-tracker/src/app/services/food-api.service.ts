import { Injectable } from '@angular/core';
import { Food } from '../models/Food';

@Injectable({
  providedIn: 'root'
})
export class FoodAPIService {
  foodbaseURL: string = "https://api.edamam.com/api/food-database/v2/parser"
  mock_foods: Food[] = [
    {
      foodId: 'food_a1gb9ubb72c7snbuxr3weagwv0dd',
      label: 'Apple',
      nutrients: {
        calories: 52,
        protein: 0.26,
        fat: 0.17,
        carbs: 13.8
      },
      image: "https://www.edamam.com/food-img/42c/42c006401027d35add93113548eeaae6.jpg",
      measures: [
        {
          label: "whole",
          weight: 182
        },
        {
          label: "serving",
          weight: 242
        },
        {
          label: "gram",
          weight: 1
        },
        {
          label: "ounce",
          weight: 28.35
        },
        {
          label: "pound",
          weight: 453.5
        },
        {
          label: "kilogram",
          weight: 1000
        },
        {
          label: "cup",
          weight: 109
        }
      ]
    },
    {
      foodId: 'food_amhlqj0by3ozesbg96kkhar1atxt',
      label: 'Fuji Apple',
      nutrients: {
        calories: 63,
        protein: 0.2,
        fat: 0.18,
        carbs: 15.2
      },
      image: "https://www.edamam.com/food-img/327/327e8b398000b83e4764ca0bab240f14.jpg",
      measures: [
        {
          label: "whole",
          weight: 197
        },
        {
          label: "serving",
          weight: 55
        },
        {
          label: "gram",
          weight: 1
        },
        {
          label: "ounce",
          weight: 28.35
        },
        {
          label: "pound",
          weight: 453.5
        },
        {
          label: "kilogram",
          weight: 1000
        },
        {
          label: "cup",
          weight: 109
        }
      ]
    }
  ]

  constructor() { }

  getFoods(searchText: string) {
    // http....
    if(searchText === "") return []
    return this.mock_foods
  }
}

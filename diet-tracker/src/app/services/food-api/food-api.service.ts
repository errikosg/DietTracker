import { Injectable } from '@angular/core';
import { Food } from '../../models/Food';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Measure } from '../../models/Measure';
import { Nutrients } from "../../models/Nutrients";
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class FoodAPIService {
  foodbaseURL: string = "https://api.edamam.com/api/food-database/v2/parser"
  private searchParams = new HttpParams()
    .set("app_id", "945d4415")
    .set("app_key","d04242888de640d321df51a3c7db7fe9")
    .set("nutrition-type","cooking")
    .set("category","generic-foods")
  
  private searchHeaders = new HttpHeaders ({
    'Content-type': 'application/json;'
  })
  // private httpOptions = {
  //   headers : new HttpHeaders ({
  //     'Content-type': 'application/json;'
  //   }),
  //   params: this.searchParams
  // }

  mockFoods: Food[] = [
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

  constructor(
    private http: HttpClient
  ) { }

  getMockData() {
    return this.mockFoods
  }

  getFoods(searchText: string): Observable<Food[]> {
    // set headers, params
    let sParams = this.searchParams;
    sParams = sParams.append("ingr", searchText)
    const httpOptions = {
      headers: this.searchHeaders,
      params: sParams
    }
    // return 
    return this.http.get(this.foodbaseURL, httpOptions).pipe(
      map(resData => {
        console.log(resData)
        return this.extractResponseData(resData)
      })
    )
  }

  extractResponseData(resData: any): Food[] {
    let foods:Food[] = []
    for(let hint of resData.hints){
      const {foodId,label,nutrients,image} = hint.food;
      let measures: Measure[] = []
      for(let measure of hint.measures){
        measures.push({label:measure.label, weight:measure.weight})
      }
      // fix nutrients
      const nutrientsFixed:Nutrients = {
        calories: nutrients.ENERC_KCAL,
        carbs: nutrients.CHOCDF,
        fat: nutrients.FAT,
        protein: nutrients.PROCNT
      }

      // assign
      foods.push({
        foodId: foodId,
        label: label,
        nutrients: nutrientsFixed,
        image: image,
        measures: measures
      })
    }
    console.log(foods)
    return foods
  }
}

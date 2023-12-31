import { Injectable } from '@angular/core';
import { Food } from '../../models/Food';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Measure } from '../../models/Measure';
import { Nutrients } from "../../models/Nutrients";
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';


@Injectable({
  providedIn: 'root'
})
export class FoodAPIService {
  foodbaseURL: string = environment.foodbaseURL;
  private searchParams = new HttpParams()
    .set("app_id", environment.foodbaseAppId)
    .set("app_key",environment.foodbaseAppKey)
    .set("nutrition-type","cooking")
    .set("category","generic-foods")
  
  private searchHeaders = new HttpHeaders ({
    'Content-type': 'application/json;'
  })

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
      image: "https://www.edamam.com/food-img/42c/42c006401027d35add93113548eeaae6.jpg"
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
        image: image
      })
    }
    console.log(foods)
    return foods
  }
}

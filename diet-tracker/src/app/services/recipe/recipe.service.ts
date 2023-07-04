import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, map } from 'rxjs';
import { Recipe } from 'src/app/models/Recipe';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private serverURL: string = "http://localhost:3001/diet-tracker-api"
  private url = `${this.serverURL}/recipes`
  private httpOptions = {
    headers : new HttpHeaders ({
      'Content-type': 'application/json; charset=UTF-8'
    }),
  }

  constructor(
    private http: HttpClient
  ) { }

  getRecipes(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(this.url, this.httpOptions);
  }

  getRecipesCount(): Observable<number>{
    return this.http.get<Recipe[]>(this.url, this.httpOptions)
      .pipe(map(recipes => {
        return recipes.length;
      }))
  }

  addRecipe(recipe: Recipe): Observable<Recipe> {
    return this.http.post<Recipe>(this.url, recipe, this.httpOptions);
  }

  updateRecipe(recipe: Recipe): Observable<Recipe> {
    const recipeId = recipe._id;
    return this.http.patch<Recipe>(`${this.url}/${recipeId}`, recipe, this.httpOptions);
  }

  deleteRecipe(recipeId: string): Observable<string> {
    return this.http.delete<string>(`${this.url}/${recipeId}`, this.httpOptions);
  }
}

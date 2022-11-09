import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";
import { Recipe } from "../recipes/recipes.model";
import { RecipesService } from "../recipes/recipes.service";

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
  constructor(private http: HttpClient, private recipeService: RecipesService) { }

  storeRecipes() {
    const recipes = this.recipeService.getRecipes()
    this.http.put('https://angular-recipes-c5520-default-rtdb.firebaseio.com/recipes.json', recipes).
      subscribe(response => {
        console.log(response)
      });
  }

  fetchRecipes() {
    this.http.get<Recipe[]>('https://angular-recipes-c5520-default-rtdb.firebaseio.com/recipes.json').
      pipe(map(recipes => {
        return recipes.map(recipe => {
          return { ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] }
        })
      })).subscribe(recipes => {
        this.recipeService.setRecipes(recipes)
      })
  }
}

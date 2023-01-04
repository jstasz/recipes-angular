import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredients.model";
import { Recipe } from "./recipes.model";
import * as ShoppingListAction from '../shopping-list/store/shopping-list-action'

@Injectable()
export class RecipesService {
  recipesChanges = new Subject<Recipe[]>()
  private recipes: Recipe[] = [];

  constructor(
    private store: Store<{ shoppingList: { ingredients: Ingredient[]}}>) {
  }

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanges.next(this.recipes.slice())
  }

  getRecipes() {
    return this.recipes.slice()
  }

  getRecipe(index: number) {
    return this.recipes[index]
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.store.dispatch(new ShoppingListAction.AddIngredients(ingredients))
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe)
    this.recipesChanges.next(this.recipes.slice())
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanges.next(this.recipes.slice())
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1)
    this.recipesChanges.next(this.recipes.slice())
  }
}

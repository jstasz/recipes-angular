import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredients.model";
import { ShoppingListService } from "../shopping-list/shoppingList.service";
import { Recipe } from "./recipes.model";

@Injectable()
export class RecipesService {
  recipesChanges = new Subject<Recipe[]>()

  // private recipes: Recipe[] = [new Recipe('A test Recipe', 'This is simply a test for recipe', 'https://www.tasteaway.pl/wp-content/uploads/2020/03/kura.jpg', [new Ingredient('tomato', 2), new Ingredient('orange', 3)]), new Recipe('Another test Recipe', 'This is simply a test for another recipe', 'https://www.tasteaway.pl/wp-content/uploads/2020/03/kura.jpg', [new Ingredient('bread', 3), new Ingredient('pasta', 2)])];
  private recipes: Recipe[] = [];

  constructor(private shoppingListService: ShoppingListService) {

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
    this.shoppingListService.addIngredients(ingredients)
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

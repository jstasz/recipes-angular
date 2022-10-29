import { Subject } from "rxjs"
import { Ingredient } from "../shared/ingredients.model"

export class ShoppingListService {
  ingredientsChanged = new Subject<Ingredient[]>()

  private ingredients: Ingredient[] = [new Ingredient('tomato', 2), new Ingredient('potato', 5), new Ingredient('apples', 3)]

  getIngredients() {
    return this.ingredients.slice()
  }

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient)
    this.ingredientsChanged.next(this.ingredients.slice())
  }

  addIngredients(ingredients: Ingredient[]) {
    this.ingredients.push(...ingredients)
    this.ingredientsChanged.next(this.ingredients.slice())
  }
}

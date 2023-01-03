import { Ingredient } from "../../shared/ingredients.model";

import * as ShoppinglistActions from "./shopping-list-action";

const initialState = {
  ingredients: [
  new Ingredient('tomato', 2),
  new Ingredient('potato', 5),
  new Ingredient('apples', 3)
]
}

export function shoppingListReducer(state = initialState, action: ShoppinglistActions.AddIngredient) {
switch(action.type) {
case ShoppinglistActions.ADD_INGREDIENT:
return {
  ...state,
  ingredients: [
    ...state.ingredients, action.payload
  ]
}}
}

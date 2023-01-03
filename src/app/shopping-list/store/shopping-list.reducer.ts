import { Action } from "@ngrx/store";
import { Ingredient } from "../../shared/ingredients.model";

const initialState = {
  ingredients: [
  new Ingredient('tomato', 2),
  new Ingredient('potato', 5),
  new Ingredient('apples', 3)
]
}

export function shoppingListReducer(state = initialState, action: Action) {
switch(action.type) {
case 'ADD_INGREDIENT':
return {
  ...state,
  ingredients: [
    ...state.ingredients, action
  ]
}}
}

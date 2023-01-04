import { Action } from "@ngrx/store";
import { Ingredient } from "../../shared/ingredients.model";

import * as ShoppinglistActions from "./shopping-list-action";

export interface State {
  ingredients: Ingredient[];
  editedIngredient: Ingredient;
  editedIngredientIndex: number;
}

const initialState: State = {
  ingredients: [
  new Ingredient('tomato', 2),
  new Ingredient('potato', 5),
  new Ingredient('apples', 3)
],
  editedIngredient: null,
  editedIngredientIndex: -1,
}

export function shoppingListReducer(
  state: State = initialState,
  action: ShoppinglistActions.ShoppinglistActions
  ) {
switch(action.type) {
  case ShoppinglistActions.ADD_INGREDIENT:
    return {
      ...state,
      ingredients: [ ...state.ingredients, action.payload
      ]
    };
  case ShoppinglistActions.ADD_INGREDIENTS:
    return {
      ...state,
      ingredients: [ ...state.ingredients, ...action.payload
      ]
    }
  case ShoppinglistActions.UPDATE_INGREDIENTS:
      const ingredient = state.ingredients[action.payload.index]
      const updatedIngredient = {
        ...ingredient,
        ...action.payload.ingredient
      }
      const updatedIngredients = [...state.ingredients]
      updatedIngredients[action.payload.index] = updatedIngredient
    return {
        ...state,
        ingredients: updatedIngredients
      }
  case ShoppinglistActions.DELETE_INGREDIENTS:
    return {
        ...state,
        ingredients: state.ingredients.filter((ig, igIndex) => {
          return igIndex !== action.payload
        })
      }
  default:
    return state
  }
}

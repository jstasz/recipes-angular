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
      const ingredient = state.ingredients[state.editedIngredientIndex]
      const updatedIngredient = {
        ...ingredient,
        ...action.payload
      }
      const updatedIngredients = [...state.ingredients]
      updatedIngredients[state.editedIngredientIndex] = updatedIngredient
    return {
        ...state,
        ingredients: updatedIngredients,
        editedIngredientIndex: -1,
        editedIngredient: null
      }
  case ShoppinglistActions.DELETE_INGREDIENTS:
    return {
        ...state,
        ingredients: state.ingredients.filter((ig, igIndex) => {
          return igIndex !== state.editedIngredientIndex
        }),
        editedIngredientIndex: -1,
        editedIngredient: null
      }
  case ShoppinglistActions.START_EDIT:
    return {
      ...state,
      editedIngredientIndex: action.payload,
      editedIngredient: {...state.ingredients[action.payload]}
    }
  case ShoppinglistActions.STOP_EDIT:
    return {
      ...state,
      editedIngredientIndex: -1,
      editedIngredient: null
    }
  default:
    return state
  }
}

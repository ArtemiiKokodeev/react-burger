import { SHOW_INGREDIENT_DETAILS, CLOSE_INGREDIENT_DETAILS } from "../actions/ingredient-details";
import { TIngredient } from '../../utils/types';
import type { TIngredientsDetailesActions } from '../actions/ingredient-details';

type TIngredientDetailsInitialState = { 
  openedIngredient: TIngredient | null
}

const initialState: TIngredientDetailsInitialState = { 
  openedIngredient: null
};

export const ingredientDetailsReducer = (state = initialState, action: TIngredientsDetailesActions) => {
  switch (action.type) {
    case SHOW_INGREDIENT_DETAILS:
      return {
        ...state,
        openedIngredient: action.payload
      };
    case CLOSE_INGREDIENT_DETAILS:
      return {
        ...state,
        openedIngredient: null
      };
    default: {
      return state;
    }
  }
};
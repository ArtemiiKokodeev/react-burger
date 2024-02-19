import { SHOW_INGREDIENT_DETAILS, CLOSE_INGREDIENT_DETAILS } from "../actions/ingredient-details";
import { TIngredient } from '../../utils/types';

type TIngredientDetailsInitialState = { openedIngredient: TIngredient | null }
const initialState: TIngredientDetailsInitialState = { openedIngredient: null };

export const ingredientDetailsReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SHOW_INGREDIENT_DETAILS:
      return {
        ...state,
        openedIngredient: action.payload,
      };
    case CLOSE_INGREDIENT_DETAILS:
      return {
        ...state,
        openedIngredient: null,
      };
    default: {
      return state;
    }
  }
};
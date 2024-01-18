import { SHOW_INGREDIENT_DETAILS, CLOSE_INGREDIENT_DETAILS } from "../actions/ingredient-details";

const initialState = {
  openedIngredient: null
};

export const ingredientDetailsReducer = (state = initialState, action) => {
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
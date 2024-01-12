import { SHOW_INGREDIENT_DETAILS, CLOSE_INGREDIENT_DETAILS } from "../actions/ingredient-details";

const initialState = {
  // isModalActive: false,
  openedIngredient: null
};

export const ingredientDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_INGREDIENT_DETAILS:
      return {
        ...state,
        // isModalActive: true,
        openedIngredient: action.payload,
      };
    case CLOSE_INGREDIENT_DETAILS:
      return {
        ...state,
        // isModalActive: false,
        openedIngredient: null,
      };
    default: {
      return state;
    }
  }
};
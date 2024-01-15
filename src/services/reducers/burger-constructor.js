import {
  ADD_INGREDIENTS_TO_CONSTRUCTOR,
  REMOVE_INGREDIENTS_FROM_CONSTRUCTOR,
  SORT_INGREDIENTS_IN_CONSTRUCTOR
} from "../actions/burger-constructor"

const initialState = {
  constructorBuns: null,
  constructorIngredients: []
};

export const burgerConstructorReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_INGREDIENTS_TO_CONSTRUCTOR: {
      if (action.payload.type === "bun") {
        return {
          ...state,
          constructorBuns: action.payload,
        };
      } else {
        return {
          ...state,
          constructorIngredients: [...state.constructorIngredients, action.payload],
        };
      }
    }
    case REMOVE_INGREDIENTS_FROM_CONSTRUCTOR: {
        return {
          ...state,
          constructorIngredients: state.constructorIngredients.filter((item) => 
            item.key !== action.payload
          ),
        };
    }
    case SORT_INGREDIENTS_IN_CONSTRUCTOR: {
      const constructorIngredients = [...state.constructorIngredients];
      constructorIngredients.splice(action.payload.dragIndex, 1);
      constructorIngredients.splice(action.payload.hoverIndex, 0, action.payload.draggedIngredient);
      return {...state, constructorIngredients};
    }
    default:
      return state;
    }
  }
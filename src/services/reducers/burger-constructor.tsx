import {
  ADD_INGREDIENTS_TO_CONSTRUCTOR,
  REMOVE_INGREDIENTS_FROM_CONSTRUCTOR,
  SORT_INGREDIENTS_IN_CONSTRUCTOR,
  CLEAR_CONSTRUCTOR
} from "../actions/burger-constructor"
import { TConstructorIngredient } from "../../utils/types";
import type { TBurgerConstructor } from '../actions/burger-constructor';

type TConstructorInitialeState = {
  constructorBuns: TConstructorIngredient | null,
  constructorIngredients: Array<TConstructorIngredient>
}

export const initialState: TConstructorInitialeState = {
  constructorBuns: null,
  constructorIngredients: []
};

export const burgerConstructorReducer = (state = initialState, action: TBurgerConstructor) => {
  switch (action.type) {
    case ADD_INGREDIENTS_TO_CONSTRUCTOR: {
      if (action.payload && action.payload.type === "bun") {
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
      constructorIngredients.splice(action.payload.hoverIndex, 0, constructorIngredients.splice(action.payload.dragIndex, 1)[0]);
      return {...state, constructorIngredients};
    }
    case CLEAR_CONSTRUCTOR: {
      return {
        ...state,
        constructorBuns: null,
        constructorIngredients: []
      };
  }
    default:
      return state;
    }
  }
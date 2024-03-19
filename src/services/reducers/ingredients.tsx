import {
  GET_INGREDIENTS,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED
} from '../actions/ingredients';
import { TIngredient } from "../../utils/types";
import type { TIngredientsActions } from '../actions/ingredients';

interface IIngredientsInitialState {
  ingredientsRequest: boolean,
  ingredientsFailed: boolean,
  ingredients: Array<TIngredient>
};

export const initialState: IIngredientsInitialState = {
  ingredientsRequest: true,
  ingredientsFailed: false,
  ingredients: []
};

export const ingredientsReducer = (state = initialState, action: TIngredientsActions) => {
  switch (action.type) {
    case GET_INGREDIENTS: {
      return {
        ...state,
        // Запрос начал выполняться
        ingredientsRequest: true,
        // Сбрасываем статус наличия ошибок от предыдущего запроса 
        // на случай, если он был и завершился с ошибкой
        ingredientsFailed: false,
      };
    }
    case GET_INGREDIENTS_SUCCESS: {
      return { 
        ...state, 
        // Запрос выполнился успешно, помещаем полученные данные в хранилище
        ingredients: action.payload, 
        // Запрос закончил своё выполнение
        ingredientsRequest: false 
      };
    }
    case GET_INGREDIENTS_FAILED: {
      return { 
        ...state, 
        // Запрос выполнился с ошибкой, 
        // выставляем соответсвующие значения в хранилище
        ingredientsFailed: true, 
        // Запрос закончил своё выполнение
        ingredientsRequest: false 
      };
    }
    default: {
      return state
    }
  }
} 
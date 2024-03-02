import * as api from '../../utils/api';
import { Dispatch } from 'redux';
import { TIngredient } from '../../utils/types'
export const GET_INGREDIENTS: "GET_INGREDIENTS" = "GET_INGREDIENTS";
export const GET_INGREDIENTS_SUCCESS: "GET_INGREDIENTS_SUCCESS" = "GET_INGREDIENTS_SUCCESS";
export const GET_INGREDIENTS_FAILED: "GET_INGREDIENTS_FAILED" = "GET_INGREDIENTS_FAILED";

export interface IGetIngredients {
  readonly type: typeof GET_INGREDIENTS;
};

export interface IGetIngredientsSuccess {
  readonly type: typeof GET_INGREDIENTS_SUCCESS;
  readonly payload: Array<TIngredient>;
};

export interface IGetIngredientsFailed {
  readonly type: typeof GET_INGREDIENTS_FAILED
};

export type TIngredientsActions = 
  | IGetIngredients
  | IGetIngredientsSuccess
  | IGetIngredientsFailed;

export function handleGetIngredients() {
  return function(dispatch: Dispatch) {
    dispatch({
      type: GET_INGREDIENTS
    });
    api.getIngredients().then(res => {
      dispatch({
        type: GET_INGREDIENTS_SUCCESS,
        payload: res.data
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: GET_INGREDIENTS_FAILED, payload: err });
    })
  }
}
import * as api from '../../utils/api';
import { AppDispatch, AppThunkAction } from '../../index';
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

export function handleGetIngredients(): AppThunkAction {
  return function(dispatch: AppDispatch) {
    dispatch({
      type: GET_INGREDIENTS
    });
    api.getIngredients().then(res => {
      dispatch({
        type: GET_INGREDIENTS_SUCCESS,
        payload: res.data
      });
      // console.log(res.data)
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: GET_INGREDIENTS_FAILED, payload: err });
    })
  }
}
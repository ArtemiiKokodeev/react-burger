import * as api from '../../utils/api';
import { AppDispatch, AppThunkAction } from '../../index';
import { TIngredient } from '../../utils/types'
export const CREATE_ORDER: "CREATE_ORDER" = "CREATE_ORDER";
export const CREATE_ORDER_SUCCESS: "CREATE_ORDER_SUCCESS" = "CREATE_ORDER_SUCCESS";
export const CREATE_ORDER_FAILED: "CREATE_ORDER_FAILED" = "CREATE_ORDER_FAILED";
export const SHOW_ORDER_DETAILS: "SHOW_ORDER_DETAILS" = "SHOW_ORDER_DETAILS";
export const CLOSE_ORDER_DETAILS: "CLOSE_ORDER_DETAILS" = "CLOSE_ORDER_DETAILS";

export interface IPostCreateOrder {
  readonly type: typeof CREATE_ORDER
};

export interface IPostCreateOrderSuccess {
  readonly type: typeof CREATE_ORDER_SUCCESS;
  readonly payload: number;
};

export interface IPostCreateOrderFailed {
  readonly type: typeof CREATE_ORDER_FAILED
};

export interface IShowOrderDetails {
  readonly type: typeof SHOW_ORDER_DETAILS
};

export interface ICloseOrderDetails {
  readonly type: typeof CLOSE_ORDER_DETAILS
};

export type TOrderActions = 
  | IPostCreateOrder
  | IPostCreateOrderSuccess
  | IPostCreateOrderFailed
  | IShowOrderDetails
  | ICloseOrderDetails;

export function handleCreateOrder(ingredients: Array<TIngredient>): AppThunkAction {
  return function(dispatch: AppDispatch) {
    dispatch({
      type: CREATE_ORDER
    });
    api.createOrder(ingredients).then(res => {
      if (res && res.success) {
        dispatch({
          type: CREATE_ORDER_SUCCESS,
          payload: res.order.number
        });
        dispatch({
          type: SHOW_ORDER_DETAILS
        });
      }
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: CREATE_ORDER_FAILED });
    })
  }
}
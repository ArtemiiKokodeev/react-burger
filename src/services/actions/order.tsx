import * as api from '../../utils/api';
import { Dispatch } from 'redux';
import { TIngredient } from '../../utils/types'
export const CREATE_ORDER = "CREATE_ORDER";
export const CREATE_ORDER_SUCCESS = "CREATE_ORDER_SUCCESS";
export const CREATE_ORDER_FAILED = "CREATE_ORDER_FAILED";
export const SHOW_ORDER_DETAILS = "SHOW_ORDER_DETAILS";
export const CLOSE_ORDER_DETAILS = "CLOSE_ORDER_DETAILS";

export function handleCreateOrder(ingredients: Array<TIngredient>) {
  return function(dispatch: Dispatch) {
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
      dispatch({ type: CREATE_ORDER_FAILED, payload: err });
    })
  }
}
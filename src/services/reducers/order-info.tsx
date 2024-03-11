import { SHOW_ORDER_INFO, CLOSE_ORDER_INFO } from "../actions/order-info";
import { IOrderArr } from '../../utils/types'
import type { TOrderInfoActions } from '../actions/order-info';

type TOrderInfoInitialState = { 
  openedOrder: IOrderArr | null
}

const initialState: TOrderInfoInitialState = { 
  openedOrder: null
};

export const orderInfoReducer = (state = initialState, action: TOrderInfoActions) => {
  switch (action.type) {
    case SHOW_ORDER_INFO:
      return {
        ...state,
        openedOrder: action.payload
      };
    case CLOSE_ORDER_INFO:
      return {
        ...state,
        openedOrder: null
      };
    default: {
      return state;
    }
  }
};
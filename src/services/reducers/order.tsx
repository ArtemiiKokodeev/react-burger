import {
  CREATE_ORDER,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAILED,
  SHOW_ORDER_DETAILS,
  CLOSE_ORDER_DETAILS
} from '../actions/order';
import type { TOrderActions } from '../actions/order';

type TOrderInitialState = { 
  orderRequest: boolean,
  orderFailed: boolean,
  orderNum: number,
  isOrderModalOpened: boolean
}

const initialState: TOrderInitialState = {
  orderRequest: false,
  orderFailed: false,
  orderNum: 0,
  isOrderModalOpened: false
};

export const orderReducer = (state = initialState, action: TOrderActions) : TOrderInitialState => {
  switch (action.type) {
    case CREATE_ORDER: {
      return {
        ...state,
        orderRequest: true,
        orderFailed: false,
      };
    }
    case CREATE_ORDER_SUCCESS: {
      return { 
        ...state, 
        orderNum: action.payload, 
        orderRequest: false 
      };
    }
    case CREATE_ORDER_FAILED: {
      return { 
        ...state, 
        orderFailed: true, 
        orderRequest: false
      };
    }
    case SHOW_ORDER_DETAILS: {
      return { 
        ...state, 
        isOrderModalOpened: true
      };
    }
    case CLOSE_ORDER_DETAILS: {
      return { 
        ...state, 
        isOrderModalOpened: false
      };
    }
    default: {
      return state
    }
  }
} 
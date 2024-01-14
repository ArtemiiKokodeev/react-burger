import {
  CREATE_ORDER,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAILED,
  SHOW_ORDER_DETAILS,
  CLOSE_ORDER_DETAILS
} from '../actions/order';

const initialState = {
  orderRequest: false,
  orderFailed: false,
  orderNum: null,
  isOrderModalOpened: false
};

export const orderReducer = (state = initialState, action) => {
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
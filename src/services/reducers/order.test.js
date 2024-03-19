import { orderReducer, initialState } from './order';
import {
  CREATE_ORDER,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAILED,
  SHOW_ORDER_DETAILS,
  CLOSE_ORDER_DETAILS
} from '../actions/order';

const orderNumber = 1;

describe('login reducer', () => {
  it('should return the initial state', () => {
    const received = orderReducer(undefined, {});
    const expected = {
      ...initialState
    };
    expect(received).toEqual(expected);
  })

  it('should handle CREATE_ORDER', () => {
    const received = orderReducer(initialState, {
      type: CREATE_ORDER
    });
    const expected = {
      ...initialState,
      orderRequest: true,
      orderFailed: false,
    };
    expect(received).toEqual(expected);
  })

  it('should handle CREATE_ORDER_SUCCESS', () => {
    const received = orderReducer(initialState, {
      type: CREATE_ORDER_SUCCESS,
      payload: orderNumber
    });
    const expected = {
      ...initialState,
      orderNum: orderNumber, 
      orderRequest: false
    };
    expect(received).toEqual(expected);
  })

  it('should handle CREATE_ORDER_FAILED', () => {
    const received = orderReducer(initialState, {
      type: CREATE_ORDER_FAILED
    });
    const expected = {
      ...initialState,
      orderFailed: true, 
      orderRequest: false
    };
    expect(received).toEqual(expected);
  })

  it('should handle SHOW_ORDER_DETAILS', () => {
    const received = orderReducer(initialState, {
      type: SHOW_ORDER_DETAILS,
      payload: orderNumber
    });
    const expected = {
      ...initialState,
      isOrderModalOpened: true
    };
    expect(received).toEqual(expected);
  })

  it('should handle CLOSE_ORDER_DETAILS', () => {
    const received = orderReducer(initialState, {
      type: CLOSE_ORDER_DETAILS
    });
    const expected = {
      ...initialState,
      isOrderModalOpened: false
    };
    expect(received).toEqual(expected);
  })


})
import { orderInfoReducer, initialState } from './order-info';
import { SHOW_ORDER_INFO, CLOSE_ORDER_INFO } from "../actions/order-info";

const orderInfo = {
  _id: '',
  ingredients: [],
  status: '',
  name: '',
  createdAt: '',
  updatedAt: '',
  number: 1,
  __v: 1,
};

describe('order-info reducer', () => {
  it('should return the initial state', () => {
    const received = orderInfoReducer(undefined, {});
    const expected = {
      ...initialState
    };
    expect(received).toEqual(expected);
  })

  it('should handle SHOW_ORDER_INFO', () => {
    const received = orderInfoReducer(initialState, {
      type: SHOW_ORDER_INFO,
      payload: orderInfo
    });
    const expected = {
      ...initialState,
      openedOrder: orderInfo
    };
    expect(received).toEqual(expected);
  })

  it('should handle CLOSE_ORDER_INFO', () => {
    const received = orderInfoReducer(initialState, {
      type: CLOSE_ORDER_INFO,
      
    });
    const expected = {
      ...initialState,
      openedOrder: null
    };
    expect(received).toEqual(expected);
  })

})
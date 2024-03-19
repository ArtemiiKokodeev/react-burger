import { feedReducer, initialState } from './feed';
import {
  FEED_CONNECTION_SUCCESS,
  FEED_CONNECTION_ERROR,
  FEED_CONNECTION_CLOSED,
  FEED_GET_MESSAGE
} from '../actions/feed';

const connectionError = '';
const ordersAnswer = {
  orders: [
    {
      _id: '',
      ingredients: [],
      status: '',
      name: '',
      createdAt: '',
      updatedAt: '',
      number: 1,
      __v: 1,
    },
    {
      _id: '',
      ingredients: [],
      status: '',
      name: '',
      createdAt: '',
      updatedAt: '',
      number: 2,
      __v: 2,
    }
  ],
  total: 1,
  totalToday: 1
}

describe('feed reducer', () => {
  it('should return the initial state', () => {
    const received = feedReducer(undefined, {});
    const expected = {
      ...initialState
    };
    expect(received).toEqual(expected);
  })

  it('should handle FEED_CONNECTION_SUCCESS', () => {
    const received = feedReducer(initialState, {
      type: FEED_CONNECTION_SUCCESS
    });
    const expected = {
      ...initialState,
      error: undefined,
      wsConnected: true
    };
    expect(received).toEqual(expected);
  })

  it('should handle FEED_CONNECTION_ERROR', () => {
    const received = feedReducer(initialState, {
      type: FEED_CONNECTION_ERROR,
      payload: connectionError
    });
    const expected = {
      ...initialState,
      error: connectionError,
      wsConnected: false
    };
    expect(received).toEqual(expected);
  })

  it('should handle FEED_CONNECTION_CLOSED', () => {
    const received = feedReducer(initialState, {
      type: FEED_CONNECTION_CLOSED
    });
    const expected = {
      ...initialState,
      error: undefined,
      wsConnected: false
    };
    expect(received).toEqual(expected);
  })

  it('should handle FEED_GET_MESSAGE', () => {
    const received = feedReducer(initialState, {
      type: FEED_GET_MESSAGE,
      payload: {
        orders: ordersAnswer.orders,
        total: ordersAnswer.total,
        totalToday: ordersAnswer.totalToday
      }
    });
    const expected = {
      ...initialState,
      error: undefined,
      orders: ordersAnswer.orders,
      total: ordersAnswer.total,
      totalToday: ordersAnswer.totalToday
    };
    expect(received).toEqual(expected);
  })

})
import { userFeedReducer, initialState } from './user-feed';
import {
  USER_FEED_CONNECTION_SUCCESS,
  USER_FEED_CONNECTION_ERROR,
  USER_FEED_CONNECTION_CLOSED,
  USER_FEED_GET_MESSAGE
} from '../actions/user-feed';

const connectionError = '';
const userOrdersAnswer = {
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

describe('user-feed reducer', () => {
  it('should return the initial state', () => {
    const received = userFeedReducer(undefined, {});
    const expected = {
      ...initialState
    };
    expect(received).toEqual(expected);
  })

  it('should handle USER_FEED_CONNECTION_SUCCESS', () => {
    const received = userFeedReducer(initialState, {
      type: USER_FEED_CONNECTION_SUCCESS
    });
    const expected = {
      ...initialState,
      error: undefined,
      wsConnected: true
    };
    expect(received).toEqual(expected);
  })

  it('should handle USER_FEED_CONNECTION_ERROR', () => {
    const received = userFeedReducer(initialState, {
      type: USER_FEED_CONNECTION_ERROR,
      payload: connectionError
    });
    const expected = {
      ...initialState,
      error: connectionError,
      wsConnected: false
    };
    expect(received).toEqual(expected);
  })

  it('should handle USER_FEED_CONNECTION_CLOSED', () => {
    const received = userFeedReducer(initialState, {
      type: USER_FEED_CONNECTION_CLOSED
    });
    const expected = {
      ...initialState,
      error: undefined,
      wsConnected: false
    };
    expect(received).toEqual(expected);
  })

  it('should handle USER_FEED_GET_MESSAGE', () => {
    const received = userFeedReducer(initialState, {
      type: USER_FEED_GET_MESSAGE,
      payload: userOrdersAnswer
    });
    const expected = {
      ...initialState,
      error: undefined,
      userOrders: userOrdersAnswer.orders,
      total: userOrdersAnswer.total,
      totalToday: userOrdersAnswer.totalToday
    };
    expect(received).toEqual(expected);
  })

})
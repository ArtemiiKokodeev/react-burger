import {
  USER_FEED_CONNECTION_SUCCESS,
  USER_FEED_CONNECTION_ERROR,
  USER_FEED_CONNECTION_CLOSED,
  USER_FEED_GET_MESSAGE
} from '../actions/user-feed';
import type { TUserFeedActions } from '../actions/user-feed';
import type { IOrderArr } from '../../utils/types';

type TUserFeedState = {
  wsConnected: boolean;
  userOrders: IOrderArr[];
  total: number | null;
  totalToday: number | null;

  error?: Event;
}

export const initialState: TUserFeedState = {
  wsConnected: false,
  userOrders: [],
  total: null,
  totalToday: null
};

export const userFeedReducer = (state = initialState, action: TUserFeedActions) => {
  switch (action.type) {
    case USER_FEED_CONNECTION_SUCCESS:
      return {
        ...state,
        error: undefined,
        wsConnected: true
      };

    case USER_FEED_CONNECTION_ERROR:
      return {
        ...state,
        error: action.payload,
        wsConnected: false
      };

    case USER_FEED_CONNECTION_CLOSED:
      return {
        ...state,
        error: undefined,
        wsConnected: false
      };

    case USER_FEED_GET_MESSAGE:
      return {
        ...state,
        error: undefined,
        userOrders: action.payload.orders,
        total: action.payload.total,
        totalToday: action.payload.totalToday
      };

    default:
      return state;
  }
};
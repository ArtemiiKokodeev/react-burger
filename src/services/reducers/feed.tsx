import {
  FEED_CONNECTION_SUCCESS,
  FEED_CONNECTION_ERROR,
  FEED_CONNECTION_CLOSED,
  FEED_GET_MESSAGE
} from '../actions/feed';
import type { TFeedActions } from '../actions/feed';
import type { IOrderArr } from '../../utils/types';

type TFeedState = {
  wsConnected: boolean;
  orders: IOrderArr[];
  total: number | null;
  totalToday: number | null;

  error?: Event;
}

const initialState: TFeedState = {
  wsConnected: false,
  orders: [],
  total: null,
  totalToday: null
};

export const feedReducer = (state = initialState, action: TFeedActions) => {
  switch (action.type) {
    case FEED_CONNECTION_SUCCESS:
      return {
        ...state,
        error: undefined,
        wsConnected: true
      };

    case FEED_CONNECTION_ERROR:
      return {
        ...state,
        error: action.payload,
        wsConnected: false
      };

    case FEED_CONNECTION_CLOSED:
      return {
        ...state,
        error: undefined,
        wsConnected: false
      };

    case FEED_GET_MESSAGE:
      return {
        ...state,
        error: undefined,
        orders: action.payload.orders,
        total: action.payload.total,
        totalToday: action.payload.totalToday
      };

    default:
      return state;
  }
};
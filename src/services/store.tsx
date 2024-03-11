import {applyMiddleware, createStore} from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';
import reducer from "./reducers/index";
import thunkMiddleware from "redux-thunk";
import { socketMiddleware } from '../utils/socket-middleware';
import type { TFeedStoreActions } from "./actions/feed";
import type { TUserFeedStoreActions } from "./actions/user-feed";
import {
  FEED_CONNECTION_CLOSED,
  FEED_CONNECTION_ERROR,
  FEED_CONNECTION_START,
  FEED_CONNECTION_SUCCESS,
  FEED_GET_MESSAGE,
  FEED_SEND_MESSAGE
} from './actions/feed';

import {
  USER_FEED_CONNECTION_CLOSED,
  USER_FEED_CONNECTION_ERROR,
  USER_FEED_CONNECTION_START,
  USER_FEED_CONNECTION_SUCCESS,
  USER_FEED_GET_MESSAGE,
  USER_FEED_SEND_MESSAGE
} from './actions/user-feed';

const feedActions: TFeedStoreActions = {
  wsInit: FEED_CONNECTION_START,
  wsSendMessage: FEED_SEND_MESSAGE,
  onOpen: FEED_CONNECTION_SUCCESS,
  onClose: FEED_CONNECTION_CLOSED,
  onError: FEED_CONNECTION_ERROR,
  onMessage: FEED_GET_MESSAGE
};

const userFeedActions: TUserFeedStoreActions = {
  wsInit: USER_FEED_CONNECTION_START,
  wsSendMessage: USER_FEED_SEND_MESSAGE,
  onOpen: USER_FEED_CONNECTION_SUCCESS,
  onClose: USER_FEED_CONNECTION_CLOSED,
  onError: USER_FEED_CONNECTION_ERROR,
  onMessage: USER_FEED_GET_MESSAGE
};


export const configureStore = (initialState?: any) => {
  const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(
      applyMiddleware(
        thunkMiddleware, 
        socketMiddleware(feedActions),
        socketMiddleware(userFeedActions)
      )
    )
  );

  return store;
}
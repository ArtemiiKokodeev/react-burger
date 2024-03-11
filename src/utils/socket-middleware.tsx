import type { Middleware, MiddlewareAPI } from 'redux';

import { TFeedStoreActions, TFeedActions } from '../services/actions/feed';
import { TUserFeedStoreActions, TUserFeedActions } from '../services/actions/user-feed';

import type {
  AppDispatch,
  RootState
} from '../index';

export const socketMiddleware = (wsActions: TFeedStoreActions | TUserFeedStoreActions): Middleware => {
  return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
    let socket: WebSocket | null = null;

    return next => (action: TFeedActions | TUserFeedActions) => {
      const { dispatch } = store;
      const { type } = action;
      const { wsInit, onOpen, onClose, onError, onMessage } = wsActions;
      if (type === wsInit) {
        socket = new WebSocket(action.payload);
        // console.log('WebSocket connection initiated:', action.payload);

        socket.onopen = event => {
          // console.log('WebSocket connection opened:', event);

          dispatch({ type: onOpen });
        };

        socket.onerror = event => {
          // console.error('WebSocket connection error:', event);
          dispatch({ type: onError, payload: event });
        };

        socket.onclose = event => {
          // console.log('WebSocket connection closed:', event);

          dispatch({ type: onClose });
          socket && socket.close();
          socket = null;
          // console.log('WebSocket connection closed:', event);
        };

        socket.onmessage = event => {
          // console.log('WebSocket message received:', event);
          const { data } = event;
          const parsedData = JSON.parse(data);
          const { success, ...restParsedData } = parsedData;

          dispatch({ type: onMessage, payload: restParsedData });
          // console.log(restParsedData)
        };
      }
    
      next(action);
    };
  }) as Middleware;
};
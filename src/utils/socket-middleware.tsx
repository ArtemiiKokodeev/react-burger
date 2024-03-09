import type { Middleware, MiddlewareAPI } from 'redux';

import {
  TWSStoreActions, TWSActions
} from '../services/actions/ws-action-types';

import type {
  AppDispatch,
  RootState
} from '../index';

// const accessToken = localStorage.getItem('accessToken');

export const socketMiddleware = (wsActions: TWSStoreActions): Middleware => {
  return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
    let socket: WebSocket | null = null;

    return next => (action: TWSActions) => {
      const { dispatch } = store;
      const { type } = action;
      const { wsInit, onOpen, onClose, onError, onMessage } = wsActions;
      // const { user } = getState().user;
      if (type === wsInit) {
        // wsUrl = action.payload;
        socket = new WebSocket(action.payload);
        // console.log('WebSocket connection initiated:', action.payload);
      }
      if (socket) {
        socket.onopen = event => {
          // console.log('WebSocket connection opened:', event);
          dispatch({ type: onOpen, payload: event });
        };

        socket.onerror = event => {
          // console.error('WebSocket connection error:', event);
          dispatch({ type: onError, payload: event });
        };

        socket.onmessage = event => {
          // console.log('WebSocket message received:', event);
          const { data } = event;
          const parsedData = JSON.parse(data);
          const { success, ...restParsedData } = parsedData;

          dispatch({ type: onMessage, payload: restParsedData });
          // console.log(restParsedData)
        };

        socket.onclose = event => {
          // console.log('WebSocket connection closed:', event);
          dispatch({ type: onClose });
          socket && socket.close();
          socket = null;
          // console.log('WebSocket connection closed:', event);
        };
      }

      next(action);
    };
  }) as Middleware;
};
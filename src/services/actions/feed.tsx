import type { IMessageType } from '../../utils/types';

export const FEED_CONNECTION_START: 'FEED_CONNECTION_START' = 'FEED_CONNECTION_START';
export const FEED_CONNECTION_SUCCESS: 'FEED_CONNECTION_SUCCESS' = 'FEED_CONNECTION_SUCCESS';
export const FEED_CONNECTION_ERROR: 'FEED_CONNECTION_ERROR' = 'FEED_CONNECTION_ERROR';
export const FEED_CONNECTION_CLOSED: 'FEED_CONNECTION_CLOSED' = 'FEED_CONNECTION_CLOSED';
export const FEED_GET_MESSAGE: 'FEED_GET_MESSAGE' = 'FEED_GET_MESSAGE';
export const FEED_SEND_MESSAGE: 'FEED_SEND_MESSAGE' = 'FEED_SEND_MESSAGE';

export type TFeedStoreActions = {
  wsInit: typeof FEED_CONNECTION_START,
  wsSendMessage: typeof FEED_SEND_MESSAGE,
  onOpen: typeof FEED_CONNECTION_SUCCESS,
  onClose: typeof FEED_CONNECTION_CLOSED,
  onError: typeof FEED_CONNECTION_ERROR,
  onMessage: typeof FEED_GET_MESSAGE,
};

export interface IFeedConnectionStart {
  readonly type: typeof FEED_CONNECTION_START;
  readonly payload: string;
}

export interface IFeedConnectionSuccessAction {
  readonly type: typeof FEED_CONNECTION_SUCCESS;
}

export interface IFeedConnectionErrorAction {
  readonly type: typeof FEED_CONNECTION_ERROR;
  readonly payload: Event;
}

export interface IFeedConnectionClosedAction {
  readonly type: typeof FEED_CONNECTION_CLOSED;
}

export interface IFeedGetMessageAction {
  readonly type: typeof FEED_GET_MESSAGE;
  readonly payload: IMessageType;
}

export interface IFeedSendMessageAction {
  readonly type: typeof FEED_SEND_MESSAGE;
  readonly payload: [];
}

export type TFeedActions =
  | IFeedConnectionStart
  | IFeedConnectionSuccessAction
  | IFeedConnectionErrorAction
  | IFeedConnectionClosedAction
  | IFeedGetMessageAction
  | IFeedSendMessageAction;
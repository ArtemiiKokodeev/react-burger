import type { IMessageType } from '../../utils/types';

export const USER_FEED_CONNECTION_START: 'USER_FEED_CONNECTION_START' = 'USER_FEED_CONNECTION_START';
export const USER_FEED_CONNECTION_SUCCESS: 'USER_FEED_CONNECTION_SUCCESS' = 'USER_FEED_CONNECTION_SUCCESS';
export const USER_FEED_CONNECTION_ERROR: 'USER_FEED_CONNECTION_ERROR' = 'USER_FEED_CONNECTION_ERROR';
export const USER_FEED_CONNECTION_CLOSED: 'USER_FEED_CONNECTION_CLOSED' = 'USER_FEED_CONNECTION_CLOSED';
export const USER_FEED_GET_MESSAGE: 'USER_FEED_GET_MESSAGE' = 'USER_FEED_GET_MESSAGE';
export const USER_FEED_SEND_MESSAGE: 'USER_FEED_SEND_MESSAGE' = 'USER_FEED_SEND_MESSAGE';

export type TUserFeedStoreActions = {
  wsInit: typeof USER_FEED_CONNECTION_START,
  wsSendMessage: typeof USER_FEED_SEND_MESSAGE,
  onOpen: typeof USER_FEED_CONNECTION_SUCCESS,
  onClose: typeof USER_FEED_CONNECTION_CLOSED,
  onError: typeof USER_FEED_CONNECTION_ERROR,
  onMessage: typeof USER_FEED_GET_MESSAGE,
};

export interface IUserFeedConnectionStart {
  readonly type: typeof USER_FEED_CONNECTION_START;
  readonly payload: string;
}

export interface IUserFeedConnectionSuccessAction {
  readonly type: typeof USER_FEED_CONNECTION_SUCCESS;
}

export interface IUserFeedConnectionErrorAction {
  readonly type: typeof USER_FEED_CONNECTION_ERROR;
  readonly payload: Event;
}

export interface IUserFeedConnectionClosedAction {
  readonly type: typeof USER_FEED_CONNECTION_CLOSED;
}

export interface IUserFeedGetMessageAction {
  readonly type: typeof USER_FEED_GET_MESSAGE;
  readonly payload: IMessageType;
}

export interface IUserFeedSendMessageAction {
  readonly type: typeof USER_FEED_SEND_MESSAGE;
  readonly payload: [];
}

export type TUserFeedActions =
  | IUserFeedConnectionStart
  | IUserFeedConnectionSuccessAction
  | IUserFeedConnectionErrorAction
  | IUserFeedConnectionClosedAction
  | IUserFeedGetMessageAction
  | IUserFeedSendMessageAction;
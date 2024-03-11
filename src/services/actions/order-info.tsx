import { IOrderArr } from '../../utils/types';

export const SHOW_ORDER_INFO: "SHOW_ORDER_INFO" = "SHOW_ORDER_INFO";
export const CLOSE_ORDER_INFO: "CLOSE_ORDER_INFO" = "CLOSE_ORDER_INFO";

export interface IShowOrderInfo {
  readonly type: typeof SHOW_ORDER_INFO;
  readonly payload: IOrderArr;
};

export interface ICloseShowOrderInfo {
  readonly type: typeof CLOSE_ORDER_INFO;
};

export type TOrderInfoActions = 
  | IShowOrderInfo
  | ICloseShowOrderInfo;

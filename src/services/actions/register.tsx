import * as api from '../../utils/api';
import { Dispatch } from 'redux';
export const POST_REGISTER: "POST_REGISTER" = "POST_REGISTER";
export const POST_REGISTER_SUCCESS: "POST_REGISTER_SUCCESS" = "POST_REGISTER_SUCCESS";
export const POST_REGISTER_FAILED: "POST_REGISTER_FAILED" = "POST_REGISTER_FAILED";
export const POST_REGISTER_CLOSE_SUCCESS_TEXT: "POST_REGISTER_CLOSE_SUCCESS_TEXT" = "POST_REGISTER_CLOSE_SUCCESS_TEXT";

export interface IPostRegister {
  readonly type: typeof POST_REGISTER
};

export interface IPostRegisterSuccess {
  readonly type: typeof POST_REGISTER_SUCCESS
};

export interface IPostRegisterFailed {
  readonly type: typeof POST_REGISTER_FAILED
};

export interface ICloseSuccessRegistTest {
  readonly type: typeof POST_REGISTER_CLOSE_SUCCESS_TEXT
};

export type TRegisterActions = 
  | IPostRegister
  | IPostRegisterSuccess
  | IPostRegisterFailed
  | ICloseSuccessRegistTest;

export function handleRegistration(name: string, email: string, password: string) {
  return function(dispatch: Dispatch) {
    dispatch({
      type: POST_REGISTER
    });
    api.register(name, email, password).then(res => {
      if (res && res.success) {
        dispatch({
          type: POST_REGISTER_SUCCESS,
          payload: res.data
        });
      }
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: POST_REGISTER_FAILED, payload: err });
    })
  }
}
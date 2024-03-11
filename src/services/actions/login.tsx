import * as api from '../../utils/api';
import { AppDispatch, AppThunkAction } from '../../index';
export const POST_LOGIN: "POST_LOGIN" = "POST_LOGIN";
export const POST_LOGIN_SUCCESS: "POST_LOGIN_SUCCESS" = "POST_LOGIN_SUCCESS";
export const POST_LOGIN_FAILED: "POST_LOGIN_FAILED" = "POST_LOGIN_FAILED";
export const POST_LOGOUT: "POST_LOGOUT" = "POST_LOGOUT";

export interface IPostLogin {
  readonly type: typeof POST_LOGIN
};

export interface IPostLoginSuccess {
  readonly type: typeof POST_LOGIN_SUCCESS;
};

export interface IPostLoginFailed {
  readonly type: typeof POST_LOGIN_FAILED
};

export interface IPostLogout {
  readonly type: typeof POST_LOGOUT
};

export type TLogin = 
  | IPostLogin
  | IPostLoginSuccess
  | IPostLoginFailed
  | IPostLogout;

export function handleLogin(email: string, password: string): AppThunkAction {
  return function(dispatch: AppDispatch) {
    dispatch({
      type: POST_LOGIN
    });
    api.login(email, password).then(res => {
      if (res && res.success) {
        dispatch({
          type: POST_LOGIN_SUCCESS,
          payload: res.data
        });
        localStorage.setItem("accessToken", res.accessToken);
        localStorage.setItem("refreshToken", res.refreshToken);
      }
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: POST_LOGIN_FAILED, payload: err });
    })
  }
}
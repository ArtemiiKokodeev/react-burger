import * as api from '../../utils/api';
import { burgerPartyApiUrl } from '../../utils/constants';
import { Dispatch } from 'redux';
import { IUserInfoFormValues } from '../../utils/types'
export const GET_USER_INFO: "GET_USER_INFO" = "GET_USER_INFO";
export const GET_USER_INFO_SUCCESS: "GET_USER_INFO_SUCCESS" = "GET_USER_INFO_SUCCESS";
export const GET_USER_INFO_FAILED: "GET_USER_INFO_FAILED" = "GET_USER_INFO_FAILED";
export const PATCH_USER_INFO: "PATCH_USER_INFO" = "PATCH_USER_INFO";
export const PATCH_USER_INFO_SUCCESS: "PATCH_USER_INFO_SUCCESS" = "PATCH_USER_INFO_SUCCESS";
export const PATCH_USER_INFO_FAILED: "PATCH_USER_INFO_FAILED" = "PATCH_USER_INFO_FAILED";
export const POST_USER_LOGOUT: "POST_USER_LOGOUT" = "POST_USER_LOGOUT";
export const SET_AUTH_CHECKED: "SET_AUTH_CHECKED" = "SET_AUTH_CHECKED";

export interface IGetUserInfo {
  readonly type: typeof GET_USER_INFO
};

export interface IGetUserInfoSuccess {
  readonly type: typeof GET_USER_INFO_SUCCESS;
  readonly payload: IUserInfoFormValues;
};

export interface IGetUserInfoFailed {
  readonly type: typeof GET_USER_INFO_FAILED
};

export interface IUpdateUserInfo {
  readonly type: typeof PATCH_USER_INFO
};

export interface IUpdateUserInfoSuccess {
  readonly type: typeof PATCH_USER_INFO_SUCCESS;
  readonly payload: IUserInfoFormValues;
};

export interface IUpdateUserInfoFailed {
  readonly type: typeof PATCH_USER_INFO_FAILED
};

export interface IUserLogout {
  readonly type: typeof POST_USER_LOGOUT;
};

export interface IAuthCheck {
  readonly type: typeof SET_AUTH_CHECKED;
  readonly payload: boolean;
};

export type TUserProfile = 
  | IGetUserInfo
  | IGetUserInfoSuccess
  | IGetUserInfoFailed
  | IUpdateUserInfo
  | IUpdateUserInfoSuccess
  | IUpdateUserInfoFailed
  | IUserLogout
  | IAuthCheck;

export function handleGetUserInfo() {
  return function(dispatch: Dispatch) {
    dispatch({
      type: GET_USER_INFO
    });
    api.fetchWithRefresh(`${burgerPartyApiUrl}auth/user`, {
        headers: {
          'Content-type': 'application/json',
          authorization: localStorage.getItem('accessToken')
        }
      }
    ).then(res => {
      if (res && res.success) {
        dispatch({
          type: GET_USER_INFO_SUCCESS,
          payload: res.user
        });
      }
    })
    .catch((err) => {
      // console.log(err);
      dispatch({ type: GET_USER_INFO_FAILED, payload: err });
    })
    .finally(() => dispatch({
      type: SET_AUTH_CHECKED,
      payload: true,
    }));
  }
}

export function handleUpdateUserInfo(userInfo: IUserInfoFormValues) {
  return function(dispatch: Dispatch) {
    const { name, email, password } = userInfo;
    dispatch({
      type: PATCH_USER_INFO
    });
    api.fetchWithRefresh(`${burgerPartyApiUrl}auth/user`, {
      method: "PATCH",
      headers: {
        'Content-type': 'application/json',
        authorization: localStorage.getItem('accessToken')
      },
      body: JSON.stringify({ name, email, password }),
      }
    ).then(res => {
      if (res && res.success) {
        dispatch({
          type: PATCH_USER_INFO_SUCCESS,
          payload: res.user
        });
      }
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: PATCH_USER_INFO_FAILED, payload: err });
    })
  }
}

export function handleLogout() {
  return function(dispatch: Dispatch) {
    api.logout().then(res => {
      if (res && res.success) {
        dispatch({
          type: POST_USER_LOGOUT
        });
      }
    })
    .catch((err) => {
      console.log(err);
    })
  }
}
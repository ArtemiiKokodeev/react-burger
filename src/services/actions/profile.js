import * as api from '../../utils/api';
import { burgerPartyApiUrl } from '../../utils/constants';
export const GET_USER_INFO = "GET_USER_INFO";
export const GET_USER_INFO_SUCCESS = "GET_USER_INFO_SUCCESS";
export const GET_USER_INFO_FAILED = "GET_USER_INFO_FAILED";
export const PATCH_USER_INFO = "PATCH_USER_INFO";
export const PATCH_USER_INFO_SUCCESS = "PATCH_USER_INFO_SUCCESS";
export const PATCH_USER_INFO_FAILED = "PATCH_USER_INFO_FAILED";

export function handleGetUserInfo() {
  return function(dispatch) {
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
      console.log(err);
      dispatch({ type: GET_USER_INFO_FAILED, payload: err });
    })
  }
}

export function handleUpdateUserInfo(name, email, password) {
  return function(dispatch) {
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
import * as api from '../../utils/api';
export const POST_LOGIN = "POST_LOGIN";
export const POST_LOGIN_SUCCESS = "POST_LOGIN_SUCCESS";
export const POST_LOGIN_FAILED = "POST_LOGIN_FAILED";
export const POST_LOGOUT = "POST_LOGOUT";

export function handleLogin(email, password) {
  return function(dispatch) {
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
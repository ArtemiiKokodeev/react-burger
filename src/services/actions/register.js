import * as api from '../../utils/api';
export const POST_REGISTER = "POST_REGISTER";
export const POST_REGISTER_SUCCESS = "POST_REGISTER_SUCCESS";
export const POST_REGISTER_FAILED = "POST_REGISTER_FAILED";
export const POST_REGISTER_CLOSE_SUCCESS_MODAL = "POST_REGISTER_CLOSE_SUCCESS_MODAL";

export function handleRegistration(name, email, password) {
  return function(dispatch) {
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
import * as api from '../../utils/api';
export const POST_REGISTER = "POST_REGISTER";
export const POST_REGISTER_SUCCESS = "POST_REGISTER_SUCCESS";
export const POST_REGISTER_FAILED = "POST_REGISTER_FAILED";
export const POST_REGISTER_CLOSE_SUCCESS_TEXT = "POST_REGISTER_CLOSE_SUCCESS_TEXT";

export function handleRegistration(name: string, email: string, password: string) {
  return function(dispatch: any) {
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
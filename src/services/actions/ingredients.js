import * as api from '../../utils/api';
export const GET_INGREDIENTS = "GET_INGREDIENTS";
export const GET_INGREDIENTS_SUCCESS = "GET_INGREDIENTS_SUCCESS";
export const GET_INGREDIENTS_FAILED = "GET_INGREDIENTS_FAILED";

export function handleGetIngredients() {
  return function(dispatch) {
    dispatch({
      type: GET_INGREDIENTS
    });
    api.getIngredients().then(res => {
      if (res && res.success) {
        dispatch({
          type: GET_INGREDIENTS_SUCCESS,
          payload: res.data
        });
      }
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: GET_INGREDIENTS_FAILED, payload: err });
    })
  }
}
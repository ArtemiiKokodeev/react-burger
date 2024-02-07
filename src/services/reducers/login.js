import {
  POST_LOGIN,
  POST_LOGIN_SUCCESS,
  POST_LOGIN_FAILED,
  POST_LOGOUT
} from '../actions/login';

const initialState = {
  loginRequest: false,
  loginFailed: false,
  loggedIn: false
};

export const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case POST_LOGIN: {
      return {
        ...state,
        loginRequest: true,
        loginFailed: false,
      };
    }
    case POST_LOGIN_SUCCESS: {
      return { 
        ...state, 
        loginRequest: false,
        loggedIn: true
      };
    }
    case POST_LOGIN_FAILED: {
      return { 
        ...state, 
        loginFailed: true, 
        loginRequest: false 
      };
    }
    case POST_LOGOUT: {
      return { 
        ...state, 
        loggedIn: false
      };
    }
    default: {
      return state
    }
  }
} 
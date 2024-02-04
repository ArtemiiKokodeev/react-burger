import {
  GET_USER_INFO,
  GET_USER_INFO_SUCCESS,
  GET_USER_INFO_FAILED,
  PATCH_USER_INFO,
  PATCH_USER_INFO_SUCCESS,
  PATCH_USER_INFO_FAILED,
  POST_USER_LOGOUT
} from '../actions/profile';

const initialState = {
  userInfoRequest: false,
  userInfoFailed: false,
  userInfo: null
};

export const userInfoReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_INFO: {
      return {
        ...state,
        userInfoRequest: true,
        userInfoFailed: false,
      };
    }
    case GET_USER_INFO_SUCCESS: {
      return { 
        ...state, 
        userInfo: action.payload, 
        userInfoRequest: false 
      };
    }
    case GET_USER_INFO_FAILED: {
      return { 
        ...state, 
        userInfoFailed: true, 
        userInfoRequest: false 
      };
    }
    case PATCH_USER_INFO: {
      return {
        ...state,
        userInfoRequest: true,
        userInfoFailed: false,
      };
    }
    case PATCH_USER_INFO_SUCCESS: {
      return { 
        ...state, 
        userInfo: action.payload, 
        userInfoRequest: false 
      };
    }
    case PATCH_USER_INFO_FAILED: {
      return { 
        ...state, 
        userInfoFailed: true, 
        userInfoRequest: false 
      };
    }
    case POST_USER_LOGOUT: {
      return { 
        ...state,
        userInfo: null
      };
    }
    default: {
      return state
    }
  }
} 
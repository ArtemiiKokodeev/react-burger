import {
  GET_USER_INFO,
  GET_USER_INFO_SUCCESS,
  GET_USER_INFO_FAILED,
  PATCH_USER_INFO,
  PATCH_USER_INFO_SUCCESS,
  PATCH_USER_INFO_FAILED,
  POST_USER_LOGOUT,
  SET_AUTH_CHECKED
} from '../actions/profile';
import type { TUserProfile } from '../actions/profile';

interface IUserInfo {
  name: string,
  email: string
}

interface IUserInfoInitialState {
  userInfoRequest: boolean,
  userInfoFailed: boolean,
  userInfo: IUserInfo | null;
  isAuthChecked: boolean
};

export const initialState: IUserInfoInitialState = {
  userInfoRequest: false,
  userInfoFailed: false,
  userInfo: null,
  isAuthChecked: false
};

export const userInfoReducer = (state = initialState, action: TUserProfile) => {
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
    case SET_AUTH_CHECKED: {
      return { 
        ...state,
        isAuthChecked: action.payload
      };
    }
    default: {
      return state
    }
  }
} 
import {
  POST_REGISTER,
  POST_REGISTER_SUCCESS,
  POST_REGISTER_FAILED,
  POST_REGISTER_CLOSE_SUCCESS_TEXT
} from '../actions/register';
import type { TRegisterActions } from '../actions/register';

interface IRegisterInitialState {
  registerRequest: boolean,
  registerFailed: boolean,
  registerSuccessText: boolean
};

export const initialState: IRegisterInitialState = {
  registerRequest: false,
  registerFailed: false,
  registerSuccessText: false
};

export const registerReducer = (state = initialState, action: TRegisterActions) => {
  switch (action.type) {
    case POST_REGISTER: {
      return {
        ...state,
        registerRequest: true,
        registerFailed: false,
      };
    }
    case POST_REGISTER_SUCCESS: {
      return { 
        ...state, 
        registerRequest: false,
        registerSuccessText: true
      };
    }
    case POST_REGISTER_FAILED: {
      return { 
        ...state, 
        registerFailed: true, 
        registerRequest: false 
      };
    }
    case POST_REGISTER_CLOSE_SUCCESS_TEXT: {
      return { 
        ...state, 
        registerSuccessText: false
      };
    }
    default: {
      return state
    }
  }
} 
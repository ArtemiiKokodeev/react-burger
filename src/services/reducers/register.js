import {
  POST_REGISTER,
  POST_REGISTER_SUCCESS,
  POST_REGISTER_FAILED,
  POST_REGISTER_CLOSE_SUCCESS_MODAL
} from '../actions/register';

const initialState = {
  registerRequest: false,
  registerFailed: false,
  showSuccessfulRegistModal: false
};

export const registerReducer = (state = initialState, action) => {
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
        showSuccessfulRegistModal: true
      };
    }
    case POST_REGISTER_FAILED: {
      return { 
        ...state, 
        registerFailed: true, 
        registerRequest: false 
      };
    }
    case POST_REGISTER_CLOSE_SUCCESS_MODAL: {
      return { 
        ...state, 
        showSuccessfulRegistModal: false
      };
    }
    default: {
      return state
    }
  }
} 
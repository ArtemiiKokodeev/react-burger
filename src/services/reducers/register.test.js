import { registerReducer, initialState } from './register';
import {
  POST_REGISTER,
  POST_REGISTER_SUCCESS,
  POST_REGISTER_FAILED,
  POST_REGISTER_CLOSE_SUCCESS_TEXT
} from '../actions/register';

const userInfo = { name: '', email: '' }

describe('register reducer', () => {
  it('should return the initial state', () => {
    const received = registerReducer(undefined, {});
    const expected = {
      ...initialState
    };
    expect(received).toEqual(expected);
  })

  it('should handle POST_REGISTER', () => {
    const received = registerReducer(initialState, {
      type: POST_REGISTER
    });
    const expected = {
      ...initialState,
      registerRequest: true,
      registerFailed: false,
    };
    expect(received).toEqual(expected);
  })

  it('should handle REGISTER_SUCCESS', () => {
    const received = registerReducer(initialState, {
      type: POST_REGISTER_SUCCESS,
      payload: userInfo
    });
    const expected = {
      ...initialState,
      registerRequest: false,
      registerSuccessText: true
    };
    expect(received).toEqual(expected);
  })

  it('should handle REGISTER_FAILED', () => {
    const received = registerReducer(initialState, {
      type: POST_REGISTER_FAILED
    });
    const expected = {
      ...initialState,
      registerFailed: true, 
      registerRequest: false
    };
    expect(received).toEqual(expected);
  })

  it('should handle POST_REGISTER_CLOSE_SUCCESS_TEXT', () => {
    const received = registerReducer(initialState, {
      type: POST_REGISTER_CLOSE_SUCCESS_TEXT
    });
    const expected = {
      ...initialState,
      registerSuccessText: false
    };
    expect(received).toEqual(expected);
  })

})
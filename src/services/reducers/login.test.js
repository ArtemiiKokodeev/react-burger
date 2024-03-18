import { loginReducer, initialState } from './login';
import {
  POST_LOGIN,
  POST_LOGIN_SUCCESS,
  POST_LOGIN_FAILED,
  POST_LOGOUT
} from '../actions/login';

const userInfo = { name: '', email: '' }

describe('login reducer', () => {
  it('should return the initial state', () => {
    const received = loginReducer(undefined, {});
    const expected = {
      ...initialState
    };
    expect(received).toEqual(expected);
  })

  it('should handle POST_LOGIN', () => {
    const received = loginReducer(initialState, {
      type: POST_LOGIN
    });
    const expected = {
      ...initialState,
      loginRequest: true,
      loginFailed: false,
    };
    expect(received).toEqual(expected);
  })

  it('should handle POST_LOGIN_SUCCESS', () => {
    const received = loginReducer(initialState, {
      type: POST_LOGIN_SUCCESS,
      payload: userInfo
    });
    const expected = {
      ...initialState,
      loginRequest: false,
      loggedIn: true
    };
    expect(received).toEqual(expected);
  })

  it('should handle POST_LOGIN_FAILED', () => {
    const received = loginReducer(initialState, {
      type: POST_LOGIN_FAILED
    });
    const expected = {
      ...initialState,
      loginFailed: true, 
      loginRequest: false 
    };
    expect(received).toEqual(expected);
  })

  it('should handle POST_LOGOUT', () => {
    const received = loginReducer(initialState, {
      type: POST_LOGOUT
    });
    const expected = {
      ...initialState,
      loggedIn: false
    };
    expect(received).toEqual(expected);
  })

})
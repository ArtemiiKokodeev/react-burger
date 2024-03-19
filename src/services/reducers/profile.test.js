import { userInfoReducer, initialState } from './profile';
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

const userInfo = { name: '', email: '' };

describe('profile reducer', () => {
  it('should return the initial state', () => {
    const received = userInfoReducer(undefined, {});
    const expected = {
      ...initialState
    };
    expect(received).toEqual(expected);
  })

  it('should handle GET_USER_INFO', () => {
    const received = userInfoReducer(initialState, {
      type: GET_USER_INFO
    });
    const expected = {
      ...initialState,
      userInfoRequest: true,
      userInfoFailed: false,
    };
    expect(received).toEqual(expected);
  })

  it('should handle GET_USER_INFO_SUCCESS', () => {
    const received = userInfoReducer(initialState, {
      type: GET_USER_INFO_SUCCESS,
      payload: userInfo
    });
    const expected = {
      ...initialState,
      userInfo: userInfo, 
      userInfoRequest: false 
    };
    expect(received).toEqual(expected);
  })

  it('should handle GET_USER_INFO_FAILED', () => {
    const received = userInfoReducer(initialState, {
      type: GET_USER_INFO_FAILED
    });
    const expected = {
      ...initialState,
      userInfoFailed: true, 
      userInfoRequest: false
    };
    expect(received).toEqual(expected);
  })

  it('should handle PATCH_USER_INFO', () => {
    const received = userInfoReducer(initialState, {
      type: PATCH_USER_INFO
    });
    const expected = {
      ...initialState,
      userInfoRequest: true,
      userInfoFailed: false,
    };
    expect(received).toEqual(expected);
  })

  it('should handle PATCH_USER_INFO_SUCCESS', () => {
    const received = userInfoReducer(initialState, {
      type: PATCH_USER_INFO_SUCCESS,
      payload: userInfo
    });
    const expected = {
      ...initialState,
      userInfo: userInfo, 
      userInfoRequest: false 
    };
    expect(received).toEqual(expected);
  })

  it('should handle PATCH_USER_INFO_FAILED', () => {
    const received = userInfoReducer(initialState, {
      type: PATCH_USER_INFO_FAILED
    });
    const expected = {
      ...initialState,
      userInfoFailed: true, 
      userInfoRequest: false 
    };
    expect(received).toEqual(expected);
  })

  it('should handle POST_USER_LOGOUT', () => {
    const received = userInfoReducer(initialState, {
      type: POST_USER_LOGOUT
    });
    const expected = {
      ...initialState,
      userInfo: null
    };
    expect(received).toEqual(expected);
  })

  it('should handle SET_AUTH_CHECKED', () => {
    const received = userInfoReducer(initialState, {
      type: SET_AUTH_CHECKED,
      payload: true
    });
    const expected = {
      ...initialState,
      isAuthChecked: true
    };
    expect(received).toEqual(expected);
  })

})
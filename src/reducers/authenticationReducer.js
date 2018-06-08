import * as types from '../actions/actionTypes';

const defaultState = {
  ipAddress: "",
  loginStatus: "",
  isLoggedIn: false
};

export default function authenticationReducer(state = defaultState, action) {
  switch (action.type) {
    case types.LOGIN_REQUEST_SUCCESS:
      return Object.assign({}, state, { 
        ipAddress:action.response.ipAddress,
        loginStatus: action.response.status,
        isLoggedIn: true
      });

    case types.LOGIN_REQUEST_ERROR:
      return Object.assign({}, state, { 
        loginStatus: action.err,
        isLoggedIn: false
      });

    default:
      return state;
  }
}

import * as types from './actionTypes';

import * as util from '../api/FetchUtil';
import authenticationApi from '../api/AuthenticationAPI';

export function onLogin(credentails){
  return (dispatch) => {
    return authenticationApi.login(credentails)
    .then( (response) => {
      return util.handleFetchResponse(response);
    }).then(([responseOk, status]) => {
      if (responseOk) {
        let response = {};
        response.ipAddress = credentails.ipAddress;
        response.status = status
        dispatch(onLoginSuccess(response));
      } else {
        dispatch(onLoginFailed(status));
      }
    })
    .catch(error => {
      dispatch(onLoginFailed(error));
    });
  };
}

export function onLoginSuccess(response){
  return {type: types.LOGIN_REQUEST_SUCCESS, response};
}

export function onLoginFailed(err){
  return {type: types.LOGIN_REQUEST_ERROR, err};
}

/*export function logout(){
  return { type: "LOGOUT"}
}*/
import * as restUri from './RestUri'

import Base64 from './Base64';

export default class AuthenticationAPI {
  
  static getAuthorizationHeader(credentials) {
    return {Authorization: 'Basic ' + Base64.btoa(credentials.userName + ":" + credentials.password)}
  }

  static login(credentials) {
    const headers = this.getAuthorizationHeader(credentials);
    //const uri = "http://" + credentials.ipAddress + ":3001" + restUri.AUTHENTICATION_URI;
    const uri = "https://" + credentials.ipAddress + restUri.AUTHENTICATION_URI;
    return fetch(uri, {headers});
  }
}
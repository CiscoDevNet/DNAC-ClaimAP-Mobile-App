import * as restUri from './RestUri'

export default class UnclaimedDevicesAPI {

  static getRFProfile(ipAddress) {
    //const uri = "http://" + ipAddress + ":3001" + restUri.RF_PROFILE_LIST_URI;
    const uri = "https://" + ipAddress + restUri.RF_PROFILE_LIST_URI;
    return fetch(uri);
  }

  static getSitesFloorHierarchy(ipAddress) {
    //const uri = "http://" + ipAddress + ":3001" + restUri.SITES_WITH_FLOOR_LIST_URI;
    const uri = "https://" + ipAddress + restUri.SITES_WITH_FLOOR_LIST_URI;
    return fetch(uri);
  }
}
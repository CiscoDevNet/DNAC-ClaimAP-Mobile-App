import * as restUri from './RestUri'

export default class UnclaimedDevicesAPI {

  static getUnclaimedDevicesList(ipAddress) {
    //const uri = "http://" + ipAddress + ":3001" + restUri.UNCLAMIED_DEVICES_LIST_URI;
    const uri = "https://" + ipAddress + restUri.UNCLAMIED_DEVICES_LIST_URI;
    return fetch(uri);
  }

  static getPnPDeviceStatus(ipAddress){
    //const uri = "http://" + ipAddress + ":3001" + restUri.PNP_DEVICE_STATUS;
    const uri = "https://" + ipAddress + restUri.PNP_DEVICE_STATUS;
    return fetch(uri);
  }
}
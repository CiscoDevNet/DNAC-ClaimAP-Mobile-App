import * as restUri from './RestUri'

export default class ClaimDevicesAPI {

  static claimDevices(ipAddress, postData) {
    //const uri = "http://" + ipAddress + ":3001" + restUri.CLAIM_AP_URI;
    const uri = "https://" + ipAddress + restUri.CLAIM_AP_URI;
    const headers = {
      method: 'post',
      'headers': {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(postData)
    }
    return fetch(uri, headers);
  }

  static pollTask(ipAddress, taskId) {
    //const uri = "http://" + ipAddress + ":3001" + restUri.POLLTASK_URI + taskId;
    const uri = "https://" + ipAddress + restUri.POLLTASK_URI + taskId;
    return fetch(uri);
  }
}
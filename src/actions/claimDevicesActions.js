import * as types from './actionTypes';

import * as util from '../api/FetchUtil';
import claimDeviceApi from '../api/ClaimDeviceAPI';

export function claimDevices() {
  return (dispatch, getState) => {
    dispatch(onProcessingFetchRequest(true));
    const {authentication, unclaimedDevices, claimDevicesConfig} = getState();
    const selectedDevices = unclaimedDevices.selectedDevices;
    const selectedConfig = claimDevicesConfig.selectedConfig;

    //Construct payload
    let payload = [];
    for (const [key, value] of selectedDevices.entries()) {
      let payloadObj = {};
      payloadObj.unclaimedDeviceId = value.id;
      payloadObj.deviceName = value.name;
      payloadObj.siteId = selectedConfig.siteInfo.id;
      payloadObj.siteName = selectedConfig.siteInfo.siteNameHierarchy;
      payloadObj.rfProfile = selectedConfig.rfProfileName;

      payload.push(payloadObj);
    }
    return claimDeviceApi.claimDevices(authentication.ipAddress, payload)
    .then (resp => {
      return util.handleFetchResponse(resp)
    })
    .then( ([responseOk, body])  => {
      if(responseOk) {
        
        const intervalRef = setInterval(() => {
          return claimDeviceApi.pollTask(authentication.ipAddress, body.response.taskId)
          .then( resp => {
            return util.handleFetchResponse(resp)
          })
          .then(([responseOk, body])  => {
            if(responseOk) {
              const endTimeStatus = (body.response.endTime !== undefined) ? true : false;
              const isErrorStatus = (body.response.isError !== undefined && body.response.isError === true) ? true : false;
              let taskCompleted = false;
              if((isErrorStatus === false && endTimeStatus) || (isErrorStatus === true)){
                  taskCompleted = true;
                  clearInterval(intervalRef);
                  dispatch(onSuccessClaimDeviceConfig(body.response.progress));
              }
            }
          });
        }, 2000);
      } else {
        dispatch(onErrorClaimDeviceConfig(err));
      }
    })
    .catch( err => {
      dispatch(onErrorClaimDeviceConfig(err));
    });
  }
}

export function onProcessingFetchRequest(load){
  return {type: types.CLAIM_DEVICE_IN_PROGRESS, load};
}

export function onSuccessClaimDeviceConfig(data){
  return {type: types.CLAIM_DEVICE_SUCCESS, data};
}

export function onErrorClaimDeviceConfig(err){
  return {type: types.CLAIM_DEVICE_ERROR, err};
}
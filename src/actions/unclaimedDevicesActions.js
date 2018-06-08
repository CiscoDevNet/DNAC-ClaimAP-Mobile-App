import * as types from './actionTypes';

import * as util from '../api/FetchUtil';
import unclaimedDevicesApi from '../api/UnclaimedDevicesAPI'

export function getUnclaimedDevices(){
  return (dispatch, getState) => {
    dispatch(onProcessingFetchRequest(true));
    const {authentication} = getState();
    return unclaimedDevicesApi.getUnclaimedDevicesList(authentication.ipAddress)
    .then( (response) => {
      return util.handleFetchResponse(response);
    }).then(([responseOk, body]) => {
      if (responseOk) {
        dispatch(onSuccessUnclaimedDevicesFetch(body));
      } else {
        dispatch(onErrorUnclaimedDevicesFetch(body));
      }
    })
    .catch(error => {
      dispatch(onErrorUnclaimedDevicesFetch(error));
    });
  };
}

export function storeSelectedDevices(selectedDevices) {
  return {type: types.STORE_SELECTED_UNCLAIMED_DEVICES, selectedDevices};
}

function getSimulatedDevicesDetails(){
  let simData = [
    {
      id: "5b04195c918a710007b267bd",
      deviceInfo:{
        hostname: "SIM-Switch60A2.EEDF.713D",
        deviceType: "SWITCH",
        state: "Unclaimed"
      }
    },
    {
      id: "5b040433918a710007b267f3",
      deviceInfo:{
        hostname: "SIM-Router71D3.7930.0H321",
        deviceType: "ROUTER",
        state: "Planned"
      }
    },
    {
      id: "5b040433918a710005s965k6",
      deviceInfo:{
        hostname: "SIM-Router7245.7930.2D432",
        deviceType: "ROUTER",
        state: "Unclaimed"
      }
    },{
      id: "5b040433918a710005s0329j8",
      deviceInfo:{
        hostname: "SIM-Switch33A6.7930.8S298",
        deviceType: "SWITCH",
        state: "Error"
      }
    }
  ];

  return simData;
}

export function onProcessingFetchRequest(load){
  return {type: types.UNCLAIMED_DEVICES_FETCH_IN_PROGRESS, load};
}

export function onSuccessUnclaimedDevicesFetch(data){
  data = [...data, ...getSimulatedDevicesDetails()];
  return {type: types.UNCLAIMED_DEVICES_FETCH_SUCCESS, data};
}

export function onErrorUnclaimedDevicesFetch(err){
  return {type: types.UNCLAIMED_DEVICES_FETCH_ERROR, err};
}

export function setSelectedDevices(){
  return {type: types.UNCLAIMED_DEVICES_FETCH_ERROR, err};
}
import * as types from './actionTypes';

import * as util from '../api/FetchUtil';
import claimDeviceConfigApi from '../api/claimDeviceConfigAPI';

export function claimDeviceConfig() {
  return (dispatch, getState) => {
    dispatch(onProcessingFetchRequest(true));
    const {authentication} = getState();
    const rfProfilePromise = claimDeviceConfigApi.getRFProfile(authentication.ipAddress).then ( resp => { return util.handleFetchResponse(resp) } );
    const sitesWithFloorHierarchy = claimDeviceConfigApi.getSitesFloorHierarchy(authentication.ipAddress).then ( resp => { return util.handleFetchResponse(resp) } );
    return Promise.all([rfProfilePromise, sitesWithFloorHierarchy])
    .then( values => {
      let data = {};
      if(values[0][0] && values[1][0]) {
        let rfProfileList = values[0][1].response[0].value.map ( item => item.rfProfileName);
        rfProfileList.unshift("-- Choose a RF profile --");
        let sitesWithFloorNameHierarchyAndItsIds = values[1][1].response.map( item => ({id: item.id, groupNameHierarchy: item.groupNameHierarchy }));
        sitesWithFloorNameHierarchyAndItsIds.unshift({id: -11111, groupNameHierarchy: "-- Choose a Site --"});
        data = ({rfProfileList, sitesWithFloorNameHierarchyAndItsIds});
        dispatch(onSuccessClaimDeviceConfig(data));
      } else {
        dispatch(onErrorClaimDeviceConfig(err));
      }
    })
    .catch( err => {
      dispatch(onErrorClaimDeviceConfig(err));
    });
  }
}

export function storeSelectedConfig(selectedConfigData) {
  return {type: types.STORE_CLAIM_DEVICE_CONFIG, selectedConfigData};
}

export function onProcessingFetchRequest(load){
  return {type: types.CLAIM_DEVICE_CONFIG_FETCH_IN_PROGRESS, load};
}

export function onSuccessClaimDeviceConfig(data){
  return {type: types.CLAIM_DEVICE_CONFIG_FETCH_SUCCESS, data};
}

export function onErrorClaimDeviceConfig(err){
  return {type: types.CLAIM_DEVICE_CONFIG_FETCH_ERROR, err};
}
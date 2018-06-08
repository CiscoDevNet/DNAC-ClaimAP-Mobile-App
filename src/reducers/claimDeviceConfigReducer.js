import * as types from '../actions/actionTypes';

const defaultState = {
  isLoading: false,
  rfProfileList: [],
  sitesWithFloorNameHierarchyAndItsIds: [],
  selectedConfig: {}
};

export default function claimDeviceConfigReducer(state = defaultState, action) {
  switch (action.type) {
    case types.CLAIM_DEVICE_CONFIG_FETCH_IN_PROGRESS:
      return Object.assign({}, state, {
        isLoading: true
      });

    case types.CLAIM_DEVICE_CONFIG_FETCH_SUCCESS:
      return Object.assign({}, state, {
        rfProfileList: action.data.rfProfileList, 
        sitesWithFloorNameHierarchyAndItsIds: action.data.sitesWithFloorNameHierarchyAndItsIds,
        isLoading: false
      });

    case types.STORE_CLAIM_DEVICE_CONFIG:
      return Object.assign({}, state, {selectedConfig: action.selectedConfigData});

    default:
      return state;
  }
}

import * as types from '../actions/actionTypes';

const defaultState = {
  isLoading: false,
  devices: [],
  selectedDevices: [],
  refreshing: false
};

export default function unclaimedDevicesReducer(state = defaultState, action) {
  switch (action.type) {
    case types.UNCLAIMED_DEVICES_FETCH_IN_PROGRESS:
      return Object.assign({}, state, {
        isLoading: true
      });
    case types.UNCLAIMED_DEVICES_FETCH_SUCCESS:
      return Object.assign({}, state, { 
        devices: action.data, isLoading: false, refreshing: false
      });
    case types.STORE_SELECTED_UNCLAIMED_DEVICES:
      return Object.assign({}, state, {selectedDevices: action.selectedDevices})

    default:
      return state;
  }
}

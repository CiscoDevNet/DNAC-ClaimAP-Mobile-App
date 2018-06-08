import * as types from '../actions/actionTypes';

const defaultState = {
  isLoading: false,
  status:""
};

export default function claimedDeviceReducer(state = defaultState, action) {
  switch (action.type) {
    case types.CLAIM_DEVICE_IN_PROGRESS:
      return Object.assign({}, state, {
        isLoading: true
      });
    case types.CLAIM_DEVICE_SUCCESS:
      return Object.assign({}, state, { 
        status: action.data,
        isLoading: false
      });

    default:
      return state;
  }
}

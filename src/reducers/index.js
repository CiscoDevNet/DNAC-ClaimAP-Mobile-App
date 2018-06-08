import { combineReducers } from 'redux';
import authentication from './authenticationReducer';
import unclaimedDevices from './unclaimedDevicesReducer';
import claimDevicesConfig from './claimDeviceConfigReducer';
import claimDevices from './claimDeviceReducer';
 
const rootReducer = combineReducers({
  authentication,
  unclaimedDevices,
  claimDevicesConfig,
  claimDevices
});
 
export default rootReducer;

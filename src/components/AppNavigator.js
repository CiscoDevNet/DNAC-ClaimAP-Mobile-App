import React from 'react';
import { createStackNavigator } from 'react-navigation';
import unclaimedDevicesList from './unclaimedDevices/UnclaimedDeviceListPage';
import claimDeviceConfiguration from './claimDeviceConfig/ClaimDeviceConfigurationPage';
  
const appStack = createStackNavigator({
  unclaimedDevicesList: {screen: unclaimedDevicesList},
  claimDeviceConfig: {screen: claimDeviceConfiguration}
},
{
  initialRouteName: 'unclaimedDevicesList',
  cardStyle: { backgroundColor: 'white' }
});

export default appStack;
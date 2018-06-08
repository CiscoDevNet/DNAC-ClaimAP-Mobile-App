import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {ActivityIndicator, Alert, StyleSheet, Text, TextInput, View} from 'react-native';

import Button from '../common/CustomButton';
import Picker from '../common/CustomPicker';

import * as claimDeviceActionCreators from '../../actions/claimDevicesActions';
import * as claimDevicesConfigActionCreators from '../../actions/claimDeviceConfigActions';

class ClaimDeviceConfigurationPage extends React.Component {
  state = { isLoading: false, selectedSite: "", selectedRFProfile: "", selectedSiteDetails: {}, selectedConfig: {}, status: ""}

  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }

  static navigationOptions = {
    headerTitle: 'Config Claim Device',
    headerRight: ({ goBack }) => <Icon name={"close"} onPress={ () => { goBack() } } />
  };

  componentDidMount(){
    this.props.actions.claimDeviceConfig();
  }

  onSubmit(){
    let selectedSiteInfo = this.state.selectedSiteDetails.filter( item => {
      if(item.siteNameHierarchy === this.state.selectedSite){
        return item
      }
    });

    this.props.actions.storeSelectedConfig({siteInfo:selectedSiteInfo[0], rfProfileName:this.state.selectedRFProfile});

    this.props.actions.claimDevices();
  }
  

  render(){
    if (this.props.isLoading) {
      return (
       <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size="large" />
        </View>
      );
    }

    if(this.props.status && this.props.status !== ""){
      Alert.alert(
        'Claim device status',
        this.props.status + " Refresh unclaimed devices list to get the recent status.",
        [{text: 'OK', onPress: () => {
          console.log('OK Pressed')
        }}]
      )
      this.props.navigation.state.params.handleOnSuccessClaimDevices();
      this.props.navigation.navigate('unclaimedDevicesList');
      this.props.status = "";

      return( null );
    }

    let siteNameHierarchiesWithFloor = this.props.sitesWithFloorNameHierarchyAndItsIds.map( item => item.groupNameHierarchy);
    this.state.selectedSiteDetails = this.props.sitesWithFloorNameHierarchyAndItsIds.map( item => ({id:item.id, siteNameHierarchy:item.groupNameHierarchy}));

    return (
      <View>
        <Picker 
          onValueChange = {
            (item, index) => {
              if(index !== 0) {
                this.setState({selectedSite: item})
              }
            }
          }
          items={siteNameHierarchiesWithFloor}
          selectedValue = {this.state.selectedSite}
        >
        </Picker>
        <Picker 
          onValueChange = {
            (item, index) => {
              if(index !== 0){
                this.setState({selectedRFProfile: item})
              }
            }
          }
          items={this.props.rfProfileList}
          selectedValue = {this.state.selectedRFProfile}
        >
        </Picker>
        <Button title="Claim Device" onPress={this.onSubmit} />
      </View>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    rfProfileList: state.claimDevicesConfig.rfProfileList,
    sitesWithFloorNameHierarchyAndItsIds: state.claimDevicesConfig.sitesWithFloorNameHierarchyAndItsIds,
    isLoading: state.claimDevicesConfig.isLoading,
    selectedConfig: state.claimDevicesConfig.selectedConfig,
    isLoading: state.claimDevices.isLoading,
    status: state.claimDevices.status
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
      actions: bindActionCreators(Object.assign({}, claimDeviceActionCreators, claimDevicesConfigActionCreators), dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ClaimDeviceConfigurationPage);
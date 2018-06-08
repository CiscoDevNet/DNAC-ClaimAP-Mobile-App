import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {ActivityIndicator, Alert, FlatList, StyleSheet, Text, View} from 'react-native';

import Button from '../common/CustomButton';

import UnclaimedDeviceListItem from './UnclaimedDeviceListItem';
import * as unclaimedDevicesActionCreators from '../../actions/unclaimedDevicesActions';

import {
  SOFT_BLUE,
  BORDER_WIDTH,
  TEXT_INPUT_HEIGHT,
  TEXT_INPUT_WIDTH,
  TEXT_INPUT_BORDER_WIDTH,
  TEXT_INPUT_BORDER_COLOR
} from '../../styles/common';

class UnclaimedDeviceListPage extends React.Component {

  state = {
    selected: (new Map()),
    devices: [],
    isLoading: false,
    refreshing: false
  };

  constructor(props){
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleRefresh = this.handleRefresh.bind(this);
    this.handleOnSuccessClaimDevices = this.handleOnSuccessClaimDevices.bind(this);
  }


  componentDidMount() {
    this.props.actions.getUnclaimedDevices();
  }

  static navigationOptions = {
    headerTitle: 'Unclaimed Devices',
    headerRight: ({ goBack }) => <Icon name={"close"} onPress={ () => { goBack() } } />
  };

  handleOnSuccessClaimDevices(){
    this.setState(
      {
        selected: new Map()
      },
      () => {
        this.props.actions.getUnclaimedDevices();
      }
    );
  }

  handleRefresh(){
    this.setState(
      {
        refreshing: true
      },
      () => {
        this.props.actions.getUnclaimedDevices();
      }
    );
  }

  onSubmit(){
    if(this.state.selected.size === 0){
      Alert.alert("Unclaimed Devices", "Select at least one device to claim",[
        { text: "OK", onPress: () => { this.setState({ isLoading: false }) }}
      ])
    } else {
      //Construct id-name pair for selected device(s)
      let selectedDevicesDetail=[];
      for(const [key, value] of this.state.selected.entries()){
        let device = this.props.devices.filter(device => {
           if(device.id === key && value){
            selectedDevicesDetail.push({id: device.id, name: device.deviceInfo.hostname });
           }
        });
      }
      this.props.actions.storeSelectedDevices(selectedDevicesDetail);
      this.props.navigation.navigate('claimDeviceConfig', {
        handleOnSuccessClaimDevices: this.handleOnSuccessClaimDevices
      });
    }
  }

  keyExtractor = (item, index) => item.id;

  renderItem = ({item}) => (
    <UnclaimedDeviceListItem
      id={item.id}
      onPressItem={this.onPressItem}
      selected={!!this.state.selected.get(item.id)}
      name={item.deviceInfo.hostname}
      type={item.deviceInfo.deviceType}
      status={item.deviceInfo.state}
    />
  );

  onPressItem = (id, name) => {

    this.setState((state) => {
      const selected = new Map(state.selected);
      selected.set(id, !selected.get(id));
      return {selected};
    });
  };

  renderSeparator = () => {
    return (
      <View style={styles.separator} />
    );
  };

  render(){
    if (this.props.isLoading) {
      return (
       <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size="large" />
        </View>
      );
    }

    return(
      <View style={styles.view}>
          <FlatList
            data={this.props.devices}
            extraData={this.state}
            keyExtractor={this.keyExtractor}
            renderItem={this.renderItem}
            style={styles.flatList}
            ItemSeparatorComponent={this.renderSeparator}
            showsVerticalScrollIndicator={true}
            refreshing={this.props.refreshing}
            onRefresh={this.handleRefresh}
          />
        <Button title="Config selected Device" onPress={this.onSubmit} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  View: {
    flex: 1,
    margin: 50
  },
  flatList: {
    marginTop: 10
  },
  showAtBottom:{
    alignSelf: 'flex-end',
    position: 'absolute',
    bottom: 35
  },
  separator: {
    height: 1,
    backgroundColor: "#CED0CE",
    marginTop: 5,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 5
  }
});

const mapStateToProps = (state, ownProps) => {
  return {
    devices: state.unclaimedDevices.devices,
    selectedDevices: state.unclaimedDevices.selectedDevices,
    isLoading: state.unclaimedDevices.isLoading,
    refreshing: state.unclaimedDevices.refreshing
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
      actions: bindActionCreators(unclaimedDevicesActionCreators, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UnclaimedDeviceListPage);
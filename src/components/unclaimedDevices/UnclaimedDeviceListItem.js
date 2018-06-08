import React from 'react';

import {Image, Text, TouchableOpacity, View} from 'react-native';

import {List, ListItem} from 'react-native-elements';

//import {Font} from 'expo';
//import { Ionicons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/Ionicons';
/*import { createIconSetFromFontello } from '@expo/vector-icons';
import fontelloConfig from '../../config/config.json';
const CustomSwitchIcon = createIconSetFromFontello(fontelloConfig, 'switch');*/

const primaryColor = "#1abc9c";
const lightGrey = "#ecf0f1";
const darkGrey = "#bdc3c7";

class UnclaimedDeviceListItem extends React.Component {
  /*state = { fontLoaded: false };

  async componentDidMount() {
    try {
      await Font.loadAsync({
        'switch': require('../../assets/fonts/switch.ttf'),
      });
      this.setState({ fontLoaded: true });
      console.log('fonts are loaded');
    } catch (error) {
      console.log(error);
    }
  }*/

  onPress = () => {
    this.props.onPressItem(this.props.id, this.props.name);
  };

  textStyle() {
    const rowItemTextColor = (this.props.status !== "Unclaimed") ? 'grey' : 'black';
    const rowItemFontWeight = (this.props.selected) ? 'normal' : 'normal';
    return {
      marginTop: 17,
      marginLeft: 5,
      marginRight: 20,
      marginBottom: 10,
      paddingLeft: 10,
      color: rowItemTextColor,
      fontWeight: rowItemFontWeight
    }
  }

  statusStyle(){
    const rowItemTextColor = (this.props.status === "Error") ? 'red' : 'green';
    return {
      margin:2,
      marginLeft: 16,
      paddingLeft: 10,
      color: rowItemTextColor
    }
  }

  imageStyle(){
    return {
      marginLeft: 20,
      width: 50,
      height: 50
    }
  }

  iconStyle(){
    return {
      marginTop: 16,
      marginLeft: 20,
      width: 50,
      height: 50
    }
  }

  render() {
    //if(this.state.fontLoaded){

      let imageSource = "";
      let icon="";
      switch(this.props.type){
        case "AP":
          imageSource = require('../../icons/ap.png');
          icon = (<Image style={this.imageStyle()} source={imageSource} resizeMode='contain' />);
          break;
        case "ROUTER":
          imageSource = require('../../icons/router.png');
          icon = (<Image style={this.imageStyle()} source={imageSource} resizeMode='contain' />);
          break;
        case "SWITCH":
          imageSource = require('../../icons/switch.png');
          icon = (<Image style={this.imageStyle()} source={imageSource} resizeMode='contain' />);
          //icon = (<CustomSwitchIcon style={this.iconStyle()} name={'switch'} size={27} color={'#049fd9'} />);
          break;
      }

      const checkBox = this.props.selected ? (<Icon style={this.iconStyle()} name="ios-checkbox" size={20} color={primaryColor}></Icon>) 
                                            : (<Icon style={this.iconStyle()} name="ios-square-outline" size={20} color={darkGrey}></Icon>);

      if(this.props.status === "Unclaimed"){
        return (
          <View style={{flexDirection: "row"}}>
            <View style={{flexDirection: "row", flex: 3, alignItems: 'flex-start'}}>
              {icon}
              <Text style={this.textStyle()}>{this.props.name}</Text>
            </View>
            
            <View style={{flex: 1, alignItems: 'flex-end'}}>
              <TouchableOpacity onPress={this.onPress} >
                {checkBox}
              </TouchableOpacity>
            </View>
          </View>
        );
      } else {
        return (
          <View>
            <View style={{flexDirection: "row"}}>
              <View style={{flexDirection: "row", flex: 3,alignItems: 'flex-start'}}>
                {icon}
                <Text style={this.textStyle()}>{this.props.name}</Text>
              </View>
              <View style={{flex: 1, alignItems: 'flex-end'}}>
                {checkBox}
              </View>
            </View>
            <Text style={this.statusStyle()}>Claim status - {this.props.status}</Text>
          </View>
        );
      }
    /*} else{
      return null;
    }*/
  }
}

export default UnclaimedDeviceListItem;
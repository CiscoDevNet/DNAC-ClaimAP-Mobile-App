import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import { Alert, KeyboardAvoidingView, TextInput, StyleSheet, Text, View, Image } from 'react-native';
import Button from './common/CustomButton';
import * as authenticationActionCreators from '../actions/authenticationActions';

import CustomIcon from '../config/icon-font';

import {
  SOFT_BLUE,
  BORDER_WIDTH,
  TEXT_INPUT_HEIGHT,
  TEXT_INPUT_WIDTH,
  TEXT_INPUT_BORDER_WIDTH,
  TEXT_INPUT_BORDER_COLOR
} from '../styles/common';

class LoginPage extends React.Component {
  state = {
    credentials: {
      ipAddress: "",
      userName:"",
      password: ""
    },
    isLoggedIn: false,
    loginStatus: ""
  };

  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit() {
    const {credentials} = this.state;

    if(credentials.ipAddress.length > 0 && credentials.userName.length > 0 && credentials.password.length > 0){
      this.props.actions.onLogin(this.state.credentials);
    } else {
      this.setState(prevState => {
        isLoggedIn: false
      });
    }
  }

  render() {
    return (
      <KeyboardAvoidingView  style={styles.container} behavior="padding" >
        
        <Image source={require("../icons/cisco_logo.png")} />
        <Text style={styles.LoginTitle}>DNA Center</Text>
        <Text style={styles.LoginCaption}>Design, Automate and Assure your Network</Text>

        {(this.props.loginStatus !== "") ? <Text style={styles.loginStatusMessage}>{this.props.loginStatus}</Text> : null}

        <TextInput
          underlineColorAndroid='transparent'
          placeholder="Cluster IP Address"
          autoCapitalize="none"
          style={styles.input}
          //clearTextOnFocus={true}
          autoFocus={true}
          onChangeText = { ipAddress => {
            let credentials = {...this.state.credentials};
            credentials.ipAddress = ipAddress;
            this.setState({credentials});
          }}
        />

        <TextInput
          underlineColorAndroid='transparent'
          placeholder="Username"
          autoCapitalize="none"
          style={styles.input}
          onChangeText = { userName => {
            let credentials = {...this.state.credentials};
            credentials.userName = userName;
            this.setState({credentials});
          }}
        />
        <TextInput
          underlineColorAndroid='transparent'
          placeholder="Password"
          secureTextEntry={true}
          autoCapitalize="none"
          style={styles.input}
          onChangeText = { password => {
            let credentials = {...this.state.credentials};
            credentials.password = password;
            this.setState({credentials});
          }}
        />

        <Button title="Log In" onPress={this.onSubmit} />
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  input: {
    width: TEXT_INPUT_WIDTH,
    height: TEXT_INPUT_HEIGHT,
    borderColor: TEXT_INPUT_BORDER_COLOR,
    borderBottomWidth: BORDER_WIDTH,
    marginBottom:15
  },
  LoginTitle:{
    marginBottom: 10,
    fontSize: 25
  },
  LoginCaption:{
    marginBottom: 30,
    fontSize: 12
  },
  loginStatusMessage:{
    margin: 15,
    color: 'red',
    fontSize:15
  }
});

const mapStateToProps = (state, ownProps) => {
  return {
    ipAddress: state.authentication.ipAddress,
    isLoggedIn: state.authentication.isLoggedIn,
    loginStatus: state.authentication.loginStatus
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
      actions: bindActionCreators(authenticationActionCreators, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
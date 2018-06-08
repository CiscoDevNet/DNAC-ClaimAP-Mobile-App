import React from 'react';
import {connect} from 'react-redux';
import { StyleSheet, View } from 'react-native';

import LoginPage from '../components/LoginPage';
import AppNavigator from '../components/AppNavigator'

class AppContainer extends React.Component {
  render(){
    return (
      (this.props.isLoggedIn) ? <AppNavigator /> : <LoginPage />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

const mapStateToProps = (state, ownProps) => {
  return {
      isLoggedIn: state.authentication.isLoggedIn
  };
}

export default connect(mapStateToProps)(AppContainer);
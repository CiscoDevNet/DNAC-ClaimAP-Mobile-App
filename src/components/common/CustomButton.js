import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';

class CustomButton extends React.Component {
  render() {
    const { title, onPress} = this.props;
    return (
      <TouchableOpacity style={styles.buttonStyle} onPress={() => onPress()}>
        <Text style={styles.textStyle}>{title}</Text>
      </TouchableOpacity>
    );
  }
}

CustomButton.propTypes = {
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired
};

const styles = StyleSheet.create({
  textStyle: {
    fontSize:20,
    color: '#ffffff',
    textAlign: 'center'
  },

  buttonStyle: {
    margin: 15,
    padding: 10,
    backgroundColor: '#049fd9',
    borderRadius:5
  }
});

export default CustomButton;
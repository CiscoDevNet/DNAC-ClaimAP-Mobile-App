import React from 'react';
import { Picker, StyleSheet, Text, View } from 'react-native';

class CustomPicker extends React.Component {
  render() {
    const { title, selectedItemTitle, items, onValueChange, selectedValue} = this.props;
    let pickerItems = items.map( (item, index) => {
      return <Picker.Item key={index} value={item} label={item} />
    });
    return (
      <View style={styles.view}>
        <Picker 
          style={styles.picker}
          itemStyle={styles.item}
          selectedValue={selectedValue}
          onValueChange={(item) => onValueChange(item)}
        >
          {pickerItems}
        </Picker>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  picker: {
    width: 300,
    height: 170
  },
  item: {
    fontSize: 15,
    height: 168,
    color: 'black'
  },
  view: {
    marginLeft: 20
  }
});

export default CustomPicker;
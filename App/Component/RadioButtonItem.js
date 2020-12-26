import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

import {Colors, Fonts} from '../Themes';
const RadioButtonItem = ({onPress, selected, text}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.outerContainer}>
        <View style={styles.container}>
          {selected && <View style={styles.selected} />}
        </View>
        <Text style={[Fonts.style.normal, styles.label]}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default RadioButtonItem;

const styles = StyleSheet.create({
  outerContainer: {
    flexDirection: 'row-reverse',
  },
  container: {
    width: 20,
    height: 20,
    backgroundColor: '#ffffff',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: Colors.darkSeafoamGreen,
    borderRadius: 10,
    marginStart: 10,
    justifyContent: 'center',
  },
  selected: {
    width: 12,
    height: 12,
    backgroundColor: Colors.darkSeafoamGreen,
    borderRadius: 6,
    alignSelf: 'center',
    opacity: 1,
  },
  label: {color: '#000', fontSize: 15, fontWeight: 'normal'},
});

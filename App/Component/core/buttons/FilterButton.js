import React from 'react';

import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Fonts } from '../../../Themes';
import {
  perfectFont,
  perfectHeight,
  perfectWidth,
} from '../../../utils/commonFunctions';

const FilterButton = ({ label, onPress, selected = false }) => {
  return (
    <TouchableOpacity
      style={[styles.container, selected && { ...styles.selectedContainer }]}
      onPress={onPress}>
      <Text style={[styles.text, selected && { ...styles.selectedText }]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default FilterButton;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: perfectWidth(100),
    height: perfectHeight(28),
    borderRadius: perfectWidth(43),
    backgroundColor: 'white',
  },
  selectedContainer: {
    backgroundColor: '#EEFBF4',
  },
  text: {
    fontFamily: Fonts.style.normal.fontFamily,
    paddingVertical: 5,
    fontWeight: '700',
    fontSize: perfectFont(14),
    lineHeight: 16,
    color: '#3D3D3D',
  },
  selectedText: {
    color: '#3DBA7E',
  },
});

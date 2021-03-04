import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import {
  perfectFont,
  perfectHeight,
  perfectWidth,
} from '../../utils/commonFunctions';

const Tags = ({ text }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

export default Tags;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    width: perfectWidth(75),
    paddingVertical: perfectHeight(3),
    borderWidth: perfectWidth(1),
    borderRadius: perfectWidth(25),
    borderColor: '#328F61',
    marginHorizontal: perfectWidth(5),
  },
  text: {
    alignSelf: 'center',
    fontSize: perfectFont(12),
  },
});

import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Colors, CustomIcon, Fonts } from '../../../../../Themes';

export const PropertyInfoItem = props => (
  <View style={styles.container}>
    <View style={styles.innerContainer}>
      <CustomIcon
        name={props.icon}
        color={Colors.primaryGreen}
        size={16}
        style={styles.icon}
      />
      <Text style={[Fonts.style.normal, styles.textStyle, styles.text]}>
        {props.label}
      </Text>
      <Text style={[Fonts.style.normal, styles.textStyle]}>{props.value}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: 5,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    flexWrap: 'wrap',
    borderBottomWidth: 0.3,
    paddingBottom: 8,
    borderBottomColor: '#e7e7e7',
  },
  innerContainer: {
    flexDirection: 'row-reverse',
    alignSelf: 'flex-end',
    width: '100%',
  },
  icon: {
    marginStart: 10,
  },
  text: {
    color: Colors.darkSlateBlue,
  },
});

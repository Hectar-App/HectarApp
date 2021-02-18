import React from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Colors, Fonts } from '../Themes';
import { ActivityIndicator } from 'react-native-paper';
import {
  perfectFont,
  perfectHeight,
  perfectWidth,
} from '../utils/commonFunctions';

const LinkButton = props => (
  <View style={[styles.container, props.containerStyle]}>
    <View style={styles.row}>
      <TouchableOpacity disabled={props.loading} onPress={props.onPress}>
        {props.loading ? (
          <ActivityIndicator
            style={{ paddingHorizontal: 8 }}
            color={Colors.primaryGreen}
          />
        ) : (
          <Text
            style={[Fonts.style.normal, styles.inputStyle, props.textStyle]}>
            {props.buttonText}
          </Text>
        )}
      </TouchableOpacity>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    justifyContent: 'center',
    height: perfectHeight(50),
    borderRadius: perfectWidth(8),
    borderStyle: 'solid',
  },
  row: {
    flexDirection: 'row',
  },
  inputStyle: {
    width: '100%',
    fontSize: perfectFont(12),
    fontWeight: Platform.OS === 'android' ? '400' : 'bold',
    fontStyle: 'normal',
    lineHeight: 16,
    letterSpacing: 0,
    textAlign: 'right',
    color: Colors.black,
  },
});

export default LinkButton;

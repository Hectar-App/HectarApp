import React from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Fonts, Metrics, Colors } from '../Themes';
import { isIos, perfectFont, perfectWidth } from '../utils/commonFunctions';

function formatPhoneNumber(phoneNumberString) {
  var cleaned = ('' + phoneNumberString).replace(/\D/g, '');
  var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return '(' + match[1] + ') ' + match[2] + '-' + match[3];
  }
  return null;
}

const InputButton = props => {
  return props.text ? (
    <View
      style={[styles.container, props.containerStyle]}
      onPress={props.onPress}>
      <View style={styles.row}>
        <Text
          style={[
            Fonts.style.normal,
            styles.inputStyle,
            { color: Colors.brownGrey, paddingEnd: props.Icon ? 35 : 17 },
          ]}>
          {formatPhoneNumber('0' + props.InputPlaceHolder + '')}
        </Text>
        {props.Icon && <Image source={props.Icon} style={[styles.iconStyle]} />}
      </View>
    </View>
  ) : (
    <TouchableOpacity
      style={[styles.container, props.containerStyle]}
      onPress={props.onPress}>
      <View style={styles.row}>
        <Text
          style={[
            Fonts.style.normal,
            styles.inputStyle,
            { color: Colors.black, paddingEnd: props.Icon ? 35 : 17 },
          ]}>
          {props.InputPlaceHolder}
        </Text>
        {props.Icon && <Image source={props.Icon} style={[styles.iconStyle]} />}
      </View>
    </TouchableOpacity>
  );
};

export const InputWithAction = ({ value, label, onAction }) => {
  return (
    <View style={styles.container}>
      <View style={[styles.row, { justifyContent: 'space-between' }]}>
        <TouchableOpacity onPress={onAction}>
          <Text style={styles.actionText}>تعديل</Text>
        </TouchableOpacity>
        <View style={styles.withAction}>
          <Text
            style={[
              Fonts.style.normal,
              styles.inputStyle,
              { color: Colors.brownGrey, paddingEnd: 17 },
            ]}>
            {value || label}
          </Text>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    width: Metrics.screenWidth * 0.84,
    alignSelf: 'center',
    justifyContent: 'center',
    height: 50,
    borderRadius: 8,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: Colors.cloudyBlue,
  },
  row: {
    flexDirection: 'row',
  },
  inputStyle: {
    width: '100%',
    fontSize: 12,
    fontWeight: 'normal',
    fontStyle: 'normal',
    lineHeight: 16,
    letterSpacing: 0,
    textAlign: 'right',
    color: Colors.black,
    paddingEnd: 35,
  },
  passShowView: {
    height: 20,
    position: 'absolute',
    left: 20,
    alignSelf: 'center',
    zIndex: 99,
  },
  text: {
    fontSize: 12,
    color: 'rgb(141,141,141)',
  },
  textPhone: {
    // width: 32,
    height: 18,
    fontSize: 12,
    fontWeight: 'normal',
    fontStyle: 'normal',
    lineHeight: 18,
    letterSpacing: 0,
    textAlign: 'center',
    color: Colors.darkSlateBlue,
  },
  iconStyle: {
    position: 'absolute',
    right: 20,
    alignSelf: 'center',
  },
  withAction: {
    flexDirection: 'row',
    width: '80%',
  },
  actionText: {
    marginLeft: perfectWidth(12),
    fontFamily: isIos() ? 'TheMixArabic-Bold' : 'TheMixArab',
    fontWeight: '700',
    fontSize: perfectFont(12),
    color: '#3DBA7E',
  },
});

export default InputButton;

import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Animated,
  TouchableOpacity,
} from 'react-native';
import { useAnimation } from '../assets/Animation/animation';
import { Fonts, Metrics, Colors } from '../Themes';

const InputCo = props => {
  const animtion = useAnimation({
    doAnimation: props.doAnimation,
    duration: 550,
  });
  return (
    <Animated.View
      style={[
        styles.container,
        props.containerStyle,
        {
          width: props.doAnimation
            ? animtion.interpolate({
                inputRange: [0, 1],
                outputRange: [0, Metrics.screenWidth * 0.84],
              })
            : Metrics.screenWidth * 0.84,
        },
        props.styleAfterAnimation,
      ]}>
      <View style={styles.row}>
        {props.passView && (
          <TouchableOpacity
            style={styles.passShowView}
            onPress={props.onShowPassPress}>
            <Text style={[Fonts.style.normal, styles.text]}>عرض</Text>
          </TouchableOpacity>
        )}
        {props.registerPhone && (
          <View style={styles.passShowView} onPress={props.onShowPassPress}>
            <Text
              style={[
                Fonts.style.normal,
                styles.textPhone,
                { color: Colors.darkSlateBlue },
              ]}>
              +966 |{' '}
            </Text>
          </View>
        )}
        {props.withDesc && (
          <View style={[styles.descStyle, props.propsDescStyleCont]}>
            <Text
              style={[
                Fonts.style.normal,
                styles.descTextStyle,
                { color: Colors.darkSlateBlue },
                props.descTextStyle,
              ]}>
              {' '}
              {props.desc}{' '}
            </Text>
          </View>
        )}
        {props.withButton && <TouchableOpacity sty />}
        <TextInput
          placeholder={props.InputPlaceHolder}
          value={props.inputValue}
          style={[
            Fonts.style.normal,
            styles.inputStyle,
            props.InputStyle,
            props.disabled && { backgroundColor: '#cccccc' },
          ]}
          placeholderTextColor={Colors.brownGrey}
          onChange={props.onChange}
          multiline={props.multiline}
          ref={props.ref}
          onChangeText={props.onChangeText}
          keyboardType={props.number ? 'numeric' : 'default'}
          secureTextEntry={props.passShow}
          onSubmitEditing={props.onSubmitEditing}
          autoFocus={process.autoFocus}
          onFocus={props.onFocus}
          onBlur={props.onBlur}
          editable={!props.disabled}
        />
      </View>
    </Animated.View>
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
    height: '100%',
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
    paddingEnd: 17,
  },
  descStyle: {
    height: '100%',
    position: 'absolute',
    left: 15,
    alignSelf: 'center',
    zIndex: 99,
    paddingRight: 10,
    justifyContent: 'center',
    borderRightWidth: 1,
    borderRightColor: '#c8d3e1',
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
    fontSize: 14,
    fontWeight: 'normal',
    fontStyle: 'normal',
    lineHeight: 18,
    letterSpacing: 0,
    textAlign: 'center',
    color: Colors.darkSlateBlue,
  },
  descTextStyle: {
    height: 18,
    fontSize: 12,
    fontWeight: 'normal',
    fontStyle: 'normal',
    lineHeight: 18,
    letterSpacing: 0,
    textAlign: 'center',
    color: Colors.darkSlateBlue,
  },
});

export default InputCo;

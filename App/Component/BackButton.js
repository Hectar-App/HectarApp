import React from 'react';
import {
  View,
  Text,
  Platform,
  TextInput,
  StyleSheet,
  Animated,
  TouchableOpacity,
} from 'react-native';
import { useAnimation } from '../assets/Animation/animation';
import { Fonts, Metrics, Colors } from '../Themes';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const BackButton = props => {
  const animtion = useAnimation({
    doAnimation: props.doAnimation,
    duration: 600,
  });

  return (
    <TouchableOpacity onPress={props.onPress} style={props.contcontainerStyle}>
      <Animated.View
        style={[
          styles.container,
          props.containerStyle,
          {
            paddingStart: props.doAnimation
              ? animtion.interpolate({
                  inputRange: [0, 1],
                  outputRange: [-120, 30],
                })
              : 30,
          },
        ]}>
        {/* <Text style={[Fonts.style.normal, styles.textTitle ]} > > </Text> */}
        <Icon
          name={'chevron-right'}
          size={35}
          style={{ alignSelf: 'center' }}
          color={'#3a2f2f'}
        />

        <View style={[Fonts.style.normal, styles.textDesc]} />
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    // alignSelf:'center',
    justifyContent: 'flex-start',
    // paddingStart: 30,
    flexDirection: 'row-reverse',
    alignItems: 'center',
    alignSelf: 'center',

    // height: 50,
  },
  row: {
    flexDirection: 'row',
  },
  inputStyle: {
    width: '100%',
    fontSize: 14,
    fontWeight: 'normal',
    fontStyle: 'normal',
    lineHeight: 16,
    letterSpacing: 0,
    textAlign: 'right',
    color: Colors.black,
    paddingEnd: 17,
  },
  passShowView: {
    height: 20,
    position: 'absolute',
    left: 20,
    alignSelf: 'center',
    zIndex: 99,
  },
  textTitle: {
    color: Colors.black,
    fontFamily: 'TheMixArabic',
    fontSize: 18,
    fontWeight: Platform.OS === 'android' ? '400' : 'bold',
    fontStyle: 'normal',
    letterSpacing: 0,
    textAlign: 'right',
    color: '#000',
  },
  textDesc: {
    width: 35,
    height: 22,
    fontSize: 15,
    fontWeight: 'normal',
    fontStyle: 'normal',
    lineHeight: 22,
    letterSpacing: 0,
    textAlign: 'left',
    color: '#000',
  },
});

export default BackButton;

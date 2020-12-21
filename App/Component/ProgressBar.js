import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Animated,
  TouchableOpacity,
  Image,
} from 'react-native';
import {useAnimation} from '../assets/Animation/animation';
import {Fonts, Metrics, Colors, Images} from '../Themes';
import * as Progress from 'react-native-progress';

const Button = props => {
  const animtion = useAnimation({
    doAnimation: props.doAnimation,
    duration: 550,
  });
  return (
    <Animated.View style={[styles.container, props.containerStyle]}>
      <Text style={[Fonts.style.normal]}>
        {parseInt(props.persentageNumber)}%
      </Text>

      <Progress.Bar
        animated={true}
        progress={props.progress}
        width={Metrics.screenWidth * 0.81333333}
        style={{alignSelf: 'center', marginStart: 7}}
        color={Colors.darkSeafoamGreen}
        unfilledColor={'#e6e6e6'}
        borderColor={'#e6e6e6'}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    alignSelf: 'center',
    flexDirection: 'row',
  },

  textStyle: {},
});

export default Button;

import React, {useEffect} from 'react';
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
import {Fonts, Metrics, Colors, ApplicationStyles, CustomIcon} from '../Themes';
import BackButton from './BackButton';
import * as Progress from 'react-native-progress';

const Header = props => {
  const animtion = useAnimation({
    doAnimation: props.doAnimation,
    duration: 550,
  });

  const [progressL, setProgressL] = React.useState(0);

  useEffect(() => {
    setTimeout(() => {
      setProgressL(props.progress);
    }, 800);
  }, []);
  return (
    <Animated.View style={[styles.container, props.containerStyle]}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-end',
          alignItems: 'center',
          width: Metrics.screenWidth * 0.6,
          alignSelf: 'flex-end',
          //   borderWidth: 1,
          // marginEnd: 21,
          // marginTop: 30,
        }}>
        {(props.numberOfView || props.numberOfView === '') && !props.toPreview && (
          <View
            style={[
              styles.row,
              {
                marginStart: 24,
                bottom: 10,
              },
            ]}>
            <Text
              style={[
                ApplicationStyles.Profile.userNameText,
                {
                  fontWeight: 'normal',
                  marginEnd: 5,
                  fontSize: 16,
                  color: '#888892',
                  position: 'absolute',
                  left: -3,
                  top: 25,
                },
              ]}>{`${props.numberOfView}`}</Text>
            <CustomIcon name={'eye'} size={20} color={Colors.primaryGreen} />
          </View>
        )}
        <View>
          <Text
            style={[
              ApplicationStyles.Profile.userNameText,
              {
                fontWeight: 'normal',
                fontSize: 12,
                width: '60%',
                alignSelf: 'flex-end',
              },
            ]}>
            {'نسبة اكتمال تفاصيل العقار'}
          </Text>
          <View>
            <Text
              style={[
                ApplicationStyles.Profile.userNameText,
                {
                  fontWeight: 'normal',
                  fontSize: 11,
                  color: '#888892',
                  width: Metrics.screenWidth * 0.6,
                },
              ]}>
              {/* {'كلما كانت نسبة الاكتمال اعلى، زادت فرص البيع او التأجير'}  */}
              <Text
                style={{color: Colors.darkSeafoamGreen}}
                onPress={props.onPress}>
                {'  استكمال العقار   .... '}
              </Text>
            </Text>
          </View>
        </View>

        <Progress.Circle
          endAngle={0.2}
          size={60}
          progress={
            // props.toPreview ? props.progress / 100 : props.progress / 100
            progressL / 100
          }
          unfilledColor={'rgb(228,228,228)'}
          borderWidth={0}
          color={Colors.darkSeafoamGreen}
          indeterminate={false}
          style={{marginStart: 17}}>
          <Text
            style={{
              position: 'absolute',
              fontSize: 12,
              alignSelf: 'center',
              marginTop: 22,
            }}
            onPress={props.onPress}>
            {/* {props.toPreview ? props.progress / 100 : props.progress}% */}
            {parseInt(progressL) + ''}%
          </Text>
        </Progress.Circle>
      </View>

      <View style={[styles.lineStyle]} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: Metrics.screenWidth,
    height: 85,
    // backgroundColor: Colors.darkSeafoamGreen,
    // shadowColor: "rgba(61, 186, 126, 0.25)",

    // alignItems:'flex-start',
    justifyContent: 'center',
    // alignSelf:'center',
    paddingEnd: 17,
    alignSelf: 'center',
    // borderBottomWidth:1,
    // flexDirection:'row',
    // borderBottomColor: "#e6e6e6"
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  inputStyle: {
    fontSize: 17,
    fontWeight: 'normal',
    fontStyle: 'normal',
    lineHeight: 22,
    letterSpacing: 0,
    textAlign: 'center',
    color: Colors.black,
    // borderWidth:1,
    paddingBottom: 14,
  },
  boxSocial: {
    width: 33,
    height: 33,
    backgroundColor: '#f5fefa',
    // backgroundColor: 'red',
    marginEnd: 5,
    borderRadius: 16.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lineStyle: {
    width: Metrics.screenWidth * 0.87466667,
    height: 0,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#e5e5e5',
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
    right: (Metrics.screenWidth - Metrics.screenWidth * 0.87466667) / 2,
  },
});

export default Header;

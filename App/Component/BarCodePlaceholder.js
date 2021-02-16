import React from 'react';
import {Text, StyleSheet, Image, View, Platform} from 'react-native';
import {Fonts, Images, Metrics} from '../Themes';
import {ifIphoneX} from 'react-native-iphone-x-helper';

const BarCodePlaceholder = props => {
  const {text, infoText, style, noImage, logoImage} = props;
  return (
    <View style={[styles.barPlaceholder, style]}>
      {logoImage ? (
        <View
          style={[
            {
              marginTop:
                Platform.OS === 'ios' ? ifIphoneX('20%', '15%') : '15%',
              width: Metrics.screenWidth,
              height: Metrics.screenWidth * 0.32,
              alignItems: 'center',
              justifyContent: 'center',
              position: 'absolute',
              // top: - Metrics.screenWidth * 0.52,
              top:
                Platform.OS === 'ios'
                  ? ifIphoneX(
                      -Metrics.screenWidth * 0.6,
                      -Metrics.screenWidth * 0.4,
                    )
                  : -Metrics.screenWidth * 0.55,
            },
          ]}>
          <Image
            style={[
              {
                resizeMode: 'contain',
                width: '70%',
                height: 140,
              },
            ]}
            source={Images.sasoLogWithoutK}
          />
        </View>
      ) : null}
      <Text style={[Fonts.style.mainTitle, Fonts.style.whiteText]}>{text}</Text>
      {infoText ? (
        <Text style={([Fonts.style.whiteText], styles.infoTxt)}>
          {infoText}
        </Text>
      ) : null}
      {noImage ? null : (
        <Image
          source={Images.barPlaceholderImg}
          style={styles.bPlaceholderImg}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  barPlaceholder: {
    width: Metrics.screenWidth * 0.8,
    height: Metrics.screenWidth * 0.864,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 130,
  },
  barText: {
    fontSize: Fonts.size.regular,
    fontWeight: 'normal',
    textAlign: 'center',
    lineHeight: 30,
  },
  infoTxt: {
    fontFamily: Fonts.type.base,
    fontWeight: 'normal',
    fontSize: Fonts.size.small,
    color: 'white',
    marginTop: 10,
  },
  bPlaceholderImg: {
    width: Metrics.screenWidth * 0.8,
    height: Metrics.screenWidth * 0.864,
    resizeMode: 'contain',
    position: 'absolute',
    top: 0,
    bottom: 0,
    start: 0,
    end: 0,
  },
});

export default BarCodePlaceholder;

import React from 'react';
import { Text, StyleSheet, Animated, TouchableOpacity } from 'react-native';
import { Fonts, Metrics, Colors, CustomIcon } from '../Themes';
import BackButton from './BackButton';
import Button from './Button';
import { ifIphoneX } from 'react-native-iphone-x-helper';

const Header = props => {
  return (
    <Animated.View
      style={[
        styles.container,
        props.containerStyle,
        props.withoutUnderLinev || (false && { borderBottomWidth: 0 }),
      ]}>
      {!props.noBackButton && (
        <BackButton
          contcontainerStyle={{
            position: 'absolute',
            bottom: 5,
            right: 0,
            zIndex: 9999999999,
          }}
          onPress={props.onBackPress}
        />
      )}
      <Text style={[Fonts.style.normal, styles.inputStyle]}>
        {props.headerTitle}
      </Text>
      {props.forEditing && (
        <Button
          loading={props.loading}
          textPropsStyle={{ position: 'absolute', width: 'auto', left: 8 }}
          halfButton={true}
          buttonText={'حفظ '}
          containerStyle={{
            position: 'absolute',
            width: 50,
            left: 14,
            height: 40,
            top: ifIphoneX(50, 10),
          }}
          onPress={props.saveUpdate}
        />
      )}
      {props.preview && (
        <Button
          textPropsStyle={{ position: 'absolute', width: 'auto', left: 4 }}
          halfButton={true}
          buttonText={'معاينة'}
          containerStyle={{
            position: 'absolute',
            width: 50,
            left: 14,
            height: 40,
            top: ifIphoneX(50, 10),
          }}
          onPress={props.previewPress}
        />
      )}
      {props.withQR && (
        <TouchableOpacity
          onPress={props.onQRCodePress}
          style={{ position: 'absolute', bottom: 12, left: 20 }}>
          <CustomIcon name={'QRcode'} size={20} />
        </TouchableOpacity>
      )}
      {props.withSearch && (
        <TouchableOpacity
          onPress={props.openSearch}
          style={{ position: 'absolute', bottom: 12, left: 20 }}>
          <CustomIcon name={'QRcode'} size={20} />
        </TouchableOpacity>
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: Metrics.screenWidth,
    height: ifIphoneX(100, 60),
    alignItems: 'flex-end',
    justifyContent: 'center',
    alignSelf: 'center',
    borderBottomWidth: 1,
    flexDirection: 'row',
    borderBottomColor: '#e6e6e6',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  inputStyle: {
    fontSize: 13,
    fontWeight: 'normal',
    fontStyle: 'normal',
    lineHeight: 22,
    letterSpacing: 0,
    textAlign: 'center',
    color: Colors.black,
    // borderWidth:1,
    paddingBottom: 14,
  },
});

export default Header;

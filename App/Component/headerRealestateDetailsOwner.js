import React from 'react';
import {
  View,
  Text,
  TextInput,
  Platform,
  StyleSheet,
  Animated,
  Linking,
  Share,
  TouchableOpacity,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import {useAnimation} from '../assets/Animation/animation';
import {
  Fonts,
  Metrics,
  Colors,
  ApplicationStyles,
  Images,
  CustomIcon,
} from '../Themes';
import BackButton from './BackButton';

const Header = props => {
  const animtion = useAnimation({
    doAnimation: props.doAnimation,
    duration: 550,
  });

  const handleShare = () => {
    Share.share({
      message:
        'لاعجابي الشديد بهذا الحساب وددت مشاركته ' +
        'http://dev.hectar.io/properties/' +
        props.owner._id,
    });
  };

  const handleCall = () => {
    // Linking.openURL('https://api.whatsapp.com/send?phone=‎‪00966590917583‬').then(res => 0).catch(err => console.log('Error', err))
    Linking.openURL(`tel:${props.owner.phoneNumber}`);
    // console.log('props', props)
  };

  const handleWhatsUp = () => {
    Linking.openURL(`https://wa.me/%2B966${props.owner.phoneNumber}`)
      .then(res => 0)
      .catch(err => console.log('Error', err));
  };
  return (
    <TouchableWithoutFeedback onPress={props.onPress}>
      <Animated.View style={[styles.container, props.containerStyle]}>
        <View
          style={[
            styles.row,
            props.withOutQR
              ? {
                  marginStart: 24,
                  // flex: 1,
                  position: 'absolute',
                  right: 24,
                  bottom: 10,
                }
              : {
                  marginStart: 24,
                  position: 'absolute',
                  right: 24,
                  bottom: 10,
                },
          ]}>
          <TouchableOpacity onPress={handleWhatsUp} style={[styles.boxSocial]}>
            <Image source={Images.whatsappIcon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleCall} style={[styles.boxSocial]}>
            <Image source={Images.callIcon} />
          </TouchableOpacity>
          {!props.withOutQR && (
            <TouchableOpacity onPress={handleShare} style={[styles.boxSocial]}>
              <Image source={Images.shareIcon} />
            </TouchableOpacity>
          )}
        </View>
        {!props.withOutQR ? (
          <TouchableOpacity
            style={[
              styles.row,
              {
                marginStart: 24,
                // position: 'absolute',
                // right: 24,
                // bottom: 10
              },
            ]}
            onPress={props.onQRCodePress}>
            {props.userQR && <CustomIcon name={'qrcode2'} size={35} />}
          </TouchableOpacity>
        ) : null
        // <View
        // style={[styles.row, {
        //     marginStart: 24,
        //     // position: 'absolute',
        //     // right: 24,
        //     // bottom: 10
        // }]}
        // />
        }

        {(props.numberOfView || props.numberOfView === '') && (
          <View
            style={[
              styles.row,
              props.withOutQR
                ? {
                    marginStart: 45,
                    // flex: 1,
                    // position: 'absolute',
                    // right: 24,
                    marginTop: -30,
                    // bottom: 10,
                  }
                : {
                    marginStart: 24,
                    position: 'absolute',
                    right: 24,
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
                  // marginStart: 24,
                  left: -3,
                  top: 25,
                },
              ]}>{`${props.numberOfView}`}</Text>
            <CustomIcon name={'eye'} size={20} color={Colors.primaryGreen} />
          </View>
        )}

        <View
          style={
            props.withOutQR
              ? {
                  justifyContent: 'center',
                  // flex: 2 ,
                  flexDirection: 'row-reverse',
                  justifyContent: 'center',
                  alignItems: 'center',
                  // marginEnd: 21,
                  marginTop: -30,
                  // width: '50%'
                }
              : {
                  flexDirection: 'row-reverse',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginEnd: 21,
                  marginTop: -30,
                }
          }>
          {/* <View> */}
          <Text
            numberOfLines={1}
            style={[
              ApplicationStyles.Profile.userNameText,
              {
                fontWeight: Platform.OS === 'android' ? '400' : 'bold',
                fontSize: 15,
              },
              props.withOutQR ? {} : {},
            ]}>
            {props.owner.name}{' '}
          </Text>
          <Text
            style={[
              ApplicationStyles.Profile.userNameText,
              {fontWeight: 'normal', fontSize: 11, color: '#888892'},
            ]}>
            {props.owner.userType && props.owner.userType.userTypeName}
          </Text>
          {/* </View>  */}
          {/* <View source={Images.userProfileIcon} style={{width: 15.9, height: 21, marginStart: 4}} /> */}
          {/* <Text>معاذ الأمين</Text> */}
        </View>

        <View style={[styles.lineStyle]} />
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    width: Metrics.screenWidth,
    height: 85,
    // backgroundColor: Colors.darkSeafoamGreen,
    // shadowColor: "rgba(61, 186, 126, 0.25)",

    // alignItems:'flex-start',
    justifyContent: 'space-between',
    // alignSelf:'center',
    paddingEnd: 17,
    alignSelf: 'center',
    // borderBottomWidth:1,
    flexDirection: 'row',
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
    // backgroundColor: "#f5fefa",
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

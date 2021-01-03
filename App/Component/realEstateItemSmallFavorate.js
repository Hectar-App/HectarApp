import React, {useState} from 'react';
import {
  View,
  Text,
  Platform,
  TextInput,
  StyleSheet,
  Animated,
  TouchableOpacity,
  FlatList,
  TouchableHighlight,
  Image,
} from 'react-native';
import {useAnimation} from '../assets/Animation/animation';
import {Fonts, Metrics, Colors, Images, CustomIcon} from '../Themes';
import BackButton from './BackButton';
import {ifIphoneX} from 'react-native-iphone-x-helper';

import FavIcon from '../assets/imgs/svgImagesComponents/favorateIcon';

const realEstateItemSmallFavorate = props => {
  const animtion = useAnimation({
    doAnimation: props.doAnimation,
    duration: 1200,
    test: 150,
  });

  const [selectedType, setSelectedType] = useState(1);
  const translate = animtion.interpolate({
    inputRange: [
      props.index * 25 - 25,
      props.index * 25,
      props.index * 25 + 25,
    ],
    outputRange: [-100, props.index * 10, 0],
    extrapolate: 'clamp',
  });

  const {address, type, status, price, images} = props.item.realEstate
    ? props.item.realEstate
    : props.item;
  // console.log('props.index', props.item)

  function kFormatter(num) {
    return Math.abs(num) > 999 && Math.abs(num) < 999999
      ? Math.sign(num) * (Math.abs(num) / 1000).toFixed(1) + ' الف'
      : Math.abs(num) > 999999
      ? Math.sign(num) * (Math.abs(num) / 1000000).toFixed(1) + ' مليون'
      : Math.sign(num) * Math.abs(num) + ' ريال';
  }

  if (!type || !address) {
    return <View />;
  }
  return (
    <TouchableOpacity
      onPress={props.onItemPress}
      style={[styles.container, props.containerStyle]}>
      {/* 69.4 */}
      <Animated.View style={[styles.cardView, {transform: [{translateX: 1}]}]}>
        {/* <View
                style={{
                    width: 56,
                    height: 25,
                    borderRadius: 5,
                    backgroundColor: Colors.darkSlateBlue,
                    position: 'absolute',
                    top: 20,
                    left: 19,
                    justifyContent:'center',
                    zIndex: 999
                }}
            >
                 <Text style={[Fonts.style.normal, {fontSize: 12, alignSelf:'center', marginEnd: 2, color: Colors.white, }]} >للبيع</Text>
            </View> */}

        {/* <TouchableOpacity
                style={{
                    width: 25,
                    height: 25,
                    borderRadius: 5,
                    backgroundColor: 'transparnte',
                    position: 'absolute',
                    top: 20,
                    right: 19,
                    justifyContent:'center',
                    zIndex: 999
                }}
            >
                <Image source={Images.favorateIcon} />
            </TouchableOpacity> */}

        <View
          style={{
            height: 90,
            width: 110,
            borderRadius: 10,
            alignSelf: 'center',
            // borderTopEndRadius: 20,
            // borderTopStartRadius: 20
          }}>
          <Image
            source={
              images && images[0] ? {uri: images[0]} : Images.testCardImage
            }
            style={{height: 90, width: 110, borderRadius: 10}}
          />
          <View
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(17, 51, 81, .4)',
              borderRadius: 10,
            }}
          />
        </View>

        <View
          style={{
            width: Metrics.screenWidth - Metrics.screenWidth * 0.39333333,
          }}>
          <View
            style={{
              // width: Metrics.screenWidth * 0.912,
              height: 69.4,
            }}>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 10.5,
                height: 20,
                justifyContent: 'space-between',
                paddingHorizontal: 10,
                alignItems: 'center',
              }}>
              <TouchableOpacity
                style={{
                  width: 56,
                  height: 25,
                  borderRadius: 5,
                  backgroundColor: Colors.darkSlateBlue,
                  // position: 'absolute',
                  // top: 20,
                  // left: 19,
                  justifyContent: 'center',
                  zIndex: 999,
                }}>
                <Text
                  style={[
                    Fonts.style.normal,
                    {
                      fontSize: 12,
                      alignSelf: 'center',
                      marginEnd: 2,
                      color: Colors.white,
                    },
                  ]}>
                  {status && status.nameAr ? status.nameAr : 'للبيع'}
                </Text>
              </TouchableOpacity>
              <Text
                style={[
                  Fonts.style.normal,
                  {
                    fontSize: 15,
                    alignSelf: 'center',
                    color: Colors.darkSlateBlue,
                    fontWeight: Platform.OS === 'android' ? '400' : 'bold',
                  },
                ]}>
                {type && type.nameAr && type.nameAr}{' '}
                {status && status.nameAr && status.nameAr}
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                marginTop: 12.5,
                height: 16,
                justifyContent: 'space-between',
                paddingEnd: 10,
                alignItems: 'center',
                alignSelf: 'flex-end',
              }}>
              {/* <View style={{flexDirection: 'row', justifyContent:'center', alignItems:'center'}}>
                        <Text style={[Fonts.style.normal, {fontSize: 12, alignSelf:'center', marginEnd: 2}]} >منذ ساعتين</Text>
                        <Image source={Images.watchFlagCardIcon} />
                    </View> */}
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text
                  numberOfLines={1}
                  style={[
                    Fonts.style.normal,
                    {
                      fontSize: 12,
                      alignSelf: 'center',
                      color: '#888888',
                      width: '99%',
                    },
                  ]}>
                  {' '}
                  {(address && address.address) ||
                    address.coordinates[0] + ', ' + address.coordinates[1]}
                </Text>
                <Image source={Images.locationFlagCardIcon} />
              </View>
            </View>

            <View
              style={{
                flexDirection: 'row',
                marginTop: 12.5,
                // height: 16,
                justifyContent: 'space-between',
                paddingHorizontal: 10,
                alignItems: 'center',
                alignSelf: 'flex-end',
                width: Metrics.screenWidth - Metrics.screenWidth * 0.39333333,
              }}>
              <TouchableOpacity
                style={{
                  width: 25,
                  height: 25,
                  borderRadius: 5,
                  backgroundColor: 'transparnte',
                  // position: 'absolute',
                  // top: 20,
                  // right: 19,
                  justifyContent: 'center',
                  zIndex: 999,
                }}
                onPress={props.onFavPress}>
                {/* <Image source={Images.favorateIcon} /> */}
                {/* <FavIcon fill={'red'} doAnimation={true} green={true}  /> */}
                <CustomIcon
                  name={true ? 'bookmark2' : 'bookmark2-o'}
                  size={18}
                  color={false ? 'red' : Colors.darkSeafoamGreen}
                />
              </TouchableOpacity>

              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text
                  style={[
                    Fonts.style.normal,
                    {fontSize: 16, alignSelf: 'center', color: '#464646'},
                  ]}>
                  {' '}
                  {kFormatter(price) || 'علي السوم'}{' '}
                </Text>
              </View>

              {/* <TouchableOpacity
                        style={{
                            // width: 56,
                            height: 25,
                            borderRadius: 5,
                            backgroundColor: Colors.darkSeafoamGreen,
                            // position: 'absolute',
                            // top: 20,
                            // left: 19,
                            justifyContent:'center',
                            zIndex: 999,
                            paddingHorizontal: 14
                        }}
                    >
                        <Text style={[Fonts.style.normal, {fontSize: 12, alignSelf:'center', marginEnd: 2, color: Colors.white, }]} >تنشيط العقار</Text>
                    </TouchableOpacity> */}
            </View>
          </View>
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: Metrics.screenWidth * 0.915,
    height: 130,
    backgroundColor: Colors.green,
    zIndex: 99999,
    alignItems: 'center',
    alignSelf: 'center',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  cardView: {
    width: Metrics.screenWidth * 0.912,
    height: 110,
    backgroundColor: '#fff',
    flexDirection: 'row-reverse',
  },
});

export default realEstateItemSmallFavorate;

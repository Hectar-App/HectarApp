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
import {Fonts, Metrics, Colors, Images} from '../Themes';
import BackButton from './BackButton';
import {ifIphoneX} from 'react-native-iphone-x-helper';
import {ActivityIndicator} from 'react-native-paper';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import {IconButton} from 'react-native-paper';
import FastImage from 'react-native-fast-image';
import FavIcon from '../assets/imgs/svgImagesComponents/favorateIcon';

const realEstateItemSmall = props => {
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

  function kFormatter(num) {
    return Math.abs(num) > 999 && Math.abs(num) < 999999
      ? Math.sign(num) * (Math.abs(num) / 1000).toFixed(1) + 'الف ريال'
      : Math.abs(num) > 999999
      ? Math.sign(num) * (Math.abs(num) / 1000000).toFixed(1) + ' مليون'
      : Math.sign(num) * Math.abs(num) + ' ريال';
  }

  const {
    address: {coordinates, lat, long, address},
    // type,
    status,
    price,
    images,
    active,
    firstImageIndex,
    type: {nameAr},
    _id,
  } = props.item;
  // console.log('active', active)

  return (
    <TouchableOpacity
      onPress={() => props.onPress(props.item)}
      style={[
        styles.container,
        props.containerStyle,
        props.index !== 0 && {marginTop: -30},
      ]}>
      {/* 69.4 */}
      <Animated.View style={[styles.cardView]}>
        <View style={styles.conView}>
          <View
            style={{
              flex: 1,
              height: 81,
              alignSelf: 'center',
              justifyContent: 'center',
              alignItems: 'flex-end',
            }}>
            <Text
              style={[Fonts.style.normal, styles.textCard, {marginBottom: 9}]}>
              {nameAr} {status && status.nameAr && status.nameAr}
            </Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text
                numberOfLines={1}
                style={[
                  Fonts.style.normal,
                  {
                    fontSize: 12,
                    alignSelf: 'center',
                    width: '80%',
                    color: '#464646',
                  },
                ]}>
                {address || coordinates[0] + ' ,' + coordinates[1]}
              </Text>
              <Image source={Images.locationFlagCardIcon} />
            </View>

            <View
              style={{
                flexDirection: 'row-reverse',
                width: '65%',
                alignItems: 'center',
                marginTop: 4,
              }}>
              <Text
                style={[Fonts.style.normal, styles.textCard, {marginTop: 7}]}>
                {(price && kFormatter(price)) || 'علي السوم'}
              </Text>

              {props.dismassLoading === _id ? (
                <TouchableOpacity
                  style={{
                    // width: 56,
                    height: 25,
                    borderRadius: 5,
                    // backgroundColor: Colors.darkSeafoamGreen,
                    backgroundColor:
                      active !== 1 ? Colors.redWhite : Colors.darkSeafoamGreen,
                    // position: 'absolute',
                    // top: 20,
                    // left: 19,
                    justifyContent: 'center',
                    zIndex: 999,
                    alignSelf: 'center',
                    paddingHorizontal: 14,
                  }}>
                  <ActivityIndicator color={Colors.white} />
                </TouchableOpacity>
              ) : (
                <View
                  // onPress={props.onDismassPress}
                  style={{
                    // width: 56,
                    height: 25,
                    borderRadius: 5,
                    // backgroundColor: Colors.darkSeafoamGreen,
                    backgroundColor:
                      active !== 1 ? Colors.redWhite : Colors.darkSeafoamGreen,
                    // position: 'absolute',
                    marginTop: 4,
                    // left: 19,
                    justifyContent: 'center',
                    alignSelf: 'center',
                    zIndex: 9999,
                    paddingHorizontal: 14,
                  }}>
                  {/* <Text style={[Fonts.style.normal, {fontSize: 12, alignSelf:'center', marginEnd: 2, color: Colors.white, }]} >{active === 1 ? 'اخفاء': 'تنشيط'} </Text> */}
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
                    {active === 1 ? 'نشط' : 'منتهي'}
                  </Text>
                </View>
              )}
            </View>
          </View>
          <View
            style={{
              height: 81,
              width: Metrics.screenWidth * 0.21066667,
              alignSelf: 'center',
              marginStart: 13,
              marginEnd: 16,
              borderRadius: 10,
            }}>
            <FastImage
              style={{width: '100%', height: '100%'}}
              source={
                images && images[0] ? {uri: images[0]} : Images.mapCardImage
              }
            />
          </View>

          <TouchableOpacity
            style={{
              width: 50,
              height: 50,
              position: 'absolute',
              top: -0,
              left: 0,
              // borderWidth: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={props.onOptionsPress}>
            <Icon name={'options-vertical'} />
          </TouchableOpacity>
        </View>
        {props.popupOf === _id && (
          <View
            style={{
              // borderWidth: 1,
              width: 180,
              height: 110,
              position: 'absolute',
              top: 40,
              right: 35,
              backgroundColor: '#fff',
              zIndex: 999,
              paddingTop: 12,
              shadowColor: '#ccc',
              shadowOffset: {width: 6, height: 0},
              shadowOpacity: 1,
              shadowRadius: 8,
              elevation: 3,
            }}>
            <TouchableOpacity
              onPress={props.refreshPress}
              style={{flex: 1, justifyContent: 'center'}}>
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
                {'تحديث'}
              </Text>
            </TouchableOpacity>

            <View
              style={{
                height: 0.6,
                borderRadius: 3,
                width: '90%',
                alignSelf: 'center',
                backgroundColor: '#eee',
              }}
            />

            <TouchableOpacity
              onPress={props.editRealEstate}
              style={{flex: 1, justifyContent: 'center'}}>
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
                {'تعديل'}
              </Text>
            </TouchableOpacity>

            <View
              style={{
                height: 0.6,
                borderRadius: 3,
                width: '90%',
                alignSelf: 'center',
                backgroundColor: '#eee',
              }}
            />

            <TouchableOpacity
              style={{flex: 1, justifyContent: 'center'}}
              onPress={props.deletePress}>
              <Text
                style={[
                  Fonts.style.normal,
                  {
                    fontSize: 15,
                    alignSelf: 'center',
                    color: Colors.redWhite,
                    fontWeight: Platform.OS === 'android' ? '400' : 'bold',
                  },
                ]}>
                {'حذف'}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: Metrics.screenWidth * 0.915,
    // height: 190,
    backgroundColor: Colors.green,
    zIndex: 99999,
    alignItems: 'center',
    alignSelf: 'center',
    // borderTopRightRadius: 20,
    // borderTopLeftRadius: 20
  },
  cardView: {
    width: Metrics.screenWidth * 0.912,
    height: 170,
    // backgroundColor: "#fff",
    flexDirection: 'row-reverse',
    borderBottomColor: '#ccc',
    // borderBottomWidth: .5,
    paddingBottom: 15,
  },

  conView: {
    width: Metrics.screenWidth * 0.91466667,
    height: Metrics.screenWidth * 0.30666667,
    backgroundColor: '#ffffff',
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    borderRadius: 20,
    shadowOpacity: 1,
    flexDirection: 'row',
    elevation: 2,
    // marginTop: -20,
    alignSelf: 'center',
  },
  textCard: {
    fontSize: 15,
    alignSelf: 'center',
    color: Colors.darkSlateBlue,
    fontWeight: Platform.OS === 'android' ? '400' : 'bold',
    width: '100%',
    textAlign: 'right',
  },
});

export default realEstateItemSmall;

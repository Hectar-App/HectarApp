import React, { useState } from 'react';
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
import { useAnimation } from '../assets/Animation/animation';
import { Fonts, Metrics, Colors, Images, CustomIcon } from '../Themes';
import BackButton from './BackButton';
import { ifIphoneX } from 'react-native-iphone-x-helper';
import { ActivityIndicator } from 'react-native-paper';
import FastImage from 'react-native-fast-image';
import Carousel, { Pagination } from 'react-native-snap-carousel';

// import moment from 'moment'

import {
  Placeholder,
  PlaceholderMedia,
  PlaceholderLine,
  Fade,
} from 'rn-placeholder';

const realEstateItem = props => {
  // const animtion = useAnimation({ doAnimation: props.doAnimation, duration:1200, test: 800})

  const [selectedType, setSelectedType] = useState(1);
  // const translate = animtion.interpolate({inputRange: [props.index * 25 -25 ,  props.index * 25 , props.index * 25 + 25], outputRange: [ -100, props.index * 10 , 0], extrapolate: 'clamp'})
  const {
    address: { coordinates, lat, long, address },
    type,
    status,
    price,
    images,
    active,
    _id,
    numberOfLivingRoom,
    numberOfRooms,
    numberOfBathRoom,
    space,
    updatedAt,
    imagesSmall,
    // createdAt
  } = props.item;

  function timeSince(date) {
    var seconds = Math.floor((new Date() - date) / 1000);

    var interval = Math.floor(seconds / 31536000);

    if (interval > 1) {
      return interval + ' سنوات';
    }
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {
      return interval + ' شهور';
    }
    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
      return interval + ' ايام';
    }
    interval = Math.floor(seconds / 3600);
    if (interval > 1) {
      return interval + ' ساعات';
    }
    interval = Math.floor(seconds / 60);
    if (interval > 1) {
      return interval + ' دقائق';
    }
    return Math.floor(seconds) + ' ثواني';
  }

  const [loading, setLoading] = useState(true);
  const [sliderActiveSlide, setSliderActiveSlide] = useState(0);

  function kFormatter(num) {
    return Math.abs(num) > 999 && Math.abs(num) < 999999
      ? Math.sign(num) * (Math.abs(num) / 1000).toFixed(1) + ' الف'
      : Math.abs(num) > 999999
      ? Math.sign(num) * (Math.abs(num) / 1000000).toFixed(1) + ' مليون'
      : Math.sign(num) * Math.abs(num);
  }

  return (
    <TouchableOpacity
      style={[styles.container, props.containerStyle]}
      onPress={() => props.onPress(props.item)}>
      {/* 69.4 */}
      {/* {transform: [{translateX: translate}]} */}
      <Animated.View style={[styles.cardView]}>
        <View
          style={{
            // width: 60,
            height: 25,
            borderRadius: 5,
            backgroundColor: Colors.darkSlateBlue,
            position: 'absolute',
            top: 20,
            left: 19,
            justifyContent: 'center',
            zIndex: 999,
            paddingHorizontal: 4,
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
            {/* { status && status.nameAr ? status.nameAr: "للبيع"} */}
            {type && type.nameAr && type.nameAr}{' '}
            {status && status.nameAr && status.nameAr}
          </Text>
        </View>

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
            height: 160,
            width: Metrics.screenWidth * 0.916,
            borderTopEndRadius: 20,
            borderTopStartRadius: 20,
            alignSelf: 'center',
          }}>
          {/* <Image source={(images && images[0])? {uri: images[0] }: Images.testCardImage} style={{width: '100%', height: '100%'}}  /> */}
          {/* {<FastImage
                    style={{ width: '100%', height: '100%', borderTopRightRadius: 20, borderTopLeftRadius: 20 }}
                    // source={{
                    //     uri: item,
                    //     priority: FastImage.priority.normal,
                    // }}
                    source={(images && images[0])? {uri: images[0] }: Images.testCardImage}

                    onLoadEnd={() => {setLoading(false)}}
                    onError={() => {
                        console.log('error')
                    }}
                />} */}

          <Pagination
            dotsLength={(images || []).length}
            activeDotIndex={sliderActiveSlide}
            containerStyle={[
              {
                width: 200,
                flexWrap: 'wrap',
                // transform: [{rotate: '180deg',}],
                position: 'absolute',
                bottom: 20,
                right: 10,
                zIndex: 999999,
                paddingVertical: 5,
              },
            ]}
            dotStyle={{
              backgroundColor: Colors.darkSeafoamGreen,
              marginTop: 3,
            }}
            inactiveDotStyle={{
              width: 8,
              height: 8,
              borderRadius: 4,
              marginHorizontal: 0,
              backgroundColor: Colors.white,
              marginTop: 3,
            }}
            inactiveDotOpacity={1}
            inactiveDotScale={1}
          />

          <Carousel
            data={images && (images || []).length > 0 ? images : [{}]}
            renderItem={item => {
              return (
                <TouchableOpacity onPress={() => props.onPress(props.item)}>
                  <FastImage
                    style={{
                      width: '100%',
                      height: '100%',
                      borderTopRightRadius: 20,
                      borderTopLeftRadius: 20,
                    }}
                    source={
                      images && (images || []).length > 0
                        ? { uri: item.item }
                        : Images.testCardImage
                    }
                    onLoadEnd={() => {
                      setLoading(false);
                    }}
                    onError={() => {
                      console.log('error');
                    }}
                  />
                </TouchableOpacity>
              );
            }}
            style={{
              zIndex: 999,
            }}
            sliderWidth={Metrics.screenWidth * 0.916 - 3}
            itemWidth={Metrics.screenWidth * 0.916 - 3}
            onSnapToItem={index => setSliderActiveSlide(index)}
          />

          {loading && (
            <Placeholder
              Animation={Fade}
              style={{ width: '100%', height: '100%', position: 'absolute' }}>
              <PlaceholderLine style={{ width: '100%', height: '100%' }} />
            </Placeholder>
          )}

          {/* <PlaceholderMedia
                    style={{width: '100%', height: '100%', borderWidth: 1}}
                    Animation={Fade}

                    // Left={PlaceholderMedia}
                    // Right={PlaceholderMedia}
                /> */}
          {/* <View style={{position:'absolute', width: '100%', height: '100%', backgroundColor: 'rgba(17, 51, 81, .4)', borderTopEndRadius: 20, borderTopStartRadius: 20 }} /> */}
        </View>

        <View
          style={{
            width: Metrics.screenWidth * 0.912,
            height: 69.4,
            // borderWidth: 1
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
            {/* <Text style={[Fonts.style.normal, {fontSize: 15, alignSelf:'center', color: Colors.darkSlateBlue, fontWeight: Platform.OS === 'android'?'400': "bold",}]} >{price || '$144,900'}</Text> */}
            <View style={{ flexDirection: 'row' }}>
              {(numberOfRooms || numberOfRooms === '') && (
                <View style={{ alignItems: 'center', marginEnd: 8 }}>
                  <CustomIcon
                    name='bed'
                    color={Colors.primaryGreen}
                    size={15}
                  />
                  <Text
                    style={[
                      Fonts.style.normal,
                      {
                        fontSize: 10,
                        margin: 3,
                        alignSelf: 'center',
                        color: Colors.darkSlateBlue,
                        fontWeight: Platform.OS === 'android' ? '400' : 'bold',
                      },
                    ]}>
                    {numberOfRooms && numberOfRooms}
                  </Text>
                </View>
              )}
              {(numberOfBathRoom || numberOfBathRoom === '') && (
                <View style={{ alignItems: 'center', marginEnd: 8 }}>
                  <CustomIcon
                    name='bathroom'
                    color={Colors.primaryGreen}
                    size={15}
                  />
                  <Text
                    style={[
                      Fonts.style.normal,
                      {
                        fontSize: 10,
                        margin: 3,
                        alignSelf: 'center',
                        color: Colors.darkSlateBlue,
                        fontWeight: Platform.OS === 'android' ? '400' : 'bold',
                      },
                    ]}>
                    {numberOfBathRoom && numberOfBathRoom}
                  </Text>
                </View>
              )}
              {(numberOfLivingRoom || numberOfLivingRoom === '') && (
                <View style={{ alignItems: 'center', marginEnd: 8 }}>
                  <CustomIcon
                    name='hall'
                    color={Colors.primaryGreen}
                    size={15}
                  />
                  <Text
                    style={[
                      Fonts.style.normal,
                      {
                        fontSize: 10,
                        margin: 3,
                        alignSelf: 'center',
                        color: Colors.darkSlateBlue,
                        fontWeight: Platform.OS === 'android' ? '400' : 'bold',
                      },
                    ]}>
                    {numberOfLivingRoom && numberOfLivingRoom}
                  </Text>
                </View>
              )}

              {(space || space === '') && (
                <View style={{ alignItems: 'center' }}>
                  <CustomIcon
                    name='area'
                    color={Colors.primaryGreen}
                    size={15}
                  />
                  <Text
                    style={[
                      Fonts.style.normal,
                      {
                        fontSize: 10,
                        margin: 3,
                        alignSelf: 'center',
                        color: Colors.darkSlateBlue,
                        fontWeight: Platform.OS === 'android' ? '400' : 'bold',
                      },
                    ]}>
                    {space && space}
                  </Text>
                </View>
              )}
            </View>
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
              {(price && kFormatter(price) + ' ريال ') || 'علي السوم'}
            </Text>
          </View>

          {!props.mine ? (
            <View
              style={{
                flexDirection: 'row',
                marginTop: 12.5,
                height: 16,
                justifyContent: 'space-between',
                paddingHorizontal: 10,
                alignItems: 'center',
                flexWrap: 'wrap',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                {updatedAt && (
                  <Text
                    style={[
                      Fonts.style.normal,
                      { fontSize: 12, alignSelf: 'center', marginEnd: 2 },
                    ]}>
                    {timeSince(new Date(updatedAt))}
                  </Text>
                )}

                <Image source={Images.watchFlagCardIcon} />
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                }}>
                <Text
                  numberOfLines={1}
                  style={[
                    Fonts.style.normal,
                    {
                      fontSize: 12,
                      alignSelf: 'flex-end',
                      color: '#464646',
                      width: '75%',
                      textAlign: 'right',
                    },
                  ]}>
                  {' '}
                  {address || coordinates[0] + ' ,' + coordinates[1]}{' '}
                </Text>
                <Image source={Images.locationFlagCardIcon} />
              </View>
            </View>
          ) : (
            <View
              style={{
                flexDirection: 'row',
                marginTop: 12.5,
                height: 16,
                justifyContent: 'space-between',
                paddingHorizontal: 10,
                alignItems: 'center',
              }}>
              {props.dismassLoading === _id ? (
                <TouchableOpacity
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    height: 30,
                    borderRadius: 5,
                    paddingHorizontal: 6,
                    backgroundColor:
                      active === 1 ? Colors.redWhite : Colors.darkSeafoamGreen,
                  }}>
                  <ActivityIndicator color={Colors.white} />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={props.onDismassPress}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    height: 30,
                    borderRadius: 5,
                    paddingHorizontal: 6,
                    backgroundColor:
                      active === 1 ? Colors.redWhite : Colors.darkSeafoamGreen,
                  }}>
                  <Text
                    style={[
                      Fonts.style.normal,
                      { fontSize: 12, alignSelf: 'center', color: '#fff' },
                    ]}>
                    {' '}
                    {active === 1 ? 'اخفاء' : 'تنشيط'}{' '}
                  </Text>
                </TouchableOpacity>
              )}
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: 30,
                  borderRadius: 5,
                  paddingHorizontal: 6,
                  backgroundColor:
                    active === 1 ? Colors.darkSeafoamGreen : Colors.redWhite,
                }}>
                <Text
                  style={[
                    Fonts.style.normal,
                    {
                      fontSize: 12,
                      textAlign: 'center',
                      alignSelf: 'center',
                      color: '#fff',
                    },
                  ]}>
                  {active === 1 ? 'نشط' : 'موقوف'}
                </Text>
                {/* <Image source={Images.watchFlagCardIcon} /> */}
              </View>
            </View>
          )}
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: Metrics.screenWidth * 0.915,
    height: 240,
    // backgroundColor: Colors.green,
    // position:'absolute',
    zIndex: 99999,
    // bottom: 105,
    shadowColor: 'rgba(0, 0, 0, 0.08)',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowRadius: 15,
    shadowOpacity: 1,
    elevation: 6,
    // paddingTop: ifIphoneX(60,60),
    alignItems: 'center',
    alignSelf: 'center',
    // borderTopRightRadius: 20,
    borderRadius: 20,
    // borderBottomWidth: .4,
    // borderRightWidth: .4,
    // borderLeftWidth: .4,
    // borderColor: Colors.grey,
    // borderTopLeftRadius: 20,
    // borderBottomWidth: .4,
    marginBottom: 8,
  },
  cardView: {
    width: Metrics.screenWidth * 0.912,
    height: 229.4,
    backgroundColor: '#fff',
    // borderWidth: 1
    // shadowColor: "rgba(0, 0, 0, 0.1)",
    // shadowOffset: {
    //     width: 0,
    //     height: 7
    // },
    // shadowOpacity: 1,
    borderRadius: 20,
  },
});

export default realEstateItem;

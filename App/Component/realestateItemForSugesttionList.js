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
const realEstateItem = props => {
  const animtion = useAnimation({
    doAnimation: props.doAnimation,
    duration: 1200,
    test: 150,
  });

  const [selectedType, setSelectedType] = useState(1);

  function kFormatter(num) {
    return Math.abs(num) > 999 && Math.abs(num) < 999999
      ? Math.sign(num) * (Math.abs(num) / 1000).toFixed(1) + ' الف'
      : Math.abs(num) > 999999
      ? Math.sign(num) * (Math.abs(num) / 1000000).toFixed(1) + ' مليون'
      : Math.sign(num) * Math.abs(num);
  }
  const {
    address: { coordinates, lat, long, address },
    // type,
    status,
    price,
    images,
    active,
    firstImageIndex,
    type: { nameAr },
    _id,
    imagesSmall,
    numberOfLivingRoom = null,
    numberOfRooms = null,
    numberOfBathRoom = null,
    space = null,
  } = props.item;

  // console.log('props.index', numberOfLivingRoom,
  // numberOfRooms,
  // numberOfBathRoom,
  // space)

  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={[styles.container, props.containerStyle]}>
      {/* 69.4 */}
      <Animated.View style={[styles.cardView]}>
        <View
          style={{
            // width: 56,
            paddingHorizontal: 9,
            height: 25,
            borderRadius: 5,
            backgroundColor: Colors.darkSlateBlue,
            position: 'absolute',
            top: 20,
            left: 19,
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
            {nameAr && nameAr} {status && status.nameAr && status.nameAr}
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
            width: Metrics.screenWidth * 0.49866667,
            // borderTopEndRadius: 20,
            // borderTopStartRadius: 20,
            borderRadius: 20,
          }}>
          <Image
            source={
              imagesSmall && (imagesSmall || []).length > 0
                ? { uri: imagesSmall[0] }
                : Images.testCardImage
            }
            style={{ width: '100%', height: '100%', borderRadius: 20 }}
          />
          {/* <View style={{position:'absolute', borderRadius: 20, width: '100%', height: '100%', backgroundColor: 'rgba(17, 51, 81, .4)', borderTopEndRadius: 20, borderTopStartRadius: 20 }} /> */}
        </View>

        <View
          style={{
            width: Metrics.screenWidth * 0.49866667,
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
              {(price && kFormatter(price)) || 'علي السوم'}
            </Text>
            {/* <Text style={[Fonts.style.normal, {fontSize: 15, alignSelf:'center', color: Colors.darkSlateBlue, fontWeight: Platform.OS === 'android'?'400': "bold",}]} >{props.item.nameAr}</Text> */}
            <View style={{ flexDirection: 'row' }}>
              {/* {numberOfRooms && numberOfRooms !== null && <View style={{alignItems: 'center', marginEnd: 8}} >
                            <CustomIcon name='bed' color={Colors.primaryGreen} size={15} />
                            <Text style={[Fonts.style.normal, {fontSize: 10, margin: 3, alignSelf:'center', color: Colors.darkSlateBlue, fontWeight: Platform.OS === 'android'?'400': "bold",}]} >{numberOfRooms && (numberOfRooms + "")|| ""}</Text>
                        </View>} */}
              {/* { numberOfBathRoom && numberOfBathRoom !== null && <View style={{alignItems: 'center', marginEnd: 8}} >
                            <CustomIcon name='bathroom' color={Colors.primaryGreen} size={15} />
                            <Text style={[Fonts.style.normal, {fontSize: 10, margin: 3, alignSelf:'center', color: Colors.darkSlateBlue, fontWeight: Platform.OS === 'android'?'400': "bold",}]} >{numberOfBathRoom && (numberOfBathRoom + "")|| ""}</Text>
                        </View>} */}
              {/* {numberOfLivingRoom && numberOfLivingRoom !== null && <View style={{alignItems: 'center', marginEnd: 8}} >
                            <CustomIcon name='hall' color={Colors.primaryGreen} size={15} />
                            <Text style={[Fonts.style.normal, {fontSize: 10, margin: 3, alignSelf:'center', color: Colors.darkSlateBlue, fontWeight: Platform.OS === 'android'?'400': "bold",}]} >{numberOfLivingRoom && (numberOfLivingRoom + "")|| ""}</Text>
                        </View>} */}

              {/* {space && space !== null && <View style={{alignItems: 'center'}} >
                            <CustomIcon name='area' color={Colors.primaryGreen} size={15} />
                            <Text style={[Fonts.style.normal, {fontSize: 10, margin: 3, alignSelf:'center', color: Colors.darkSlateBlue, fontWeight: Platform.OS === 'android'?'400': "bold",}]} >{space && (space + "") || ""}</Text>
                        </View>} */}
            </View>
          </View>

          <View
            style={{
              flexDirection: 'row',
              marginTop: 12.5,
              height: 16,
              justifyContent: 'space-between',
              paddingHorizontal: 10,
              alignItems: 'center',
            }}>
            {/* <View style={{flexDirection: 'row', justifyContent:'center', alignItems:'center'}}>
                        <Text style={[Fonts.style.normal, {fontSize: 12, alignSelf:'center', marginEnd: 2}]} >منذ ساعتين</Text>
                        <Image source={Images.watchFlagCardIcon} />
                    </View> */}
            <View
              style={{
                flexDirection: 'row-reverse',
                alignItems: 'center',
                alignSelf: 'flex-end',
              }}>
              <Text
                numberOfLines={1}
                style={[
                  Fonts.style.normal,
                  {
                    fontSize: 11,
                    alignSelf: 'center',
                    fontWeight: 'normal',
                    marginStart: 3,
                    color: '#464646',
                    width: '90%',
                    textAlign: 'left',
                  },
                ]}>
                {address ? address : coordinates[0] + ',' + coordinates[1]}{' '}
              </Text>
              <Image source={Images.locationFlagCardIcon} />
            </View>
          </View>
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: Metrics.screenWidth * 0.49866667,
    marginHorizontal: 10,
    height: 240,
    backgroundColor: Colors.green,
    // position:'absolute',
    zIndex: 99999,
    // bottom: 105,
    // shadowColor: "rgba(0, 0, 0, 0.08)",
    // shadowOffset: {
    //   width: 0,
    //   height: 7
    // },
    // shadowRadius: 15,
    // shadowOpacity: 1,
    // paddingTop: ifIphoneX(60,60),
    alignItems: 'center',
    alignSelf: 'center',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  cardView: {
    width: Metrics.screenWidth * 0.49866667,
    height: 229.4,
    backgroundColor: '#fff',
    // shadowColor: "rgba(0, 0, 0, 0.1)",
    // shadowOffset: {
    //     width: 0,
    //     height: 7
    // },
    // shadowOpacity: 1,
    // borderRadius: 20,
  },
});

export default realEstateItem;

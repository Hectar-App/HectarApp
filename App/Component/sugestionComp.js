import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Platform,
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

const sugestionComp = props => {
  const animtion = useAnimation({
    doAnimation: props.doAnimation,
    duration: 550,
  });
  const height = animtion.interpolate({
    inputRange: [0, 1],
    outputRange: [30, (props.sugesstionData || []).length * 135],
  });
  return (
    <Animated.View
      style={[
        styles.container,
        {top: Platform.OS === 'android' ? 65 : 108.2},
        {height: props.doAnimation ? height : Metrics.screenWidth * 0.73333333},
      ]}>
      <FlatList
        data={props.sugesstionData}
        showsVerticalScrollIndicator={true}
        renderItem={({item, index}) => {
          console.log('item', item);
          return (
            <TouchableOpacity
              key={item.id}
              style={{
                height: 35,
                width: '100%',
                justifyContent: 'flex-start',
                flexDirection: 'row-reverse',
                alignItems: 'center',
                marginTop: index === 1 ? 5 : 10,
                zIndex: 9999999,
              }}
              onPress={() => props.itemPress(item)}>
              <View
                style={{
                  width: 35,
                  height: 35,
                  backgroundColor: 'rgba(61, 186, 126, 0.06)',
                  borderRadius: 35 / 2,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginEnd: 18,
                  marginStart: 10,
                }}>
                <Image
                  source={
                    item.icon || false
                      ? {uri: item.icon}
                      : Images.greenLocationIcon
                  }
                  style={{width: 25, height: 25, borderRadius: 12.5}}
                />
              </View>
              <Text
                style={[
                  Fonts.style.normal,
                  {
                    fontSize: 12,
                  },
                ]}>
                {item.name}
              </Text>
            </TouchableOpacity>
          );
        }}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: Metrics.screenWidth * 0.904,
    backgroundColor: '#ffffff',
    shadowColor: 'rgba(0, 0, 0, 0.08)',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 20,
    shadowOpacity: 1,
    position: 'absolute',

    borderRadius: 20,
    alignSelf: 'center',
    paddingTop: 20,
    maxHeight: Metrics.screenWidth * 0.73333333,
    zIndex: 99999999999999991,
    elevation: 2,
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
  searchContainer: {
    width: Metrics.screenWidth,
    flexDirection: 'row-reverse',
    justifyContent: 'center',
  },
  searchBox: {
    width: Metrics.screenWidth * 0.78666667,
    height: 40,
    borderRadius: 24,
    backgroundColor: '#ffffff',
    shadowColor: 'rgba(0, 0, 0, 0.08)',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowRadius: 20,
    shadowOpacity: 1,
    marginStart: 4,
    elevation: 2,
  },
  inputS: {
    width: '100%',
    height: '100%',
    paddingEnd: 40,
    textAlign: 'right',
    fontSize: 12,
  },
  itemText: {
    fontSize: 12,
    fontWeight: 'normal',
    fontStyle: 'normal',
    lineHeight: 16,
    letterSpacing: 0,
    textAlign: 'right',
    color: Colors.black,
  },
  itemContainer: {
    paddingHorizontal: 15,
    height: 33,
    borderRadius: 100,
    shadowColor: 'rgba(0, 0, 0, 0.08)',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 20,
    shadowOpacity: 1,
    justifyContent: 'center',
    alignSelf: 'center',
    marginEnd: 10,
    elevation: 2,
  },
});

export default sugestionComp;

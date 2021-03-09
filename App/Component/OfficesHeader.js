import React, { useState } from 'react';
import {
  View,
  Platform,
  TextInput,
  StyleSheet,
  Keyboard,
  Animated,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Fonts, Metrics, Colors, Images } from '../Themes';
import { ifIphoneX } from 'react-native-iphone-x-helper';
import { useTheme } from 'react-navigation';
import { ActivityIndicator } from 'react-native-paper';
import Header from './Header';
import { copilot } from 'react-native-copilot';
import { prop } from 'ramda';

const OfficesHeader = props => {
  const theme = useTheme();
  const [doAnimation, setDoAnimation] = useState(false);
  const inputRef = React.createRef();
  const openSearch = () => prop.setSearch(!props.search);
  return (
    <>
      <Header
        headerTitle='المكاتب العقارية'
        onBackPress={() => {
          console.log({ props });
          props.navigation.navigate('HomeStackNav');
        }}
      />
      <Animated.View
        style={[
          styles.searchContainer,
          styles.searchBox,
          {
            backgroundColor: theme === 'dark' ? '#25303e' : '#fff',
          },
        ]}>
        <TouchableOpacity
          style={[{ width: '100%', height: '100%' }]}
          onPress={() => {
            doAnimation ? Keyboard.dismiss() : inputRef.current.focus();
            doAnimation && setDoAnimation(s => (s = !s));
          }}>
          <TextInput
            style={[Fonts.style.normal, styles.inputS]}
            placeholder={'إبحث بإسم الحي أو المدينة'}
            ref={inputRef}
            value={props.searchValue}
            onChangeText={props.onSearch}
            placeholderTextColor={theme === 'dark' ? '#b7b7b9' : ''}
            // onFocus={() => setDoAnimation(s => s = !s)}
            returnKeyType={'search'}
            onSubmitEditing={() => setDoAnimation(false)}
          />

          {props.sugesstionLoading && (
            <ActivityIndicator
              style={{ position: 'absolute', left: 50, top: 7 }}
              color={Colors.primaryGreen}
            />
          )}

          <Image
            source={Images.searchIcon}
            style={
              !doAnimation && false
                ? { alignSelf: 'center', position: 'absolute', top: 12 }
                : {
                    position: 'absolute',
                    right: 9,
                    top: 12,
                    alignSelf: 'center',
                  }
            }
          />
        </TouchableOpacity>
      </Animated.View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: Metrics.screenWidth,
    height: ifIphoneX(164, 98),
    // backgroundColor: Colors  .brownGrey,
    // position:'absolute',
    zIndex: 99,
    top: 0,
    // left: -207,
    shadowColor: 'rgba(0, 0, 0, 0.08)',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    elevation: 2,
    shadowRadius: 15,
    shadowOpacity: 1,
    paddingTop: Platform.OS === 'android' ? 15 : ifIphoneX(60, 30),
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  porpuseStyle: {
    flex: 5,
    // borderWidth: 1,
    // height: '100%',
    backgroundColor: '#fff',
    borderRadius: 15,
    flexDirection: 'row',
    marginHorizontal: 5,
    alignItems: 'center',
    justifyContent: 'center',
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
    width: Metrics.screenWidth - 40,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 25,
    alignItems: 'stretch',
    marginHorizontal: 20,
    // alignItems: 'space-between'
  },
  searchBox: {
    height: 40,
    borderRadius: 4,
    backgroundColor: '#ffffff',
    shadowColor: 'rgba(0, 0, 0, 0.08)',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowRadius: 20,
    shadowOpacity: 1,
    marginVertical: 10,
    elevation: ifIphoneX(0, 6),
  },
  inputS: {
    width: '100%',
    height: '100%',
    paddingEnd: 35,
    textAlign: 'right',
    fontSize: 12,
    borderRadius: 4,
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
    // paddingHorizontal: 15,
    flex: 1,
    height: 33,
    // borderRadius: 100,
    shadowColor: 'rgba(0, 0, 0, 0.08)',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 20,
    shadowOpacity: 1,
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    // marginEnd: 10,
    elevation: ifIphoneX(0, 1),
  },
  itemContainer1: {
    marginHorizontal: 15,
    // flex:1,
    height: 33,
    width: '25%',
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
    alignItems: 'center',
    marginTop: 10,
    elevation: ifIphoneX(0, 1),
  },
});

export default copilot({
  overlay: 'svg', // or 'view'
  animated: true, // or false
  labels: {
    next: 'sdflkjd',
    finish: 'انتهاء',
  },
})(OfficesHeader);

import React, { useEffect } from 'react';
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
} from 'react-native';
import { useAnimation } from '../assets/Animation/animation';
import { Fonts, Metrics, Colors } from '../Themes';
import BackButton from './BackButton';
import { ifIphoneX } from 'react-native-iphone-x-helper';
import { Marker } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import MarkerAction from '../Redux/mapMarkerRedux';
import { connect } from 'react-redux';
import { useTheme } from 'react-navigation';
function kFormatter(num) {
  return Math.abs(num) > 999 && Math.abs(num) < 999999
    ? Math.sign(num) * (Math.abs(num) / 1000).toFixed(1) + ' الف'
    : Math.abs(num) > 999999
    ? Math.sign(num) * (Math.abs(num) / 1000000).toFixed(1) + ' مليون'
    : Math.sign(num) * Math.abs(num);
}

const MarkerItem = props => {
  const theme = useTheme();

  const animtion = useAnimation({
    doAnimation: props.doAnimation,
    duration: 550,
  });
  // const scaleAnimatio = animtion.interpolate({inputRange: [0, 1], outputRange: [ .3, 1]})
  // console.log('props.smallIcon', props.smallIcon)
  let colorCheck = false;
  colorCheck =
    (props.realEstates || []).findIndex(i => i === props.item._id) === -1;
  return (
    <View style={[styles.container, props.containerStyle]} key={props.item._id}>
      {!props.smallIcon ? (
        <Marker
          tracksViewChanges={props.tracksViewChanges}
          coordinate={{
            latitude:
              props.item.address &&
              props.item.address.coordinates &&
              props.item.address.coordinates[0],
            longitude:
              props.item.address &&
              props.item.address.coordinates &&
              props.item.address.coordinates[1],
            latitudeDelta: 0.1,
            longitudeDelta: 0.0121,
          }}
          key={props.item._id}
          onPress={() => {
            if (colorCheck) {
              props.addToMarkers(props.item._id);
            }

            colorCheck =
              (props.realEstates || []).findIndex(i => i === props.item._id) !==
              -1;

            props.onPress(props.item);
          }}
          // style={{borderWidth: 1, height: 40}}
        >
          <TouchableOpacity
            style={{
              backgroundColor:
                props.focusMarker === props.item._id
                  ? Colors.darkSeafoamGreen
                  : colorCheck
                  ? Colors.darkSlateBlue
                  : Colors.grey,
              // width: 60,
              // height: 25,
              borderRadius: 6,
              justifyContent: 'center',
              alignItems: 'center',
              // shadowColor: 'rgba(0,0,0,0.3)',
              elevation: 1,
              paddingHorizontal: 8,
              paddingVertical: 8,
              shadowColor: theme === 'dark' ? '#2f2f31' : '#ccc',
              shadowOffset: { width: 0, height: 5 },
              shadowOpacity: 8,
              shadowRadius: 2,
              elevation: 5,
              zIndex:
                props.focusMarker === props.item._id ? 100000000000000000 : 10,
              borderWidth: 1,
              borderColor: '#fff',
            }}>
            <Text
              style={[
                Fonts.style.normal,
                { color: Colors.white, fontSize: 11 },
              ]}>
              {(props.item.price && kFormatter(props.item.price) + ' ريال ') ||
                'علي السوم'}
            </Text>
          </TouchableOpacity>
          <View
            style={[
              Platform.OS === 'ios'
                ? {
                    position: 'absolute',
                    top: 29,
                    width: 0,
                    height: 0,
                    alignSelf: 'flex-start',
                    borderWidth: 5,
                    borderColor:
                      props.focusMarker === props.item._id
                        ? Colors.darkSeafoamGreen
                        : colorCheck
                        ? Colors.darkSlateBlue
                        : Colors.grey,
                    borderLeftColor: 'transparent',
                    borderRightColor: 'transparent',
                    borderBottomColor: 'transparent',
                    // zIndex: 1000,
                    marginStart: 7,
                    zIndex: 100000000000000000,
                  }
                : {
                    width: 0,
                    height: 0,
                    top: -5,
                    left: 10,
                    alignSelf: 'flex-start',
                    backgroundColor: 'transparent',
                    borderStyle: 'solid',
                    borderLeftWidth: 5,
                    borderRightWidth: 5,
                    borderBottomWidth: 10,
                    borderLeftColor: 'transparent',
                    borderRightColor: 'transparent',
                    borderBottomColor:
                      props.focusMarker === props.item._id
                        ? Colors.darkSeafoamGreen
                        : colorCheck
                        ? Colors.darkSlateBlue
                        : Colors.grey,
                    transform: [{ rotate: '180deg' }],
                  },
            ]}
          />
        </Marker>
      ) : (
        <Marker
          coordinate={{
            latitude:
              props.item.address &&
              props.item.address.coordinates &&
              props.item.address.coordinates[0],
            longitude:
              props.item.address &&
              props.item.address.coordinates &&
              props.item.address.coordinates[1],
            latitudeDelta: 0.1,
            longitudeDelta: 0.0121,
          }}
          key={props.item._id}
          onPress={() => {
            if (colorCheck) {
              props.addToMarkers(props.item._id);
            }

            colorCheck =
              (props.realEstates || []).findIndex(i => i === props.item._id) !==
              -1;

            props.onPress(props.item);
          }}>
          {props.showDetail ? (
            <View
              style={{ position: 'absolute', width: 100, top: -35, left: -5 }}>
              <TouchableOpacity
                style={{
                  backgroundColor:
                    props.focusMarker === props.item._id
                      ? Colors.darkSeafoamGreen
                      : colorCheck
                      ? Colors.darkSlateBlue
                      : Colors.grey,
                  // width: 60,
                  // height: 25,
                  borderRadius: 6,
                  justifyContent: 'center',
                  alignItems: 'center',
                  // shadowColor: 'rgba(0,0,0,0.3)',
                  elevation: 1,
                  paddingHorizontal: 8,
                  paddingVertical: 8,
                  zIndex: 999,
                }}
                onPress={() => ({})}>
                <Text
                  style={[
                    Fonts.style.normal,
                    { color: Colors.white, fontSize: 11 },
                  ]}>
                  {'شقة سكنية للبيع'}
                </Text>
              </TouchableOpacity>
              <View
                style={{
                  position: 'absolute',
                  top: 29,
                  width: 0,
                  height: 0,
                  alignSelf: 'flex-start',
                  borderWidth: 5,
                  borderColor:
                    props.focusMarker === props.item._id
                      ? Colors.darkSeafoamGreen
                      : colorCheck
                      ? Colors.darkSlateBlue
                      : Colors.grey,
                  borderLeftColor: 'transparent',
                  borderRightColor: 'transparent',
                  borderBottomColor: 'transparent',
                  zIndex: 1000,
                  marginStart: 7,
                }}
              />
            </View>
          ) : null}
          {
            <View
              style={{
                width: 10,
                height: 10,
                // backgroundColor: "transparent",
                backgroundColor:
                  props.focusMarker === props.item._id
                    ? Colors.darkSeafoamGreen
                    : colorCheck
                    ? Colors.darkSlateBlue
                    : Colors.grey,
                borderStyle: 'solid',
                borderWidth: 1,
                borderColor: '#fff',
                borderRadius: 5,
                shadowColor: '#fff',
                shadowOffset: { width: 0, height: 0 },
                shadowOpacity: 2,
                shadowRadius: 4,
                elevation: 2,
                zIndex: props.item.shows && 1000 * props.item.shows,
              }}
            />
          }
        </Marker>
      )}
    </View>
  );
};

const styles = StyleSheet.create({});

// export default (MarkerItem)

const mapDispatchToProps = dispatch => ({
  addToMarkers: _id => dispatch(MarkerAction.addToMarkers(_id)),
  checkMarker: _id => dispatch(MarkerAction.checkMarker(_id)),
});

const mapStateToProps = state => {
  // console.log('state', state.Marker)
  return {
    checker: state.Marker.checker,
    realEstates: state.Marker.realEstates,
    //   user: state.user.user && state.user.user.user && state.user.user.user,
    //   realEstateList: state.realEstate.realEstateList,
    //   checker: state.Favourte.checker && state.Favourte.checker,
    //   info: state.realEstate.AddingAqarInfo,
    //   filterData: state.user.filterData
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MarkerItem);

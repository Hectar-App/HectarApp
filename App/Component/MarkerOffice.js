import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  TouchableOpacity,
} from 'react-native';
import { Fonts, Colors } from '../Themes';
import { Marker } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import MarkerAction from '../Redux/mapMarkerRedux';
import { connect } from 'react-redux';
import { useTheme } from 'react-navigation';

const MarkerItem = props => {
  const theme = useTheme();
  let colorCheck = false;
  colorCheck =
    (props.realEstates || []).findIndex(i => i === props.item._id) === -1;
  return (
    <View style={[styles.container, props.containerStyle]} key={props.item._id}>
      {!props.smallIcon ? (
        <Marker
          tracksViewChanges={props.tracksViewChanges}
          coordinate={{
            latitude: props.item.geometry.location.lat,
            longitude: props.item.geometry.location.lng,
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
              backgroundColor: props.viewedOffices.includes(props.item.place_id)
                ? Colors.grey
                : Colors.darkSeafoamGreen,
              // width: 60,
              // height: 25,
              borderRadius: 6,
              justifyContent: 'center',
              alignItems: 'center',
              // shadowColor: 'rgba(0,0,0,0.3)',
              paddingHorizontal: 8,
              paddingVertical: 8,
              shadowColor: theme === 'dark' ? '#2f2f31' : '#ccc',
              shadowOffset: { width: 0, height: 5 },
              shadowOpacity: 8,
              shadowRadius: 2,
              elevation: 5,
              zIndex: props.viewedOffices.includes(props.item.place_id)
                ? 100000000000000000
                : 10,
              borderWidth: 1,
              borderColor: '#fff',
            }}>
            <Text
              style={[
                Fonts.style.normal,
                { color: Colors.white, fontSize: 11 },
              ]}>
              {props.item.name}
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
                    borderColor: props.viewedOffices.includes(
                      props.item.place_id,
                    )
                      ? Colors.grey
                      : Colors.darkSeafoamGreen,
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
                    borderBottomColor: props.viewedOffices.includes(
                      props.item.place_id,
                    )
                      ? Colors.grey
                      : Colors.darkSeafoamGreen,
                    transform: [{ rotate: '180deg' }],
                  },
            ]}
          />
        </Marker>
      ) : (
        <Marker
          coordinate={{
            latitude: props.item.geometry.location.lat,
            longitude: props.item.geometry.location.lng,
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
                  backgroundColor: props.viewedOffices.includes(
                    props.item.place_id,
                  )
                    ? Colors.grey
                    : Colors.darkSeafoamGreen,
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
                  {props.item.name}
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
                  borderColor: props.viewedOffices.includes(props.item.place_id)
                    ? Colors.grey
                    : Colors.darkSeafoamGreen,
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
                backgroundColor: props.viewedOffices.includes(
                  props.item.place_id,
                )
                  ? Colors.grey
                  : Colors.darkSeafoamGreen,
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

const mapDispatchToProps = dispatch => ({
  addToMarkers: _id => dispatch(MarkerAction.addToMarkers(_id)),
  checkMarker: _id => dispatch(MarkerAction.checkMarker(_id)),
});

const mapStateToProps = state => {
  return {
    checker: state.Marker.checker,
    realEstates: state.Marker.realEstates,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MarkerItem);

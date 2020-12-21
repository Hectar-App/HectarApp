import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  Platform,
  Alert,
  TextInput,
  Dimensions,
  Image,
  StyleSheet,
  Animated,
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native';
import Modal from 'react-native-modal';
import {IconButton, ActivityIndicator} from 'react-native-paper';
import {useAnimation} from '../assets/Animation/animation';
import {Fonts, Metrics, Colors, Images, CustomIcon} from '../Themes';
import MapView, {PROVIDER_GOOGLE, Polygon} from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import Geolocation from '@react-native-community/geolocation';
import {DotIndicator, BallIndicator} from 'react-native-indicators';
const {width} = Dimensions.get('window');
const MapModal = props => {
  const [x, setX] = useState({
    latitude: 24.78825,
    longitude: 46.622831,
    latitudeDelta: 1.1,
    longitudeDelta: 0.0121,
  });

  const [r, setR] = useState({
    latitude: 24.78825,
    longitude: 46.622831,
    latitudeDelta: 1.1,
    longitudeDelta: 0.0121,
  });

  const [loading, setLoading] = useState(false);

  const mapRef = React.createRef(null);
  const [userLocaiotn, setUserLocation] = useState({
    latitude: 24.78825,
    longitude: 46.622831,
    latitudeDelta: 0.1,
    longitudeDelta: 0.0121,
  });

  useEffect(() => {
    try {
      Geolocation.getCurrentPosition(
        res => {
          console.log('res', res);
          setUserLocation(s => (s = res.coords));
          setX(s => (s = res.coords));
          // this.setState({ userLocation: res.coords })
          // mapRef.current.animateToRegion({latitude: res.coords.latitude, longitude: res.coords.longitude, latitudeDelta: 0.1, longitudeDelta: 0.001})
          // this.props.getRealEstate(1, res.coords.latitude, res.coords.longitude)
        },
        err => console.log('err', err),
      );
    } catch (e) {
      console.log('fdslgjk', e);
    }
  }, []);

  return (
    <Animated.View style={[styles.container]}>
      <View style={[styles.container]}>
        <MapView
          ref={mapRef}
          style={[styles.map]}
          initialRegion={userLocaiotn}
          followsUserLocation={false}
          showsUserLocation={true}
          onPress={e => setX(e.nativeEvent.coordinate)}
          // minZoomLevel={12}
          onRegionChangeComplete={r => setR(r)}>
          <MapView.Marker
            {...MapView.Marker}
            draggable
            coordinate={x}
            onDragEnd={e => setX(e.nativeEvent.coordinate)}
          />
        </MapView>

        {loading && (
          <View
            style={{
              position: 'absolute',
              zIndex: 999,
              alignSelf: 'center',
              top: 120,
            }}>
            <BallIndicator color={Colors.primaryGreen} />
          </View>
        )}
      </View>

      <TouchableOpacity
        style={{
          width: 40,
          height: 40,
          position: 'absolute',
          top: 110,
          justifyContent: 'center',
          alignItems: 'center',
          alignSelf: 'center',
          zIndex: 99999999999999,
          borderRadius: 25,
          right: 15,
          shadowColor: '#000',
          backgroundColor: Colors.white,
          shadowOffset: {
            width: 0,
            height: 0,
          },
          shadowRadius: 60,
          shadowOpacity: 1,
          elevation: 2,
        }}
        onPress={props.onClosePress}>
        <CustomIcon name={'close'} size={25} />
      </TouchableOpacity>

      <TouchableHighlight
        underlayColor={Colors.darkSeafoamGreen}
        style={[
          {
            width: 50,
            height: 50,
            position: 'absolute',
            bottom: 110,
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
            zIndex: 99999999999999,
            borderRadius: 25,
            right: 15,
            shadowColor: '#ccc',
            backgroundColor: Colors.primaryGreen,
            shadowOffset: {
              width: 0,
              height: 0,
            },
            shadowRadius: 60,
            shadowOpacity: 1,
            elevation: 2,
          },
        ]}
        onPress={() => {
          try {
            Geolocation.getCurrentPosition(
              res => {
                // console.log('res', res)
                // setUserLocation( s =>  s = res.coords)
                // this.setState({ userLocation: res.coords })
                mapRef.current.animateToRegion({
                  latitude: res.coords.latitude,
                  longitude: res.coords.longitude,
                  latitudeDelta: 0.1,
                  longitudeDelta: 0.001,
                });
                // this.props.getRealEstate(1, res.coords.latitude, res.coords.longitude)
              },
              err => console.log('err', err),
            );
          } catch (e) {
            console.log('fdslgjk', e);
          }
        }}>
        {/* <Text style={[Fonts.style.normal,styles.textPhone]} ></Text> */}
        <Image source={Images.gbsIcon} />
      </TouchableHighlight>

      <TouchableHighlight
        underlayColor={Colors.darkSeafoamGreen}
        style={[
          {
            width: '50%',
            height: 50,
            position: 'absolute',
            bottom: 110,
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
            zIndex: 99999999999999,
            borderRadius: 20,
            left: 15,
            backgroundColor: '#fff',
            shadowColor: 'rgba(90, 900, 100, 0.2)',
            shadowOffset: {
              width: 0,
              height: 0,
            },
            shadowRadius: 60,
            shadowOpacity: 1,
            elevation: 2,
          },
        ]}
        onPress={() => {
          console.log(Math.log2(360 * (width / 256 / r.longitudeDelta)) + 1);
          if (Math.log2(360 * (width / 256 / r.longitudeDelta)) + 1 < 16) {
            return alert('الرجاء اختيار المكان باكثر دقة يجب التقريب اكثر');
          }
          setLoading(true);

          fetch(
            'https://maps.googleapis.com/maps/api/geocode/json?address=' +
              x.latitude +
              ',' +
              x.longitude +
              '&key=' +
              'AIzaSyBNAPLVcqs6_wajjZSULUC7Z1sA9-fdcvU&&language=ar',
          )
            .then(response => response.json())
            .then(responseJson => {
              console.log('response GOOGLE => ', responseJson);
              setLoading(false);
              if (
                responseJson.results &&
                responseJson.results[0] &&
                responseJson.results[0].formatted_address
              ) {
                console.log(
                  'response of google maps => ',
                  responseJson,
                  responseJson.results[5].address_components[0].long_name,
                );
                Alert.alert('', responseJson.results[0].formatted_address, [
                  {
                    text: 'تأكيد',
                    onPress: () =>
                      props.selectedLocation(
                        x,
                        responseJson.results[0].formatted_address,
                        responseJson.results[5] &&
                          responseJson.results[5].address_components &&
                          responseJson.results[5].address_components[0]
                            .long_name,
                      ),
                  },
                  {text: 'الغاء', onPress: () => null},
                ]);
              }
            })
            .catch(err => console.log('err GOOGLE => ', err));

          // props.selectedLocation(x)
        }}>
        <Text style={[Fonts.style.normal, styles.textPhone]}>اختيار</Text>
      </TouchableHighlight>

      {/* </Modal> */}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: Metrics.screenWidth,
    // alignSelf:'center',
    // justifyContent:'center',
    height: Metrics.screenHeight,
    // borderRadius: 8,
    // borderStyle: "solid",
    // borderWidth: 1,
    // borderColor: Colors.cloudyBlue,
    // backgroundColor:'red',
    position: 'absolute',
    zIndex: 99999,
    backgroundColor: '#fff',
    // paddingTop: 70,
    // paddingBottom: 40,
    // borderRadius: 20,
    // height: 500,
    bottom: 0,
    position: 'absolute',
    // right: 0,
    // left: -20
  },
  row: {
    flexDirection: 'row',
  },
  inputStyle: {
    width: '100%',
    fontSize: 13,
    fontStyle: 'normal',
    // lineHeight: 16,
    letterSpacing: 0,
    textAlign: 'right',
    color: Colors.black,
    paddingEnd: 25,
    fontSize: 20,
    fontWeight: Platform.OS === 'android' ? '400' : 'bold',
    fontStyle: 'normal',
    lineHeight: 29,
    letterSpacing: 0,
    textAlign: 'right',
    color: Colors.black,
  },
  passShowView: {
    height: 20,
    position: 'absolute',
    left: 20,
    alignSelf: 'center',
    zIndex: 99,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    // marginTop: ifIphoneX(130,98),
    zIndex: 1,
  },
  text: {
    fontSize: 12,
    color: 'rgb(141,141,141)',
  },
  textPhone: {
    fontSize: 14,
    fontWeight: Platform.OS === 'android' ? '400' : 'bold',
    fontStyle: 'normal',
    lineHeight: 18,
    letterSpacing: 0,
    textAlign: 'right',
    color: Colors.black,
  },
  containerView: {
    // justifyContent:'center',
    // alignItems:'center',
    backgroundColor: '#fff',
    width: Metrics.screenWidth,
    paddingTop: 70,
    paddingBottom: 40,
    borderRadius: 20,
    height: 500,
    bottom: -20,
    position: 'absolute',
    right: 0,
    left: -20,
  },
});

export default MapModal;

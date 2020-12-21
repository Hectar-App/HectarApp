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
  TouchableWithoutFeedback,
} from 'react-native';
import Modal from 'react-native-modal';
import {IconButton} from 'react-native-paper';
import {useAnimation} from '../assets/Animation/animation';
import {Fonts, Metrics, Colors} from '../Themes';
import StarRating from 'react-native-star-rating';
import Button from './Button';
import Header from './Header';
import MapView, {Marker} from 'react-native-maps';
import * as THREE from 'three';
// import { Canvas, extend, useFrame, useThree, useLoader } from 'react-three-fiber'

import {WebView} from 'react-native-webview';

const NearAqarFeatures = props => {
  const animtion = useAnimation({
    doAnimation: props.doAnimation,
    duration: 550,
  });

  const [radioButtonD, setRadioButtonD] = useState([
    {_id: 0, name: 'لم يتم التجاوب '},
    {_id: 1, name: 'مواصفات العقار غير متطابقة'},
    {_id: 2, name: 'عدم الالتزام في المواعيد'},
    {_id: 3, name: 'سوء المعاملة'},
  ]);

  const [rating, setRating] = useState(0);

  const [selectedOption, setSelectedOption] = useState({_id: 0});
  const [selectedType, setSelectedType] = useState(1);
  console.log('propsNear', props);

  return (
    <Animated.View style={[styles.container]}>
      <Modal
        isVisible={props.isVisible}
        // isVisible={true}
        animationIn={'fadeInUp'}
        animationInTiming={750}
        // swipeDirection={'down'}
        swipeThreshold={50}
        // onSwipe={props.onSwipe}
        style={{width: Metrics.screenWidth, height: Metrics.screenHeight}}>
        <View style={[styles.containerView]}>
          <Header
            headerTitle={'موقع العقار'}
            containerStyle={{marginTop: 0}}
            onBackPress={props.onBackPress}
          />

          {/* <View
            style={{
                // marginTop: 13.5,
                height: 50,
                backgroundColor: "#f9f9f9",
                justifyContent:'center',
                alignItems: 'flex-end'
            }}
        >
            <FlatList 
                horizontal
                data={(props.types || [{_id: 0, nameAr: 'مدارس'}, {_id: 1, nameAr: 'مستشفيات'}, {_id: 2, nameAr: 'مساجد'}, {_id: 3, nameAr: 'مدينة العاب'}])}
                showsHorizontalScrollIndicator={false}
                renderItem={({item, index})=>{
                    return(
                        <TouchableOpacity
                            key={index}
                            style={[styles.itemContainer,{backgroundColor: selectedType === item._id ? Colors.darkSeafoamGreen: "#ffffff"}]}
                            onPress={()=> setSelectedType(item._id)}
                        >
                            <Text style={[Fonts.style.normal, styles.itemText, { color: selectedType === item._id ? Colors.white: Colors.black}]} >{item.nameAr}</Text>
                        </TouchableOpacity>
                    )
                }}
            />
        </View> */}

          <MapView
            // provider={PROVIDER_GOOGLE} // remove if not using Google Maps //, {transform: [{rotateY: '20deg'}]}
            // ref={ref => this.mapRef = ref}
            style={[styles.map]}
            initialRegion={{
              latitude: props.address.coordinates[0],
              longitude: props.address.coordinates[1],
              latitudeDelta: 0.006,
              longitudeDelta: 0.0121,
            }}
            onMapReady={() => console.log('ready')}
            // scrollEnabled={false}
            // zoomEnabled={false}
            // onRegionChange={()=>this.setState({realestateSelected: null})}

            // showsUserLocation={true}
            // minZoomLevel={12}
          >
            <Marker
              coordinate={{
                latitude: props.address.coordinates[0],
                longitude: props.address.coordinates[1],
              }}
              onPress={() => alert('hello')}
            />
            {/* {
                realestate.map(item => (
                    <Marker key={item._id} item={item} onPress={() => this.handleMarkerPress(item)} showDetailForSmallIcon={false} />
                ))
            } */}
          </MapView>
        </View>
      </Modal>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: Metrics.screenWidth,
    // alignSelf:'center',
    // justifyContent:'center',
    // height: Metrics.screenHeight,
    borderRadius: 8,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: Colors.cloudyBlue,
    // backgroundColor:'red',
    position: 'absolute',
    zIndex: 99,
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
    // paddingTop: 70,
    paddingBottom: 40,
    borderRadius: 20,
    height: Metrics.screenHeight,
    bottom: -20,
    position: 'absolute',
    right: 0,
    left: -20,
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
  map: {
    ...StyleSheet.absoluteFillObject,
    marginTop: 100,
    zIndex: -1,
  },
});

export default NearAqarFeatures;

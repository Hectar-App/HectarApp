import React, {useState} from 'react';
import {
  View,
  Text,
  Platform,
  Image,
  StyleSheet,
  Animated,
  TouchableOpacity,
} from 'react-native';
import Modal from 'react-native-modal';
import {IconButton, ActivityIndicator} from 'react-native-paper';
import {useAnimation} from '../assets/Animation/animation';
import {Fonts, CustomIcon, Metrics, Colors, Images} from '../Themes';
import StarRating from 'react-native-star-rating';
import Button from './Button';
import Header from './Header';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ImageViewr from 'react-native-image-zoom-viewer';

import FastImage from 'react-native-fast-image';
import {ScrollView} from 'react-native-gesture-handler';

const gallery = props => {
  const [imageFullScreen, setImageFullScreen] = useState(false);
  const [loading, setLoading] = useState(true);

  const [selectedImage, setSelectedImage] = useState();
  console.log('selectedImage', selectedImage);

  const imagess = [{url: selectedImage, props: {source: props.images}}];

  const images3 = [];

  if (props.images) {
    (props.images || []).map(i => images3.push({url: i, props: {}}));
  }

  return (
    <Animated.View style={[styles.container]}>
      <Modal
        isVisible={props.isVisible}
        // isVisible={true}
        animationIn={'fadeInUp'}
        animationInTiming={750}
        // swipeDirection={"up"}
        swipeThreshold={50}
        onSwipe={props.onBackPress}
        style={{width: Metrics.screenWidth, height: Metrics.screenHeight}}>
        <View style={[styles.containerView]}>
          <Header headerTitle={'صور العقار'} onBackPress={props.onBackPress} />
          <ScrollView>
            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                width: Metrics.screenWidth,
                height: Metrics.screenHeight,
                // paddingHorizontal: 8,
                alignItems: 'center',
                flex: 1,
                justifyContent: 'center',
                marginBottom: 130,
              }}>
              {(props.images || []).map(item => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      setSelectedImage(item);
                      setImageFullScreen(true);
                    }}>
                    <View
                      style={{
                        width: Metrics.screenWidth * 0.9,
                        alignSelf: 'center',
                        marginTop: 12,
                        height: Metrics.screenWidth * 0.5,
                      }}>
                      {loading && (
                        <ActivityIndicator
                          style={{width: 50, height: 50}}
                          color={Colors.darkSeafoamGreen}
                        />
                      )}
                      <FastImage
                        style={{width: '100%', height: '100%'}}
                        source={{
                          uri: item,
                          priority: FastImage.priority.normal,
                        }}
                        onLoadEnd={() => {
                          setLoading(false);
                        }}
                        onError={() => {
                          console.log('error');
                        }}
                      />
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          </ScrollView>
          <Modal
            visible={imageFullScreen}
            style={{
              width: Metrics.screenWidth,
              height: Metrics.screenHeight,
              margin: 0,
            }}
            onBackdropPress={() => setImageFullScreen(false)}
            transparent={true}>
            <TouchableOpacity
              style={[
                // styles.modalCloseBtn,
                {
                  top: 60,
                  backgroundColor: '#fff',
                  // opacity: 0.5,
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: Metrics.screenWidth * 0.071,
                  height: Metrics.screenWidth * 0.071,
                  borderRadius: (Metrics.screenWidth * 0.071) / 2,
                  right: 20,
                  position: 'absolute',
                  zIndex: 999999,
                },
              ]}
              activeOpacity={0.65}
              onPress={() => setImageFullScreen(false)}>
              <CustomIcon name={'close'} size={20} color={'#3a2f2f'} />
              {/* <Icon name={'close-octagon-outline'} size={25} color={'#3a2f2f'} /> */}
              {/* <Image
                        style={styles.modalCloseBtnIcon}
                        source={Images.closeCircleButton}
                        /> */}
            </TouchableOpacity>

            <ImageViewr
              // imageUrls={ar}
              // imageUrls={[{url: selectedImage, props: {source: props.images,}}]}
              imageUrls={images3}
              style={[styles.swipeImage, {height: '90%'}]}
            />
          </Modal>
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
});

export default gallery;

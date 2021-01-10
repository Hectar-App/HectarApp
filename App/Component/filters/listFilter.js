import React, {useState, useEffect} from 'react';
import {View, Text, Platform, StyleSheet, Animated} from 'react-native';
import Modal from 'react-native-modal';
import {IconButton} from 'react-native-paper';
import {Fonts, Metrics, Colors} from '../../Themes';
import RealEstatePropsFilters from './RealEstatePropsFilters';

const ListFilter = props => {
  const [radioButtonD, setRadioButtonD] = useState([
    {_id: 1, name: 'طلب خدمة التصوير الأحترافي', reqested: props.request1},
    {_id: 2, name: 'طلب خدمة تصوير 360 درجة', reqested: props.request2},
    {_id: 3, name: 'طلب خدمة QR كود', reqested: props.request3},
  ]);

  useEffect(() => {
    setRadioButtonD([
      {_id: 1, name: 'طلب خدمة التصوير الأحترافي', reqested: props.request1},
      {_id: 2, name: 'طلب خدمة تصوير 360 درجة', reqested: props.request2},
      {_id: 3, name: 'طلب خدمة QR كود', reqested: props.request3},
    ]);
  }, [props, props.request1, props.request2, props.request3]);

  return (
    <Animated.View style={[styles.container]}>
      <Modal
        isVisible={props.isVisible}
        animationIn={'fadeInUp'}
        animationOut={'slideOutDown'}
        animationOutTiming={750}
        animationInTiming={750}
        swipeDirection={'down'}
        swipeThreshold={50}
        onSwipe={props.onSwipe}
        style={{width: Metrics.screenWidth, height: Metrics.screenHeight}}>
        <View style={[styles.containerView]}>
          <IconButton
            icon={'close'}
            style={{position: 'absolute', top: 10, right: 10}}
            onPress={props.onSwipe}
          />

          <Text
            style={[
              Fonts.style.normal,
              {
                color: '#000',
                fontSize: 18,
                fontWeight: 'normal',
                position: 'absolute',
                top: 18,
                alignSelf: 'center',
              },
            ]}>
            ترتيب {'القائمة'}
          </Text>

          <RealEstatePropsFilters {...props} />
        </View>
      </Modal>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: Metrics.screenWidth,
    borderRadius: 8,
    borderStyle: 'solid',
    borderColor: Colors.cloudyBlue,
    position: 'absolute',
    zIndex: 99,
  },
  row: {
    flexDirection: 'row',
  },
  inputStyle: {
    alignSelf: 'center',
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
    backgroundColor: '#fff',
    width: Metrics.screenWidth,
    paddingTop: 64,
    paddingBottom: 40,
    borderRadius: 20,
    height: 280,
    bottom: -20,
    position: 'absolute',
    right: 20,
    left: -20,
  },
});

export default ListFilter;

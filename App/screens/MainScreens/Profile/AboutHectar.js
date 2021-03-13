import React, { useEffect, useState } from 'react';
import {
  View,
  Animated,
  Text,
  Keyboard,
  Image,
  TouchableWithoutFeedback,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import Header from '../../../Component/Header';
import { Fonts, Colors, Metrics, Images } from '../../../Themes';

import { IconButton } from 'react-native-paper';

import api from '../../../Services/API';

import { BallIndicator } from 'react-native-indicators';

const API = api.create();

const FAQs = props => {
  const [aboutHectarInfo, setAboutHectarInfo] = useState(null);

  useEffect(() => {
    API.aboutHectar()
      .then(res => {
        console.log('res', res);
        if (res && res.ok && res.data) {
          setAboutHectarInfo(res.data);
        }
      })
      .catch(err => console.log('error', err));
  }, []);

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      {aboutHectarInfo ? (
        <View style={{ flex: 1 }}>
          <Header
            headerTitle={'عن هكتار'}
            doAnimation={true}
            onBackPress={() => props.navigation.goBack()}
          />

          <Animated.View
            style={{
              width: 70,
              alignSelf: 'center',
              opacity: 1,
              height: 70,
              marginTop: Metrics.screenWidth * 0.37333333,
            }}>
            <Image
              source={Images.HectarBetIcon}
              resizeMode={'contain'}
              style={{ width: 120, height: 120, alignSelf: 'center' }}
            />
          </Animated.View>
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Text
              style={[
                Fonts.style.normal,
                {
                  width: Metrics.screenWidth * 0.8,
                  opacity: 0.8,
                  fontSize: 12,
                  fontWeight: 'normal',
                  fontStyle: 'normal',
                  lineHeight: 24,
                  letterSpacing: 0,
                  textAlign: 'right',
                  color: Colors.black,
                  alignItems: 'flex-end',
                  marginTop: 52,
                },
              ]}
            />
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: Metrics.screenWidth * 0.5296,
              height: 28,
              alignSelf: 'center',
              marginTop: 35,
            }}>
            <TouchableOpacity style={[styles.circleView]}>
              <IconButton
                icon={'instagram'}
                color={'#fff'}
                size={18}
                style={{ width: 25, height: 25 }}
              />
            </TouchableOpacity>

            <TouchableOpacity style={[styles.circleView]}>
              <IconButton
                icon={'linkedin'}
                color={'#fff'}
                size={18}
                style={{ width: 25, height: 25 }}
              />
            </TouchableOpacity>

            <TouchableOpacity style={[styles.circleView]}>
              <IconButton
                icon={'facebook'}
                color={'#fff'}
                size={18}
                style={{ width: 25, height: 25 }}
              />
            </TouchableOpacity>

            <TouchableOpacity style={[styles.circleView]}>
              <IconButton
                icon={'twitter'}
                color={'#fff'}
                size={18}
                style={{ width: 25, height: 25 }}
              />
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <BallIndicator color={Colors.primaryGreen} />
        </View>
      )}
    </TouchableWithoutFeedback>
  );
};

export default FAQs;

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    alignSelf: 'center',
    flexDirection: 'row',
  },

  circleView: {
    width: 30.2,
    height: 30.2,
    borderRadius: 30.2 / 2,
    backgroundColor: Colors.darkSeafoamGreen,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

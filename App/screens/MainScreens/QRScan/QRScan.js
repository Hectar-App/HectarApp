import React from 'react';
import { Image, StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {
  perfectFont,
  perfectHeight,
  perfectWidth,
} from '../../../utils/commonFunctions';
import VerticalSpace from '../../../Component/core/layouts/VerticalSpace';

const logo = require('../../../assets/imgs/logo-new.png');

const QRScan = () => {
  const onReadSuccess = res => {
    // Navigate to owner screen with it's id from res.data
  };

  return (
    <View style={styles.container}>
      <QRCodeScanner
        onRead={onReadSuccess}
        showMarker={true}
        topContent={
          <>
            <VerticalSpace height={110} />
            <Image source={logo} style={styles.logo} resizeMode={'contain'} />
            <VerticalSpace height={200} />
          </>
        }
        bottomContent={
          <TouchableOpacity>
            <Text style={styles.scanText}>إمسح هنا</Text>
          </TouchableOpacity>
        }
        cameraStyle={styles.cameraStyle}
        markerStyle={styles.markerStyle}
      />
    </View>
  );
};

export default QRScan;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#9EDCBF',
    alignItems: 'center',
  },
  logo: {
    width: perfectWidth(165),
    height: perfectHeight(64),
  },
  cameraStyle: {
    width: perfectWidth(222),
    height: perfectHeight(222),
    alignSelf: 'center',
    borderRadius: 50,
  },
  markerStyle: {
    width: perfectWidth(222),
    height: perfectHeight(315),
    borderRadius: 25,
  },
  scanText: {
    fontFamily: 'TheMixArab',
    fontWeight: '700',
    fontSize: perfectFont(24),
    color: '#3D3D3D',
  },
});

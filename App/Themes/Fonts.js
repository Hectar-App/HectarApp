import {Platform, I18nManager} from 'react-native';
import Metrics from './Metrics';
let isRTL = I18nManager.isRTL;
const isIos = Platform.OS === 'ios';
const type = {
  base: isIos ? 'TheMixArabic-Plain' : 'TheMixArabic-Plain',
  bold: 'TheMixArabic-Bold',
  emphasis: 'TheMixArabic-Plain',
};

const size = {
  h1: 38,
  h2: 34,
  h3: 30,
  h4: 26,
  h5: 20,
  h6: 19,
  input: 18,
  small: Metrics.screenWidth * 0.042,
  smaller: Metrics.screenWidth * 0.034,
  regular: Metrics.screenWidth * 0.048,
  medium: Metrics.screenWidth * 0.053,
  large: Metrics.screenWidth * 0.053,
  larger: Metrics.screenWidth * 0.0586,
  semiLarge: 18,
  huge: 25,
  tiny: 8.5,
};

const style = {
  h1: {
    fontFamily: type.base,
    fontSize: size.h1,
  },
  h2: {
    fontWeight: Platform.OS === 'android' ? '400' : 'bold',
    fontSize: size.h2,
    ...(Platform.OS === 'android' && {
      fontFamily: type.bold,
    }),
  },
  h3: {
    fontFamily: type.emphasis,
    fontSize: size.h3,
  },
  h4: {
    fontFamily: type.base,
    fontSize: size.h4,
  },
  h5: {
    fontFamily: type.base,
    fontSize: size.h5,
  },
  h6: {
    fontFamily: type.emphasis,
    fontSize: size.h6,
  },
  normal: {
    fontFamily: type.base,
    // fontSize: size.regular,
    fontSize: 15,
    fontWeight: Platform.OS === 'android' ? '400' : 'bold',
    fontStyle: 'normal',
    color: '#66798b',
    ...(Platform.OS === 'android' && {
      fontFamily: type.bold,
    }),
  },
  mainTitle: {
    fontFamily: type.base,
    // fontSize: size.medium,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: Platform.OS === 'android' ? '400' : 'bold',
    ...(Platform.OS === 'android' && {
      fontFamily: type.bold,
    }),
  },
  fieldLabel: {
    fontFamily: type.base,
    fontSize: size.regular,
  },
  fieldInput: {
    fontFamily: type.base,
    fontSize: size.regular,
    textAlign: isRTL ? 'right' : 'left',
  },
  boldText: {
    fontFamily: type.bold,
  },
  description: {
    fontFamily: type.base,
    fontSize: size.medium,
  },
  centerText: {
    textAlign: 'center',
  },
  whiteText: {
    color: 'white',
  },
  plainText: {
    unicodeBidi: 'plain-text',
  },
  alignedText: {
    textAlign: isRTL ? 'right' : 'left',
  },
};

export default {
  type,
  size,
  style,
};

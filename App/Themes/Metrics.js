import {Dimensions, Platform} from 'react-native'

const { width, height } = Dimensions.get('window')

// Used via Metrics.baseMargin
const metrics = {
  marginHorizontal: 10,
  marginVertical: 10,
  marginBottomSmall: 10,
  marginBottomMedium: 20,
  marginBottomLarge: 40,
  marginTopSmall: 10,
  marginTopMedium: 20,
  marginTopLarge: 40,
  section: 25,
  baseMargin: 10,
  doubleBaseMargin: 20,
  smallMargin: 5,
  doubleSection: 50,
  horizontalLineHeight: 1,
  textLineHeight: 28,
  screenWidth: width < height ? width : height,
  screenHeight: width < height ? height : width,
  navBarHeight: (Platform.OS === 'ios') ? 64 : 54,
  buttonRadius: 4,
  sizes: {
    x2: (width < height ? width : height) * 0.0053,
    x3: (width < height ? width : height) * 0.008,
    x4: (width < height ? width : height) * 0.010,
    x5: (width < height ? width : height) * 0.013,
    x8: (width < height ? width : height) * 0.021,
    x10: (width < height ? width : height) * 0.026,
    x12: (width < height ? width : height) * 0.032,
    x15: (width < height ? width : height) * 0.04,
    x18: (width < height ? width : height) * 0.048,
    x20: (width < height ? width : height) * 0.05,
    x25: (width < height ? width : height) * 0.06,
    x28: (width < height ? width : height) * 0.074,
    x30: (width < height ? width : height) * 0.08,
    x35: (width < height ? width : height) * 0.093,
    x40: (width < height ? width : height) * 0.106,
    x45: (width < height ? width : height) * 0.12,
    x50: (width < height ? width : height) * 0.133,
    x55: (width < height ? width : height) * 0.146,
    x60: (width < height ? width : height) * 0.16,
    x65: (width < height ? width : height) * 0.173,
    x70: (width < height ? width : height) * 0.186,
    x80: (width < height ? width : height) * 0.213,
    x90: (width < height ? width : height) * 0.24,
    x95: (width < height ? width : height) * 0.253,
    x100: (width < height ? width : height) * 0.266,
    x110: (width < height ? width : height) * 0.293,
    x145: (width < height ? width : height) * 0.386,
    x150: (width < height ? width : height) * 0.400,
    x155: (width < height ? width : height) * 0.413,
    x160: (width < height ? width : height) * 0.426,
    x200: (width < height ? width : height) * 0.533,
    x250: (width < height ? width : height) * 0.666,
    x270: (width < height ? width : height) * 0.72,
    x280: (width < height ? width : height) * 0.746,
    x380: (width < height ? width : height) * 1.013
  },
  icons: {
    tiny: 15,
    small: 20,
    medium: 30,
    large: 45,
    xl: 50
  },
  images: {
    small: 20,
    medium: 40,
    large: 60,
    logo: 200
  }
}

export default metrics

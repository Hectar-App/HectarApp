import { I18nManager, Platform } from 'react-native'
import Metrics from './Metrics'
import Fonts from './Fonts'
import Colors from './Colors'
// import { ifIphoneX } from 'react-native-iphone-x-helper'


let isRTL = I18nManager.isRTL
// This file is for a reusable grouping of Theme items.
// Similar to an XML fragment layout in Android

const ApplicationStyles = {
  // product page ---
  productPageHeader: {
    width: Metrics.screenWidth,
    height: Metrics.screenWidth * 0.1653,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    // ...ifIphoneX({height: Metrics.screenWidth * 0.1653+10 , paddingBottom:12,  paddingTop: 40 }, Platform.OS === 'ios' ?{ paddingTop:15}:{}),
    paddingHorizontal: Metrics.screenWidth * 0.0586,
    borderBottomWidth: .7,
    borderBottomColor: '#ffffff2b'
  },
  productPageDetailHeader: {
    height: Platform.OS === 'ios' ? Metrics.screenWidth * 0.133 : Metrics.screenWidth * 0.133,
    marginVertical: Platform.OS === 'ios' ? Metrics.screenWidth * 0.04 : Metrics.screenWidth * 0.01,
    paddingHorizontal: Metrics.screenWidth * 0.05,
    justifyContent: 'space-between',
    // ...ifIphoneX({paddingTop:50},{}),
    borderBottomWidth: 0,
    borderBottomColor: 'transparent'
  },
  headerBackCont: {
    height: Metrics.screenWidth * 0.133,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0
  },
  headerBtn: {
    width: Metrics.screenWidth * 0.08,
    height: Metrics.screenWidth * 0.08
  },
  headerBtnIcon: {
    width: Metrics.screenWidth * 0.08,
    height: Metrics.screenWidth * 0.08,
    resizeMode: 'contain'
  },
  backBtnIcon: {
    transform: [{ scaleX: isRTL ? 1 : -1 }]
  },
  sideBtnsContainer: {
    flexDirection: 'row',
    flexShrink: 0
  },
  headerTitleCont: {
    height: Metrics.screenWidth * 0.133,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },
  headerTitle: {
    textAlign: 'center'
  },
  headerIconBtn: {
    width: Metrics.screenWidth * 0.06,
    height: Metrics.screenWidth * 0.06,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
    flexShrink: 0
  },
  headerIcon: {
    width: Metrics.screenWidth * 0.06,
    height: Metrics.screenWidth * 0.06,
    resizeMode: 'contain',
    flexShrink: 0,
    transform: [{ scaleX: isRTL ? 1 : -1 }]
  },
  headerZoomIcon: {
    marginHorizontal: 0,
    marginEnd: 15
  },
  headerSearchField: {
    height: 50,
    flex: 1
  },
  headerImgCont: {
    height: Metrics.screenWidth * 0.133,
    borderRadius: (Metrics.screenWidth * 0.133) / 2,
    paddingVertical: 0,
    paddingHorizontal: Metrics.screenWidth * 0.025,
    backgroundColor: Colors.white
  },
  headerBrand: {
    height: Metrics.screenWidth * 0.133,
    resizeMode: 'contain'
  },
  headerSideBtnsCont: {
    height: Metrics.screenWidth * 0.133,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0
  },
  // ---
  screen: {
    mainContainer: {
      flex: 1,
      backgroundColor: Colors.transparent
    },
    backgroundImage: {
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0
    },
    container: {
      flex: 1,
      paddingTop: Metrics.baseMargin,
      backgroundColor: Colors.transparent
    },
    section: {
      margin: Metrics.section,
      padding: Metrics.baseMargin
    },
    sectionText: {
      ...Fonts.style.normal,
      paddingVertical: Metrics.doubleBaseMargin,
      color: Colors.snow,
      marginVertical: Metrics.smallMargin,
      textAlign: 'center'
    },
    subtitle: {
      color: Colors.snow,
      padding: Metrics.smallMargin,
      marginBottom: Metrics.smallMargin,
      marginHorizontal: Metrics.smallMargin
    },
    titleText: {
      ...Fonts.style.h2,
      fontSize: 14,
      color: Colors.text
    }
  },
  darkLabelContainer: {
    padding: Metrics.smallMargin,
    paddingBottom: Metrics.doubleBaseMargin,
    borderBottomColor: Colors.border,
    borderBottomWidth: 1,
    marginBottom: Metrics.baseMargin
  },
  darkLabel: {
    fontFamily: Fonts.type.bold,
    color: Colors.snow
  },
  groupContainer: {
    margin: Metrics.smallMargin,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  sectionTitle: {
    ...Fonts.style.h4,
    color: Colors.coal,
    backgroundColor: Colors.ricePaper,
    padding: Metrics.smallMargin,
    marginTop: Metrics.smallMargin,
    marginHorizontal: Metrics.baseMargin,
    borderWidth: 1,
    borderColor: Colors.ember,
    alignItems: 'center',
    textAlign: 'center'
  },
  modalWrapper: {
    justifyContent: 'flex-end',
    margin: 0
  },
  msgWrapper: {
    width: Metrics.screenWidth,
    height: Metrics.screenHeight * 0.518,
    borderTopEndRadius: Metrics.screenWidth * 0.08,
    borderTopStartRadius: Metrics.screenWidth * 0.08,
    position: 'absolute',
    bottom: 0,
    backgroundColor: Colors.white,
    elevation: 5
  },
  msgContainer: {
    width: '100%',
    height: '100%',
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },
  welcomeMsg: {
    width: '100%',
    height: '100%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  msgContent: {
    width: '100%',
    alignItems: 'center'
  },
  msgLogo: {
    width: Metrics.screenWidth * 0.305,
    height: Metrics.screenHeight * 0.144,
    resizeMode: 'contain',
    marginBottom: Metrics.screenHeight * 0.037
  },
  msgTitle: {
    color: Colors.textDark
  },
  msgText: {
    color: Colors.textDark
  },
  registerBtn: {
    marginVertical: Metrics.marginBottomMedium
  },
  regWrapper: {
    width: Metrics.screenWidth,
    height: '100%',
    flex: 1,
    position: 'absolute',
    top: 0,
    start: 0,
    end: 0,
    bottom: 0,
    padding: Metrics.screenWidth * 0.048,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: -1
  },
  regHolder: {
    width: '100%',
    height: '100%',
    flex: 1
  },
  closeBtnCont: {
    width: Metrics.screenWidth * 0.08,
    height: Metrics.screenWidth * 0.08,
    position: 'absolute',
    top: 15,
    end: 20,
    zIndex: 99
  },
  closeBtn: {
    width: Metrics.screenWidth * 0.08,
    height: Metrics.screenWidth * 0.08
  },
  closeBtnIcon: {
    width: Metrics.screenWidth * 0.08,
    height: Metrics.screenWidth * 0.08,
    resizeMode: 'contain'
  },
  productBgImage: {
    width: Metrics.screenWidth,
    height: Metrics.screenHeight * 0.4160,
    resizeMode: 'cover',
    position: 'absolute',
    top: 0,
    start: 0,
    end: 0,
    zIndex: -1
  },

  //Profile
  Profile:{
    userNameText: [Fonts.style.normal,{
      fontSize: 16,
      fontWeight: "normal",
      fontStyle: "normal",
      lineHeight: 22,
      letterSpacing: 0,
      textAlign: "right",
      color: Colors.black
    }],
  },
  mapButton: {
    width: 44,
    height: 44,
    backgroundColor: Colors.darkSeafoamGreen,
    shadowColor: "rgba(17, 51, 81, 0.63)",
    shadowOffset: {
      width: 0,
      height: 10
    },
    shadowRadius: 20,
    shadowOpacity: 1,
    position: 'absolute',
    bottom: 96,
    right: 20,
    zIndex: 99999,
    borderRadius: 22,
    justifyContent: 'center',
    elevation: 2,
    alignItems: 'center'
  }
}

export default ApplicationStyles

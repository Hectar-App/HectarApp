import { Platform } from 'react-native'
import Fonts from './Fonts'
import Metrics from './Metrics'
import Colors from './Colors'

// This file is for a reusable grouping of Theme items.
// Similar to an XML fragment layout in Android

const ModalStyles = {
  wrapper: {
    width: '100%',
    height: '100%',
    padding: 0,
    margin: 0,
    flex: 1
  },
  closeStyle: {
    position: 'absolute', 
    top: 5, 
    right: 20,
    zIndex: 99
  },
  wide: {
    wrapper: {
      body: {
        width: '100%',
        position: 'absolute',
        start: 0,
        end: 0,
        bottom: 0,
        padding: Metrics.sizes.x20,
        margin: 0,
        backgroundColor: Colors.white,
        ...Platform.select({
          ios: {
            borderTopStartRadius: Metrics.sizes.x40,
            borderTopEndRadius: Metrics.sizes.x40
          },
          android: {
            borderTopStartRadius: Metrics.sizes.x20,
            borderTopEndRadius: Metrics.sizes.x20
          }
        }),
        title: {
          width: '100%',
          fontFamily: Fonts.type.base,
          fontSize: Fonts.size.h5,
          color: Colors.title,
          textAlign: 'center',
          textAlignVertical: 'center',
          marginBottom: Metrics.sizes.x15
        },
        content: {
          width: '100%',
          flex: 1,
          marginBottom: Metrics.sizes.x20
        },
        topAligned: {
          top: 0,
          bottom: null,
          paddingHorizontal: Metrics.sizes.x60,
          paddingBottom: Metrics.sizes.x40,
          borderTopStartRadius: 0,
          borderTopEndRadius: 0,
          ...Platform.select({
            ios: {
              paddingTop: Metrics.sizes.x60,
              borderBottomStartRadius: Metrics.sizes.x40,
              borderBottomEndRadius: Metrics.sizes.x40
            },
            android: {
              paddingTop: Metrics.sizes.x40,
              borderBottomStartRadius: Metrics.sizes.x20,
              borderBottomEndRadius: Metrics.sizes.x20
            }
          }),
        }
      }
    }
  },
  boxed: {
    wrapper: {
      ...Platform.select({
        ios: {
          paddingTop: Metrics.sizes.x80
        }
      }),
      paddingHorizontal: Metrics.sizes.x15
    },
    shrinkWrapper: {
      ...Platform.select({
        ios: {
          paddingTop: Metrics.sizes.x40
        }
      })
    },
    body: {
      width: '100%',
      // padding: Metrics.sizes.x20,
      borderRadius: Metrics.sizes.x15,
      backgroundColor: Colors.white,
      // marginBottom: Metrics.sizes.x20,
      borderWidth: 1,
      ...Platform.select({
        ios: {
          shadowColor: Colors.black,
          shadowOffset: {
            width: 0,
            height: 10
          },
          shadowRadius: 30,
          shadowOpacity: 0.1
        },
        android: {
          elevation: 1
        }
      })
    },
    title: {
      position: 'relative',
      marginBottom: Metrics.sizes.x25,
      text: {
        width: '100%',
        fontFamily: Fonts.type.base,
        fontSize: Fonts.size.h6,
        textAlign: 'center',
        color: Colors.black
      },
      close: {
        width: Metrics.sizes.x30,
        height: Metrics.sizes.x30,
        position: 'absolute',
        top: 0,
        end: 0,
        zIndex: 99,
        icon: {
          width: '100%',
          height: '100%',
          resizeMode: 'contain'
        }
      }
    },
    content: {
      flex: 1
    }
  },
  row: {
    flexDirection: 'row', 
    justifyContent:'space-around'
  },
  halfButton: {
    width: '40%'
  },
  fullButton: {
    width: '80%'
  },
  whiteButton: {
    backgroundColor: '#fff',
    ...Platform.select({
      ios: {
        shadowColor: Colors.black,
        shadowOffset: {
          width: 0,
          height: 10
        },
        shadowRadius: 30,
        shadowOpacity: 0.1
      },
      android: {
        elevation: 1
      }
    })
  },
  tiny: {
    wrapper: {
      padding: 0
    },
    body: {
      width: Metrics.sizes.x280,
      // minHeight: Metrics.sizes.x250,
      marginHorizontal: (Metrics.screenWidth - (Metrics.sizes.x280 + (Metrics.sizes.x15 * 2))) / 2,
      paddingBottom: Metrics.sizes.x15
    },
    content: {
      alignItems: 'center',
      paddingVertical: Metrics.sizes.x20,
      paddingHorizontal: Metrics.sizes.x15,
      // borderWidth: 1,
      justifyContent: 'center',
      marginBottom: Metrics.sizes.x15,
      icon: {
        width: Metrics.sizes.x50,
        height: Metrics.sizes.x50,
        marginBottom: Metrics.sizes.x15,
        resizeMode: 'contain'
      },
      title: {
        width: '100%',
        fontFamily: Fonts.type.base,
        fontSize: Fonts.size.h6,
        color: Colors.charcoal,
        textAlign: 'center',
        // marginBottom: Metrics.sizes.x10,
        ...Platform.select({
          ios: {
            // paddingTop: Metrics.sizes.x10,
            // marginBottom: Metrics.sizes.x10 * -1,
            // lineHeight: Metrics.sizes.x10
          },
          android: {
            // marginBottom: Metrics.sizes.x3
          }
        })
      },
      text: {
        width: '100%',
        fontFamily: Fonts.type.base,
        fontSize: Fonts.size.regular,
        color: Colors.charcoal,
        textAlign: 'center',
        ...Platform.select({
          ios: {
            // paddingTop: Metrics.sizes.x10,
            // marginBottom: Metrics.sizes.x10 * -1,
            // lineHeight: Metrics.sizes.x10
          },
          android: {
            // lineHeight: Metrics.sizes.x18
          }
        })
      }
    }
  }
}

export default ModalStyles

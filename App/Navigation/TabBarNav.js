import React, {PureComponent, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import {Metrics, Colors} from '../Themes';
import posed from 'react-native-pose';
import {ifIphoneX} from 'react-native-iphone-x-helper';
import {useTheme} from 'react-navigation';
import api from '../Services/API';
import {connect} from 'react-redux';

const API = api.create();
const windowWidth = Metrics.screenWidth;
const tabWidth = windowWidth / 5;

const S = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 92,
    elevation: 2,
    borderRadius: 14,
    borderWidth: 1,
    backgroundColor: '#fff',
  },
  tabButton: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  spotLight: {
    width: tabWidth,
    height: '100%',
    backgroundColor: 'rgb(128,255,255)',
    borderRadius: 8,
    // alignSelf:'center',
    zIndex: 99,
    // marginTop:10,
    // marginStart: 22
  },
});

// const SpotLight = posed.View({
//   route0: { x: 0 },
//   route1: { x: tabWidth },
//   route2: { x: tabWidth * 2 },
//   route3: { x: tabWidth * 3 },
//   route4: { x: tabWidth * 4 }
// });

const Scaler = posed.View({
  active: {scale: 1.3},
  inactive: {scale: 1},
});

const ScalerOptions = posed.View({
  active: {scale: 1},
  inactive: {scale: 0.5},
});

// local styles
TabBarNav = props => {
  let theme = useTheme();

  const {
    renderIcon,
    getLabelText,
    activeTintColor,
    inactiveTintColor,
    onTabPress,
    onTabLongPress,
    getAccessibilityLabel,
    navigation,
  } = props;

  const {routes, index: activeRouteIndex} = navigation.state;

  const handlePress = routeName => {
    props.navigation.navigate(routeName);
  };

  const [notificationStatus, setNotificationStatus] = useState(false);
  const [numberOfNotification, setNumberOfNotification] = useState(0);
  if (props.user && props.user.token) {
    API.getUserNotificationStatus(props.user.token)
      .then(res => {
        console.log('res', res);
        if (res.ok && res.data) {
          setNotificationStatus(res.data.notification);
          setNumberOfNotification(res.data.numberOfNotification);
        }
      })
      .catch(err => console.log('err', err));
  }

  return (
    <View
      style={[
        styles.tabsContainer,
        {backgroundColor: theme === 'light' ? Colors.white : '#202126'},
      ]}>
      {/* <View style={StyleSheet.absoluteFillObject}>
          <SpotLight style={S.spotLight} pose={`route${activeRouteIndex}`} />
        </View> */}
      {/* <ScalerOptions  pose={activeRouteIndex === 2 ? "active" : "inactive"}> */}

      {/* <View
          style={{
            position:'absolute',
            width:200,
            height: 100,
            // borderWidth:1,
            left: 100 ,
            bottom: 80,
            zIndex:99,
            transform:[{perspective: 1000}]
            // transform:[{ rotateX: '45deg' }, { rotateZ: '0.585398rad' }]
          }}
        >

          <View
          style={[styles.circleStyle]}
        />
          <View style={[styles.circleStyle, {bottom:0, right:0}]} />
          <View style={[styles.circleStyle, {bottom:0, left:0}]} />

        </View> */}
      {/* </ScalerOptions> */}

      {routes.map((route, routeIndex) => {
        const isRouteActive = routeIndex === activeRouteIndex;
        const tintColor = isRouteActive ? activeTintColor : inactiveTintColor;

        return (
          <TouchableOpacity
            key={routeIndex}
            style={S.tabButton}
            onPress={() => {
              onTabPress({route});
            }}
            onLongPress={() => {
              onTabLongPress({route});
            }}
            accessibilityLabel={getAccessibilityLabel({route})}>
            {route.routeName === 'NotificationStackNav' &&
              numberOfNotification > 0 && (
                <View
                  style={{
                    width: 20,
                    height: 20,
                    top: -10,
                    alignSelf: 'center',
                    end: 26,
                    position: 'absolute',
                    borderRadius: 10,
                    zIndex: 999,
                    backgroundColor: Colors.darkSlateBlue,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text style={{color: '#fff'}}>{numberOfNotification}</Text>
                </View>
              )}
            <Scaler
              style={S.scaler}
              pose={isRouteActive ? 'active' : 'inactive'}>
              {renderIcon({route, focused: isRouteActive, tintColor})}
            </Scaler>
            <Text
              style={{
                marginTop: 5,
                fontFamily: 'TheMixArabic',
                color: tintColor,
              }}>
              {getLabelText({route})}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const mapStateToProps = state => {
  // console.log('state', state.Marker)
  return {
    user: state.user.user && state.user.user.user && state.user.user.user,
  };
};

export default connect(
  mapStateToProps,
  null,
)(TabBarNav);

const styles = StyleSheet.create({
  tabsContainer: {
    //   width: Metrics.screenWidth - (Metrics.sizes.x15 * 2),
    height: ifIphoneX(85, 70),
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: 0,
    start: 0,
    end: 0,
    zIndex: 999,
    paddingBottom: ifIphoneX(15, 0),
    //   marginHorizontal: Metrics.sizes.x15,
    //   marginBottom: Metrics.sizes.x20,
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
    backgroundColor: Colors.white,
    ...Platform.select({
      ios: {
        shadowColor: 'rgba(0, 0, 0, 0.08)',
        shadowRadius: 6,
        shadowOpacity: 1,
        shadowOffset: {
          width: 0,
          height: 0,
        },
      },
      android: {
        elevation: 16,
        overflow: 'hidden',
      },
    }),
  },
  itemContainer: {
    width: 50,
    borderWidth: 1,
  },
  circleStyle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    position: 'absolute',
    alignSelf: 'center',
    backgroundColor: '#fff',
    shadowColor: '#ccc',
    shadowRadius: 6,
    shadowOpacity: 1,
    elevation: 2,
    shadowOffset: {
      width: 0,
      height: 0,
    },
  },
});

import React from 'react';
import {View, Image, Animated, NativeModules, Linking} from 'react-native';

import OneSignal from 'react-native-onesignal';
import {StackActions, NavigationActions} from 'react-navigation';

import {Metrics, Images} from '../Themes';
import {connect} from 'react-redux';
import UserAction from '../Redux/UserRedux';

class App extends React.Component {
  constructor(properties) {
    super(properties);
    OneSignal.init('1d4a0bb7-b3b7-4c7c-92de-bcc0dc7de1ea', {
      kOSSettingsKeyAutoPrompt: true,
    }); // set kOSSettingsKeyAutoPrompt to false prompting manually on iOS

    OneSignal.addEventListener('received', this.onReceived);
    OneSignal.addEventListener('opened', this.onOpened);
    OneSignal.addEventListener('ids', this.onIds);

    OneSignal.configure(); // triggers the ids event
    OneSignal.inFocusDisplaying(0);
    OneSignal.getPermissionSubscriptionState(s => this.props.getDeviceInfo(s));
  }

  componentWillUnmount() {
    OneSignal.removeEventListener('received', this.onReceived);
    OneSignal.removeEventListener('opened', this.onOpened);
    OneSignal.removeEventListener('ids', this.onIds);
    Linking.removeEventListener('url', this.handleOpenURL);
  }

  onReceived(notification) {
    console.log('Notification received: ', notification);
  }

  onOpened(openResult) {
    console.log('Message: ', openResult.notification.payload.body);
    console.log('Data: ', openResult.notification.payload.additionalData);
    console.log('isActive: ', openResult.notification.isAppInFocus);
    console.log('openResult: ', openResult);
  }

  onIds(device) {
    console.log('Device info: ', device);
  }

  async componentDidMount() {
    Linking.addEventListener('url', event => this.handleOpenURL(event));
    Linking.getInitialURL().then(url => url && this.handleOpenURL(url));

    // await firebase.initializeApp()

    // await analytics().logEvent('Welcome', {
    //   item: 'work',
    //   id: 252393119
    // })

    // await analytics().logSelectContent({
    //   content_type: 'lksdlk ',
    // })

    setTimeout(() => {
      if (this.state.fromURL) {
        return;
      }

      if (this.props.user) {
        return this.props.navigation.dispatch(
          StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({routeName: 'bottomTab'})],
          }),
        );
      }

      this.props.navigation.dispatch(
        StackActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({routeName: 'LoginPage'})],
        }),
      );
    }, 2000);

    this.startAnimation();
  }

  navigate = url => {
    // E
    const {navigate} = this.props.navigation;
    const route = url.replace(/.*?:\/\//g, '');
    const id = route.match(/\/([^\/]+)\/?$/);
    const routeName = route.split('/');
    console.log('hello15151519', id, routeName, route);
    if (routeName[1] === 'property') {
      this.setState({fromURL: true});
      navigate('RealEstateDetail', {
        realEstate: {_id: routeName[2]},
      });
    }
  };

  handleOpenURL = event => {
    this.navigate(event.url ? event.url : event);
  };

  state = {
    opacityAnimation: new Animated.Value(0),
  };

  startAnimation = () => {
    Animated.timing(this.state.opacityAnimation, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  render() {
    const opacity = this.state.opacityAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
    });

    return (
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        <Animated.View
          style={{
            width: 150,
            alignSelf: 'center',
            opacity,
            top: Metrics.screenHeight * 0.3,
          }}>
          {/* <HectarIcon fillOpacity={opacity} /> */}
          <Image
            source={Images.HectarBetIcon}
            resizeMode={'contain'}
            style={{
              alignSelf: 'center',
              width: Metrics.screenWidth * 0.4,
              height: Metrics.screenWidth * 0.4,
            }}
          />
          {/* <NewHectarIcon fillOpacity={opacity} /> */}
        </Animated.View>
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  getDeviceInfo: s => dispatch(UserAction.getDeviceInfo(s)),
  // firstTimeDone: () => dispatch(UserAction.firstTimeDone())
});

const mapStateToProps = state => {
  return {
    user: state.user.user,
    // firstTime: state.user.firstTime,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);

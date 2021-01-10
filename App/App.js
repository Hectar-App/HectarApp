import React, {Component} from 'react';

import {I18nManager, Linking} from 'react-native';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/lib/integration/react';
import {persistor, store} from './store';
import CodePush from 'react-native-code-push';
import {NavigationActions, StackActions} from 'react-navigation';
import Navigator from './Navigation/Navigtor';
import analytics from '@react-native-firebase/analytics';

console.disableYellowBox = true;
class App extends Component {
  constructor() {
    super();

    CodePush.sync({
      //
      // updateDialog: {
      //   title: 'يوجد تحديث جديد',
      //   optionalUpdateMessage: 'هنالك تحديث جديد نرجو تحميله للاطلاع على الجديد'
      // },
      installMode: CodePush.InstallMode.IMMEDIATE,
      checkFrequency: CodePush.CheckFrequency.ON_APP_START,
    });
  }

  componentDidMount() {
    // Ensure that any CodePush updates which are
    // synchronized in the background can't trigger
    // a restart while this component is mounted.
    I18nManager.allowRTL(false);
    I18nManager.forceRTL(false);
    CodePush.disallowRestart();
    // Linking.addEventListener('url', event => this.handleOpenURL(event));
    // Linking.getInitialURL().then(url => url && this.handleOpenURL(url));

    // if (Platform.OS === 'android') {
    //   // Linking.getInitialURL().then(url => {
    //   //   this.navigate(url);
    //   // });
    //   Linking.addEventListener('url', event => this.handleOpenURL(event));
    //   Linking.getInitialURL().then(url => url && this.handleOpenURL(url));
    // } else {
    //   // Linking.addEventListener('url', this.handleOpenURL);
    //   Linking.addEventListener('url', event => this.handleOpenURL(event));
    // }
  }

  navigate = url => {
    // E
    // const {navigate} = this.props.navigation;
    const route = url.replace(/.*?:\/\//g, '');
    const id = route.match(/\/([^\/]+)\/?$/);
    const routeName = route.split('/');
    console.log('hello15151519', id, routeName, route);
    // alert(1);
    if (routeName[1] === 'property') {
      // console.log('hello', id, routeName);
      // persistor.dispatch
      // store.dispatch(
      //   NavigationActions.navigate({
      //     routeName: 'FilterPage',
      //     // params: pathObject.path.test(url),
      //   }),
      // );
      // this.props.navigation.navigate('RealEstateDetail', {
      //   realEstate: {_id: id},
      // });
    }
  };

  handleOpenURL = event => {
    // console.log('hello19', event);
    this.navigate(event.url ? event.url : event);
  };

  componentWillUnmount() {
    CodePush.allowRestart();
    Linking.removeEventListener('url', this.handleOpenURL);
  }

  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={false} persistor={persistor}>
          <Navigator  theme={'light'}
            onNavigationStateChange={async (prevState, currentState, action) => {
                await analytics().logScreenView({
                  screen_name: action.routeName,
                })
            }}
          />
        </PersistGate>
      </Provider>
    );
  }
}

codePushOptions = {
  checkFrequency: CodePush.CheckFrequency.ON_APP_START,
  // checkFrequency: codePush.CheckFrequency.ON_APP_RESUME,
  // installMode: CodePush.InstallMode.ON_NEXT_RESUME
};

export default CodePush(codePushOptions)(App);
// export default App

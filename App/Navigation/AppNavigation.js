import React from 'react';
import { Image } from 'react-native';
import { createAppContainer } from 'react-navigation';

import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import {
  createMaterialBottomTabNavigator,
  NavigationMaterialBottomTabConfig,
} from 'react-navigation-material-bottom-tabs';
import StackViewStyleInterpolator from 'react-navigation-stack/src/views/StackView/StackViewStyleInterpolator';

import { CustomIcon, Colors } from '../Themes';

import Icon from 'react-native-vector-icons';
import { IconButton } from 'react-native-paper';

import TabBarNav from './TabBarNav';

//Auth
import WelcomeScreen from '../screens/WelcomeScreen';
import LoginPage from '../screens/Auth/LoginPage';
import RegisterMobileStep from '../screens/Auth/RegisterMobileStep';
import RegistrationConfirmationPhone from '../screens/Auth/RegistrationConfirmationPhone';
import RegistrationUserInfo from '../screens/Auth/RegistrationUserInfo';
import ForgetPassword from '../screens/Auth/ForgetPassword';
import ForgetPasswordResetPass from '../screens/Auth/ForgetPasswordResetPass';
import RolesAndCondation from '../screens/RolesAndCondation';
import FinishRegistration from '../screens/Auth/FinishRegistration';

//Home
import HomePage from '../screens/MainScreens/Home/HomePage';
import FilterPage from '../screens/MainScreens/Home/FilterPage';
import RealEstateDetail from '../screens/MainScreens/Home/realestateDetail.1';
import OwnerRealEstates from '../screens/MainScreens/Home/ownerRealEstate';

// Offices
import OfficesPage from '../screens/MainScreens/Offices/OfficesPage';
import OfficeDetails from '../screens/MainScreens/Offices/OfficeDetails';

// Favorate
import FavoratePage from '../screens/MainScreens/Profile/Favorate';

// AddAqar
import FirstStepAddAqar from '../screens/MainScreens/AddingAqar/firstStepAddAqar';
import SecondStepAddAqar from '../screens/MainScreens/AddingAqar/secondStepAddingAqar';
import ThirdStepAddAqar from '../screens/MainScreens/AddingAqar/thirdStepAddingAqar';
import EarthThirdStepAddAqar from '../screens/MainScreens/AddingAqar/earthThirdStepAddingAqar';
import ForthStepAddAqar from '../screens/MainScreens/AddingAqar/forthStepAddingAqar';
import FifthStepAddAqar from '../screens/MainScreens/AddingAqar/fifthStepAddingAqar';

//Notification
import NotificationPage from '../screens/MainScreens/Profile/Notification';

//Profile
import Profile from '../screens/MainScreens/Profile/ProfilePage';
import HelpCenter from '../screens/MainScreens/Profile/HelpCenter';
import EdietProfile from '../screens/MainScreens/Profile/EdietProfile';
import FAQs from '../screens/MainScreens/Profile/FAQs';
import AboutApp from '../screens/MainScreens/Profile/AboutHectar';
import MyRealEstate from '../screens/MainScreens/Profile/MyRealEstate';
import Request from '../screens/MainScreens/Profile/Requests';
import QRScan from '../screens/MainScreens/QRScan/QRScan';

const verticalTransitionsScreens = [];
const noAnimation = [
  'LoginPage',
  'RegisterMobileStep',
  'FilterPage',
  'SecondStepAddAqar',
  'ThirdStepAddAqar',
  'ForthStepAddAqar',
  'FifthStepAddAqar',
];
const fade = ['LoginPage', 'OwnerRealEstates'];

/** transition config */
const transConfig = () => {
  return {
    screenInterpolator: props => {
      const last = props.scenes[props.scenes.length - 1];
      const routeName = props.scene.route.routeName;
      const lastRouteName = last.route.routeName;
      if (verticalTransitionsScreens.includes(routeName)) {
        return StackViewStyleInterpolator.forVertical(props);
      } else if (
        noAnimation.includes(routeName) &&
        noAnimation.includes(lastRouteName)
      ) {
        return StackViewStyleInterpolator.forNoAnimation(props);
      } else if (fade.includes(routeName)) {
        return StackViewStyleInterpolator.forFade(props);
      }

      if (verticalTransitionsScreens.includes(lastRouteName)) {
        return StackViewStyleInterpolator.forVertical(props);
      } else if (noAnimation.includes(lastRouteName)) {
        return StackViewStyleInterpolator.forNoAnimation(props);
      }

      return StackViewStyleInterpolator.forHorizontal(props);
    },
  };
};

let x = {
  FirstStepAddAqar: { screen: FirstStepAddAqar },
  SecondStepAddAqar: { screen: SecondStepAddAqar },
  ThirdStepAddAqar: { screen: ThirdStepAddAqar },
  ForthStepAddAqar: { screen: ForthStepAddAqar },
  EarthThirdStepAddAqar: { screen: EarthThirdStepAddAqar },
  FifthStepAddAqar: { screen: FifthStepAddAqar },
};

const HomeStackNav = createStackNavigator(
  {
    HomePage: { screen: HomePage },
    FilterPage: { screen: FilterPage },
    RealEstateDetail: { screen: RealEstateDetail, path: 'property/:property' },
    OwnerRealEstates: { screen: OwnerRealEstates },
    ...x,
  },
  {
    headerMode: 'none',
    transitionConfig: transConfig,
  },
);

HomeStackNav.navigationOptions = ({ navigation }) => {
  let { routeName } = navigation.state.routes[navigation.state.index];
  let navigationOptions = {};
  if (
    routeName === 'FilterPage' ||
    routeName === 'RealEstateDetail' ||
    routeName === 'OwnerRealEstates'
  ) {
    navigationOptions.tabBarVisible = false;
  }
  return navigationOptions;
};

const OfficesStackNav = createStackNavigator(
  {
    OfficesPage: { screen: OfficesPage },
    officeDetails: { screen: OfficeDetails },
    ...x,
  },
  {
    headerMode: 'none',
    transitionConfig: transConfig,
  },
);

HomeStackNav.navigationOptions = ({ navigation }) => {
  let { routeName } = navigation.state.routes[navigation.state.index];
  let navigationOptions = {};
  if (
    routeName === 'FilterPage' ||
    routeName === 'RealEstateDetail' ||
    routeName === 'OwnerRealEstates'
  ) {
    navigationOptions.tabBarVisible = false;
  }
  return navigationOptions;
};

const AddAqarStackNav = createStackNavigator(
  {
    // FirstStepAddAqar: { screen: FirstStepAddAqar },
    // SecondStepAddAqar: { screen: SecondStepAddAqar },
    // ThirdStepAddAqar: { screen: ThirdStepAddAqar },
    // ForthStepAddAqar: { screen: ForthStepAddAqar },
    // EarthThirdStepAddAqar: { screen: EarthThirdStepAddAqar },
    // FifthStepAddAqar: { screen: FifthStepAddAqar },
    ...x,
    RealEstateDetail: { screen: RealEstateDetail, path: 'property/:property' },
  },
  {
    headerMode: 'none',
    transitionConfig: transConfig,
    // initialRouteName: 'FifthStepAddAqar'
  },
);

AddAqarStackNav.navigationOptions = ({ navigation }) => {
  let { routeName } = navigation.state.routes[navigation.state.index];
  let navigationOptions = {};
  if (routeName === 'RealEstateDetail') {
    navigationOptions.tabBarVisible = false;
  }
  return navigationOptions;
};

const NotificationStackNav = createStackNavigator(
  {
    NotificationPage: { screen: NotificationPage },
    RealEstateDetail: { screen: RealEstateDetail, path: 'property/:property' },
    ...x,
  },
  {
    headerMode: 'none',
  },
);

NotificationStackNav.navigationOptions = ({ navigation }) => {
  let { routeName } = navigation.state.routes[navigation.state.index];
  let navigationOptions = {};
  if (routeName === 'RealEstateDetail') {
    navigationOptions.tabBarVisible = false;
  }
  return navigationOptions;
};

const ProfileStackNav = createStackNavigator(
  {
    Profile: { screen: Profile },
    HelpCenter: { screen: HelpCenter },
    EdietProfile: { screen: EdietProfile },
    FAQs: { screen: FAQs },
    AboutApp: { screen: AboutApp },
    MyRealEstate: { screen: MyRealEstate },
    RealEstateDetail: { screen: RealEstateDetail, path: 'property/:property' },
    OwnerRealEstates: { screen: OwnerRealEstates },
    Request: { screen: Request },
    FavoratePage: { screen: FavoratePage },
    ...x,
  },
  {
    headerMode: 'none',
    // initialRouteName: 'EdietProfile'
  },
);

ProfileStackNav.navigationOptions = ({ navigation }) => {
  let { routeName } = navigation.state.routes[navigation.state.index];
  let navigationOptions = {};
  if (
    routeName === 'HelpCenter' ||
    routeName === 'OwnerRealEstates' ||
    routeName === 'RealEstateDetail' ||
    routeName === 'EdietProfile' ||
    routeName === 'FAQs' ||
    routeName === 'AboutApp'
  ) {
    navigationOptions.tabBarVisible = false;
  }
  return navigationOptions;
};

const bottomTab = createBottomTabNavigator(
  {
    ProfileStackNav: {
      screen: ProfileStackNav,
      navigationOptions: {
        tabBarLabel: 'الإعدادات',
        activeTintColor: '#3DBA7E',
        inactiveTintColor: '#CCCCD0',
        tabBarIcon: ({ focused }) => (
          <Image
            source={
              focused
                ? require('../assets/imgs/more.png')
                : require('../assets/imgs/more1.png')
            }
          />
        ),
      },
    },
    QRScan: {
      screen: QRScan,
      navigationOptions: {
        tabBarLabel: 'مسح',
        activeTintColor: '#3DBA7E',
        inactiveTintColor: '#CCCCD0',
        tabBarIcon: ({ focused }) => (
          <Image
            source={
              focused
                ? require('../assets/imgs/qrScan.png')
                : require('../assets/imgs/qr-menu.png')
            }
          />
        ),
      },
    },
    AddAqarStackNav: {
      screen: AddAqarStackNav,
      navigationOptions: {
        tabBarLabel: 'إضافة عقار',
        activeTintColor: '#3DBA7E',
        inactiveTintColor: '#CCCCD0',
        tabBarIcon: ({ focused }) => (
          <Image
            source={
              focused
                ? require('../assets/imgs/addProperty.png')
                : require('../assets/imgs/addProperty1.png')
            }
          />
        ),
      },
    },
    OfficesStackNav: {
      screen: OfficesStackNav,
      navigationOptions: {
        tabBarLabel: 'المكاتب',
        activeTintColor: '#3DBA7E',
        inactiveTintColor: '#CCCCD0',
        tabBarIcon: ({ focused }) => (
          <Image
            source={
              focused
                ? require('../assets/imgs/office-building-active.png')
                : require('../assets/imgs/office-building.png')
            }
          />
        ),
      },
    },
    HomeStackNav: {
      screen: HomeStackNav,
      navigationOptions: {
        tabBarLabel: 'العقارات',
        activeTintColor: '#3DBA7E',
        inactiveTintColor: '#CCCCD0',
        tabBarIcon: ({ focused }) => (
          <Image
            source={
              focused
                ? require('../assets/imgs/home.png')
                : require('../assets/imgs/home1.png')
            }
          />
        ),
      },
    },
    // BarCodeStackNav: {
    //   screen: BarCodeStackNav,
    //   navigationOptions: {
    //     tabBarIcon: ({ focused }) => (
    //       <Image
    //         source={
    //           focused
    //             ? require('../assets/imgs/notification.png')
    //             : require('../assets/imgs/notification1.png')
    //         }
    //       />
    //     ),
    //   },
    // },
  },
  {
    tabBarComponent: props => <TabBarNav {...props} />,
    tabBarOptions: {
      activeTintColor: 'rgb(61,186,126)',
      inactiveTintColor: 'rgb(204,204,208)',
    },
    initialRouteName: 'HomeStackNav',
  },
);

const AuthScreensWithFade = createStackNavigator(
  {
    Welcome: { screen: WelcomeScreen },
    LoginPage: { screen: LoginPage },
    RegisterMobileStep: { screen: RegisterMobileStep },
    RegistrationConfirmationPhone: { screen: RegistrationConfirmationPhone },
    RegistrationUserInfo: { screen: RegistrationUserInfo },
    ForgetPassword: { screen: ForgetPassword },
    ForgetPasswordResetPass: { screen: ForgetPasswordResetPass },
    RolesAndCondation: { screen: RolesAndCondation },
    FinishRegistration: { screen: FinishRegistration },
    bottomTab,
  },
  {
    // initialRouteName:'bottomTab',
    headerMode: 'none',
    transitionConfig: transConfig,
  },
);

// const Navigator = createStackNavigator({
//   AuthScreensWithFade,
//   bottomTab
// },{
//   initialRouteName: 'AuthScreensWithFade',
//   headerMode: 'none'
// })

const Navigator = createAppContainer(AuthScreensWithFade);

// const Navigator = createAppContainer(AuthScreensWithFade)

export default Navigator;

import React from 'react';
import {
  View,
  Animated,
  DevSettings,
  Text,
  Alert,
  Image,
  Keyboard as KeyboardReact,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {StackActions, NavigationActions} from 'react-navigation';
import RNRestart from 'react-native-restart';

import HectarIcon from '../../assets/imgs/svgImagesComponents/HectarIcon';
import NewHEctarIcon from '../../assets/imgs/svgImagesComponents/newHectarIcon';
import Input from '../../Component/Input';
import LinkButton from '../../Component/linkButton';

import Button from '../../Component/Button';

import AlertModal from '../../Component/Alert';
import ErroAlert from '../../Component/ErrorAlert';

import Keyboard from '../../Component/KeyboardComponent';

import {Metrics, ApplicationStyles, Colors, Fonts} from '../../Themes';

import {connect} from 'react-redux';
import UserAction from '../../Redux/UserRedux';
import FavoriteAction from '../../Redux/FavourteRedux';

import {ifIphoneX} from 'react-native-iphone-x-helper';
import {Images} from '../../Themes';

class LoginPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showPass: true,
      logoAnimation: new Animated.Value(0),
      footerAnimation: new Animated.Value(0),
      loading: false,
      showErrorMessage: false,
      showAlert: false,
      phone: '',
      alertMessage: 'للاستخدام الافضل الرجاء اعادة تشغيل التطبيق',
    };
    this.keyboardDidShowListener = KeyboardReact.addListener(
      'keyboardDidShow',
      () => this.setState({KeyboardStatus: true}),
    );
    this.keyboardDidHideListener = KeyboardReact.addListener(
      'keyboardDidHide',
      () => this.setState({KeyboardStatus: false}),
    );
  }

  componentDidMount = () => {
    this.startLogoAnimation();
  };

  componentWillUnmount() {
    this.keyboardDidHideListener.remove();
    this.keyboardDidShowListener.remove();
  }

  componentWillReceiveProps = nextProps => {
    console.log('NextProps', nextProps);
    if (this.props.user !== nextProps.user && nextProps.user.user.token) {
      console.log('Hello User', nextProps.user, nextProps.user.user.token);
      this.props.getUserFav(nextProps.user.user.token);
      this.props.navigation.dispatch(
        StackActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({routeName: 'bottomTab'})],
        }),
      );
    }
    if (this.props.userError !== nextProps.userError) {
      if (nextProps.userError.error)
        this.setState({
          showErrorMessage: true,
          errorMessage: nextProps.userError.error.toString(),
        });
      // alert(nextProps.userError.error)

      this.setState({loading: false});
    }
  };

  startLogoAnimation = () => {
    Animated.timing(this.state.logoAnimation, {
      toValue: 1,
      duration: 550,
    }).start(() => {
      this.setState({inputAnimation: true});
      Animated.timing(this.state.footerAnimation, {
        toValue: 1,
        duration: 550,
      }).start(() => {
        // if(this.props.firstTime){
        //     this.setState({firstTime: true})
        // }
      });
    });
  };

  restartApp = () => {
    // this.props.firstTimeDone()
    // setTimeout(() => {
    // //   NativeModules.DevSettings.reload();
    //     DevSettings.reload()
    // }, 900);
  };

  nav = (route, params) => {
    console.log('param', params);
    this.props.navigation.navigate(route, params);
  };

  convertNumbers2English(string) {
    return string
      .replace(/[٠١٢٣٤٥٦٧٨٩]/g, function(c) {
        return c.charCodeAt(0) - 1632;
      })
      .replace(/[۰۱۲۳۴۵۶۷۸۹]/g, function(c) {
        return c.charCodeAt(0) - 1776;
      });
  }

  handleLogIn = () => {
    if (
      this.state.phone &&
      this.state.phone.replace(/\s/g, '').length >= 9 &&
      this.state.password
    ) {
      this.props.logIn(
        this.convertNumbers2English(this.state.phone),
        this.state.password,
        this.props.deviceInfo && this.props.deviceInfo.userId
          ? this.props.deviceInfo.userId
          : null,
      );
      this.setState({loading: true});
    } else {
      this.setState({
        showErrorMessage: true,
        errorMessage: 'الرجاء ادخال رقم الجوال وكلمة المرور لتسجيل الدخول',
      });
    }
    // alert(1)
    // this.props.navigation.dispatch(StackActions.reset({
    //     index: 0,
    //     actions: [NavigationActions.navigate({ routeName: 'bottomTab' })],
    // }))
  };

  render() {
    const logoTop = this.state.logoAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [Metrics.screenHeight * 0.3, 100],
    });

    const footerBottom = this.state.footerAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [-80, ifIphoneX(50, 30)],
    });

    console.log('this', this.state.KeyboardStatus);
    // <TouchableWithoutFeedback onPress={()=> Keyboard.dismiss()} >
    return (
      <Keyboard>
        <ScrollView showsVerticalScrollIndicator={false} style={{flex: 1}}>
          <View
            style={{
              flex: 1,
              backgroundColor: '#fff',
              height: Metrics.screenHeight,
              marginBottom: 40,
            }}>
            {!this.state.KeyboardStatus && (
              <Animated.View
                style={{
                  width: 150,
                  alignSelf: 'center',
                  top: logoTop,
                  opacity: 1,
                  height: 150,
                }}>
                {/* <HectarIcon  fillOpacity={1}/> */}
                <Image
                  source={Images.HectarBetIcon}
                  resizeMode={'contain'}
                  style={{
                    alignSelf: 'center',
                    width: Metrics.screenWidth * 0.4,
                    height: Metrics.screenWidth * 0.4,
                  }}
                />
                {/* <NewHEctarIcon /> */}
              </Animated.View>
            )}

            {/* <View
                        style={{
                            position: 'absolute',
                            top: ifIphoneX(70, 30),
                            right: 30, 
                            zIndex: 99999999
                        }}
                    >
                        <TouchableOpacity
                            onPress={()=> {
                                this.props.navigation.dispatch(StackActions.reset({
                                    index: 0,
                                    actions: [NavigationActions.navigate({ routeName: 'bottomTab' })],
                                }))
                            }}
                        >
                            <Text style={[Fonts.style.normal, {color: Colors.black, fontSize:14, alignSelf:'center', }]}> تخطي </Text>
                        </TouchableOpacity>

                    </View> */}

            {this.state.inputAnimation && (
              <View
                style={{
                  marginTop: !this.state.KeyboardStatus
                    ? 190
                    : ifIphoneX(190, 90),
                }}>
                <Input
                  onSubmitEditing={() => this.setState({passFocus: true})}
                  number={true}
                  onChangeText={val => this.setState({phone: val})}
                  value={this.state.phone}
                  width={150}
                  doAnimation={this.state.inputAnimation}
                  InputPlaceHolder={'البريد الالكتروني , رقم الجوال'}
                />

                <Input
                  autoFocus={true}
                  onChangeText={val => this.setState({password: val})}
                  value={this.state.password}
                  width={150}
                  doAnimation={true}
                  InputPlaceHolder={'كلمة المرور'}
                  containerStyle={{marginTop: 15}}
                  passView={true}
                  passShow={this.state.showPass}
                  onShowPassPress={() =>
                    this.setState(s => ({showPass: !s.showPass}))
                  }
                />
              </View>
            )}

            {this.state.inputAnimation && (
              <View>
                <View
                  style={{
                    flexDirection: 'row',
                    paddingStart: 35,
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                  <TouchableOpacity
                    onPress={() => {
                      this.props.navigation.dispatch(
                        StackActions.reset({
                          index: 0,
                          actions: [
                            NavigationActions.navigate({
                              routeName: 'bottomTab',
                            }),
                          ],
                        }),
                      );
                    }}
                    style={{zIndex: 990}}>
                    <Text
                      style={[
                        Fonts.style.normal,
                        {
                          color: Colors.darkSeafoamGreen,
                          fontSize: 18,
                          alignSelf: 'center',
                        },
                      ]}>
                      {' '}
                      تخطي >{' '}
                    </Text>
                  </TouchableOpacity>
                  <LinkButton
                    containerStyle={{alignSelf: 'flex-end', paddingEnd: 35}}
                    buttonText={'نسيت كلمة المرور ؟'}
                    onPress={() => this.nav('ForgetPassword')}
                  />
                </View>
                <Button
                  disabled={this.state.loading}
                  containerStyle={{marginTop: 30}}
                  doAnimation={true}
                  buttonText={'تسجيل دخول '}
                  doAnimation2={this.state.loading}
                  loading={this.state.loading}
                  onPress={() => this.handleLogIn()}
                />
              </View>
            )}

            <AlertModal
              contentMessage={this.state.alertMessage}
              isVisible={this.state.showAlert}
            />

            {this.state.showErrorMessage && (
              <ErroAlert
                errorMessage={this.state.errorMessage}
                setAnimation={() => this.setState({showErrorMessage: false})}
                doAnimation={this.state.showErrorMessage}
              />
            )}

            {!this.state.KeyboardStatus && (
              <Animated.View
                style={{
                  position: 'absolute',
                  width: Metrics.screenWidth,
                  bottom: footerBottom,
                  height: 60,
                  flexDirection: 'row',
                  justifyContent: 'center',
                }}>
                <LinkButton
                  containerStyle={{
                    alignSelf: 'flex-end',
                    paddingEnd: 0,
                    alignSelf: 'center',
                  }}
                  buttonText={' إنشاء حساب جديد '}
                  textStyle={{color: Colors.darkSeafoamGreen, fontSize: 13}}
                  onPress={() => this.nav('RegisterMobileStep')}
                />
                <Text
                  style={[
                    Fonts.style.normal,
                    {color: Colors.black, fontSize: 13, alignSelf: 'center'},
                  ]}>
                  {' '}
                  ليس لديك حساب ؟{' '}
                </Text>
              </Animated.View>
            )}
          </View>
        </ScrollView>
      </Keyboard>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  logIn: (phone, password, uuid) =>
    dispatch(UserAction.loginRequest(phone, password, uuid)),
  getUserFav: token => dispatch(FavoriteAction.getUserFav(token)),
  firstTimeDone: () => dispatch(UserAction.firstTimeDone()),
});

const mapStateToProps = state => {
  console.log('State', state);
  return {
    user: state.user.user,
    deviceInfo: state.user.deviceInfo,
    userError: state.user.userLoginError,
    firstTime: state.user.firstTime,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoginPage);

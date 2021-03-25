import React from 'react';
import { Animated, Image, Text, View, StyleSheet } from 'react-native';
import { NavigationActions, StackActions } from 'react-navigation';
import Input from '../../Component/Input';
import LinkButton from '../../Component/linkButton';

import Button from '../../Component/Button';

import AlertModal from '../../Component/Alert';
import ErrorAlert from '../../Component/ErrorAlert';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { Colors, Fonts, Images, Metrics } from '../../Themes';

import { connect } from 'react-redux';
import UserAction from '../../Redux/UserRedux';
import FavoriteAction from '../../Redux/FavourteRedux';

import SkipButton from '../../Component/login/SkipButton';
import { isIos, perfectFont, perfectHeight } from '../../utils/commonFunctions';

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
      inputFocused: {
        email: false,
        password: false,
      },
    };
  }

  componentDidMount = () => {
    this.startLogoAnimation();
  };

  componentWillReceiveProps = nextProps => {
    if (this.props.user !== nextProps.user && nextProps.user.user.token) {
      this.props.getUserFav(nextProps.user.user.token);
      this.props.navigation.dispatch(
        StackActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({ routeName: 'bottomTab' })],
        }),
      );
    }
    if (this.props.userError !== nextProps.userError) {
      if (nextProps.userError?.error) {
        this.setState({
          showErrorMessage: true,
          errorMessage:
            nextProps.userError?.error?.toString() || 'Something went wrong',
        });
      }

      this.setState({ loading: false });
    }
  };

  startLogoAnimation = () => {
    Animated.timing(this.state.logoAnimation, {
      toValue: 1,
      duration: 550,
    }).start(() => {
      this.setState({ inputAnimation: true });
      Animated.timing(this.state.footerAnimation, {
        toValue: 1,
        duration: 550,
      }).start(() => {});
    });
  };

  nav = (route, params) => {
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
        this.convertNumbers2English(`966${this.state.phone}`),
        this.state.password,
        this.props.deviceInfo && this.props.deviceInfo.userId
          ? this.props.deviceInfo.userId
          : null,
      );
      this.setState({ loading: true });
    } else {
      this.setState({
        showErrorMessage: true,
        errorMessage: 'الرجاء ادخال رقم الجوال وكلمة المرور لتسجيل الدخول',
      });
    }
  };

  render() {
    const shouldShowImage = !(
      this.state.inputFocused.email | this.state.inputFocused.password
    );

    const logoTop = this.state.logoAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [Metrics.screenHeight * 0.3, 50],
    });
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#fff',
          height: Metrics.screenHeight,
        }}>
        <View style={styles.skipBtnContainer}>
          <SkipButton navigation={this.props.navigation} />
        </View>
        {shouldShowImage && (
          <Animated.View
            style={{
              alignSelf: 'center',
              top: logoTop,
              opacity: 1,
            }}>
            <Image
              source={Images.HectarBetIcon}
              resizeMode={'contain'}
              style={{
                alignSelf: 'center',
                width: Metrics.screenWidth * 0.4,
                height: Metrics.screenWidth * 0.4,
              }}
            />
          </Animated.View>
        )}
        {this.state.inputAnimation && (
          <View
            style={{
              marginTop: perfectHeight(90),
            }}>
            <View style={styles.headerContainer}>
              <Text style={styles.header}>تسجيل الدخول</Text>
            </View>
            <Input
              onSubmitEditing={() => this.setState({ passFocus: true })}
              number={true}
              onChangeText={val => this.setState({ phone: val })}
              value={this.state.phone}
              width={150}
              doAnimation={this.state.inputAnimation}
              InputPlaceHolder={'رقم الجوال'}
              onFocus={() =>
                this.setState({
                  inputFocused: {
                    ...this.state.inputFocused,
                    email: true,
                  },
                })
              }
              onBlur={() =>
                this.setState({
                  inputFocused: {
                    ...this.state.inputFocused,
                    email: false,
                  },
                })
              }
            />

            <Input
              autoFocus={true}
              onChangeText={val => this.setState({ password: val })}
              value={this.state.password}
              width={150}
              doAnimation={true}
              InputPlaceHolder={'كلمة المرور'}
              containerStyle={{ marginTop: 15 }}
              passView={true}
              passShow={this.state.showPass}
              onShowPassPress={() =>
                this.setState(s => ({ showPass: !s.showPass }))
              }
              onFocus={() =>
                this.setState({
                  inputFocused: {
                    ...this.state.inputFocused,
                    password: true,
                  },
                })
              }
              onBlur={() =>
                this.setState({
                  inputFocused: {
                    ...this.state.inputFocused,
                    password: false,
                  },
                })
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
              <LinkButton
                containerStyle={{ alignSelf: 'flex-end', paddingEnd: 35 }}
                textStyle={styles.linkBtn}
                buttonText={'نسيت كلمة المرور ؟'}
                onPress={() => this.nav('ForgetPassword')}
              />
            </View>
            <Button
              disabled={this.state.loading}
              containerStyle={{ marginTop: perfectHeight(15) }}
              doAnimation={true}
              buttonText={'تسجيل دخول '}
              doAnimation2={this.state.loading}
              loading={this.state.loading}
              onPress={() => this.handleLogIn()}
            />
            <View style={styles.noAccount}>
              <LinkButton
                containerStyle={{
                  paddingEnd: 0,
                  alignSelf: 'center',
                }}
                buttonText={' إنشاء حساب جديد '}
                textStyle={{ color: Colors.darkSeafoamGreen, fontSize: 13 }}
                onPress={() => this.nav('RegisterMobileStep')}
              />
              <Text
                style={[
                  Fonts.style.normal,
                  {
                    color: Colors.black,
                    fontSize: 13,
                    alignSelf: 'center',
                  },
                ]}>
                ليس لديك حساب ؟
              </Text>
            </View>
          </View>
        )}

        <AlertModal
          contentMessage={this.state.alertMessage}
          isVisible={this.state.showAlert}
        />

        {this.state.showErrorMessage && (
          <ErrorAlert
            errorMessage={this.state.errorMessage}
            setAnimation={() => this.setState({ showErrorMessage: false })}
            doAnimation={this.state.showErrorMessage}
          />
        )}
      </View>
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

const styles = StyleSheet.create({
  skipBtnContainer: {
    width: '90%',
    alignSelf: 'center',
    marginTop: perfectHeight(15),
  },
  linkBtn: {
    fontFamily: isIos() ? 'TheMixArabic-Bold' : 'TheMixArab',
    fontSize: perfectFont(14),
    color: Colors.darkSeafoamGreen,
    textDecorationLine: 'underline',
  },
  noAccount: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: perfectHeight(24),
  },
  headerContainer: {
    width: '83%',
    alignSelf: 'center',
    marginBottom: perfectHeight(18),
  },
  header: {
    fontFamily: isIos() ? 'TheMixArabic-Bold' : 'TheMixArab',
    fontSize: perfectFont(18),
    fontWeight: '700',
  },
});

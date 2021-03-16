import React, { useEffect } from 'react';
import {
  View,
  Animated,
  Text,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';

import TitleDesc from '../../Component/TitleDesc';
import LinkButton from '../../Component/linkButton';
import Button from '../../Component/Button';
import ContirmView from '../../Component/ConfirmtionDigits2';
import Timer from '../../Component/Timer';
import Header from '../../Component/Header';

import { Metrics, Colors, Fonts } from '../../Themes';

import AlertModal from '../../Component/Alert';
import ErroAlert from '../../Component/ErrorAlert';

import { connect } from 'react-redux';
import UserAction from '../../Redux/UserRedux';
import { onError } from '../../utils/commonFunctions';

class RegistrationConfirmationPhone extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      fromForget: this.props.navigation.getParam('fromForget'),
      phoneNumber: this.props.navigation.getParam('phoneNumber'),
      code: this.props.navigation.getParam('code'),
      codeInput: '',
      timer: true,
      time: 2,
      showErrorMessage: false,
    };
  }

  convertNumbers2English(value) {
    console.log({ value });
    if (value) {
      return value
        .replace(/[٠١٢٣٤٥٦٧٨٩]/g, function(c) {
          return c.charCodeAt(0) - 1632;
        })
        .replace(/[۰۱۲۳۴۵۶۷۸۹]/g, function(c) {
          return c.charCodeAt(0) - 1776;
        });
    }
    return onError('برجاء ادخال الكود مرة أخري');
  }

  handleVerifyCode = code => {
    this.setState({ loading: true });
    if (this.state.fromForget) {
      this.props.forgetPasswordVerfyNumber(
        this.convertNumbers2English(this.state.phoneNumber),
        this.convertNumbers2English(code),
      );
    } else {
      this.props.verifyPhone(
        this.convertNumbers2English(this.state.phoneNumber),
        this.convertNumbers2English(code),
      );
    }
  };

  componentWillReceiveProps(nextProps) {
    console.log('this.props.nav', nextProps);
    if (this.props.verifyNumberSuccess !== nextProps.verifyNumberSuccess) {
      this.setState({ loading: false });
      if (nextProps.verifyNumberSuccess.message) {
        this.setState({
          showErrorMessage: true,
          errorMessage: nextProps.verifyNumberSuccess?.message,
        });
      } else {
        this.props.navigation.navigate('RegistrationUserInfo', {
          phone: this.state.phoneNumber,
          code: this.state.code,
        });
        this.setState({
          code: '',
          codeInput: '',
        });
        // alert('success')
      }
    }

    if (
      this.props.forgetPasswordVerfyNumberError !==
      nextProps.forgetPasswordVerfyNumberError
    ) {
      if (nextProps.forgetPasswordVerfyNumberError.e) {
        this.setState({
          showErrorMessage: true,
          errorMessage: nextProps.forgetPasswordVerfyNumberError?.e?.message,
        });
        // alert( nextProps.forgetPasswordVerfyNumberError.e.message )
      }
    }

    if (
      this.props.forgetPasswordVerfyNumberSucess !==
      nextProps.forgetPasswordVerfyNumberSucess
    ) {
      this.props.navigation.navigate('ForgetPasswordResetPass', {
        phone: this.state.phoneNumber,
        code: this.state.code,
      });
    }

    if (nextProps.checkNuberSucess !== this.props.checkNuberSucess) {
      this.setState({
        reSendLoading: false,
        timer: true,
        time: 2,
        code: nextProps.checkNuberSucess.confirmationCode,
      });
      // this.props.navigation.navigate('RegistrationConfirmationPhone', {phoneNumber: this.state.phoneNumber, code: nextProps.checkNuberSucess.confirmationCode} )
    }

    if (nextProps.checkNuberError !== this.props.checkNuberError) {
      this.setState({ reSendLoading: false });
      console.log('Hello Error', nextProps.checkNuberError);
      if (nextProps.checkNuberError && nextProps.checkNuberError.message) {
        this.setState({
          showErrorMessage: true,
          errorMessage: nextProps.checkNuberError.message,
        });
      }
    }
  }

  parseArabic(str) {
    return Number(
      str
        .replace(/[٠١٢٣٤٥٦٧٨٩]/g, function(d) {
          return d.charCodeAt(0) - 1632; // Convert Arabic numbers
        })
        .replace(/[۰۱۲۳۴۵۶۷۸۹]/g, function(d) {
          return d.charCodeAt(0) - 1776; // Convert Persian numbers
        }),
    );
  }

  handleNextStep = () => {
    console.log('HHH', this.state.phoneNumber);
    this.setState({ reSendLoading: true });
    this.props.checkNumber(this.parseArabic(this.state.phoneNumber));
    // props.navigation.navigate('RegistrationConfirmationPhone')
  };

  render() {
    return (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
          {/* <BackButton doAnimation={true} containerStyle={{marginTop: 50}} onPress={()=> this.props.navigation.goBack()} /> */}
          <Header
            withoutUnderLine={true}
            headerTitle={'التحقق من رقم الجوال'}
            onBackPress={() => this.props.navigation.goBack()}
          />

          <TitleDesc
            title={''}
            containerStyle={{ marginTop: 50 }}
            desc={`فضلا,  قم بإدخال رمز التحقق المكون من 4 ارقام  المرسل  الي جوالك ${
              this.state.phoneNumber
            } الكود ${this.state.code} `}
          />

          <View
            style={{
              marginTop: 70,
            }}>
            {/* <ConfirmatioDigits width={150}  InputPlaceHolder={''} registerPhone={true} number={true} /> */}
            <ContirmView
              getCode={code => {
                this.setState({ codeInput: code });
                console.log('@code', this.state.codeInput, code);
                // setCode( state => state = code)
                this.handleVerifyCode(code);
              }}
            />
          </View>

          <AlertModal
            contentMessage={this.state.alertMessage}
            closeErrorModel={() => this.setState({ showAlert: false })}
            isVisible={this.state.showAlert}
          />

          {this.state.showErrorMessage && (
            <ErroAlert
              errorMessage={this.state.errorMessage}
              setAnimation={() => this.setState({ showErrorMessage: false })}
              doAnimation={this.state.showErrorMessage}
            />
          )}

          {!this.state.timer && (
            <Animated.View
              style={{
                width: Metrics.screenWidth,
                height: 60,
                flexDirection: 'row',
                justifyContent: 'center',
                marginTop: 40,
              }}>
              <LinkButton
                loading={this.state.reSendLoading}
                containerStyle={{
                  paddingEnd: 0,
                  alignSelf: 'center',
                }}
                buttonText={'  أرسل مرة اخرى  '}
                textStyle={{ color: Colors.darkSeafoamGreen, fontSize: 13 }}
                onPress={this.handleNextStep}
              />
              <Text
                style={[
                  Fonts.style.normal,
                  { color: Colors.black, fontSize: 13, alignSelf: 'center' },
                ]}>
                {' '}
                لم تتقلى رمز التحقق ؟{' '}
              </Text>
            </Animated.View>
          )}

          {/* <Text style={[Fonts.style.normal, {color: Colors.black, fontSize:13, alignSelf:'center' }]}>1:99</Text> */}
          {this.state.timer && (
            <Timer
              style={[
                Fonts.style.normal,
                {
                  color: Colors.black,
                  fontSize: 13,
                  alignSelf: 'center',
                  marginTop: 40,
                },
              ]}
              done={() => this.setState({ timer: false })}
              type={'minute'}
              number={this.state.time}
            />
          )}

          <Button
            doAnimation={true}
            loading={this.state.loading}
            containerStyle={{ marginTop: 80 }}
            buttonText={'تحقق الأن'}
            onPress={() => this.handleVerifyCode()}
          />
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  verifyPhone: (phone, code) => dispatch(UserAction.verfyNumber(phone, code)),
  forgetPasswordVerfyNumber: (phone, code) =>
    dispatch(UserAction.forgetPasswordVerfyNumber(phone, code)),
  checkNumber: phone => dispatch(UserAction.checkNumber(phone)),
});

const mapStateToProps = state => {
  console.log('state', state);
  return {
    verifyNumberError: state.user.verfyNumberError,
    verifyNumberSuccess: state.user.verfyNumberSucess,
    forgetPasswordVerfyNumberError: state.user.forgetPasswordVerfyNumberError,
    forgetPasswordVerfyNumberSucess: state.user.forgetPasswordVerfyNumberSucess,
    checkNuberError: state.user.checkNuberError,
    checkNuberSucess: state.user.checkNuberSucess,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RegistrationConfirmationPhone);

import React from 'react';
import { View, Keyboard, TouchableWithoutFeedback } from 'react-native';

import Input from '../../Component/Input';
import TitleDesc from '../../Component/TitleDesc';
import Button from '../../Component/Button';
import Header from '../../Component/Header';
import AlertModal from '../../Component/Alert';
import ErroAlert from '../../Component/ErrorAlert';

import { connect } from 'react-redux';
import UserAction from '../../Redux/UserRedux';

class ForgetPassword extends React.Component {
  state = {
    phoneNumber: '',
    loading: false,
    showErrorMessage: false,
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

  handleSendCode() {
    if (this.state.phoneNumber) {
      this.setState({ loading: true });
      this.props.forgetPassword(
        this.convertNumbers2English(`966${this.state.phoneNumber}`),
      );
      return;
    }
    this.setState({
      showErrorMessage: true,
      errorMessage: 'يجب اضافة رقم الجوال اولا',
    });

    // props.navigation.navigate('RegistrationConfirmationPhone',{fromForget: true})
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.forgetPasswordSuccess !== this.props.forgetPasswordSuccess) {
      console.log('Hello Sucess', nextProps.forgetPasswordSuccess);
      this.setState({ loading: false });
      this.props.navigation.navigate('RegistrationConfirmationPhone', {
        fromForget: true,
        code: nextProps.forgetPasswordSuccess.confirmationCode,
        phoneNumber: this.state.phoneNumber,
      });
    }

    if (nextProps.forgetPasswordError !== this.props.forgetPasswordError) {
      console.log('Hello Error', nextProps.forgetPasswordError);
      this.setState({ loading: false });
      if (nextProps.forgetPasswordError.errorMessage) {
        alert(nextProps.forgetPasswordError.errorMessage);
      }
    }
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
          <Header
            doAnimation={true}
            withoutUnderLine={true}
            containerStyle={{ marginTop: 0 }}
            onBackPress={() => this.props.navigation.goBack()}
            headerTitle={'نسيت كلمة المرور'}
          />

          <TitleDesc
            title={'نسيت كلمة المرور'}
            containerStyle={{ marginTop: 50 }}
            desc={
              'أدخل رقم هاتفك أدناه لتلقي حسابك تعليمات إعادة تعيين كلمة المرور'
            }
          />

          <View
            style={{
              marginTop: 40,
            }}>
            <Input
              width={150}
              onChangeText={val => this.setState({ phoneNumber: val })}
              value={this.state.phoneNumber}
              InputPlaceHolder={'رقم الجوال'}
              containerStyle={{ marginTop: 12 }}
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

          <Button
            loading={this.state.loading}
            containerStyle={{ bottom: 120, position: 'absolute' }}
            buttonText={'إرسال كلمة المرور'}
            onPress={() => this.handleSendCode()}
          />
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  forgetPassword: phoneNumber =>
    dispatch(UserAction.forgetPasswordRequest(phoneNumber)),
});

const mapStateToProps = state => {
  console.log('Forget state', state);
  return {
    //   user: state.user.user && state.user.user.user && state.user.user.user   ,
    forgetPasswordSuccess: state.user.forgetPasswordSucess,
    forgetPasswordError: state.user.forgetPasswordError,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ForgetPassword);

import React, { useEffect, useState } from 'react';
import {
  View,
  Animated,
  Text,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';

//Animation
import { useAnimation } from '../../assets/Animation/animation';

import Input from '../../Component/Input';
import TitleDesc from '../../Component/TitleDesc';
import BackButton from '../../Component/BackButton';
import Button from '../../Component/Button';
import Checkbox from '../../Component/CheckBox';
import LinkButton from '../../Component/linkButton';
import Header from '../../Component/Header';

import { Metrics, ApplicationStyles, Colors, Fonts } from '../../Themes';
import { connect } from 'react-redux';
import UserAction from '../../Redux/UserRedux';
import { onError, onSuccess } from '../../utils/commonFunctions';

class ForgetPasswordResetPass extends React.Component {
  state = {
    phoneNumber: this.props.navigation.getParam('phone'),
    code: this.props.navigation.getParam('code'),
    password: '',
    cPassword: '',
    loading: false,
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.resetPasswordSucess !== this.props.resetPasswordSucess) {
      this.setState({ loading: false });
      console.log('nextProps', nextProps.resetPasswordSucess);
      if (nextProps.resetPasswordSucess.success) {
        onSuccess('تم اعادة كلمة المرور بنجاح!');
        this.props.navigation.dispatch(
          StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: 'LoginPage' })],
          }),
        );
      } else if (nextProps.resetPasswordSucess.message) {
        onSuccess(nextProps.resetPasswordSucess.message);
      }
    }

    if (nextProps.resetPasswordError !== this.props.resetPasswordError) {
      this.setState({ loading: false });
      onError('حدث خطأ ما');
    }
  }

  handleReset() {
    const { phoneNumber, code, password, cPassword } = this.state;
    console.log(
      'this.stat.phoneNumber',
      phoneNumber,
      code,
      password,
      cPassword,
    );

    if (password !== cPassword) {
      return onError('كلمة المرور لا تتطابق مع تأكيد كلمة المرور');
    }
    //    || (password || '').length < 7
    if ((password || '').length < 7) {
      return onError('يجب ان تكون كلمة المرور اكثر من ٧ خانات');
    }

    this.setState({ loading: true });
    this.props.resetPassword(phoneNumber, code, password);
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
          />
          <TitleDesc
            title={'تغيير كلمة المرور'}
            containerStyle={{ marginTop: 50 }}
            desc={'أدخل كلمة المرور الجديدة ادناه '}
          />
          <View style={{ marginTop: 110 }}>
            <Input
              onChangeText={val => this.setState({ password: val })}
              value={this.state.password}
              width={150}
              InputPlaceHolder={'كلمة المرور الجديدة'}
              containerStyle={{ marginTop: 0 }}
            />
            <Input
              onChangeText={val => this.setState({ cPassword: val })}
              value={this.state.cPassword}
              width={150}
              InputPlaceHolder={'تأكيد كلمة المرور'}
              containerStyle={{ marginTop: 12 }}
            />
          </View>
          <Button
            loading={this.state.loading}
            containerStyle={{ marginTop: 86 }}
            buttonText={'إعادة كلمة المرور'}
            onPress={() => this.handleReset()}
          />
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  resetPassword: (phone, code, password) =>
    dispatch(UserAction.resetPasswrd(phone, code, password)),
});

const mapStateToProps = state => {
  return {
    resetPasswordSucess: state.user.resetPasswordSucess,
    resetPasswordError: state.user.resetPasswordError,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ForgetPasswordResetPass);

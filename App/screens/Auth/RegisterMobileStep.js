import React from 'react';
import {
  View,
  Animated,
  Text,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';

import Input from '../../Component/Input';
import TitleDesc from '../../Component/TitleDesc';
import BackButton from '../../Component/BackButton';
import Button from '../../Component/Button';

import Header from '../../Component/Header';

import { Metrics, ApplicationStyles, Colors, Fonts } from '../../Themes';

import { connect } from 'react-redux';
import UserAction from '../../Redux/UserRedux';
import { onError } from '../../utils/commonFunctions';

class RegisterMobileStep extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      phoneNumber: '',
      loading: false,
    };
  }

  handlePhoneNumberChange = val => this.setState({ phoneNumber: val });

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
    if (
      this.state.phoneNumber.length !== 9 ||
      this.state.phoneNumber.replace(/\s/g, '').length !== 9
    ) {
      return onError('الرجاء ادخال رقم الجوال بدون صفر في البداية');
    }
    if (!this.state.phoneNumber.startsWith('5')) {
      return onError('الرجاء ادخال رقم جوال سعودي صحيح');
    }
    this.props.checkNumber(`966${this.parseArabic(this.state.phoneNumber)}`);
    this.setState({ loading: true });
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.checkNuberSucess !== this.props.checkNuberSucess) {
      console.log('Hello Sucess', nextProps.checkNuberSucess);
      this.setState({ loading: false });
      this.props.navigation.navigate('RegistrationConfirmationPhone', {
        phoneNumber: `+966${this.parseArabic(this.state.phoneNumber)}`,
        code: nextProps.checkNuberSucess.confirmationCode,
      });
    }

    if (nextProps.checkNuberError !== this.props.checkNuberError) {
      this.setState({ loading: false });
      console.log('Hello Error', nextProps.checkNuberError);
      onError(nextProps.checkNuberError.message);
    }
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
          {/* <BackButton doAnimation={true} containerStyle={{marginTop: 50}} onPress={()=> this.props.navigation.goBack()} /> */}

          <Header
            withoutUnderLine={true}
            headerTitle={'تسجيل جديد'}
            onBackPress={() => this.props.navigation.goBack()}
          />

          <TitleDesc
            title={'رقم الجوال'}
            containerStyle={{ marginTop: 50 }}
            desc={'فضلا,  قم بإدخال رقم الجوال الخاص بك '}
          />

          <View
            style={{
              marginTop: 80,
            }}>
            <Input
              width={150}
              inputValue={this.state.phoneNumber}
              onChangeText={this.handlePhoneNumberChange}
              InputPlaceHolder={''}
              registerPhone={true}
              number={true}
            />
          </View>

          <Button
            loading={this.state.loading}
            containerStyle={{ marginTop: 100 }}
            buttonText={'التالي'}
            onPress={this.handleNextStep}
          />
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

// export default RegisterMobileStep
const mapDispatchToProps = dispatch => ({
  checkNumber: phone => dispatch(UserAction.checkNumber(phone)),
});

const mapStateToProps = state => {
  // console.log('state', state)
  return {
    checkNuberError: state.user.checkNuberError,
    checkNuberSucess: state.user.checkNuberSucess,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RegisterMobileStep);

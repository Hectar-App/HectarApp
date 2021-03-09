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
import InputButton from '../../Component/InputButton';
import TitleDesc from '../../Component/TitleDesc';
import BackButton from '../../Component/BackButton';
import Button from '../../Component/Button';
import Checkbox from '../../Component/CheckBox';
import LinkButton from '../../Component/linkButton';
import RadioButtonModal from '../../Component/RadioButtonModal';

import { Metrics, ApplicationStyles, Colors, Fonts } from '../../Themes';

import Header from '../../Component/Header';

import { connect } from 'react-redux';
import UserAction from '../../Redux/UserRedux';
import { onError } from '../../utils/commonFunctions';

class RegistrationUserInfo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      phoneNumber: this.props.navigation.getParam('phone'),
      code: this.props.navigation.getParam('code'),
      codeInput: '',
      userTypes: {},
      doAnimation: false,
      userTypesModal: false,
      footerAnimation: new Animated.Value(0),
      selected: {},
    };
    // const animation = useAnimation({ doAnimation: footerAnimation , duration: 550 })
  }

  componentWillMount() {
    this.props.getUserTypes();

    Animated.timing(this.state.footerAnimation, {
      duration: 550,
      toValue: 1,
    }).start();
  }

  componentWillReceiveProps(nextProps) {
    console.log('nextProps.usertypes', nextProps);
    if (this.props.userTypes !== nextProps.userTypes) {
      this.setState({ userTypes: nextProps.userTypes });
      console.log(this.props.userTypes);
    }

    if (this.props.user !== nextProps.user) {
      //TODO Sucess
      console.log(nextProps.user);
      this.props.navigation.navigate('FinishRegistration');
    }

    if (this.props.registerFaild !== nextProps.registerFaild) {
      //TODO faild
      onError(nextProps.registerFaild.errmsg);
    }
  }

  nav = route => {
    if (route !== 'LoginPage') {
      return this.props.navigation.navigate(route);
    }

    this.props.navigation.dispatch(
      StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: route })],
      }),
    );
  };

  handleStorInput(type, val) {
    switch (type) {
      case 'name':
        this.setState({ name: val });
        break;
      case 'email':
        this.setState({ email: val });
        break;
      case 'password':
        this.setState({ password: val });
        break;
      case 'cPassword':
        this.setState({ cPassword: val });
        break;
      default:
        break;
    }
  }

  handleRegister() {
    console.log('this.state', this.state);
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const {
      name,
      email,
      selected,
      password,
      cPassword,
      phoneNumber,
    } = this.state;
    if (name && selected && password && cPassword) {
      if (email && !re.test(email)) {
        return onError('الرجاء كتابة الايميل بالصيغة الصحيحة');
      }

      if (password !== cPassword || (password || '').length < 6) {
        return onError('كلمة المرور لا تتطابق مع تأكيد كلمة المرور');
      }

      if (!this.state.doAnimation) {
        return onError(
          'الرجاء الموافقة على الشروط والاحكام لاكمال عملية التسجيل ',
        );
      }

      this.props.registerUser(name, phoneNumber, password, selected._id, email);
    } else {
      onError('الرجاء اكمال البيانات لاتمام عملية التسجيل');
    }
  }

  render() {
    const footerBottom = this.state.footerAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [-80, 30],
    });

    return (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
          {/* <BackButton doAnimation={true} containerStyle={{marginTop: 50}} onPress={()=> this.props.navigation.goBack()} /> */}
          <Header
            withoutUnderLine={true}
            headerTitle={'إنشاء حساب جديد'}
            onBackPress={() => this.props.navigation.goBack()}
          />

          {/* // <TitleDesc title={'إنشاء حساب جديد'} containerStyle={{marginTop: 50}} desc={''} noDesc={true} /> */}

          <View
            style={{
              marginTop: 35,
            }}>
            <Input
              width={150}
              onChangeText={val => this.handleStorInput('name', val)}
              InputPlaceHolder={'أسم المستخدم'}
              containerStyle={{ marginTop: 0 }}
            />
            <Input
              width={150}
              onChangeText={val => this.handleStorInput('email', val)}
              InputPlaceHolder={'البريد الإلكتروني (اختياري)'}
              containerStyle={{ marginTop: 12 }}
            />
            <Input
              width={150}
              onChangeText={val => this.handleStorInput('password', val)}
              InputPlaceHolder={'كلمة المرور'}
              containerStyle={{ marginTop: 12 }}
            />
            <Input
              width={150}
              onChangeText={val => this.handleStorInput('cPassword', val)}
              InputPlaceHolder={' تأكيد كلمة المرور'}
              containerStyle={{ marginTop: 12 }}
            />
            <InputButton
              width={150}
              InputPlaceHolder={
                this.state.selected && this.state.selected.userTypeName
                  ? this.state.selected.userTypeName
                  : 'إختر نوع الحساب'
              }
              containerStyle={{ marginTop: 12 }}
              onPress={() => this.setState({ RadioButtonModal: true })}
            />

            {this.state.selected.nameEn === 'normal' && (
              <Text
                style={[
                  Fonts.style.normal,
                  {
                    color: Colors.black,
                    fontSize: 13,
                    fontWeight: 'normal',
                    alignSelf: 'flex-end',
                    marginEnd: 30,
                    marginTop: 25,
                  },
                ]}>
                * نوع المستخدم الباحث عن عقار لا يمكنه اضافة عقارات
              </Text>
            )}
          </View>

          <View>
            <Checkbox
              containerStyle={{ marginTop: 37 }}
              doAnimation={this.state.doAnimation}
              onPress={() =>
                this.setState(s => ({ doAnimation: !s.doAnimation }))
              }
              onPrivacyPress={() => this.nav('RolesAndCondation')}
            />
          </View>

          <Button
            containerStyle={{ marginTop: 86 }}
            buttonText={'التالي'}
            onPress={() => this.handleRegister()}
          />

          {this.state.RadioButtonModal && (
            <RadioButtonModal
              onPress={item =>
                this.setState({ selected: item, RadioButtonModal: false })
              }
              selectedOption={this.state.selected}
              doAnimation={true}
              data={this.state.userTypes}
              isVisible={this.state.RadioButtonModal}
            />
          )}

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
              buttonText={' تسجيل الدخول'}
              textStyle={{ color: Colors.darkSeafoamGreen, fontSize: 13 }}
              onPress={() => this.nav('LoginPage')}
            />
            <Text
              style={[
                Fonts.style.normal,
                { color: Colors.black, fontSize: 13, alignSelf: 'center' },
              ]}>
              {' '}
              لديك حساب ؟{' '}
            </Text>
          </Animated.View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  getUserTypes: () => dispatch(UserAction.getUserTypes()),
  registerUser: (name, phone, password, userType, email) =>
    dispatch(
      UserAction.registerRequest(name, phone, password, userType, email),
    ),
});

const mapStateToProps = state => {
  console.log('state', state);
  return {
    userTypes: state.user.userTypes,
    user: state.user.user,
    registerFaild: state.user.registerError,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RegistrationUserInfo);

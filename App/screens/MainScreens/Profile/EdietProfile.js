import React, {useEffect, useState} from 'react';
import {
  View,
  Animated,
  Text,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import {StackActions, NavigationActions} from 'react-navigation';

import Header from '../../../Component/Header';
import MainTypes from '../../../Component/MainFilterTypes';
import {Fonts, Colors, Metrics} from '../../../Themes';

import RealestateType from '../../../Component/realestateType';
import CountWithTitle from '../../../Component/CountWithTitle';
import Button from '../../../Component/Button';
import InputButton from '../../../Component/InputButton';
import RadioButtonModal from '../../../Component/RadioButtonModal';
import InputModal from '../../../Component/PasswordModal';

import * as Progress from 'react-native-progress';
import {ifIphoneX} from 'react-native-iphone-x-helper';
import Input from '../../../Component/Input';

import {connect} from 'react-redux';
import UserAction from '../../../Redux/UserRedux';

class EdietProfile extends React.Component {
  state = {
    name: this.props.user.name || '',
    email: this.props.user.email || '',
    password: '',
    phoneNumber: this.props.user.phoneNumber + '',
    selected: this.props.user.userType,
    passwordModalVisable: false,
    // RadioButtonModal: false,
    // userTypes: {}
  };

  componentDidMount() {
    this.props.getUserTypes();
  }

  handleStorInput(type, val) {
    switch (type) {
      case 'name':
        this.setState({name: val});
        break;
      case 'email':
        this.setState({email: val});
        break;
      case 'password':
        this.setState({password: val});
        break;
      case 'phone':
        this.setState({phoneNumber: val});
        break;
      default:
        break;
    }
  }

  handleRegister() {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const {
      name,
      email,
      selected,
      password,
      phoneNumber,
      prevPassword,
    } = this.state;
    if (
      name &&
      name.replace(/\s/g, '').length >= 1 &&
      selected &&
      phoneNumber
    ) {
      if (email && !re.test(email))
        return alert('الرجاء كتابة الايميل بالصيغة الصحيحة');

      if (password && (password || '').length < 7)
        return alert('يجب ان تكون كلمة المرور اكثر من ٧ حروف وارقام');

      // if(  this.props.user.email && !email )
      //     return alert('الرجاء كتابة الايميل')

      this.setState({loading: true});
      console.log(
        'hello => ',
        name,
        email,
        selected,
        password ? password : null,
        phoneNumber,
      );
      this.props.editProfile({
        name,
        phoneNumber,
        prevPassword,
        password,
        userType: selected._id,
        email: (email || '').length > 0 ? email : '',
        token: this.props.user.token,
      });
    } else {
      alert('الرجاء اكمال البيانات لاتمام عملية التسجيل');
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.userTypes !== nextProps.userTypes) {
      this.setState({userTypes: nextProps.userTypes});
      console.log(this.props.userTypes);
    }
    if (this.props.user !== nextProps.user) {
      console.log('newUser', nextProps.user);
      // if(nextProps.user)
      this.setState({loading: false});
      alert('تم تعديل بياناتك بنجاح ');
      // this.props.navigation.goBack()
    }

    if (this.props.edietProfileError !== nextProps.edietProfileError) {
      console.log('newUser', nextProps.edietProfileError);
      // if(nextProps.user)
      this.setState({loading: false});
      alert(nextProps.edietProfileError.error);
      // this.props.navigation.goBack()
    }
  }

  getPassword(prev, password) {
    if (password) {
      this.setState({
        prevPassword: prev,
        password,
        passwordModalVisable: false,
      });
    }
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={{flex: 1}}>
          <Header
            headerTitle={'الملف الشخصي'}
            doAnimation={true}
            onBackPress={() => this.props.navigation.goBack()}
          />

          <Input
            onChangeText={val => this.handleStorInput('name', val)}
            inputValue={this.state.name}
            containerStyle={{marginTop: 37}}
            InputPlaceHolder={'معاذ الأمين'}
          />
          <Input
            onChangeText={val => this.handleStorInput('email', val)}
            inputValue={this.state.email}
            containerStyle={{marginTop: 14}}
            InputPlaceHolder={'moath@example.com'}
          />
          <InputButton
            text={true}
            onChangeText={val => this.handleStorInput('phone', val)}
            InputPlaceHolder={this.state.phoneNumber}
            containerStyle={{marginTop: 14}}
          />
          <InputButton
            containerStyle={{marginTop: 14}}
            onPress={() => this.setState({passwordModalVisable: true})}
            InputPlaceHolder={
              this.state.password ? this.state.password : '*******'
            }
          />
          <InputButton
            width={150}
            InputPlaceHolder={this.state.selected.userTypeName}
            containerStyle={{marginTop: 12}}
            onPress={() => this.setState({RadioButtonModal: true})}
          />

          {this.state.passwordModalVisable && (
            <InputModal
              getPassword={(prev, password) => this.getPassword(prev, password)}
              onClosePress={() => this.setState({passwordModalVisable: false})}
              isVisible={this.state.passwordModalVisable}
              data={[
                {_id: 0, placeHolder: 'hello'},
                {_id: 0, placeHolder: 'hello2'},
              ]}
            />
          )}
          {this.state.RadioButtonModal && (
            <RadioButtonModal
              onPress={item =>
                this.setState({selected: item, RadioButtonModal: false})
              }
              selectedOption={this.state.selected}
              doAnimation={true}
              data={this.state.userTypes}
              isVisible={this.state.RadioButtonModal}
            />
          )}

          <Button
            textPropsStyle={{paddingEnd: 0}}
            loading={this.state.loading}
            containerStyle={{position: 'absolute', bottom: 90}}
            buttonText={'حفظ التغييرات'}
            onPress={() => this.handleRegister()}
          />
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  getUserTypes: () => dispatch(UserAction.getUserTypes()),
  editProfile: ({
    name,
    phone,
    prevPassword,
    password,
    userType,
    email,
    token,
  }) =>
    dispatch(
      UserAction.editProfile({
        name,
        phone,
        prevPassword,
        password,
        userType,
        email,
        token,
      }),
    ),
});

const mapStateToProps = state => {
  return {
    user: state.user.user && state.user.user.user && state.user.user.user,
    userTypes: state.user.userTypes,
    edietProfileError: state.user.edietProfileError,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EdietProfile);

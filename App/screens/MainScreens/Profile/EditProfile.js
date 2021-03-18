import React from 'react';
import R from 'ramda';

import { View, Keyboard, TouchableWithoutFeedback } from 'react-native';

import Header from '../../../Component/Header';
import Button from '../../../Component/Button';
import InputButton from '../../../Component/InputButton';

import InputModal from '../../../Component/PasswordModal';

import Input from '../../../Component/Input';
import { connect } from 'react-redux';
import UserAction from '../../../Redux/UserRedux';
import {
  onError,
  onSuccess,
  perfectHeight,
} from '../../../utils/commonFunctions';
import RadioButtonModal from '../../../Component/RadioButtonModal';

class EditProfile extends React.Component {
  state = {
    name: this.props.user.name || '',
    email: this.props.user.email || '',
    password: '',
    phoneNumber: this.props.user.phoneNumber + '',
    passwordModalVisable: false,
    userType: R.pathOr({}, ['props', 'user', 'userType'], this),
  };

  componentDidMount() {
    this.props.getUserTypes();
  }

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
      case 'phone':
        this.setState({ phoneNumber: val });
        break;
      case 'userType':
        this.setState({ userType: val });
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
      password,
      phoneNumber,
      prevPassword,
      userType,
    } = this.state;
    if (password && !(password.length >= 6)) {
      return onError('يجب ان تكون كلمة المرور علي الأقل 6 حروف وارقام');
    }

    if (name && name.replace(/\s/g, '').length >= 1 && phoneNumber) {
      if (email && !re.test(email)) {
        return onError('الرجاء كتابة الايميل بالصيغة الصحيحة');
      }
      this.setState({ loading: true });
      this.props.editProfile({
        name,
        phoneNumber,
        prevPassword,
        password,
        userType: R.prop('_id', userType),
        email: (email || '').length > 0 ? email : '',
        token: this.props.user.token,
      });
    } else {
      onError('الرجاء اكمال البيانات لاتمام عملية التسجيل');
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.userTypes !== nextProps.userTypes) {
      this.setState({ userTypes: nextProps.userTypes });
      console.log(this.props.userTypes);
    }
    if (this.props.user !== nextProps.user) {
      console.log('newUser', nextProps.user);
      this.setState({ loading: false });
      onSuccess('تم تعديل بياناتك بنجاح ');
    }

    if (this.props.edietProfileError !== nextProps.edietProfileError) {
      this.setState({ loading: false });
      onError(nextProps.edietProfileError.error);
    }
  }

  getPassword(prevPassword, password) {
    if (password) {
      this.setState({
        prevPassword,
        password,
        passwordModalVisable: false,
      });
    }
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={{ flex: 1 }}>
          <Header
            headerTitle={'الملف الشخصي'}
            doAnimation={true}
            onBackPress={() => this.props.navigation.goBack()}
          />

          <Input
            onChangeText={val => this.handleStorInput('name', val)}
            inputValue={this.state.name}
            containerStyle={{ marginTop: 37 }}
            InputPlaceHolder={'معاذ الأمين'}
          />
          <Input
            onChangeText={val => this.handleStorInput('email', val)}
            inputValue={this.state.email}
            containerStyle={{ marginTop: 14 }}
            InputPlaceHolder={'moath@example.com'}
          />
          <Input
            onChangeText={val => this.handleStorInput('phone', val)}
            InputPlaceHolder={'رقم الهاتف'}
            inputValue={this.state.phoneNumber}
            containerStyle={{ marginTop: 14 }}
            disabled={true}
          />
          <InputButton
            containerStyle={{ marginTop: 14 }}
            onPress={() => this.setState({ passwordModalVisable: true })}
            InputPlaceHolder={'*******'}
          />
          <InputButton
            width={150}
            S
            InputPlaceHolder={this.state.userType.userTypeName}
            containerStyle={{ marginTop: perfectHeight(12) }}
            onPress={() => this.setState({ RadioButtonModal: true })}
          />

          {this.state.passwordModalVisable && (
            <InputModal
              getPassword={(prev, password) => this.getPassword(prev, password)}
              onClosePress={() =>
                this.setState({ passwordModalVisable: false })
              }
              isVisible={this.state.passwordModalVisable}
              data={[
                { _id: 0, placeHolder: 'hello' },
                { _id: 0, placeHolder: 'hello2' },
              ]}
            />
          )}
          {this.state.RadioButtonModal && (
            <RadioButtonModal
              onPress={item =>
                this.setState({
                  userType: item,
                  RadioButtonModal: false,
                })
              }
              selectedOption={this.state.userType}
              doAnimation={true}
              data={this.state.userTypes}
              isVisible={this.state.RadioButtonModal}
            />
          )}
          <Button
            textPropsStyle={{ paddingEnd: 0 }}
            loading={this.state.loading}
            containerStyle={{ position: 'absolute', bottom: 90 }}
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
)(EditProfile);

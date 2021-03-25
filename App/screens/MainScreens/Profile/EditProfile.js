import React from 'react';
import { Text, StyleSheet } from 'react-native';
import R from 'ramda';

import { View, Keyboard, TouchableWithoutFeedback } from 'react-native';

import Header from '../../../Component/Header';
import Button from '../../../Component/Button';
import InputButton, { InputWithAction } from '../../../Component/InputButton';

import Input from '../../../Component/Input';
import { connect } from 'react-redux';
import UserAction from '../../../Redux/UserRedux';
import {
  isIos,
  onError,
  onSuccess,
  perfectFont,
  perfectWidth,
} from '../../../utils/commonFunctions';
import RadioButtonModal from '../../../Component/RadioButtonModal';
import VerticalSpace from '../../../Component/core/layouts/VerticalSpace';

class EditProfile extends React.Component {
  state = {
    name: this.props.user.name || '',
    email: this.props.user.email || '',
    phoneNumber: this.props.user.phoneNumber + '',
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

    const { name, email, phoneNumber, userType } = this.state;

    if (name && name.replace(/\s/g, '').length >= 1 && phoneNumber) {
      if (email && !re.test(email)) {
        return onError('الرجاء كتابة الايميل بالصيغة الصحيحة');
      }
      this.setState({ loading: true });
      this.props.editProfile({
        name,
        phoneNumber,
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
    }
    if (this.props.user !== nextProps.user) {
      this.setState({ loading: false });
      onSuccess('تم تعديل بياناتك بنجاح ');
    }

    if (this.props.edietProfileError !== nextProps.edietProfileError) {
      this.setState({ loading: false });
      onError(nextProps.edietProfileError.error);
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
          <VerticalSpace height={30} />
          <Text style={styles.label}>الاسم</Text>
          <VerticalSpace height={8} />
          <Input
            onChangeText={val => this.handleStorInput('name', val)}
            inputValue={this.state.name}
            InputPlaceHolder={'معاذ الأمين'}
          />
          <VerticalSpace height={14} />
          <Text style={styles.label}>البريد الالكتروني</Text>
          <VerticalSpace height={8} />
          <Input
            onChangeText={val => this.handleStorInput('email', val)}
            inputValue={this.state.email}
            InputPlaceHolder={'moath@example.com'}
          />
          <VerticalSpace height={14} />
          <Text style={styles.label}>نوع الحساب</Text>
          <VerticalSpace height={8} />
          <InputButton
            width={150}
            InputPlaceHolder={this.state.userType.userTypeName}
            onPress={() => this.setState({ RadioButtonModal: true })}
          />
          <VerticalSpace height={14} />
          <Text style={styles.label}>رقم الجوال</Text>
          <VerticalSpace height={8} />
          <Input
            onChangeText={val => this.handleStorInput('phone', val)}
            InputPlaceHolder={'رقم الهاتف'}
            inputValue={this.state.phoneNumber}
            disabled={true}
          />
          <VerticalSpace height={14} />
          <Text style={styles.label}>الرقم السري</Text>
          <VerticalSpace height={8} />
          <InputWithAction
            label={'*******'}
            onAction={() =>
              this.props.navigation.navigate('changePassword', {
                onFinish: this.props.editProfile,
                token: this.props?.user?.token,
              })
            }
          />
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

const styles = StyleSheet.create({
  label: {
    fontFamily: isIos() ? 'TheMixArabic-Bold' : 'TheMixArab',
    fontWeight: '400',
    fontSize: perfectFont(12),
    marginRight: perfectWidth(32),
    color: '#3D3D3D',
  },
});

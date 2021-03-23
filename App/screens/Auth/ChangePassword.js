import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';

import Input from '../../Component/Input';
import Header from '../../Component/Header';
import VerticalSpace from '../../Component/core/layouts/VerticalSpace';
import {
  onError,
  perfectFont,
  perfectHeight,
  perfectWidth,
} from '../../utils/commonFunctions';

const Notifications = props => {
  const [prevPassword, setPrevPassword] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const handleSubmit = () => {
    if (!password || !confirmPassword || !prevPassword) {
      return onError('برجاء مليء جميع الحقول');
    }

    if (password !== confirmPassword) {
      return onError('كلمة المرور غير متطابقة');
    }

    if (password.length < 6) {
      return onError('يجب أن تتكون كلمة المرور من 6 احرف علي الأقل');
    }

    const editProfile = props.navigation.getParam('onFinish');
    if (editProfile) {
      editProfile({
        prevPassword,
        password,
        token: props.navigation.getParam('token'),
      });
    }
  };

  return (
    <View style={styles.container}>
      <Header
        headerTitle={'تغيير الرقم السري'}
        doAnimation={true}
        onBackPress={() => props.navigation.goBack()}
        backgroundColor={'#FFFFFF'}
      />
      <VerticalSpace height={20} />
      <Text style={styles.label}>الرقم السري الحالي</Text>
      <VerticalSpace height={8} />
      <Input
        onChangeText={val => setPrevPassword(val)}
        inputValue={prevPassword}
        InputPlaceHolder={'أدخل الرقم السري الحالي'}
        passShow
      />
      <VerticalSpace height={14} />
      <Text style={styles.label}>الرقم السري الجديد</Text>
      <VerticalSpace height={8} />
      <Input
        onChangeText={val => setPassword(val)}
        inputValue={password}
        InputPlaceHolder={'أدخل الرقم السري الجديد'}
        passShow
      />
      <VerticalSpace height={14} />
      <Text style={styles.label}> تأكيد الرقم السري الجديد</Text>
      <VerticalSpace height={8} />
      <Input
        onChangeText={val => setConfirmPassword(val)}
        inputValue={confirmPassword}
        InputPlaceHolder={'أدخل الرقم السري الجديد'}
        passShow
      />
      <VerticalSpace height={285} />
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.btnText}>حفظ التغييرات</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Notifications;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  label: {
    fontFamily: 'TheMixArab',
    fontWeight: '400',
    fontSize: perfectFont(12),
    marginRight: perfectWidth(32),
    color: '#3D3D3D',
  },
  button: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    width: perfectWidth(343),
    height: perfectHeight(40),
    borderRadius: perfectWidth(5),
    backgroundColor: '#3DBA7E',
  },
  btnText: {
    fontFamily: 'TheMixArab',
    fontWeight: '700',
    fontSize: perfectFont(14),
    color: '#FFFFFF',
  },
});

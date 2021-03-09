import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Keyboard,
  Share,
  TouchableWithoutFeedback,
  Linking,
  TouchableOpacity,
  Alert,
  Image,
  Platform,
} from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
import RNRestart from 'react-native-restart';

import { ifIphoneX } from 'react-native-iphone-x-helper';

import { IconButton } from 'react-native-paper';
import {
  Images,
  ApplicationStyles,
  CustomIcon,
  Colors,
  Metrics,
} from '../../../Themes';
import ProfileButton from '../../../Component/ProfileButton';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ImageViewr from 'react-native-image-zoom-viewer';

import { connect } from 'react-redux';
import UserAction from '../../../Redux/UserRedux';
import HectarIcon from '../../../assets/imgs/svgImagesComponents/HectarIcon';
import { ScrollView } from 'react-native-gesture-handler';
import Modal from 'react-native-modal';

PeofilePage = props => {
  const [imageFullScreen, setImageFullScreen] = useState(false);

  // console.log('props ya ', props)

  const handleLogOut = () => {
    if (!props.user || !props.user.token) {
      return props.navigation.navigate('LoginPage');
    }
    props.logOut();
    props.navigation.dispatch(
      StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: 'Welcome' })],
      }),
    );
  };

  const handleSiginingAlert = message => {
    return Alert.alert('', ` يجب تسجيل الدخول ${message ? message : ''}`, [
      {
        text: 'موافق',
        onPress: () => 0,
        // props.navigation.dispatch(StackActions.reset({
        //     index: 0,
        //     actions: [NavigationActions.navigate({ routeName: 'bottomTab' })],
        // }))
      },
    ]);
  };

  const shareIcon = () => {
    Share.share({
      message:
        'اهلا بك في تطبيق هكتار اود مشاركة حسابي عبر هذا الباركود' +
        '\n' +
        props.user.imageQr,
      // url: props.user.imageQr,
      url: '' + props.user.imageQr,
    });
  };

  const openURL = async () => {
    Linking.canOpenURL(props.user.imageQr).then(supported => {
      if (supported) {
        Linking.openURL(props.user.imageQr);
      } else {
        console.log("Don't know how to open URI: " + props.user.imageQr);
      }
    });

    // alert(props.user.imageQr)
    // await Linking.openURL(props.user.imageQr).then(res => null).catch(err => console.log('err', err))
  };

  // const imagess = [{url: props.user.imageQr, props: {}}]

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <ScrollView style={{ flex: 1 }} bounces={false}>
        <View
          style={{
            flex: 1,
            backgroundColor: '#fff',
            paddingBottom: 90,
            paddingTop: ifIphoneX(50, 10),
          }}>
          {!(!props.user || !props.user.token) ? (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-end',
                marginEnd: 21,
                marginTop: 30,
              }}>
              {props.user.imageQr && (
                <TouchableOpacity
                  onPress={() => setImageFullScreen(true)}
                  style={{
                    position: 'absolute',
                    left: 20,
                    alignSelf: 'center',
                  }}>
                  <CustomIcon size={25} name={'qrcode2'} />
                  {/* <IconButton icon={'qrcode2'} size={25} /> */}
                </TouchableOpacity>
              )}
              <Text
                numberOfLines={1}
                style={[
                  ApplicationStyles.Profile.userNameText,
                  {
                    fontWeight: Platform.OS === 'android' ? '400' : 'bold',
                    width: '60%',
                  },
                ]}>
                {props.user && props.user.name ? props.user.name : ''}
              </Text>
              <Text style={ApplicationStyles.Profile.userNameText}>
                {' '}
                مرحبا بك,{' '}
              </Text>
              {/* <Image source={Images.userProfileIcon} style={{width: 15.9, height: 21, marginStart: 7}} /> */}
              {/* <Text>معاذ الأمين</Text> */}
            </View>
          ) : (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-end',
                marginEnd: 21,
                paddingTop: 15,
              }}>
              <Text
                style={[
                  ApplicationStyles.Profile.userNameText,
                  { marginEnd: 0 },
                ]}>
                {' '}
                اهلا بك في هكتار{' '}
              </Text>
            </View>
          )}

          {props.user && props.user.token && (
            <Modal
              visible={imageFullScreen}
              // visible={true}
              style={{
                width: Metrics.screenWidth,
                backgroundColor: '#fff',
                height: Metrics.screenHeight,
                margin: 0,
              }}
              onBackdropPress={() => setImageFullScreen(false)}
              transparent={true}>
              <TouchableOpacity
                style={[
                  // styles.modalCloseBtn,
                  {
                    top: 60,
                    backgroundColor: '#fff',
                    // opacity: 0.5,
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: Metrics.screenWidth * 0.1,
                    height: Metrics.screenWidth * 0.1,
                    borderRadius: (Metrics.screenWidth * 0.1) / 2,
                    right: 20,
                    position: 'absolute',
                    zIndex: 999999,
                  },
                ]}
                activeOpacity={0.65}
                onPress={() => setImageFullScreen(false)}>
                <CustomIcon name={'close'} size={20} color={'#000'} />
              </TouchableOpacity>
              <View
                style={{
                  width: Metrics.screenWidth * 0.8,
                  height: Metrics.screenWidth * 1.06666667,
                  alignSelf: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#f6f7f9',
                  borderRadius: 25,
                  alignItems: 'center',
                }}>
                <View style={{ ...style.shareCont, flexWrap: 'wrap' }}>
                  <TouchableOpacity
                    onPress={shareIcon}
                    style={{ alignItems: 'center' }}>
                    <CustomIcon name={'share'} size={20} color={'#000'} />
                    <View
                      style={{
                        ...style.componyName,
                        marginBottom: 0,
                        borderWidth: 0,
                        marginTop: 0,
                      }}>
                      <Text
                        style={[
                          ApplicationStyles.Profile.userNameText,
                          {
                            marginEnd: 0,
                            fontWeight: 'bold',
                            fontSize: 13,
                            color: Colors.primaryGreen,
                          },
                        ]}>
                        {' '}
                        مشاركة{' '}
                      </Text>
                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={openURL}
                    style={{ alignItems: 'center' }}>
                    <AntDesign name={'download'} size={20} />
                    <View
                      style={{
                        ...style.componyName,
                        marginBottom: 0,
                        borderWidth: 0,
                        marginTop: 0,
                      }}>
                      <Text
                        style={[
                          ApplicationStyles.Profile.userNameText,
                          {
                            marginEnd: 0,
                            fontWeight: 'bold',
                            fontSize: 13,
                            color: Colors.primaryGreen,
                          },
                        ]}>
                        {' '}
                        تحميل{' '}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>

                <View
                  style={{
                    ...style.componyName,
                    width: Metrics.screenWidth * 0.53333333,
                    alignItems: 'center',
                  }}>
                  <Text
                    numberOfLines={1}
                    style={[
                      ApplicationStyles.Profile.userNameText,
                      { marginEnd: 0, textAlign: 'center' },
                    ]}>
                    {' '}
                    {props.user.name}{' '}
                  </Text>
                </View>
                {props.user.imageQr && (
                  <Image
                    source={{ uri: props.user.imageQr }}
                    style={[
                      {
                        height: Metrics.screenWidth * 0.53333333,
                        width: Metrics.screenWidth * 0.53333333,
                        alignSelf: 'center',
                      },
                    ]}
                  />
                )}

                <Text
                  style={[
                    ApplicationStyles.Profile.userNameText,
                    { marginTop: 20, fontSize: 14, color: Colors.grey },
                  ]}>
                  {' '}
                  www.hectar.io{' '}
                </Text>
              </View>

              {/* <ImageViewr
                        imageUrls={imagess}
                        // imageUrls={[{originUrl: '', props:{source: Images.testCardImage}}]}

                    /> */}
            </Modal>
          )}

          <View
            style={{
              width: Metrics.screenWidth,
              height: 1,
              backgroundColor: Colors.white,
              borderStyle: 'solid',
              borderWidth: 1,
              borderColor: 'rgba(234, 236, 239, 0.65)',
              marginBottom: 20,
              marginTop: 23,
            }}
          />
          {/* <CustomIcon name={'home-1'} style={{fontSize:25}}/> */}
          {!(!props.user || !props.user.token) && (
            <ProfileButton
              iconName={'user'}
              onPress={() =>
                !props.user || !props.user.token
                  ? handleSiginingAlert('لتستطيع تعديل الحساب')
                  : props.navigation.navigate('EdietProfile')
              }
              buttonText={'الملف الشخصي'}
            />
          )}
          {!(!props.user || !props.user.token) && (
            <>
              <ProfileButton
                iconName={'apartment'}
                onPress={() =>
                  !props.user || !props.user.token
                    ? handleSiginingAlert('لتسطيع مشاهدة عقاراتك')
                    : props.navigation.navigate('MyRealEstate')
                }
                containerStyle={{ marginTop: 5 }}
                buttonText={'عقاراتي'}
              />
              <ProfileButton
                iconName={'heart'}
                onPress={() =>
                  !props.user || !props.user.token
                    ? handleSiginingAlert('لتسطيع مشاهدة عقاراتك')
                    : props.navigation.navigate('FavoratePage')
                }
                containerStyle={{ marginTop: 5 }}
                buttonText={'مفضلتي'}
              />
            </>
          )}
          {/* {!(!props.user || !props.user.token) && <ProfileButton iconName={'paper-plane'} onPress={()=> (!props.user ||!props.user.token)? handleSiginingAlert("لتسطيع مشاهدة عقاراتك"): props.navigation.navigate('Request')} containerStyle={{marginTop: 5}} buttonText={'طلباتي'}  />} */}
          <ProfileButton
            iconName={'book'}
            onPress={() => props.navigation.navigate('AboutApp')}
            containerStyle={{ marginTop: 5 }}
            buttonText={'عن هكتار'}
          />
          <ProfileButton
            iconName={'clipboard-text'}
            onPress={() => props.navigation.navigate('RolesAndCondation')}
            containerStyle={{ marginTop: 5 }}
            buttonText={'الشروط و الاحكام'}
          />
          <ProfileButton
            iconName={'list2'}
            onPress={() => props.navigation.navigate('FAQs')}
            containerStyle={{ marginTop: 5 }}
            buttonText={'الأسئلة المتكررة'}
          />
          <ProfileButton
            iconName={'share'}
            onPress={() =>
              Share.share({
                message: 'تطبيق هكتار تطبيق عقاري',
                url: 'hecatrApp.io',
              })
            }
            containerStyle={{ marginTop: 5 }}
            buttonText={'مشاركة التطبيق'}
          />
          {
            <ProfileButton
              iconName={'feather3'}
              onPress={() => props.navigation.navigate('HelpCenter')}
              containerStyle={{ marginTop: 5 }}
              buttonText={'مركز المساعدة'}
            />
          }
          {
            <ProfileButton
              iconName={!props.user || !props.user.token ? 'enter2' : 'escape'}
              onPress={handleLogOut}
              containerStyle={{ marginTop: 5 }}
              buttonText={
                !props.user || !props.user.token
                  ? 'تسجيل الدخول'
                  : 'تسجيل الخروج'
              }
            />
          }
        </View>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};

const mapDispatchToProps = dispatch => ({
  logOut: () => dispatch(UserAction.logout()),
});

const mapStateToProps = state => {
  console.log('state', state);
  return {
    user: state.user.user && state.user.user.user && state.user.user.user,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PeofilePage);

const style = StyleSheet.create({
  componyName: {
    borderWidth: 2,
    borderColor: Colors.primaryGreen,
    paddingHorizontal: 8,
    // paddingVertical: 2,
    borderRadius: 10,
    marginBottom: 15,
  },
  shareCont: {
    width: Metrics.screenWidth * 0.53333333,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    alignItems: 'center',
    // paddingHorizontal: 30,
  },
});

// export default PeofilePage

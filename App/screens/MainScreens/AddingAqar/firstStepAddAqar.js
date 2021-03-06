import React, { useEffect, useState } from 'react';
import {
  View,
  Animated,
  Image,
  Text,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
import _ from 'lodash';

import Header from '../../../Component/Header';
import MainTypes from '../../../Component/MainFilterTypes';
import { Fonts, Colors, Metrics, Images } from '../../../Themes';

import RealestateType from '../../../Component/realestateType';
import CountWithTitle from '../../../Component/CountWithTitle';
import InputButton from '../../../Component/InputButton';
import Button from '../../../Component/Button';
import ProgressBar from '../../../Component/ProgressBar';
import RealEstateTypesList from '../../../Component/RealestateTypeList';
import RadioButton from '../../../Component/RadioButtonList';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import Input from '../../../Component/Input';

import AlertModal from '../../../Component/Alert';
import ErroAlert from '../../../Component/ErrorAlert';

import * as Progress from 'react-native-progress';
import { ifIphoneX } from 'react-native-iphone-x-helper';

import Carousel, { Pagination } from 'react-native-snap-carousel';

import MapModal from '../../../Component/MapModal';

import { connect } from 'react-redux';
import RealEstateAction from '../../../Redux/RealEstateRedux';
import { ActivityIndicator, Switch } from 'react-native-paper';
import { onError } from '../../../utils/commonFunctions';
import { path, pathOr } from 'ramda';

class firstStepAddAqar extends React.Component {
  state = {
    showSucessModal: false,
    statusPage: 0,

    // selectedType: {},
    loading: true,
    mapModalVisabl: false,
    showErrorMessage: false,
    showAlert: false,
    forEditing: this.props.navigation.getParam('fromDetail'),
    realEstate: this.props.navigation.getParam('realEstate'),
    price:
      (this.props.navigation.getParam('realEstate') &&
        this.props.navigation.getParam('realEstate').price) ||
      0,

    payType: null,
  };

  componentDidMount() {
    this.props.getInfo();
    if (!this.props.user || !this.props.user.token) {
      return this.setState({
        showAlert: true,
        alertMessage: '?????? ?????????? ???????????? ???????????? ??????????',
      });
    }

    if (
      this.props.user &&
      this.props.user.userType &&
      this.props.user.userType.nameEn === 'normal'
    ) {
      return this.setState({
        showAlert: true,
        alertMessage:
          '?????? ?????????? ???? ?????????? ???????? ?????? ???? ???? ???????? ?????? ???????????? ???????? ???? ????????',
      });
    }
  }

  componentWillMount() {
    this.didFocusListener = this.props.navigation.addListener(
      'didFocus',
      () => {
        if (
          pathOr('', ['props', 'user', 'userType', 'userTypeName'], this) ===
          '???????? ???? ????????'
        ) {
          onError(
            '?????? ?????????? ???????? ???? ????????, ?????? ???????????? ?????????????? ?????????? ???????? ????????.',
          );
          this.props.navigation.navigate('HomeStackNav');
        }
      },
    );
  }

  componentWillUnmount() {
    this.didFocusListener.remove();
  }

  handleBackPress = () => {
    this.setState({
      realEstate: null,
      forEditing: false,
      selectedLocation: null,
      selectedPourpose: null,
      selectedStatus: null,
      selectedType: null,
      price: null,
    });

    // return this.props.navigation.jumpTo('MyRealEstate')
    return (
      this.props.navigation.goBack() ||
      this.props.navigation.dispatch(
        StackActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({ routeName: 'bottomTab' })],
        }),
      )
    );
  };

  componentWillReceiveProps = nextProps => {
    if (nextProps.info !== this.props.info) {
      this.setState({ loading: false, info: nextProps.info });
      if (this.state.forEditing) {
        this.setState(s => ({
          selectedStatus: s.realEstate.status && s.realEstate.status,
          selectedType: s.realEstate.type && s.realEstate.type,
          price: s.realEstate.price && s.realEstate.price.toString(),
          selectedLocation: s.realEstate.address && {
            latitude: s.realEstate.address.coordinates[0],
            longitude: s.realEstate.address.coordinates[1],
            address:
              s.realEstate.address.address && s.realEstate.address.address,
            city: s.realEstate.address.city && s.realEstate.address.city,
          },
          selectedPurpose: s.realEstate.purpose && s.realEstate.purpose,
          payType: s.realEstate.payType && { _id: s.realEstate.payType },
          populationType:
            s.realEstate.populationType && s.realEstate.populationType,
          isSwitchOn:
            s.realEstate.type.nameEn === 'land' &&
            (!s.realEstate.price || s.realEstate.price === 0),
        }));
        if (!this.props.user.token) {
          return this.setState({
            showAlert: true,
            alertMessage: '?????? ?????????? ???????????? ???????????? ??????????',
          });
        }
      }
    }
  };

  convertNumbers2English(string) {
    return string
      .replace(/[????????????????????]/g, function(c) {
        return c.charCodeAt(0) - 1632;
      })
      .replace(/[????????????????????]/g, function(c) {
        return c.charCodeAt(0) - 1776;
      });
  }

  handleLogin = () => {
    this.setState({ showAlert: false });
    if (!this.props.user || !this.props.user.token) {
      return this.props.navigation.navigate('LoginPage');
    }

    this.props.navigation.navigate('Profile');
  };

  onNextPress = () => {
    const {
      selectedType,
      price,
      selectedLocation,
      selectedStatus,
      selectedPurpose,
      forEditing,
      realEstate,
      payType,
      populationType,
    } = this.state;

    let porposeDismas =
      selectedType &&
      (selectedType.nameEn === 'flat' ||
        selectedType.nameEn === 'room' ||
        selectedType.nameEn === 'office' ||
        selectedType.nameEn === 'shop' ||
        selectedType.nameEn === 'store' ||
        selectedType.nameEn === 'villa' ||
        selectedType.nameEn === 'floor');

    const paymentFlag = selectedStatus && selectedStatus.nameEn === 'rent';

    const populationFlag =
      selectedType &&
      (selectedType.nameEn === 'flat' || selectedType.nameEn === 'floor') &&
      selectedStatus &&
      selectedStatus.nameEn === 'rent';

    if (!this.props.user.token) {
      return onError('?????? ?????????? ???????????? ???????????? ??????????');
    }

    if (!selectedStatus) {
      return this.setState({
        showErrorMessage: true,
        errorMessage: '???????????? ???????????? ???????? ????????????',
      });
    }
    if (!selectedType) {
      return this.setState({
        showErrorMessage: true,
        errorMessage: '???????????? ???????????? ?????? ????????????',
      });
    }
    if (!porposeDismas && !selectedPurpose) {
      return this.setState({
        showErrorMessage: true,
        errorMessage: '???????????? ???????????? ?????????? ???? ????????????',
      });
    }

    if (populationFlag && !populationType) {
      return this.setState({
        showErrorMessage: true,
        errorMessage: '???????????? ???????????? ?????? ????????????????',
      });
    }

    if (paymentFlag && !payType) {
      return this.setState({
        showErrorMessage: true,
        errorMessage: '???????????? ???????????? ?????? ??????????????  ',
      });
    }

    if (
      (!price && selectedType.nameEn !== 'land') ||
      (!this.state.isSwitchOn && !price && selectedType.nameEn === 'land')
    ) {
      return this.setState({
        showErrorMessage: true,
        errorMessage: '???????????? ?????????? ??????????',
      });
    }

    if (!selectedLocation) {
      return this.setState({
        showErrorMessage: true,
        errorMessage: '???????????? ?????????? ???????? ????????????',
      });
    }

    let s = { ...this.state.realEstate };
    // selectedSides.length > 0 && _.merge(s, {selectedSides})
    // {realEstate: { , purpose: selectedPurpose._id, price, address:{ lat: this.state.selectedLocation.latitude, long: this.state.selectedLocation.longitude}
    selectedStatus && _.merge(s, { status: selectedStatus });
    // if( selectedSides.length > 0 )
    //     s.selectedSides = selectedSides
    selectedType && _.merge(s, { type: selectedType });
    price && _.merge(s, { price: this.convertNumbers2English(price) });
    _.merge(s, {
      purpose: selectedPurpose
        ? selectedPurpose
        : this.props.info && this.state.info.realEstatePurpose[1],
    });
    populationType && _.merge(s, { populationType: populationType });

    payType && _.merge(s, { payType: payType._id });

    selectedLocation &&
      _.merge(s, {
        address: {
          lat: this.state.selectedLocation.latitude,
          long: this.state.selectedLocation.longitude,
          address: this.state.selectedLocation.address || 'from mobile',
          city: this.state.selectedLocation.city,
        },
      });

    _.merge(s, {
      completePercentage:
        Object.keys(s).length > 4 ? 33 : Object.keys(s).length * 10,
    });
    this.props.navigation.navigate('SecondStepAddAqar', {
      forEditing: forEditing,
      realEstate: s,
    });
  };

  render() {
    const { statusPage, selectedType, selectedStatus } = this.state;

    if (this.state.loading) {
      return (
        <View style={{ flex: 1 }}>
          <Header
            headerTitle={'?????????????? ????????????'}
            noBackButton={statusPage === 0}
            onBackPress={this.onBackPress}
          />
          <ActivityIndicator
            style={{ alignSelf: 'center', marginTop: 120 }}
            color={Colors.darkSeafoamGreen}
          />
        </View>
      );
    }

    let porposeDismas =
      selectedType &&
      (selectedType.nameEn === 'flat' ||
        selectedType.nameEn === 'room' ||
        selectedType.nameEn === 'office' ||
        selectedType.nameEn === 'shop' ||
        selectedType.nameEn === 'store' ||
        selectedType.nameEn === 'villa' ||
        selectedType.nameEn === 'floor');

    const paymentFlag = selectedStatus && selectedStatus.nameEn === 'rent';

    const populationFlag =
      selectedType &&
      (selectedType.nameEn === 'flat' || selectedType.nameEn === 'floor') &&
      selectedStatus &&
      selectedStatus.nameEn === 'rent';

    const daily =
      selectedStatus &&
      selectedStatus.nameEn === 'rent' &&
      selectedType &&
      (selectedType.nameEn === 'room' || selectedType.nameEn === 'flat');

    const land = selectedType && selectedType.nameEn === 'land';

    return (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={{ flex: 1 }}>
          <Header
            headerTitle={'?????????????? ????????????'}
            noBackButton={false}
            onBackPress={this.handleBackPress}
          />

          <ProgressBar
            progress={statusPage * 0.25}
            persentageNumber={statusPage * 25}
            containerStyle={{ marginTop: 30 }}
          />

          <KeyboardAwareScrollView style={{ marginBottom: 100 }}>
            <TouchableWithoutFeedback>
              <View>
                {/* <Text style={[Fonts.style.mainTitle, {marginTop: 40, alignSelf: 'flex-end', marginEnd: 16 }]}> ???????? ?????? ???????????? </Text> */}

                <RealEstateTypesList
                  selectedType={i => this.setState({ selectedType: i })}
                  selectedTypeByProps={
                    this.state.forEditing && this.state.selectedType
                  }
                  containerStyle={{ marginEnd: 20 }}
                  types={this.state.info && this.state.info.realEstateTypes}
                />

                <MainTypes
                  status={this.state.info && this.state.info.realEstateStatus}
                  doAnimation={true}
                  statusPress={i => this.setState({ selectedStatus: i })}
                  selectedType={this.state.selectedStatus}
                />

                {/* { !porposeDismas && <Text style={[Fonts.style.mainTitle, {marginTop: 40, alignSelf: 'flex-end', marginEnd: 16 }]}> ?????????? ???? ???????????? </Text>} */}

                {populationFlag && (
                  <RealEstateTypesList
                    selectedType={i => this.setState({ populationType: i })}
                    selectedTypeByProps={this.state.populationType}
                    containerStyle={{ marginEnd: 20, marginTop: 20 }}
                    types={
                      this.props.info &&
                      this.props.info.realEstatePopulationType
                    }
                  />
                )}

                {!porposeDismas && (
                  <MainTypes
                    // selectedPourposeByProps={this.state.forEditing && this.state.realEstate.purpose && this.state.realEstate.purpose}
                    selectedType={this.state.selectedPurpose}
                    statusPress={i => this.setState({ selectedPurpose: i })}
                    status={
                      this.state.info && this.state.info.realEstatePurpose
                    }
                    doAnimation={true}
                  />
                )}

                {/* {paymentFlag && <Text style={[Fonts.style.mainTitle, { alignSelf: 'flex-end', marginEnd: 16, marginTop: 20 }]}> ?????? ??????????????</Text>} */}

                {paymentFlag && (
                  <RealEstateTypesList
                    selectedType={i => this.setState({ payType: i })}
                    selectedTypeByProps={this.state.payType}
                    containerStyle={{
                      marginEnd: 20,
                      marginTop: 15,
                      marginBottom: 15,
                    }}
                    types={
                      daily
                        ? [
                            { _id: 0, nameAr: '????????' },
                            { _id: 1, nameAr: '????????' },
                            { _id: 2, nameAr: '????????' },
                          ]
                        : [
                            { _id: 0, nameAr: '????????' },
                            { _id: 1, nameAr: '????????' },
                          ]
                    }
                  />
                )}

                {land && (
                  <View
                    style={{
                      flexDirection: 'row-reverse',
                      alignItems: 'center',
                      marginHorizontal: 20,
                      paddingStart: 12,
                      marginTop: 35,
                    }}>
                    <Switch
                      value={this.state.isSwitchOn}
                      onValueChange={() =>
                        this.setState(s => ({ isSwitchOn: !s.isSwitchOn }))
                      }
                      color={Colors.darkSeafoamGreen}
                      style={{ direction: 'ltr' }}
                    />

                    <Text style={[Fonts.style.normal, { marginEnd: 10 }]}>
                      {' ?????? ??????????'}
                    </Text>
                  </View>
                )}

                {!this.state.loading && (!this.state.isSwitchOn || !land) && (
                  <Input
                    withButton={true}
                    number={true}
                    onChangeText={val => this.setState({ price: val })}
                    inputValue={this.state.price}
                    containerStyle={{ marginTop: land ? 15 : 35 }}
                    withDesc
                    desc={'???????? ??????????'}
                    InputPlaceHolder={'??????????'}
                  />
                )}

                <InputButton
                  onPress={() => {
                    this.setState({ mapModalVisabl: true });
                    Keyboard.dismiss();
                  }}
                  InputPlaceHolder={
                    (this.state.selectedLocation &&
                      this.state.selectedLocation.address) ||
                    (this.state.selectedLocation &&
                      this.state.selectedLocation.latitude +
                        ',' +
                        this.state.selectedLocation.longitude) ||
                    '?????? ???????? ????????????'
                  }
                  Icon={Images.userLocationIcon}
                  containerStyle={{ marginTop: 18 }}
                />
                <View
                  style={{
                    flexDirection: 'row-reverse',
                    justifyContent: 'space-around',
                    alignItems: 'center',
                  }}>
                  <Pagination
                    dotsLength={5}
                    activeDotIndex={statusPage}
                    containerStyle={{
                      maxWidth: 200,
                      flexWrap: 'wrap',
                      transform: [{ rotate: '180deg' }],
                    }}
                    dotStyle={{
                      backgroundColor: Colors.darkSeafoamGreen,
                    }}
                    inactiveDotStyle={{
                      width: 8,
                      height: 8,
                      borderRadius: 4,
                      marginHorizontal: 0,
                      backgroundColor: '#e6e6e6',
                    }}
                    inactiveDotOpacity={1}
                    inactiveDotScale={1}
                  />
                  <TouchableOpacity onPress={this.onNextPress}>
                    {this.state.btnLoading ? (
                      <ActivityIndicator color={Colors.darkSeafoamGreen} />
                    ) : (
                      <View style={{ flexDirection: 'row' }}>
                        <Text style={[Fonts.style.normal]}> {'<'} </Text>
                        <Text style={[Fonts.style.normal]}>
                          {this.state.mapModalVisabl || '????????????'}
                        </Text>
                      </View>
                    )}
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </KeyboardAwareScrollView>

          <AlertModal
            closePress={this.handleBackPress}
            closeErrorModel={this.handleLogin}
            buttonText={!this.props.user ? '?????????? ????????????' : '?????????? ?????? ????????????'}
            contentMessage={this.state.alertMessage}
            isVisible={this.state.showAlert}
          />

          {this.state.showErrorMessage && (
            <ErroAlert
              errorMessage={this.state.errorMessage}
              setAnimation={() => this.setState({ showErrorMessage: false })}
              doAnimation={this.state.showErrorMessage}
            />
          )}

          {this.state.mapModalVisabl && (
            <MapModal
              selectedLocation={(x, y, z) => {
                this.setState({
                  mapModalVisabl: false,
                  selectedLocation: { ...x, address: y, city: z },
                });
              }}
              onClosePress={() => this.setState({ mapModalVisabl: false })}
            />
          )}

          {/* <Modal
                        isVisible={showSucessModal}
                        style={{backgroundColor: '#fff', flex:1, backgroundColor:'#fff', justifyContent:'center', alignItems:'center'}}
                        backdropOpacity={1}
                        backdropColor={'#fff'}
                    >

                        <Image source={Images.registrationFinishImage}  />

                        <Text style={[Fonts.style.boldText, {fontSize: 18, marginTop: 25}]}>???? ?????????? ???????????? ??????????</Text>
                        <Text style={[Fonts.style.normal, {fontSize: 14, marginTop: 19, marginBottom: 50, color: Colors.darkSlateBlue, textAlign: 'center' , fontWeight: 'normal' }]}>???????? ! ?????????? ?????????????? ?????? ?????????? ???????????????? ???????????? ???? ???? ???????? ???????????? ?????? ?????? ??????????????</Text>

                        <Button  buttonText={'?????????? ??????????????'} onPress={()=>this.nav('myRealEstate')} />
                        <Button textPropsStyle={{color:'#000'}} containerStyle={{backgroundColor: '#fff', marginTop: 29}} buttonText={'????????????????'} onPress={()=>this.nav('home')} />
                    </Modal> */}
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  getInfo: () => dispatch(RealEstateAction.getAddingAqarInfo()),
  addRealEstate: (
    selectedStatus,
    selectedType,
    selectedPurpose,
    price,
    lat,
    long,
    token,
  ) =>
    dispatch(
      RealEstateAction.addRealEstate(
        selectedStatus,
        selectedType,
        selectedPurpose,
        price,
        lat,
        long,
        token,
      ),
    ),
});

const mapStateToProps = state => {
  return {
    info: state.realEstate.AddingAqarInfo,
    user: state.user.user && state.user.user.user && state.user.user.user,
    realEstate:
      state.realEstate.addAqarSuccess &&
      state.realEstate.addAqarSuccess.realEstate,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(firstStepAddAqar);

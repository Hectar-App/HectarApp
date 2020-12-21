import React, {useEffect, useState} from 'react';
import {
  View,
  Animated,
  Platform,
  Text,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import {StackActions, NavigationActions} from 'react-navigation';
import _ from 'lodash';

import Header from '../../../Component/Header';
import MainTypes from '../../../Component/MainFilterTypes';
import {Fonts, Colors, Metrics} from '../../../Themes';

import {Pagination} from 'react-native-snap-carousel';
import ProgressBar from '../../../Component/ProgressBar';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import RealestateType from '../../../Component/realestateType';
import CountWithTitle from '../../../Component/CountWithTitle';
import RangeItem from '../../../Component/rangeItem';
import Button from '../../../Component/Button';

import RealEstateTypesList from '../../../Component/RealestateTypeList';
import RadioButton from '../../../Component/RadioButtonList';

import {useAnimation} from '../../../assets/Animation/animation';

import AlertModal from '../../../Component/Alert';
import ErroAlert from '../../../Component/ErrorAlert';

import * as Progress from 'react-native-progress';
import {ifIphoneX} from 'react-native-iphone-x-helper';
import {connect} from 'react-redux';

import api from '../../../Services/API';

const API = api.create();

thirdStepAddingAqar = props => {
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState();

  const [loading, setLoading] = useState(false);
  const [realEstate, setRealEstate] = useState(
    props.navigation.state.params && props.navigation.state.params.realEstate,
  );
  const [forEditing, setForEditing] = useState(
    props.navigation.getParam('forEditing'),
  );
  const [selectedSides, setSelectedSides] = useState(
    forEditing && realEstate && realEstate.selectedSides
      ? realEstate.selectedSides
      : [],
  );

  const compaond =
    realEstate.type.nameAr === 'مجمع سكني' ||
    realEstate.type.nameEn === 'building';
  const flatAndFlor =
    realEstate.type.nameEn === 'flat' || realEstate.type.nameEn === 'floor';

  const [number, setNumber] = useState(4);

  const onNextPress = () => {
    let s = {...realEstate};

    if (selectedSides.length > 0) {
      s.selectedSides = selectedSides;
      s.completePercentage = s.completePercentage + 15;
    }
    props.navigation.navigate('ForthStepAddAqar', {
      realEstate: s,
      forEditing: forEditing,
    });
  };

  const sideSelected = i => {
    console.log('item', i);
    const index = selectedSides.findIndex(item => item === i);
    let s = [...selectedSides];
    if (selectedSides.length === number) {
      index !== -1 ? s.splice(index, 1) : null;
    } else {
      index !== -1 ? s.splice(index, 1) : s.push(i);
    }
    // if(s.length === number ){
    //     return
    // }
    setSelectedSides(s);
    console.log('index', s);
  };

  const saveUpdate = async () => {
    let s = {...realEstate};
    if (selectedSides.length > 0) s.selectedSides = selectedSides;
    setLoading(true);
    const res = await API.updateRealEstate(s, props.user.token);
    setLoading(false);
    console.log('res', res);
    if (res && res.ok) {
      // alert('Done')
      return props.navigation.pop(3);
      // return props.navigation.dispatch(StackActions.reset({
      //     index: 0,
      //     actions: [NavigationActions.navigate({ routeName: 'bottomTab' })],
      // }))
    }
  };

  console.log(props);

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={{flex: 1}}>
        <Header
          loading={loading}
          forEditing={forEditing}
          saveUpdate={() => saveUpdate()}
          headerTitle={'خصائص ووميزات'}
          onBackPress={() => props.navigation.goBack()}
        />

        <ProgressBar
          progress={realEstate.completePercentage / 100}
          persentageNumber={realEstate.completePercentage}
          containerStyle={{marginTop: 30}}
        />

        <KeyboardAwareScrollView>
          <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={{flex: 1, paddingBottom: 200, paddingTop: 30}}>
              {/* <CountWithTitle title={ 'عدد الشوارع'} number={number} onIncreasePress={()=>setNumber(s => s = s === 4 ? 4: ++s )}  onDecreasePress={()=>setNumber(s => s = --s )} /> */}

              <Text
                style={[
                  Fonts.style.normal,
                  {
                    fontSize: 18,
                    alignSelf: 'flex-end',
                    marginTop: 35,
                    marginEnd: 16,
                    fontWeight: Platform.OS === 'android' ? '300' : '300',
                    color: Colors.black,
                  },
                ]}>
                {'الأرض مُطلة على شارع من الناحية:'}
              </Text>
              {
                <RealEstateTypesList
                  selectedFeatures={selectedSides}
                  forEditeng={true}
                  features={['0', '1', '2', '3']}
                  onItemPress={i => sideSelected(i)}
                  containerStyle={{marginTop: 26}}
                />
              }

              {/* <RealEstateTypesList selectedFeatures={selectedFeatures} features={props.info && props.info.realEstateFeatures} onItemPress={(i) => featureSelected(i)} containerStyle={{marginTop: 26}} /> */}
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAwareScrollView>

        <AlertModal contentMessage={alertMessage} isVisible={showAlert} />

        {showErrorMessage && (
          <ErroAlert
            errorMessage={errorMessage}
            setAnimation={() => setShowErrorMessage(false)}
            doAnimation={showErrorMessage}
          />
        )}

        <Pagination
          dotsLength={5}
          activeDotIndex={2}
          containerStyle={{
            maxWidth: 200,
            flexWrap: 'wrap',
            transform: [{rotate: '180deg'}],
            position: 'absolute',
            bottom: 100,
            right: 10,
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
        <TouchableOpacity
          style={{position: 'absolute', bottom: 125, left: 50, zIndex: 999}}
          onPress={onNextPress}>
          <View style={{flexDirection: 'row'}}>
            <Text style={[Fonts.style.normal]}> {'<'} </Text>
            <Text style={[Fonts.style.normal]}>التالي</Text>
          </View>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
};

const mapDispatchToProps = dispatch => ({
  updateRealEstate: () => dispatch(RealEstateAction.updateRealEstate()),
  //     addRealEstate: (selectedStatus, selectedType, selectedPurpose, price, lat, long, token)=> dispatch(RealEstateAction.addRealEstate(selectedStatus, selectedType, selectedPurpose, price, lat, long, token)),
});

const mapStateToProps = state => {
  console.log('state', state);
  return {
    info: state.realEstate.AddingAqarInfo,
    user: state.user.user && state.user.user.user && state.user.user.user,
    // realEstate: state.realEstate.addAqarSuccess && state.realEstate.addAqarSuccess.realEstate
  };
};

export default connect(
  mapStateToProps,
  null,
)(thirdStepAddingAqar);

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
  const Animation = useAnimation({doAnimation: true, duration: 550});

  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState();

  const [realEstate, setRealEstate] = useState(
    props.navigation.state.params && props.navigation.state.params.realEstate,
  );
  const [forEditing, setForEditing] = useState(
    props.navigation.getParam('forEditing'),
  );

  const [selectedFeatures, setSelectedFeatures] = useState(
    (props.navigation.getParam('realEstate') &&
      props.navigation.getParam('realEstate').features) ||
      [],
  );

  const [features, setFeatures] = useState([
    {_id: 1, nameAr: 'انترنت'},
    {_id: 2, nameAr: 'صالة جيم'},
    {_id: 5, nameAr: 'بالقرب من مدرسة '},
    {_id: 4, nameAr: 'كراج'},
    {_id: 3, nameAr: 'حوض سباحة'},
    {_id: 6, nameAr: 'نوافذ مبطنة'},
  ]);
  const compaond =
    realEstate.type.nameAr === 'مجمع سكني' ||
    realEstate.type.nameEn === 'building';
  const flatAndFlor =
    realEstate.type.nameEn === 'flat' || realEstate.type.nameEn === 'floor';

  console.log('Third props', props);
  const [loading, setLoading] = useState(false);
  const [number, setNumber] = useState(
    (forEditing &&
      realEstate &&
      realEstate.numberOfLivingRoom &&
      realEstate.numberOfLivingRoom) ||
      0,
  );
  const [slepNumber, setSlepNumber] = useState(
    (forEditing &&
      realEstate &&
      realEstate.numberOfRooms &&
      realEstate.numberOfRooms) ||
      0,
  );
  const [BRnumber, setBRNumber] = useState(
    (forEditing &&
      realEstate &&
      realEstate.numberOfBathRoom &&
      realEstate.numberOfBathRoom) ||
      0,
  );
  const [numberOfUnit, setNumberOfUnit] = useState(
    (forEditing &&
      realEstate &&
      realEstate.numberOfKitchenUnit &&
      realEstate.numberOfKitchenUnit) ||
      0,
  );
  const [numberOfKUnit, setNumberOfKUnit] = useState(
    (forEditing &&
      realEstate &&
      realEstate.numberOfLivingRoom &&
      realEstate.numberOfLivingRoom) ||
      0,
  );
  // const [Knumber, setKNumber]= useState(1)
  const [numberOfFlats, setNumberOfFlats] = useState(0);
  const [numberOfFlor, setNumberOfFlor] = useState(
    (forEditing &&
      realEstate &&
      realEstate.floor &&
      realEstate.floor.toString()) ||
      0,
  );

  const onNextPress = () => {
    if (
      slepNumber <= 0 &&
      numberOfUnit <= 0 &&
      realEstate.type.nameEn !== 'room'
    )
      if (slepNumber <= 0) {
        setErrorMessage(
          compaond ? 'الرجاء ادخال عدد الوحدات' : 'الرجاء ادخال عدد الغرف',
        );
        return setShowErrorMessage(true);
        // return alert('الرجاء ادخال عدد الغرف')
      } else {
        setErrorMessage('الرجاء ادخال عدد الوحدات');
        return setShowErrorMessage(true);
        // return alert('الرجاء ادخال عدد الوحدات')
      }
    let s = {...realEstate};
    number &&
      _.merge(s, {
        numberOfLivingRoom: number,
      });
    slepNumber &&
      _.merge(s, {
        numberOfRooms: slepNumber,
        completePercentage: 8.33333333 + s.completePercentage,
      });
    BRnumber &&
      _.merge(s, {
        numberOfBathRoom: BRnumber,
      });
    numberOfFlor &&
      _.merge(s, {
        floor: numberOfFlor,
      });
    numberOfUnit &&
      _.merge(s, {
        numberOfUnit,
        completePercentage: s.completePercentage + 8.33333333,
      });
    numberOfKUnit &&
      _.merge(s, {
        numberOfKitchenUnit: numberOfKUnit,
      });
    features.length > 0 &&
      _.merge(s, {
        features: selectedFeatures,
        completePercentage: s.completePercentage + 8.33333333,
      });
    // console.log('NewRealEstate', s)
    props.navigation.navigate('ForthStepAddAqar', {
      realEstate: s,
      forEditing: forEditing,
    });
  };

  const featureSelected = i => {
    console.log('item', i);
    const index = selectedFeatures.findIndex(item => item._id === i._id);
    let s = [...selectedFeatures];
    index !== -1 ? s.splice(index, 1) : s.push(i);
    setSelectedFeatures(s);
    console.log('index', index);
  };

  const saveUpdate = async () => {
    if (slepNumber <= 0 && numberOfUnit <= 0)
      if (slepNumber <= 0) {
        setErrorMessage('الرجاء ادخال عدد الغرف');
        return setShowErrorMessage(true);
      } else {
        setErrorMessage('الرجاء ادخال عدد الوحدات');
        return setShowErrorMessage(true);
      }
    let s = {...realEstate};
    number && _.merge(s, {numberOfLivingRoom: number});
    slepNumber && _.merge(s, {numberOfRooms: slepNumber});
    BRnumber && _.merge(s, {numberOfBathRoom: BRnumber});
    numberOfFlor && _.merge(s, {floor: numberOfFlor});

    numberOfUnit && _.merge(s, {numberOfUnit});
    numberOfKUnit && _.merge(s, {numberOfKitchenUnit: numberOfKUnit});
    features.length > 0 && _.merge(s, {features: selectedFeatures});
    console.log('token', props.user.token);

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

  const numberOfSh = realEstate.type.nameAr === 'ارض';
  const villa = realEstate.type.nameEn === 'villa';
  // const compaond = realEstate.type.nameAr === "مجمع سكني"  || realEstate.type.nameEn === "building"

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
            <View style={{flex: 1, paddingBottom: 200, paddingTop: 20}}>
              {/* <Text style={[Fonts.style.normal,{fontSize: 18, alignSelf:'flex-end', marginTop: 58, marginEnd: 16, fontWeight: Platform.OS === 'android'?'400': "bold", color: Colors.black}]} >{'خصائص العقار'}</Text> */}

              {compaond && (
                <CountWithTitle
                  title={'عدد الوحدات'}
                  number={numberOfUnit}
                  onIncreasePress={() => setNumberOfUnit(s => (s = ++s))}
                  onDecreasePress={() =>
                    setNumberOfUnit(s => (s = s === 0 ? 0 : --s))
                  }
                />
              )}
              {compaond && realEstate.type.nameEn !== 'room' ? (
                <CountWithTitle
                  title={'عدد الغرف في كل وحدة'}
                  number={slepNumber}
                  onIncreasePress={() => setSlepNumber(s => (s = ++s))}
                  onDecreasePress={() =>
                    setSlepNumber(s => (s = s === 0 ? 0 : --s))
                  }
                />
              ) : (
                realEstate.type.nameEn !== 'room' && (
                  <CountWithTitle
                    title={'عدد الغرف'}
                    number={slepNumber}
                    onIncreasePress={() => setSlepNumber(s => (s = ++s))}
                    onDecreasePress={() =>
                      setSlepNumber(s => (s = s === 0 ? 0 : --s))
                    }
                  />
                )
              )}
              {numberOfSh && (
                <CountWithTitle
                  title={'عدد الشقق'}
                  number={numberOfFlats}
                  onIncreasePress={() => setNumberOfFlats(s => (s = ++s))}
                  onDecreasePress={() =>
                    setNumberOfFlats(s => (s = s === 0 ? 0 : --s))
                  }
                />
              )}

              <CountWithTitle
                title={compaond ? 'عدد الصالات في كل وحدة' : 'الصالات'}
                number={number}
                onIncreasePress={() => setNumber(s => (s = ++s))}
                onDecreasePress={() => setNumber(s => (s = s === 0 ? 0 : --s))}
              />

              <CountWithTitle
                title={compaond ? 'عدد دورات المياه في كل وحدة' : 'دورة مياه'}
                number={BRnumber}
                onIncreasePress={() => setBRNumber(s => (s = ++s))}
                onDecreasePress={() =>
                  setBRNumber(s => (s = s === 0 ? 0 : --s))
                }
              />

              <CountWithTitle
                title={compaond || villa ? 'عدد الادوار' : 'رقم الدور'}
                number={numberOfFlor}
                onIncreasePress={() => setNumberOfFlor(s => (s = ++s))}
                onDecreasePress={() =>
                  setNumberOfFlor(s => (s = s === 0 ? 0 : --s))
                }
              />

              {compaond ||
                (flatAndFlor && (
                  <CountWithTitle
                    containerStyle={{}}
                    title={compaond ? 'عدد المطابخ في كل وحدة' : 'المطبخ'}
                    number={numberOfKUnit}
                    onIncreasePress={() => setNumberOfKUnit(s => (s = ++s))}
                    onDecreasePress={() =>
                      setNumberOfKUnit(s => (s = s === 0 ? 0 : --s))
                    }
                  />
                ))}

              {/* <Text style={[Fonts.style.normal,{fontSize: 18, alignSelf:'flex-end', marginTop: 58, marginEnd: 16, fontWeight: Platform.OS === 'android'?'400': "bold", color: Colors.black}]} >{'ميزات إضافية '}</Text> */}

              <RealEstateTypesList
                selectedFeatures={selectedFeatures}
                features={props.info && props.info.realEstateFeatures}
                onItemPress={i => featureSelected(i)}
                containerStyle={{marginTop: 26}}
              />

              <View
                style={{
                  flexDirection: 'row-reverse',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginTop: 20,
                  marginHorizontal: 12,
                  zIndex: 9999,
                }}>
                <Pagination
                  dotsLength={5}
                  activeDotIndex={2}
                  // containerStyle={{ maxWidth: 200, flexWrap: 'wrap', transform: [{rotate: '180deg',}],
                  // // position: 'absolute', bottom: 100, right: 10
                  // }}
                  containerStyle={{
                    maxWidth: 200,
                    flexWrap: 'wrap',
                    transform: [{rotate: '180deg'}],
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
                  style={{
                    //  position: 'absolute', bottom: 125, left: 50,
                    zIndex: 999,
                  }}
                  onPress={onNextPress}>
                  <View style={{flexDirection: 'row'}}>
                    <Text style={[Fonts.style.normal]}> {'<'} </Text>
                    <Text style={[Fonts.style.normal]}>التالي</Text>
                  </View>
                </TouchableOpacity>
              </View>
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

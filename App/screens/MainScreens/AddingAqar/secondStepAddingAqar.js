import React, {useEffect, useState} from 'react';
import {
  View,
  Animated,
  Text,
  Keyboard,
  TouchableWithoutFeedback,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {StackActions, NavigationActions} from 'react-navigation';

import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import {Fonts, Colors, Metrics, Images} from '../../../Themes';
import Header from '../../../Component/Header';
import {Pagination} from 'react-native-snap-carousel';
import ProgressBar from '../../../Component/ProgressBar';

import InputButton from '../../../Component/InputButton';
import Input from '../../../Component/Input';
import RealEstateTypesList from '../../../Component/RealestateTypeList';
import _ from 'lodash';

import {useAnimation} from '../../../assets/Animation/animation';

import AlertModal from '../../../Component/Alert';
import ErroAlert from '../../../Component/ErrorAlert';

import * as Progress from 'react-native-progress';
import {ifIphoneX} from 'react-native-iphone-x-helper';

import {connect} from 'react-redux';
import RealEstateAction from '../../../Redux/RealEstateRedux';

import api from '../../../Services/API';

const API = api.create();

secondStepAddingAqar = props => {
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState();

  const [loading, setLoading] = useState(false);
  const [forEditing, setForEditing] = useState(
    props.navigation.getParam('forEditing'),
  );
  const [realEstate, setRealEstate] = useState(
    props.navigation.state.params.realEstate,
  );
  const [selectedSides, setSelectedSides] = useState(
    forEditing && realEstate && realEstate.selectedSides
      ? realEstate.selectedSides
      : [],
  );
  const [space, setSpace] = useState(
    (forEditing &&
      realEstate &&
      realEstate.space &&
      realEstate.space.toString()) ||
      '',
  );
  const [realEstateAge, setRealEstateAge] = useState(
    (forEditing && realEstate && realEstate.age && realEstate.age.toString()) ||
      '',
  );
  // const [ numberOfFlor, setNumberOfFlor ] = useState(forEditing && realEstate && realEstate.floor && realEstate.floor.toString() || '')
  const [notes, setNotes] = useState(
    (forEditing && realEstate && realEstate.notes && realEstate.notes) || '',
  );
  const [selectedPopulationType, setSelectedPopulationType] = useState();
  // const [ payType, setPayType ] = useState(forEditing && realEstate && realEstate.payType && realEstate.payType)
  const [payType, setPayType] = useState();
  const [streetWidth, setStreetWidth] = useState(
    forEditing && realEstate && realEstate.streetWidth
      ? realEstate.streetWidth.toString()
      : '',
  );

  const earth = forEditing
    ? realEstate.type.nameAr === 'ارض'
    : realEstate.type.nameAr === 'ارض';
  const compaond = forEditing
    ? realEstate.type === '5e41786a48e2f5185ac4b090'
    : realEstate.type === '5e41786a48e2f5185ac4b090';

  const onNextPress = async () => {
    // if(notes && (notes || '').length < 30){
    //     setShowErrorMessage(true)
    //     setErrorMessage('يجب كتابة 50 حرف على الاقل ')
    //     return
    // }

    let s = {...realEstate};

    notes &&
      _.merge(s, {
        notes,
        completePercentage: 8.33333333 + s.completePercentage,
      });
    realEstateAge &&
      _.merge(s, {
        age: parseArabic(realEstateAge),
      });
    streetWidth && _.merge(s, {streetWidth});
    space &&
      _.merge(s, {
        space: parseArabic(space),
        completePercentage: 7 + s.completePercentage,
      });

    console.log('s', s);
    props.navigation.navigate(
      earth ? 'EarthThirdStepAddAqar' : 'ThirdStepAddAqar',
      {realEstate: s, forEditing: forEditing},
    );
  };

  const sideSelected = i => {
    console.log('item', i);
    const index = selectedSides.findIndex(item => item === i);
    let s = [...selectedSides];
    index !== -1 ? s.splice(index, 1) : s.push(i);
    setSelectedSides(s);
    console.log('index', s);
  };

  console.log('props', realEstate);

  const populationFlag =
    realEstate.type &&
    (realEstate.type.nameEn === 'building' ||
      realEstate.type.nameEn === 'flat' ||
      realEstate.type.nameEn === 'floor') &&
    realEstate.status.nameEn === 'rent';

  // const paymentFlag = realEstate.status.nameAr === "للايجار" && !(realEstate.status._id === '5e41754c48e2f5185ac4b08f')

  // const daily = realEstate.status.nameAr === "للايجار" && (realEstate.type.nameEn === 'room' || realEstate.type.nameEn === 'flat')

  const parseArabic = str => {
    return Number(
      str
        .replace(/[٠١٢٣٤٥٦٧٨٩]/g, function(d) {
          return d.charCodeAt(0) - 1632; // Convert Arabic numbers
        })
        .replace(/[۰۱۲۳۴۵۶۷۸۹]/g, function(d) {
          return d.charCodeAt(0) - 1776; // Convert Persian numbers
        }),
    );
  };

  const saveUpdate = async () => {
    let s = {...realEstate};
    notes &&
      _.merge(s, {
        notes,
        completePercentage: 8.33333333 + s.completePercentage,
      });
    realEstateAge &&
      _.merge(s, {
        age: parseArabic(realEstateAge),
      });
    streetWidth && _.merge(s, {streetWidth});
    space &&
      _.merge(s, {
        space: parseArabic(space),
        completePercentage: s.completePercentage + 7,
      });

    setLoading(true);

    const res = await API.updateRealEstate(s, props.user.token);
    setLoading(false);
    console.log('res', res);
    if (res && res.ok) {
      // alert('Done')
      return props.navigation.pop(2);
      // return props.navigation.dispatch(StackActions.reset({
      //     index: 0,
      //     actions: [NavigationActions.navigate({ routeName: 'bottomTab' })],
      // }))
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={{flex: 1}}>
        <Header
          loading={loading}
          forEditing={forEditing}
          saveUpdate={() => saveUpdate()}
          headerTitle={'تفاصيل إضافية'}
          onBackPress={() => props.navigation.goBack()}
        />

        <ProgressBar
          progress={realEstate.completePercentage / 100}
          persentageNumber={realEstate.completePercentage}
          containerStyle={{marginTop: 30}}
        />

        <KeyboardAwareScrollView bounces={false}>
          <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View
              style={{
                flex: 1,
                paddingTop: 39,
                height: Metrics.screenHeight - 260,
                paddingBottom: 140,
              }}>
              {/* {   populationFlag && 
                                (
                                    <RealEstateTypesList selectedType={(i)=> setSelectedPopulationType(i) } selectedTypeByProps={selectedPopulationType} containerStyle={{marginEnd: 20, marginBottom: 20}} types={props.info && props.info.realEstatePopulationType} />
                                )
                            } */}
              {/* {paymentFlag && <Text style={[Fonts.style.mainTitle, { alignSelf: 'flex-end', marginEnd: 16 }]}> مدة التأجير</Text>}

                            {   paymentFlag && 
                                (
                                    <RealEstateTypesList selectedType={(i)=> setPayType(i) } selectedTypeByProps={payType} containerStyle={{marginEnd: 20, marginTop: 15, marginBottom: 15}} types={daily ? [{_id: 0, nameAr: 'سنوي'}, {_id: 1, nameAr: 'شهري'}, {_id: 2, nameAr: 'يومي'}]: [{_id: 0, nameAr: 'سنوي'}, {_id: 1, nameAr: 'شهري'}]} />
                                )
                            } */}

              <Input
                inputValue={space}
                onChangeText={va => setSpace(va)}
                number={true}
                withDesc
                desc={'متر'}
                InputPlaceHolder={earth ? 'المساحة' : 'مساحة العقار'}
                containerStyle={{marginTop: 18}}
              />

              {!earth && (
                <Input
                  inputValue={realEstateAge}
                  number={true}
                  withDesc
                  desc={'سنوات'}
                  onChangeText={va => setRealEstateAge(va)}
                  number={true}
                  propsDescStyleCont={{borderRightWidth: 0}}
                  descTextStyle={{color: '#6a7685'}}
                  InputPlaceHolder={' عمر العقار'}
                  containerStyle={{marginTop: 18}}
                />
              )}
              {/* {earth && <Input inputValue={streetWidth} onChangeText={(va)=> setStreetWidth(va)} number={true} withDesc desc={'متر'} InputPlaceHolder={'عرض الشارع'}  containerStyle={{marginTop: 18}} />} */}

              {earth && (
                <Input
                  inputValue={streetWidth}
                  number={true}
                  withDesc
                  desc={'متر'}
                  onChangeText={va => setStreetWidth(va)}
                  number={true}
                  propsDescStyleCont={{borderRightWidth: 0}}
                  descTextStyle={{color: '#6a7685'}}
                  InputPlaceHolder={'عرض الشارع'}
                  containerStyle={{marginTop: 18}}
                />
              )}

              {/* { !earth && <Input inputValue={numberOfFlor} onChangeText={(va)=> setNumberOfFlor(va)} number={true} propsDescStyleCont={{borderRightWidth: 0}} descTextStyle={{color: '#6a7685'}} withDesc desc={'(اختياري)'} InputPlaceHolder={ realEstate.type === "5e4160a648e2f5185ac4b085"? 'الدور': 'عدد الأدوار'}  containerStyle={{marginTop: 18}} />} */}

              <TextInput
                style={[
                  Fonts.style.normal,
                  {
                    borderWidth: 1,
                    width: Metrics.screenWidth * 0.84,
                    alignSelf: 'center',
                    justifyContent: 'flex-end',
                    height: 100,
                    borderRadius: 8,
                    borderStyle: 'solid',
                    borderWidth: 1,
                    borderColor: Colors.cloudyBlue,
                    textAlign: 'right',
                    paddingEnd: 21,
                    marginTop: 18,
                    fontSize: 12,
                    color: '#6a7685',
                    paddingTop: 20,
                  },
                ]}
                value={notes}
                onChangeText={val => setNotes(val)}
                placeholder={'تفاصيل أخرى'}
                multiline={true}
                scrollEnabled={true}
                placeholderTextColor={Colors.brownGrey}
              />

              {/* {
                                earth && 
                                <RealEstateTypesList selectedFeatures={selectedSides} forEditeng={earth} features={['0','1','2','3']} onItemPress={(i) => sideSelected(i)} containerStyle={{marginTop: 26}} />
                            } */}
              {/* <View style={{height: 150}} /> */}
              {/* <TouchableOpacity style={{ position: 'absolute', bottom: 130, left: 50, zIndex: 999}} onPress={onNextPress} >
                                    <View style={{flexDirection: 'row'}} >
                                        <Text style={[Fonts.style.normal ]} > {'<'} </Text>
                                        <Text style={[Fonts.style.normal ]} >{ 'التالي'}</Text>
                                    </View>
                            </TouchableOpacity> */}
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
          activeDotIndex={1}
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
          onPress={() => onNextPress()}>
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
  return {
    info: state.realEstate.AddingAqarInfo,
    user: state.user.user && state.user.user.user && state.user.user.user,
    // realEstate: state.realEstate.addAqarSuccess && state.realEstate.addAqarSuccess.realEstate
  };
};

export default connect(
  mapStateToProps,
  null,
)(secondStepAddingAqar);

import React, { useState } from 'react';
import {
  View,
  Text,
  Keyboard,
  TouchableWithoutFeedback,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import R from 'ramda';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { Fonts, Colors, Metrics } from '../../../Themes';
import Header from '../../../Component/Header';
import { Pagination } from 'react-native-snap-carousel';
import ProgressBar from '../../../Component/ProgressBar';

import Input from '../../../Component/Input';
import _ from 'lodash';

import AlertModal from '../../../Component/Alert';
import ErroAlert from '../../../Component/ErrorAlert';

import { connect } from 'react-redux';

import api from '../../../Services/API';

const API = api.create();

const SecondStepAddingAqar = props => {
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
  const [notes, setNotes] = useState(
    (forEditing && realEstate && realEstate.notes && realEstate.notes) || '',
  );
  const [streetWidth, setStreetWidth] = useState(
    forEditing && realEstate && realEstate.streetWidth
      ? realEstate.streetWidth.toString()
      : '',
  );

  const earth = R.propEq('nameEn', 'land', R.prop('type', realEstate));

  const onNextPress = async () => {
    let s = { ...realEstate };

    notes &&
      _.merge(s, {
        notes,
        completePercentage: 8.33333333 + s.completePercentage,
      });
    realEstateAge &&
      _.merge(s, {
        age: parseArabic(realEstateAge),
      });
    streetWidth && _.merge(s, { streetWidth });
    space &&
      _.merge(s, {
        space: parseArabic(space),
        completePercentage: 7 + s.completePercentage,
      });

    props.navigation.navigate(
      earth ? 'EarthThirdStepAddAqar' : 'ThirdStepAddAqar',
      { realEstate: s, forEditing: forEditing },
    );
  };

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
    let s = { ...realEstate };
    notes &&
      _.merge(s, {
        notes,
        completePercentage: 8.33333333 + s.completePercentage,
      });
    realEstateAge &&
      _.merge(s, {
        age: parseArabic(realEstateAge),
      });
    streetWidth && _.merge(s, { streetWidth });
    space &&
      _.merge(s, {
        space: parseArabic(space),
        completePercentage: s.completePercentage + 7,
      });

    setLoading(true);

    const res = await API.updateRealEstate(s, props.user.token);
    setLoading(false);
    if (res && res.ok) {
      return props.navigation.pop(2);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={{ flex: 1 }}>
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
          containerStyle={{ marginTop: 30 }}
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
              <Input
                inputValue={space}
                onChangeText={va => setSpace(va)}
                number
                withDesc
                desc={'متر'}
                InputPlaceHolder={earth ? 'المساحة' : 'مساحة العقار'}
                containerStyle={{ marginTop: 18 }}
              />

              {!earth && (
                <Input
                  inputValue={realEstateAge}
                  withDesc
                  desc={'سنوات'}
                  onChangeText={va => setRealEstateAge(va)}
                  number
                  propsDescStyleCont={{ borderRightWidth: 0 }}
                  descTextStyle={{ color: '#6a7685' }}
                  InputPlaceHolder={' عمر العقار'}
                  containerStyle={{ marginTop: 18 }}
                />
              )}
              {/* {earth && <Input inputValue={streetWidth} onChangeText={(va)=> setStreetWidth(va)} number={true} withDesc desc={'متر'} InputPlaceHolder={'عرض الشارع'}  containerStyle={{marginTop: 18}} />} */}

              {earth && (
                <Input
                  inputValue={streetWidth}
                  withDesc
                  desc={'متر'}
                  onChangeText={va => setStreetWidth(va)}
                  number
                  propsDescStyleCont={{ borderRightWidth: 0 }}
                  descTextStyle={{ color: '#6a7685' }}
                  InputPlaceHolder={'عرض الشارع'}
                  containerStyle={{ marginTop: 18 }}
                />
              )}

              {/* { !earth && <Input inputValue={numberOfFlor} onChangeText={(va)=> setNumberOfFlor(va)} number={true} propsDescStyleCont={{borderRightWidth: 0}} descTextStyle={{color: '#6a7685'}} withDesc desc={'(اختياري)'} InputPlaceHolder={ realEstate.type === "5e4160a648e2f5185ac4b085"? 'الدور': 'عدد الأدوار'}  containerStyle={{marginTop: 18}} />} */}

              <TextInput
                style={[
                  Fonts.style.normal,
                  {
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
            transform: [{ rotate: '180deg' }],
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
          style={{ position: 'absolute', bottom: 125, left: 50, zIndex: 999 }}
          onPress={() => onNextPress()}>
          <View style={{ flexDirection: 'row' }}>
            <Text style={[Fonts.style.normal]}> {'<'} </Text>
            <Text style={[Fonts.style.normal]}>التالي</Text>
          </View>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
};

const mapStateToProps = state => {
  return {
    info: state.realEstate.AddingAqarInfo,
    user: state.user.user && state.user.user.user && state.user.user.user,
  };
};

export default connect(
  mapStateToProps,
  null,
)(SecondStepAddingAqar);

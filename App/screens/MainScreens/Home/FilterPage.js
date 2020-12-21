import React, {useEffect, useState} from 'react';
import {
  View,
  Animated,
  Platform,
  Text,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
  ScrollView,
} from 'react-native';
import {StackActions, NavigationActions} from 'react-navigation';
// import { ScrollView } from 'react-native-gesture-handler';
import RangeSlider from 'rn-range-slider';

import Header from '../../../Component/Header';
import MainTypes from '../../../Component/MainFilterTypes';
import {Fonts, Colors, Metrics} from '../../../Themes';
import RealEstateTypesList from '../../../Component/RealestateTypeList';

import RealestateType from '../../../Component/realestateType';
import CountWithTitle from '../../../Component/CountWithTitle';
import RangeItem from '../../../Component/rangeItem';
import Button from '../../../Component/Button';
import {connect} from 'react-redux';
import UserAction from '../../../Redux/UserRedux';
import {Font} from 'three';

FilterPage = props => {
  const [selectedType, setSelectedType] = useState(
    props.navigation.getParam('selectedType') ||
      (props.filterData && props.filterData.type && props.filterData.type),
  );

  const [selectedRealestateType, setSelectedRealestateType] = useState('');

  const [number, setNumber] = useState(
    (props.filterData &&
      props.filterData.numberOfLivingRoom &&
      props.filterData.numberOfLivingRoom) ||
      0,
  );
  const [slepNumber, setSlepNumber] = useState(
    (props.filterData &&
      props.filterData.slepNumber &&
      props.filterData.slepNumber) ||
      0,
  );
  const [BRnumber, setBRNumber] = useState(
    (props.filterData &&
      props.filterData.numberOfBathRoom &&
      props.filterData.numberOfBathRoom) ||
      0,
  );

  const [selectedStatus, setSelectedStatus] = useState(
    props.filterData && props.filterData.status && props.filterData.status,
  );

  const [selectedPopulation, setSelectedPopulation] = useState(
    props.filterData &&
      props.filterData.selectedPopulationType &&
      props.filterData.selectedPopulationType,
  );

  const [payType, setPayType] = useState(
    props.filterData && props.filterData.payType && props.filterData.payType,
  );

  const [selectedMinPrice, setSelectedMinPrice] = useState(
    props.filterData && props.filterData.minPrice && props.filterData.minPrice,
  );
  const [selectedMaxPrice, setSelectedMaxPrice] = useState(
    props.filterData && props.filterData.maxPrice && props.filterData.maxPrice,
  );

  const [selectedMinSpace, setSelectedMinSpace] = useState(
    props.filterData && props.filterData.minSpace && props.filterData.minSpace,
  );
  const [selectedMaxSpace, setSelectedMaxSpace] = useState(
    props.filterData && props.filterData.maxSpace && props.filterData.maxSpace,
  );

  const [numberOfUnit, setNumberOfUnit] = useState(
    (props.filterData &&
      props.filterData.numberOfUnit &&
      props.filterData.numberOfUnit) ||
      0,
  );
  const [numberOfKUnit, setNumberOfKUnit] = useState(
    (props.filterData &&
      props.filterData.numberOfKUnit &&
      props.filterData.numberOfKUnit) ||
      0,
  );
  const [numberOfFlats, setNumberOfFlats] = useState(
    (props.filterData &&
      props.filterData.numberOfFlats &&
      props.filterData.numberOfFlats) ||
      0,
  );

  // const [Knumber, setKNumber]= useState(1)

  const [features, setFeatures] = useState([
    {_id: 1, nameAr: 'انترنت', selected: false},
    {_id: 2, nameAr: 'صالة جيم', selected: false},
    {_id: 5, nameAr: 'بالقرب من مدرسة ', selected: false},
    {_id: 4, nameAr: 'كراج', selected: false},
    {_id: 3, nameAr: 'حوض سباحة', selected: false},
    {_id: 6, nameAr: 'نوافذ مبطنة', selected: false},
  ]);

  // sellPress = () => {
  //     setSelectedType('sell')
  // }

  // const rentPress = () => {
  //     setSelectedType('rent')
  // }

  const handleResetFilterData = () => {
    props.changeFilterData(null);
    props.navigation.goBack();
  };

  const handleMarkerPress = item => {
    const index = features.findIndex(ite => ite._id === item._id);
    features[index] = {...features[index], selected: true};
    let arr = [];
    features.forEach(item0 =>
      item0._id === item._id
        ? arr.push({...features[index], selected: !item.selected})
        : arr.push(item0),
    );
    setFeatures(arr);
  };

  onCurrencyChanged = (n, x) => {
    console.log(n, x);
    setSelectedMinPrice(n);
    setSelectedMaxPrice(x);
  };

  onSpaceChange = (n, x) => {
    setSelectedMinSpace(n);
    setSelectedMaxSpace(x);
  };

  const handleFilter = () => {
    // alert()
    props.changeFilterData({
      type: selectedType,
      numberOfFlats,
      numberOfRooms: slepNumber,
      numberOfLivingRoom: number,
      numberOfBathRoom: BRnumber,
      payType,
      umberOfKitchenUnit: numberOfKUnit,
      numberOfUnit,
      populationType: selectedPopulation,
      status: selectedStatus,
      maxPrice: selectedMaxPrice,
      minPrice: selectedMinPrice,
      maxSpace: selectedMaxSpace,
      minSpace: selectedMinSpace,
    });
    console.log('props. of filter data', props.filterData);
    props.navigation.goBack();
  };

  const populationFlag =
    selectedType &&
    (selectedType.nameEn === 'flat' || selectedType.nameEn === 'floor');
  const earth = selectedType && selectedType.nameEn === 'land';

  const compaond =
    selectedType &&
    (selectedType.nameEn === 'building' ||
      selectedType.nameEn === 'floor' ||
      selectedType.nameEn === 'compound');

  const villa = selectedType && selectedType.nameEn === 'villa';

  const daily =
    selectedStatus &&
    selectedStatus.nameEn === 'rent' &&
    selectedType &&
    (selectedType.nameEn === 'room' || selectedType.nameEn === 'flat');
  // const villa = false
  // const compaond = realEstate.type.nameAr === "مجمع سكني"  || realEstate.type.nameEn === "building"
  const numberOfSh = selectedType.nameAr === 'ارض';

  console.log('props.ofFilter', populationFlag, props);
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        <Header
          headerTitle={'فلتر العقارات'}
          onBackPress={() => props.navigation.goBack()}
        />
        <View style={{flex: 1}}>
          <ScrollView>
            <TouchableWithoutFeedback style={{paddingBottom: 80, flex: 1}}>
              <View>
                <MainTypes
                  status={props.info && props.info.realEstateStatus}
                  doAnimation={true}
                  statusPress={i => setSelectedStatus(i)}
                  selectedType={selectedStatus}
                />

                <Text
                  style={[
                    Fonts.style.normal,
                    {
                      fontSize: 18,
                      alignSelf: 'flex-end',
                      marginTop: 42,
                      marginEnd: 16,
                      fontWeight: Platform.OS === 'android' ? '400' : 'bold',
                      ...(Platform.OS === 'android' && {
                        fontFamily: Fonts.type.bold,
                      }),
                    },
                  ]}>
                  {'أختر نوع العقار'}
                </Text>

                <RealEstateTypesList
                  selectedType={i => setSelectedType(i)}
                  selectedTypeByProps={selectedType}
                  containerStyle={{marginEnd: 20}}
                  types={
                    props.info && [
                      {_id: 1, nameAr: 'كل العقارات'},
                      ...props.info.realEstateTypes,
                    ]
                  }
                />

                {selectedType && selectedType._id !== 1 && (
                  <View
                    style={{
                      width: '90%',
                      height: 1.4,
                      backgroundColor: '#0000',
                      opacity: 0.2,
                      marginTop: 30,
                      borderWidth: 0.5,
                      alignSelf: 'center',
                    }}
                  />
                )}

                {populationFlag && (
                  <RealEstateTypesList
                    selectedType={i => setSelectedPopulation(i)}
                    selectedTypeByProps={selectedPopulation}
                    containerStyle={{marginEnd: 20, marginTop: 20}}
                    types={props.info && props.info.realEstatePopulationType}
                  />
                )}

                {selectedStatus && selectedStatus.nameEn === 'rent' && (
                  <RealEstateTypesList
                    selectedType={i => setPayType(i)}
                    selectedTypeByProps={payType}
                    containerStyle={{
                      marginEnd: 20,
                      marginTop: 15,
                      marginBottom: 15,
                    }}
                    types={
                      daily
                        ? [
                            {_id: 0, nameAr: 'سنوي'},
                            {_id: 1, nameAr: 'شهري'},
                            {_id: 2, nameAr: 'يومي'},
                          ]
                        : [{_id: 0, nameAr: 'سنوي'}, {_id: 1, nameAr: 'شهري'}]
                    }
                  />
                )}

                {selectedType && selectedType._id !== 1 && (
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'flex-end',
                      width: '100%',
                      marginTop: 30,
                      paddingEnd: 16,
                    }}>
                    <TextInput
                      style={[
                        Fonts.style.normal,
                        {
                          width: '30%',
                          fontSize: 16,
                          borderWidth: 0.3,
                          paddingVertical: 8,
                          textAlign: 'center',
                          marginEnd: 8,
                          borderColor: '#ccc',
                        },
                      ]}
                      keyboardType={'numeric'}
                      placeholder={'الى'}
                      value={selectedMaxPrice}
                      onChangeText={c => setSelectedMaxPrice(c)}
                    />

                    <TextInput
                      style={[
                        Fonts.style.normal,
                        {
                          width: '30%',
                          fontSize: 16,
                          borderWidth: 0.3,
                          paddingVertical: 8,
                          textAlign: 'center',
                          borderColor: '#ccc',
                        },
                      ]}
                      keyboardType={'numeric'}
                      placeholder={'من'}
                      value={selectedMinPrice}
                      onChangeText={c => setSelectedMinPrice(c)}
                    />

                    <Text
                      style={[
                        Fonts.style.normal,
                        {
                          fontSize: 18,
                          alignSelf: 'center',
                          marginStart: 20,
                          fontWeight:
                            Platform.OS === 'android' ? '400' : 'bold',
                        },
                      ]}>
                      {'سعر العقار'}
                    </Text>
                  </View>
                )}

                {selectedType && selectedType._id !== 1 && (
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'flex-end',
                      width: '100%',
                      marginTop: 30,
                      paddingEnd: 16,
                    }}>
                    <TextInput
                      style={[
                        Fonts.style.normal,
                        {
                          width: '30%',
                          fontSize: 16,
                          borderWidth: 0.3,
                          paddingVertical: 8,
                          textAlign: 'center',
                          marginEnd: 8,
                          borderColor: '#ccc',
                        },
                      ]}
                      placeholder={'الى'}
                      keyboardType={'numeric'}
                      value={selectedMaxSpace}
                      onChangeText={c => setSelectedMaxSpace(c)}
                    />

                    <TextInput
                      style={[
                        Fonts.style.normal,
                        {
                          width: '30%',
                          fontSize: 16,
                          borderWidth: 0.3,
                          paddingVertical: 8,
                          textAlign: 'center',
                          borderColor: '#ccc',
                        },
                      ]}
                      keyboardType={'numeric'}
                      placeholder={'من'}
                      value={selectedMinSpace}
                      onChangeText={c => setSelectedMinSpace(c)}
                    />

                    <Text
                      style={[
                        Fonts.style.normal,
                        {
                          fontSize: 18,
                          alignSelf: 'center',
                          marginStart: 35,
                          fontWeight:
                            Platform.OS === 'android' ? '400' : 'bold',
                        },
                      ]}>
                      {'المساحة'}
                    </Text>
                  </View>
                )}

                {/* <Text style={[Fonts.style.normal,{fontSize: 18, alignSelf:'flex-end', marginTop: 35, marginEnd: 16, fontWeight: Platform.OS === 'android'?'400': "bold",}]} >{'خصائص العقار'}</Text>

                        <CountWithTitle title={' غرف النوم'} number={slepNumber} onIncreasePress={()=>setSlepNumber(s => s = ++s )}  onDecreasePress={()=>setSlepNumber(s => s = --s )} />

                        <CountWithTitle title={'غرف الضيافة'} number={number} onIncreasePress={()=>setNumber(s => s = ++s )}  onDecreasePress={()=>setNumber(s => s = --s )} />

                        <CountWithTitle title={'دورة مياه'} number={BRnumber} onIncreasePress={()=>setBRNumber(s => s = ++s )}  onDecreasePress={()=>setBRNumber(s => s = --s )} />

                        <CountWithTitle title={'مطابخ'} number={Knumber} onIncreasePress={()=>setKNumber(s => s = ++s )}  onDecreasePress={()=>setKNumber(s => s = --s )} /> */}

                {compaond && (
                  <CountWithTitle
                    containerStyle={{marginTop: 10, marginEnd: -10}}
                    title={'عدد الوحدات'}
                    number={numberOfUnit}
                    onIncreasePress={() => setNumberOfUnit(s => (s = ++s))}
                    onDecreasePress={() =>
                      setNumberOfUnit(s => (s = s === 0 ? 0 : --s))
                    }
                  />
                )}

                {populationFlag && !compaond && (
                  <CountWithTitle
                    containerStyle={{marginTop: 10, marginEnd: -10}}
                    title={'عدد الغرف'}
                    number={slepNumber}
                    onIncreasePress={() => setSlepNumber(s => (s = ++s))}
                    onDecreasePress={() =>
                      setSlepNumber(s => (s = s === 0 ? 0 : --s))
                    }
                  />
                )}

                {villa && (
                  <CountWithTitle
                    containerStyle={{marginTop: 10, marginEnd: -10}}
                    title={'عدد الغرف'}
                    number={slepNumber}
                    onIncreasePress={() => setSlepNumber(s => (s = ++s))}
                    onDecreasePress={() =>
                      setSlepNumber(s => (s = s === 0 ? 0 : --s))
                    }
                  />
                )}

                {/* {
                            numberOfSh || true && 
                            <CountWithTitle containerStyle={{marginTop: 10, marginEnd: -10}} title={'عدد الشقق'} number={numberOfFlats} onIncreasePress={()=>setNumberOfFlats(s => s = ++s )}  onDecreasePress={()=>setNumberOfFlats(s => s = --s )} />
                        } */}

                {(compaond || populationFlag || villa) && !earth && (
                  <CountWithTitle
                    containerStyle={{marginTop: 10, marginEnd: -10}}
                    title={compaond ? 'عدد الصالات في كل وحدة' : 'الصالات'}
                    number={number}
                    onIncreasePress={() => setNumber(s => (s = ++s))}
                    onDecreasePress={() => setNumber(s => (s === 0 ? 0 : --s))}
                  />
                )}

                {(compaond || populationFlag || villa) && !earth && (
                  <CountWithTitle
                    containerStyle={{marginTop: 10, marginEnd: -10}}
                    title={
                      compaond ? 'عدد دورات المياه في كل وحدة' : 'دورة مياه'
                    }
                    number={BRnumber}
                    onIncreasePress={() => setBRNumber(s => (s = ++s))}
                    onDecreasePress={() =>
                      setBRNumber(s => (s === 0 ? 0 : --s))
                    }
                  />
                )}

                {(compaond || populationFlag || villa) && (
                  <CountWithTitle
                    containerStyle={{marginTop: 10, marginEnd: -10}}
                    title={compaond ? 'عدد المطابخ في كل وحدة' : 'المطابخ'}
                    number={numberOfKUnit}
                    onIncreasePress={() => setNumberOfKUnit(s => (s = ++s))}
                    onDecreasePress={() =>
                      setNumberOfKUnit(s => (s = s === 0 ? 0 : --s))
                    }
                  />
                )}

                {/* <Text style={[Fonts.style.normal,{fontSize: 18, alignSelf:'flex-end', marginTop: 35, marginEnd: 16, fontWeight: Platform.OS === 'android'?'400': "bold",}]} >{'ميزات أضافية'}</Text>

                        <View style={{flexDirection: 'row', flexWrap: 'wrap',  justifyContent: 'flex-end'}} >
                            {
                                features.map( (item, index) => <RealestateType key={index} doAnimation={true} item={item} index={index} onPress={()=> {handleMarkerPress(item)}} selected={ item.selected } /> )
                            }
                        </View> */}

                {/* <RangeItem initialLowValue={selectedMinPrice || 100} initialHighValue={selectedMaxPrice || 800} min={100} max={800} cuuruncy={true} onValueChanged={onCurrencyChanged} /> */}

                {/* <Text style={[Fonts.style.normal,{fontSize: 18, alignSelf:'flex-end', marginTop: 35, marginEnd: 16, fontWeight: Platform.OS === 'android'?'400': "bold",}]} >{'المساحة'}</Text>

                        <RangeItem initialLowValue={selectedMinSpace || 1450} initialHighValue={selectedMaxSpace || 2000}  min={1450} max={2000}  space={true} onValueChanged={onSpaceChange} /> */}

                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    marginTop: 50,
                  }}>
                  <Button
                    onPress={handleResetFilterData}
                    buttonText={'إعادة تعيين'}
                    halfButton={true}
                    containerStyle={{marginEnd: 12}}
                    backgroundColorT={'rgb(106, 118, 133)'}
                    shadowColor={'rgba(69,93,120,0.25)'}
                  />
                  <Button
                    onPress={handleFilter}
                    buttonText={'فلتر'}
                    halfButton={true}
                    doAnimation={true}
                  />
                </View>

                <View style={{height: 100}} />
              </View>
            </TouchableWithoutFeedback>
          </ScrollView>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const mapDispatchToProps = dispatch => ({
  changeFilterData: data => dispatch(UserAction.changeFilter(data)),
});

const mapStateToProps = state => {
  console.log('state', state);
  return {
    info: state.realEstate.AddingAqarInfo,
    filterData: state.user.filterData,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FilterPage);

import React, {useEffect, useState} from 'react';
import {
  View,
  Animated,
  Platform,
  Text,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Image,
} from 'react-native';
import {StackActions, NavigationActions} from 'react-navigation';
import Modal from 'react-native-modal';
import _ from 'lodash';

import Header from '../../../Component/Header';
import MainTypes from '../../../Component/MainFilterTypes';
import {Fonts, Colors, Metrics, Images} from '../../../Themes';
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
import ImagePicker from 'react-native-image-crop-picker';
import ImagePickerCamera from 'react-native-image-picker';
import {connect} from 'react-redux';
import api from '../../../Services/API';

const API = api.create();

forthStepAddingAqar = props => {
  const Animation = useAnimation({doAnimation: true, duration: 550});

  const [realEstate, setRealEstate] = useState(
    props.navigation.state.params && props.navigation.state.params.realEstate,
  );
  const [forEditing, setForEditing] = useState(
    props.navigation.getParam('forEditing'),
  );

  const [mainImageIndex, setMainImageIndex] = useState(0);
  const [loading, setLoading] = useState(false);


  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState();
  const [okButtonText, setOkButtonText] = useState();
  const [cancelButtonText, setCancelButtonText] = useState();

  const [images, setImages] = useState(
    forEditing && realEstate && realEstate.images ? realEstate.images : [],
  );

  const [selectedImage, setSelectedImage] = useState(forEditing ? true : false);

  console.log('realEstate', selectedImage);

  const onAddingImagePress = () => {
    setShowAlert(true);
    setAlertMessage('اضافة الصور');
    setOkButtonText('كاميرا');
    setCancelButtonText('استديو');
  };

  const handleDeleteItem = (item, index) => {
    let x = [...images];
    x.splice(index, 1);
    // images.splice(index, 1)
    setImages(x);
  };

  const onNextPress = () => {
    let s = {
      ...realEstate,
      images: images,
      completePercentage:
        images.length < 3
          ? parseInt(realEstate.completePercentage + 8.33333333 * images.length)
          : realEstate.completePercentage + 25,
      mainImageIndex
    };
    // console.log('NewRealEstate', s)
    // console.log('images', images[0].uri)

    props.navigation.navigate('FifthStepAddAqar', {
      realEstate: s,
      forEditing: forEditing,
    });
  };

  const handleGallerySelect = () => {
    if ((images || []).length >= 10) {
      setShowAlert(false);
      setShowErrorMessage(true);
      setErrorMessage('لا يمكنك اضافة اكثر من ١٠ صور');
      return;
    }
    console.log('images number', 10 - (images.length || []));
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      mediaType: 'image',
      multiple: true,
      includeBase64: true,
      maxFiles: 10 - (images || []).length,
    }).then(image => {
      //   console.log('images', image.slice(0, 3));
      let arr = images.length > 0 ? [...images] : [];
      image.map(
        i =>
          // arr.push(i)
          arr.push({
            uri: i.path ? i.path : i.sourceURL,
            path: i.path || i.sourceURL,
            type: i.mime,
            name: i.filename ? i.filename : 'sdkjfhg',
          }),
        //       Platform.OS === "android" ? photo.uri : photo.uri.replace("file://", "")
      );
      // let arr3 = arr.slice(0, 10 - images.length);
      // console.log(arr3);
      if (Platform.OS === 'android') {
        _.merge(arr.slice(0, 10 - images.length), images);
      } else {
        _.merge(arr, images);
      }

      setImages(arr.slice(0, 10));
      setSelectedImage(true);
      setShowAlert(false);
    });
  };

  const handleCameraSelect = () => {
    if ((images || []).length >= 10) {
      setShowAlert(false);
      setShowErrorMessage(true);
      setErrorMessage('لا يمكنك اضافة اكثر من ١٠ صور');
      return;
    }

    const options = {
      title: '',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
      cancelButtonTitle: 'الغاء',
    };

    ImagePickerCamera.showImagePicker(options, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };

        let arr = images.length > 0 ? [...images] : [];

        if (response && response.type) {
          arr.push({
            type: response.type,
            name: response.fileName || response.path,
            uri: response.uri || response.path,
          });

          _.merge(arr, images);
          setImages(arr);
          setSelectedImage(true);
          setShowAlert(false);
        }
      }
    });
  };

  const saveUpdate = async () => {
    let s = {
      ...realEstate,
      images: images,
      completePercentage:
        images.length < 3
          ? realEstate.completePercentage + 8.33333333 * images.length
          : realEstate.completePercentage + 15,
      mainImageIndex
    };
    setLoading(true);
    const res = await API.updateRealEstate(s, props.user.token);
    console.log('res', res);
    setLoading(false);
    if (res && res.ok) {
      // alert('Done')
      return props.navigation.pop(4);
      // return props.navigation.dispatch(StackActions.reset({
      //     index: 0,
      //     actions: [NavigationActions.navigate({ routeName: 'bottomTab' })],
      // }))
    }
  };


  console.log('props', props);

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={{flex: 1}}>
        <Header
          loading={loading}
          forEditing={forEditing}
          saveUpdate={() => saveUpdate()}
          headerTitle={'صور'}
          onBackPress={() => props.navigation.goBack()}
        />

        <ProgressBar
          progress={realEstate.completePercentage / 100}
          persentageNumber={realEstate.completePercentage}
          containerStyle={{marginTop: 30}}
        />

        <KeyboardAwareScrollView>
          <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={{flex: 1, height: Metrics.screenHeight - 140}}>

              <Text style={[Fonts.style.normal,{fontSize: 13, marginTop: 14, alignSelf:'flex-end', marginEnd: 30, fontWeight: '300', color: Colors.grey}]} >{'* اضغط على الصورة لاختيارها صورة العرض الاولى'}</Text>
              <View
                style={{
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  justifyContent: 'flex-start',
                  marginTop: 14,
                  direction: 'rtl'
                }}>
                <TouchableOpacity onPress={onAddingImagePress}>
                  <View
                    style={{
                      width: 70,
                      height: 70,
                      alignSelf: 'flex-end',
                      marginTop: 20,
                      marginStart: 20,
                      // marginEnd: 20,
                      justifyContent: 'center',
                    }}>
                    <Image source={Images.addingImageCircle} />
                    <Image
                      source={Images.cameraIcon}
                      style={{position: 'absolute', alignSelf: 'center'}}
                    />
                  </View>
                </TouchableOpacity>
                {selectedImage &&
                  images.map((item, index) => {
                    return (
                      <TouchableOpacity
                        onPress={()=> setMainImageIndex(index)}
                        style={[{
                          width: 80,
                          height: 80,
                          marginStart: 17,
                          marginTop: 20,
                          alignItems: 'center',
                          justifyContent: 'center'
                        },
                        mainImageIndex === index && {
                          borderWidth: 4,
                          borderColor: Colors.primaryGreen,
                          borderRadius: 40
                        }
                        ]}>

                        <Image
                          // source={{uri: `data:${item.mime};base64,${item.data}`}}
                          source={{uri: item.uri ? item.uri : item}}
                          style={{
                            width: 70,
                            height: 70,

                            alignSelf: 'center',

                            justifyContent: 'center',
                            borderRadius: 35,
                          }}
                          key={index}
                        />
                        {/* <Image source={Images.addingImageCircle} style={{width: 70, height: 70, alignSelf: 'flex-end',  justifyContent:'center', borderRadius: 35}} key={index} /> */}
                        <TouchableOpacity
                          onPress={() => handleDeleteItem(item, index)}
                          source={Images.imageDeleteCloseIcon}
                          style={{
                            width: 16,
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: 16,
                            borderRadius: 8,

                            right: 3,
                            top: 5,

                            backgroundColor: Colors.darkSlateBlue,
                            position: 'absolute',
                          }}>
                          <Image
                            source={Images.imageDeleteCloseIcon}
                            style={{width: 5.9, height: 5.9}}
                          />
                        </TouchableOpacity>
                      </TouchableOpacity>
                    );
                  })}
              </View>

              <AlertModal
                closePress={() => setShowAlert(false)}
                closeErrorModel={handleGallerySelect}
                onOkPress={handleCameraSelect}
                whiteButton={true}
                cancelButtonText={cancelButtonText}
                okButtonText={okButtonText}
                twoButtons={true}
                contentMessage={alertMessage}
                isVisible={showAlert}
              />

              {showErrorMessage && (
                <ErroAlert
                  errorMessage={errorMessage}
                  setAnimation={() => setShowErrorMessage(false)}
                  doAnimation={showErrorMessage}
                />
              )}
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAwareScrollView>

        <Pagination
          dotsLength={5}
          activeDotIndex={3}
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
)(forthStepAddingAqar);

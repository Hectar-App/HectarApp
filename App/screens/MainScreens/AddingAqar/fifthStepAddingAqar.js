import React, {useEffect, useState} from 'react';
import {
  View,
  Platform,
  Text,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Image,
} from 'react-native';
import {StackActions, NavigationActions} from 'react-navigation';
import {IconButton, ActivityIndicator} from 'react-native-paper';
import Modal from 'react-native-modal';

import Header from '../../../Component/Header';
import {BallIndicator} from 'react-native-indicators';
import BluePrintForm from '../../../Component/bluePrintForm';
import BluePrintList from '../../../Component/BluePrintList';

import ImagePicker from 'react-native-image-crop-picker';
import ImagePickerCamera from 'react-native-image-picker';

import {Fonts, Colors, Metrics, Images, CustomIcon} from '../../../Themes';
import {Pagination} from 'react-native-snap-carousel';
import ProgressBar from '../../../Component/ProgressBar';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import RequestOrder from '../../../Component/requestOrder';

import Button from '../../../Component/Button';

import {useAnimation} from '../../../assets/Animation/animation';

import {ifIphoneX} from 'react-native-iphone-x-helper';

import api from '../../../Services/API';

import _ from 'lodash';

import AlertModal from '../../../Component/Alert';
import ErroAlert from '../../../Component/ErrorAlert';

const API = api.create();

import {connect} from 'react-redux';
import RealEstateAction from '../../../Redux/RealEstateRedux';

class firstStepAddAqar extends React.Component {
  state = {
    request360: false,
    requestProfisinalPhoto: false,
    requestQRCode: false,
    realEstate:
      this.props.navigation.state.params &&
      this.props.navigation.state.params.realEstate,
    showSucessModal: false,
    loading: false,
    forEditing: this.props.navigation.getParam('forEditing'),
    // images: this.props.navigation.getParam('forEditing'),
    bluePrint: [],
    // forEditing && realEstate && realEstate.images ? realEstate.images: [])
  };

  componentWillMount = () => {
    this.props.checkLikeRating(
      this.state.realEstate._id,
      this.props.user.token,
    );

    console.log('thisssdf', this.state.realEstate);
    if (
      this.state.forEditing &&
      this.state.realEstate &&
      (this.state.realEstate.bluePrint || []).length > 0
    ) {
      this.setState({
        bluePrint: this.state.realEstate.bluePrint,
        selectedImage: true,
      });
    }
  };

  publishRealEstate = () => {
    const {request360, requestProfisinalPhoto, requestQRCode} = this.state;
    // alert('hola')
    let requests = [];
    if (request360) {
      requests.push(2);
    }
    if (requestProfisinalPhoto) {
      requests.push(1);
    }
    if (requestQRCode) {
      requests.push(3);
    }

    let s = {...this.state.realEstate};
    _.merge(s, {requests});

    if (this.state.bluePrint.length > 0) {
      s.bluePrint = this.state.bluePrint;
      s.completePercentage = s.completePercentage + 10;
    }

    console.log('realEstate', s);

    this.setState({loading: true});
    // , token: this.props.user.token
    this.props.addRealEstate(s, this.props.user.token);
    // const {selectedStatus, selectedType, selectedPurpose, price, lat, long, token, space, realEstateAge: age, numberOfFlor: floor, notes, numberOfRoom: numberOfRooms, numberOfBathRoom, livingRoom: numberOfLivingRoom, features, images, selectedPopulationType } = this.state.realEstate
    // this.props.addRealEstate(selectedStatus, selectedType, selectedPurpose, price, lat, long, selectedPopulationType, age, floor, notes, numberOfRooms, numberOfBathRoom, numberOfLivingRoom, features, images, token)
  };

  navTo = route => {
    console.log('HelloRoute', route);
    // return this.props.navigation.navigate(route)
    if (route === 'bottomTab')
      return this.props.navigation.dispatch(
        StackActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({routeName: 'bottomTab'})],
        }),
      );

    if (route === 'MyRealEstate') {
      return Promise.all([
        this.props.navigation.dispatch(
          StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({routeName: 'bottomTab'})],
          }),
        ),
      ]).then(() => this.props.navigation.navigate('MyRealEstate'));
    }

    Promise.all([
      this.props.navigation.dispatch(
        StackActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({routeName: 'bottomTab'})],
        }),
      ),
    ]).then(() => this.props.navigation.navigate('AddAqarStackNav'));
  };

  saveUpdate = async () => {
    let s = {...this.state.realEstate};

    if (this.state.bluePrint.length > 0) {
      s.bluePrint = this.state.bluePrint;
      s.completePercentage = s.completePercentage + 10;
    }

    this.setState({loading: true});
    const res = await API.updateRealEstate(s, this.props.user.token);
    console.log('res', res);
    if (res && res.ok) {
      // alert('Done');
      // return this.props.navigation.dispatch(
      //   StackActions.reset({
      //     index: 0,
      //     actions: [NavigationActions.navigate({routeName: 'bottomTab'})],
      //   }),
      // );
      this.setState({loading: false});
      return this.props.navigation.pop(5);
    } else {
      if (res.data.e && res.data.e.message) {
        this.setState({
          showErrorMessage: true,
          loading: false,
          errorMessage: res.data.e.message,
        });
      } else {
        this.setState({
          showErrorMessage: true,
          loading: false,
          errorMessage: 'حدث خطأ داخلي الرجاء المحاولة لاحقا',
        });
      }
      // this.setState({loading: false})
    }
  };

  componentWillReceiveProps(nextProps) {
    console.log('realEstate');
    if (nextProps.realEstate !== this.props.realEstate) {
      console.log('realEstate', nextProps.realEstate);
      // alert('hello')
      this.setState({btnLoading: false, loading: false, showSucessModal: true});
      // this.props.nextLevel(nextProps.realEstate)
      // this.props.navigation.navigate('SecondStepAddAqar', {realEstate: nextProps.realEstate})
    } else if (nextProps.addAqarError !== this.props.addAqarError) {
      if (
        nextProps.addAqarError &&
        nextProps.addAqarError.e &&
        nextProps.addAqarError.e.message
      ) {
        this.setState({
          showErrorMessage: true,
          loading: false,
          errorMessage: nextProps.addAqarError.e.message,
        });
      } else {
        this.setState({
          showErrorMessage: true,
          loading: false,
          errorMessage: 'حدث خطأ داخلي الرجاء المحاولة لاحقا',
        });
      }
    }

    if (nextProps.checkRealEstate !== this.props.checkRealEstate) {
      if (nextProps.checkRealEstate !== null)
        return this.setState({
          requestProfisinalPhoto:
            nextProps.checkRealEstate.request1 &&
            nextProps.checkRealEstate.request1,
          request360:
            nextProps.checkRealEstate.request2 &&
            nextProps.checkRealEstate.request2,
          requestQRCode:
            nextProps.checkRealEstate.request3 &&
            nextProps.checkRealEstate.request3,
        });
    }

    if (nextProps.addRequestResult !== this.props.addRequestResult) {
      if (this.state.selecedRequest === 1) {
        console.log(1);
        this.setState({requestProfisinalPhoto: true});
      } else if (this.state.selecedRequest === 2) {
        console.log(2);
        this.setState({request360: true});
      } else {
        console.log(3);
        this.setState({requestQRCode: true});
      }

      this.setState({selecedRequest: null});
    }
  }

  handlePreview = () => {
    let s = {...this.state.realEstate};

    if (this.state.bluePrint.length > 0) {
      s.bluePrint = this.state.bluePrint;
    }

    this.props.navigation.navigate('RealEstateDetail', {
      realEstate: s,
      toPreview: true,
    });
  };

  handleCloseAlertPopUp = () => {
    this.setState({showAlert: false});
  };

  handleGallerySelect = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      mediaType: 'image',
      multiple: true,
      // includeBase64: true,
      maxFiles: 3 - (this.state.bluePrint.length || []),
    }).then(image => {
      console.log('images', image);
      let arr =
        this.state.bluePrint.length > 0 ? [...this.state.bluePrint] : [];
      image.map(i =>
        // arr.push(i)
        arr.push({
          uri: Platform.OS === 'android' ? i.path : i.sourceURL,
          type: i.mime,
          name: i.filename ? i.filename : 'sdkjfhg',
        }),
      );
      _.merge(arr, this.state.bluePrint);

      this.setState({
        bluePrint: arr,
        selectedImage: true,
        showAlert: false,
      });
    });
  };

  handleSaveBluePrint = (image, title, desc) => {
    // console.log('image', image, 'title', title, 'desc', desc)
    let arr = this.state.bluePrint.length > 0 ? [...this.state.bluePrint] : [];
    arr.push({image, title, desc});
    this.setState({bluePrint: arr, addBluePrint: false, selectedImage: true});
  };

  handleCameraSelect = () => {
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

        let arr =
          this.state.bluePrint.length > 0 ? [...this.state.bluePrint] : [];

        if (response && response.type) {
          arr.push({
            type: response.type,
            name: response.fileName || response.path,
            uri: response.uri || response.path,
          });

          _.merge(arr, this.state.bluePrint);

          this.setState({
            bluePrint: arr,
            selectedImage: true,
            showAlert: false,
          });

          // setImages(arr)
          // setSelectedImage(true)
          // setShowAlert(false)
        }
      }
    });
  };

  handleRequest = id => {
    // if(this.s)
    this.setState({selecedRequest: id});

    this.props.addRequest(this.state.realEstate._id, id, this.props.user.token);
    // alert(id)
  };

  handleDeleteItem = index => {
    let x = [...this.state.bluePrint];
    x.splice(index, 1);
    // images.splice(index, 1)
    this.setState({
      bluePrint: x,
    });
    // setImages(x)
  };

  onAddingImagePress = () => {
    this.setState({
      // showAlert: true,
      // alertMessage: 'اضافة الصور',
      // okButtonText: 'كاميرا',
      // cancelButtonText: 'استديو'
      addBluePrint: true,
    });
  };

  render() {
    return (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={{flex: 1}}>
          <Header
            forEditing={false}
            saveUpdate={() => this.saveUpdate()}
            headerTitle={'مخططات'}
            onBackPress={() => this.props.navigation.goBack()}
          />

          <ProgressBar
            progress={this.state.realEstate.completePercentage / 100}
            persentageNumber={this.state.realEstate.completePercentage}
            containerStyle={{marginTop: 30}}
          />

          <KeyboardAwareScrollView style={{flex: 1}}>
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
              <View style={{flex: 1, paddingBottom: 120}}>
                {this.state.addBluePrint && (
                  <BluePrintForm
                    bluePrint={this.handleSaveBluePrint}
                    onSwipe={() => this.setState({addBluePrint: false})}
                    isVisible={this.state.addBluePrint}
                  />
                )}

                {this.state.bluePrint.length < 5 && (
                  <TouchableOpacity
                    style={{
                      width: 335,
                      height: 116,
                      borderRadius: 6,
                      backgroundColor: '#fbfbfb',
                      borderStyle: 'solid',
                      // borderWidth: 1,
                      // borderColor: "rgba(17, 51, 81, 0.7)"
                      alignSelf: 'center',
                      marginTop: 26,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                    onPress={() => this.onAddingImagePress()}>
                    <View style={{justifyContent: 'center'}}>
                      <Image
                        source={require('../../../assets/imgs/Rectangle3.png')}
                      />
                      <View
                        style={{
                          position: 'absolute',
                          width: 100,
                          alignSelf: 'center',
                          justifyContent: 'center',
                        }}>
                        <IconButton
                          icon={'plus'}
                          color={Colors.brownGrey}
                          style={{alignSelf: 'center'}}
                        />
                        <Text
                          style={[
                            Fonts.style.normal,
                            {
                              alignSelf: 'center',
                              fontSize: 12,
                              color: Colors.brownGrey,
                            },
                          ]}>
                          أضف مخطط جديد
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                )}

                {(this.state.bluePrint || []).length > 0 && (
                  <BluePrintList
                    canDelete={true}
                    handleDeleteItem={this.handleDeleteItem}
                    containerStyle={{marginTop: 20}}
                    bluePrint={this.state.bluePrint}
                    doAnimation={true}
                  />
                )}

                {false && (
                  <View>
                    <View
                      style={[
                        Fonts.style.normal,
                        {
                          alignSelf: 'center',
                          textAlign: 'right',
                          fontSize: 12,
                          color: Colors.brownGrey,
                          marginTop: 70,
                          padding: 8,
                          color: '#fff',
                          backgroundColor: Colors.primaryGreen,
                          width: Metrics.screenWidth * 0.7,
                          borderRadius: 15,
                          marginEnd: 15,
                          justifyContent: 'center',
                        },
                      ]}>
                      <Text
                        style={[
                          Fonts.style.normal,
                          {
                            alignSelf: 'center',
                            textAlign: 'right',
                            fontSize: 12,
                            color: Colors.brownGrey,
                            color: '#fff',
                          },
                        ]}>
                        {'إطلب احدى خدماتنا....الطلب الأول مجانا'}
                      </Text>
                    </View>

                    <RequestOrder
                      infoPress={() =>
                        this.setState({
                          showAlert: true,
                          alertMessage:
                            'احصل على صور ٣٦٠ درجة لعقارك، اجعل الزائر يزور عقارك بدون أن يغادر بيته',
                          alertTitle: 'تصوير 360',
                        })
                      }
                      loading={this.state.selecedRequest === 2}
                      price={'١٠٠ ريال'}
                      measurement={'للغرفة الواحدة'}
                      onPress={() =>
                        this.state.forEditing
                          ? this.handleRequest(2)
                          : this.setState(s => ({request360: !s.request360}))
                      }
                      reqested={this.state.request360}
                      containerStyle={{marginTop: 23}}
                      orderName={'تصوير 360'}
                    />

                    <RequestOrder
                      infoPress={() =>
                        this.setState({
                          showAlert: true,
                          alertMessage:
                            'احصل على صور احترافية عالية الدقة لعقارك',
                          alertTitle: 'تصوير احترافي',
                        })
                      }
                      loading={this.state.selecedRequest === 1}
                      price={'٧٠ ريال'}
                      measurement={'للوحة الواحدة'}
                      onPress={() =>
                        this.state.forEditing
                          ? this.handleRequest(1)
                          : this.setState(s => ({
                              requestProfisinalPhoto: !s.requestProfisinalPhoto,
                            }))
                      }
                      reqested={this.state.requestProfisinalPhoto}
                      containerStyle={{marginTop: 14}}
                      orderName={' تصوير احترافي'}
                    />

                    <RequestOrder
                      infoPress={() =>
                        this.setState({
                          showAlert: true,
                          alertMessage:
                            'طباعة وتركيب لوحة للكيو ار كود الخاص بك والذي يشمل موقع العقار وجميع عقاراتك الأخرى',
                          alertTitle: 'QR كود',
                        })
                      }
                      loading={this.state.selecedRequest === 3}
                      price={'١٠٠ ريال'}
                      measurement={'للغرفة الواحدة'}
                      onPress={() =>
                        this.state.forEditing
                          ? this.handleRequest(3)
                          : this.setState(s => ({
                              requestQRCode: !s.requestQRCode,
                            }))
                      }
                      reqested={this.state.requestQRCode}
                      containerStyle={{marginTop: 14}}
                      orderName={'QR كود'}
                    />

                    <Text
                      style={[
                        Fonts.style.normal,
                        {
                          alignSelf: 'center',
                          textAlign: 'right',
                          fontSize: 12,
                          color: Colors.brownGrey,
                          marginTop: 25,
                          width: Metrics.screenWidth * 0.86666667,
                        },
                      ]}>
                      {
                        ' نغطي مدينة الرياض فقط في الوقت الحالي. سيتم تفعيل الطلبات في حالة اضافتك للعقار وسيتم التواصل معك في اقرب فرصة لتنفيذها في الشاشة'
                      }
                    </Text>
                  </View>
                )}

                {/* <AlertModal contentMessage={this.state.alertMessage} closeErrorModel={()=> this.setState({ showAlert: false })} isVisible={this.state.showAlert} /> */}
                <AlertModal
                  closePress={() => this.setState({showAlert: false})}
                  closeErrorModel={this.handleCloseAlertPopUp}
                  title={this.state.alertTitle}
                  onOkPress={this.handleCloseAlertPopUp}
                  cancelButtonText={this.state.cancelButtonText}
                  okButtonText={'حسنا'}
                  contentMessage={this.state.alertMessage}
                  isVisible={this.state.showAlert}
                />

                {this.state.showErrorMessage && (
                  <ErroAlert
                    errorMessage={this.state.errorMessage}
                    setAnimation={() =>
                      this.setState({showErrorMessage: false})
                    }
                    doAnimation={this.state.showErrorMessage}
                  />
                )}

                <Modal
                  isVisible={this.state.showSucessModal}
                  style={{
                    backgroundColor: '#fff',
                    flex: 1,
                    backgroundColor: '#fff',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  backdropOpacity={1}
                  backdropColor={'#fff'}>
                  <Image source={Images.registrationFinishImage} />
                  <TouchableOpacity
                    style={{position: 'absolute', top: 50, right: 30}}
                    onPress={() => this.navTo('bottomTab')}>
                    <CustomIcon name={'close'} size={27} />
                  </TouchableOpacity>
                  <Text
                    style={[
                      Fonts.style.boldText,
                      {fontSize: 18, marginTop: 25},
                    ]}>
                    تم إضافة العقار بنجاح
                  </Text>
                  <Text
                    style={[
                      Fonts.style.normal,
                      {
                        fontSize: 14,
                        marginTop: 19,
                        marginBottom: 50,
                        color: Colors.darkSlateBlue,
                        textAlign: 'center',
                        fontWeight: 'normal',
                      },
                    ]}>
                    رائع ! يمكنك الاطلاع على قائمة العقارات الخاصة بك من خلال
                    الذهاب الي قسم عقاراتي
                  </Text>

                  <Button
                    buttonText={'اضافة عقار جديد'}
                    onPress={() => this.navTo('FirstStepAddAqar')}
                  />
                  <Button
                    textPropsStyle={{color: '#000'}}
                    containerStyle={{backgroundColor: '#fff', marginTop: 29}}
                    buttonText={'عقاراتي'}
                    onPress={() => this.navTo('MyRealEstate')}
                  />
                </Modal>

                <View
                  style={{
                    flexDirection: 'row-reverse',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginTop: 20,
                    marginHorizontal: 12,
                    // position: 'absolute',
                    // bottom: 120
                  }}>
                  <Pagination
                    dotsLength={5}
                    activeDotIndex={4}
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

                  {!this.state.forEditing && (
                    <TouchableOpacity
                      disabled={this.state.loading}
                      style={{zIndex: 999}}
                      onPress={this.handlePreview}>
                      {this.state.loading && false ? (
                        <BallIndicator color={Colors.primaryGreen} />
                      ) : (
                        <View style={{flexDirection: 'row'}}>
                          <Button
                            onPress={this.handlePreview}
                            textPropsStyle={{width: 'auto', paddingEnd: 0}}
                            halfButton={true}
                            buttonText={'معاينة'}
                            containerStyle={{
                              height: 40,
                              width: 80,
                              backgroundColor: 'rgb(106, 118, 133)',
                            }}
                            shadowColor={'rgba(69,93,120,0.25)'}
                          />
                        </View>
                      )}
                    </TouchableOpacity>
                  )}

                  {true && (
                    <TouchableOpacity
                      disabled={this.state.loading}
                      style={{zIndex: 999}}
                      onPress={() =>
                        this.state.forEditing
                          ? this.saveUpdate()
                          : this.publishRealEstate()
                      }>
                      {this.state.loading ? (
                        <BallIndicator color={Colors.primaryGreen} />
                      ) : (
                        <View style={{flexDirection: 'row'}}>
                          <Button
                            onPress={() =>
                              this.state.forEditing
                                ? this.saveUpdate()
                                : this.publishRealEstate()
                            }
                            textPropsStyle={{width: 'auto', paddingEnd: 0}}
                            halfButton={true}
                            buttonText={this.state.forEditing ? 'حفظ' : 'نشر'}
                            containerStyle={{height: 40, width: 80}}
                          />
                        </View>
                      )}
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            </TouchableWithoutFeedback>
          </KeyboardAwareScrollView>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  // getInfo: ()=> dispatch(RealEstateAction.getAddingAqarInfo()),
  // selectedStatus, selectedType, selectedPurpose, price, lat, long, populationType, age, floor, notes, numberOfRooms, numberOfBathRoom, numberOfLivingRoom, features, images
  addRealEstate: (realEstate, token) =>
    dispatch(RealEstateAction.addRealEstate(realEstate, token)),
  checkLikeRating: (_id, token) =>
    dispatch(RealEstateAction.checkRealEstate(_id, token)),
  addRequest: (_id, status, token) =>
    dispatch(RealEstateAction.addRequest(_id, status, token)),
});

const mapStateToProps = state => {
  return {
    // info: state.realEstate.AddingAqarInfo,
    user: state.user.user && state.user.user.user && state.user.user.user,
    realEstate:
      state.realEstate.addAqarSuccess &&
      state.realEstate.addAqarSuccess.realEstate,
    addAqarError:
      state.realEstate.addAqarError && state.realEstate.addAqarError,
    checkRealEstate:
      state.realEstate.checkRealEstate && state.realEstate.checkRealEstate,
    addRequestResult:
      state.realEstate.addRequestResult && state.realEstate.addRequestResult,
    addRequestError:
      state.realEstate.addRequestError && state.realEstate.addRequestError,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(firstStepAddAqar);

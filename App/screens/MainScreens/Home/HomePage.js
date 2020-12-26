import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  Animated,
  Text,
  Keyboard,
  Dimensions,
  TouchableWithoutFeedback,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  Linking,
} from 'react-native';
import {StackActions, NavigationActions} from 'react-navigation';
import MapView, {PROVIDER_GOOGLE, Polygon, Circle} from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import Geolocation from '@react-native-community/geolocation';

import NetInfo, {useNetInfo} from '@react-native-community/netinfo';
import SugestionComp from '../../../Component/sugestionComp';

import HomeHeader from '../../../Component/HomeHeader';
import CardItem from '../../../Component/itemCard';
import {
  Colors,
  Fonts,
  ApplicationStyles,
  Images,
  Metrics,
} from '../../../Themes';
import Marker from '../../../Component/Marker';
import MarkerSmall from '../../../Component/Marker.1';
import RealEstatList from '../../../Component/realEstateList';
import {useAnimation} from '../../../assets/Animation/animation';
import {ifIphoneX} from 'react-native-iphone-x-helper';
import MapStyle from '../../../Themes/mapStyle.json';
import MapStyleDark from '../../../Themes/mapStyleDark.json';
import CodePush from 'react-native-code-push';

import {ThemeContext} from 'react-navigation';

import UserAction from '../../../Redux/UserRedux';

import {connect} from 'react-redux';
import RealEstateAction from '../../../Redux/RealEstateRedux';
import FavoriteAction from '../../../Redux/FavourteRedux';

import Icon from 'react-native-vector-icons/Feather';

import _ from 'lodash';

import AlertModal from '../../../Component/Alert';
import ErroAlert from '../../../Component/ErrorAlert';

import ListFilter from '../../../Component/filters/listFilter';

import {DotIndicator} from 'react-native-indicators';

const {width, height} = Dimensions.get('window');

class HomePage extends React.Component {
  static contextType = ThemeContext;

  constructor(props) {
    super(props);
    // Refs
    this.mapRef = null;

    this.state = {
      realestateTypes: [],
      realEstateListData: [],
      searchValue: '',
      showFilterList: false,
      mapView: true,
      tracksViewChanges: true,
      // sugesstionData: [{name: 'غرناطة المراحمية', id: 1}, {name: 'غرناطة المراحمية', id: 2}, {name: 'غرناطة المراحمية', id: 3}, {name: 'غرناطة المراحمية', id: 4}, {name: 'غرناطة المراحمية', id: 5}, {name: 'غرناطة المراحمية', id: 6}, {name: 'غرناطة المراحمية', id: 7}],
      // shortSugesstionData: [{name: 'غرناطة المراحمية', id: 1}, {name: 'غرناطة المراحمية', id: 2}, {name: 'غرناطة المراحمية', id: 3}, {name: 'غرناطة المراحمية', id: 4}],
      Animation: {
        mapButtonAnimation: new Animated.Value(0),
        filterAnimation: new Animated.Value(0),
        test: new Animated.Value(0),
        test2: new Animated.Value(0),
        listLabel: new Animated.Value(0),
        listLabel2: new Animated.Value(0),
        typesList: new Animated.Value(0),
      },
      fav: false,
      filterActive: false,
      showAlert: false,
      showErrorMessage: false,
      pageNumber: 1,
      numberOfRealEstateShow: false,
      selectedType:
        this.props.filterData && this.props.filterData.type
          ? this.props.filterData.type
          : {_id: 1, nameAr: 'كل العقارات'},
      selectedStatus:
        this.props.filterData && this.props.filterData.status
          ? this.props.filterData.status
          : null,
    };
  }

  startMoveButton = () => {
    Animated.timing(this.state.Animation.mapButtonAnimation, {
      duration: 900,
      toValue: !this.state.mapView ? 0 : 1,
      // useNativeDriver: true
    }).start();
  };

  componentDidUpdate() {
    if (this.state.tracksViewChanges) {
      this.setState(() => ({
        tracksViewChanges: false,
      }));
    }
  }

  startFilterAnimation = () => {
    this.setState({filterActive: true});
    this.state.Animation.filterAnimation.setValue(0);
    Animated.timing(this.state.Animation.filterAnimation, {
      duration: 950,
      toValue: 1,
      // useNativeDriver: true
    }).start(() => {
      this.props.navigation.navigate('FilterPage', {
        selectedType: this.state.selectedType,
      });
      setTimeout(() => {
        this.setState({filterActive: false});
      }, 750);
    });
  };

  handleSearch = val => {
    console.log('hh');
    this.setState({searchValue: val});
    //  _.debounce(() => {
    this.setState({sugesstionLoading: true});
    fetch(
      'https://maps.googleapis.com/maps/api/place/textsearch/json?' +
        'query=' +
        this.state.searchValue +
        '&type=address' +
        '&country=SA' +
        '&key=AIzaSyBNAPLVcqs6_wajjZSULUC7Z1sA9-fdcvU&&language=ar',
    )
      .then(response => response.json())
      .then(responseJson => {
        this.setState({sugesstionLoading: false});
        // console.log('response GOOGLE => ', responseJson)
        //     setLoading(false)
        if ((responseJson.results || []).length > 0) {
          console.log('response of google maps => ', responseJson.results);
          this.setState({sugesstionData: responseJson.results});
        }
      })
      .catch(err => console.log('err GOOGLE => ', err));
    // }, 350).bind()
    // if(this.state.searchValue.length > 3){

    // }
  };

  handleMarkerPress = item => {
    this.props.checkRealEstateInFav(item._id);
    this.setState({
      cardView: true,
      selectedRealEstate: item,
      tracksViewChanges: true,
    });
  };

  startTestAnimatio = () => {
    if (this.state.mapView) {
      return Animated.timing(this.state.Animation.test, {
        duration: 600,
        toValue: 1,
        useNativeDriver: true,
      }).start(() => {
        this.setState({mapView: false, cardView: false});
        Animated.timing(this.state.Animation.test2, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }).start(() => {
          setTimeout(() => {
            Animated.timing(this.state.Animation.listLabel, {
              duration: 600,
              toValue: 1,
              useNativeDriver: true,
            }).start(() => {
              this.setState({numberOfRealEstateShow: true});
              Animated.timing(this.state.Animation.listLabel2, {
                duration: 600,
                toValue: 1,
                useNativeDriver: true,
              }).start();
            });
          }, 7500);
        });
      });
    }

    Animated.timing(this.state.Animation.test2, {
      duration: 600,
      toValue: 0,
      useNativeDriver: true,
    }).start(() => {
      this.setState({mapView: true, numberOfRealEstateShow: false});
      this.goToUserLocation();
      Animated.timing(this.state.Animation.test, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }).start();
    });
  };

  handleViewPress = () => {
    this.setState({realEstateListData: this.state.realestate});

    this.startTestAnimatio();
    this.startMoveButton();
  };

  async checkNet() {
    return NetInfo.fetch();
  }
  componentWillMount() {
    this.checkNet().then(res => {
      console.log('isConnected', res);
      if (!res.isConnected) {
        this.setState({
          showAlert: true,
          alertMessage: 'لا يوجد اتصال في الانترنت الرجاء المحاولة مرة اخرى',
        });
        // alert('لا يوجد اتصال في الانترنت الرجاء المحاولة مرة اخرى')
      }
    });

    this.didFocusListener = this.props.navigation.addListener(
      'didFocus',
      () => {
        console.log('did didFocus');
        // setTimeout(() => {
        console.log(
          'this.statAnimation ',
          this.props.filterData && this.props.filterData.status
            ? this.props.filterData.status
            : null,
        );
        // if(!this.state.mapView){
        //     this.startTestAnimatio()
        //     this.startMoveButton()
        // }
        if (this.props.filterData && this.props.filterData.type) {
          this.setState({
            selectedType:
              this.props.filterData && this.props.filterData.type
                ? this.props.filterData.type
                : {_id: 1},
            status:
              this.props.filterData && this.props.filterData.status
                ? this.props.filterData.status
                : null,
          });
        }
        // this.mapRef.animateToRegion
        this.doReq();

        // }, 1000);
      },
    );
  }

  componentDidMount() {
    this.goToUserLocation();
    this.props.getInfo();

    if (this.props.firstTime) {
      this.setState({
        showErrorMessage: true,
        moreSecond: true,
        green: true,
        errorMessage:
          ' شكرا لزيارتك تطبيق هكتار ونتمنى لك تجربة مميزة في هذا الإطلاق التجريبي',
      });

      setTimeout(() => {
        this.setState({
          showErrorMessage: false,
          moreSecond: false,
          green: false,
          errorMessage:
            ' شكرا لزيارتك تطبيق هكتار ونتمنى لك تجربة مميزة في هذا الإطلاق التجريبي',
        });
        this.props.firstTimeDone();
      }, 6000);
    }
  }

  componentWillUnmount() {
    this.didFocusListener.remove();
    // this.keyboardDidShowListener.remove();
    // this.keyboardDidHideListener.remove();

    // NetInfo.isConnected.removeEventListener(
    //   "connectionChange",
    //   this.handleConnectionActivity
    // );
  }

  handleFilterList = i => {
    this.setState({
      selectedMethod:
        this.state.selecedFilter === i ? this.state.selectedMethod : null,
      selecedFilter: i,
      showFilterList: i !== 3 && true,
    });

    if (i !== 3) {
      this.setState({realEstateListData: this.state.realestate});
    }
  };

  goToUserLocation = () => {
    try {
      Geolocation.getCurrentPosition(
        res => {
          console.log('res', res);
          this.setState({userLocation: res.coords});
          this.setState({loading: true});
          this.mapRef.animateToRegion({
            latitude: res.coords.latitude,
            longitude: res.coords.longitude,
            latitudeDelta: 0.1,
            longitudeDelta: 0.001,
          });
        },
        err => {
          Linking.openSettings();
          this.mapRef.animateToRegion({
            latitude: 24.810133,
            longitude: 46.620784,
            latitudeDelta: 0.1,
            longitudeDelta: 0.001,
          });
          console.log('err', err);
        },
      );
    } catch (e) {
      console.log('fdslgjk', e);
    }
  };

  handleFavPress = () => {
    if (!this.props.user || !this.props.user.token) {
      return this.setState({
        showErrorMessage: true,
        green: false,
        errorMessage: 'الرجاء تسجيل الدخول للاستفادة',
      });
    }

    // return alert('الرجاء تسجيل الدخول للاستفادة')
    this.props.checker
      ? this.props.deleteRealEstateFromFav(
          this.state.selectedRealEstate._id,
          this.props.user.token,
        )
      : this.props.addRealEstateTFav(
          this.state.selectedRealEstate,
          this.props.user.token,
        );

    this.props.checkRealEstateInFav(this.state.selectedRealEstate._id);
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.realEstateList !== this.props.realEstateList) {
      console.log('realEstate', nextProps.realEstateList);
      this.setState({
        loading: false,
        tracksViewChanges: true,
        numberOfRealEstate:
          nextProps.realEstateList &&
          nextProps.realEstateList.numbetOfReaEstate &&
          nextProps.realEstateList.numbetOfReaEstate,
      });
      if (this.state.pageNumber === 1) {
        this.setState({
          realestate:
            nextProps.realEstateList &&
            nextProps.realEstateList.realEstate &&
            nextProps.realEstateList.realEstate,
          realEstateListData: nextProps.realEstateList.realEstate,
        });
      } else {
        if ((nextProps.realEstateList.realEstate || []).length > 0) {
          let arr2 = _.concat(
            this.state.realEstateListData,
            nextProps.realEstateList.realEstate,
          );
          this.setState({realEstateListData: arr2});
        }
      }
    }

    if (nextProps.checker !== this.props.checker) {
      console.log('checker', nextProps.checker);
      this.setState({fav: nextProps.checker, tracksViewChanges: true});
    }

    if (nextProps.info !== this.props.info) {
      // console.log('Hellop Info', nextProps.info)
      this.setState({loading: false, info: nextProps.info});
      // this.props.navigation.navigate('SecondStepAddAqar', { realEstate: nextProps.info })
    }
  }

  handleFilterMethod = i => {
    console.log('type', this.state.selecedFilter, 'method', i);
    let arr = this.state.realEstateListData || [];

    // if(i === 1){
    //     arr.sort((a, b) => this.state.selecedFilter === 2? b.price - a.price:  b.space - a.space)
    // }else if(i === 2){
    //     arr.sort((a, b) => this.state.selecedFilter === 2? a.price - b.price:  a.space - b.space)
    // }

    switch (i) {
      case 1:
        arr.sort((a, b) => b.price - a.price);
        break;

      case 2:
        arr.sort((a, b) => a.price - b.price);
        break;

      default:
        arr.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
        break;
    }

    console.log('arr', arr);
    this.setState({
      realEstateListData: arr,
      showFilterList: false,
      selectedMethod: i,
    });
  };

  onFilterPress = () => {
    this.startFilterAnimation();
  };

  handleCardPress = v => {
    this.props.navigation.navigate('RealEstateDetail', {realEstate: v});
  };

  mapUpdate = v => {
    this.setState({sugesstionData: null});
    if (Math.log2(360 * (width / 256 / v.longitudeDelta)) + 1 < 11.5) {
      this.setState({smallIcon: true});
    } else {
      this.setState({smallIcon: false});
    }
    console.log(
      'this.map',
      Math.log2(360 * (width / 256 / v.longitudeDelta)) + 1,
    );
    // this.setState({cardView: false, loading: true})
    // console.log('Hello123')
    this.doReq(v);
  };

  doReq() {
    console.log('this/s', this.state.selectedStatus);
    this.checkNet().then(res => {
      console.log('isConnected', res);
      if (!res.isConnected) {
        this.setState({
          showAlert: true,
          loading: false,
          alertMessage: 'لا يوجد اتصال في الانترنت الرجاء المحاولة مرة اخرى',
        });
        // alert('لا يوجد اتصال في الانترنت الرجاء المحاولة مرة اخرى')
      } else {
        console.log('filterData', this.props.filterData);
        this.mapRef.getMapBoundaries().then(res => {
          this.setState({
            cardView: false,
            loading: true,
            currentLocation: res,
            pageNumber: 1,
          });
          this.props.getRealEstate({
            pageNumber: this.state.pageNumber,
            pageSize: this.state.smallIcon ? 120 : 50,
            lat2: res.northEast.latitude,
            long2: res.northEast.longitude,
            lat1: res.southWest.latitude,
            long1: res.southWest.longitude,
            ...this.props.filterData,
            type:
              this.state.selectedType &&
              this.state.selectedType._id !== 1 &&
              this.state.selectedType,
            status: this.state.selectedStatus && this.state.selectedStatus,
          });
        });
      }
    });
  }

  handleGetMoreDatat = () => {
    this.checkNet().then(res => {
      if (!res.isConnected) {
        this.setState({
          showAlert: true,
          loading: false,
          alertMessage: 'لا يوجد اتصال في الانترنت الرجاء المحاولة مرة اخرى',
        });
      } else {
        this.setState({
          cardView: false,
          loading: true,
          pageNumber: ++this.state.pageNumber,
        });
        this.props.getRealEstate({
          pageNumber: this.state.pageNumber,
          pageSize: this.state.smallIcon ? 120 : 10,
          lat2: this.state.currentLocation.northEast.latitude,
          long2: this.state.currentLocation.northEast.longitude,
          lat1: this.state.currentLocation.southWest.latitude,
          long1: this.state.currentLocation.southWest.longitude,
          ...this.props.filterData,
          type:
            this.state.selectedType &&
            this.state.selectedType._id !== 1 &&
            this.state.selectedType,
          status: this.state.selectedStatus && this.state.selectedStatus,
        });
      }
    });
  };

  handleTypeFilter(item) {
    // console.log(item)
    this.setState({selectedType: item});
    // if (!this.state.mapView)
    //   return this.checkNet().then(res => {
    //     if (!res.isConnected) {
    //       this.setState({
    //         showAlert: true,
    //         loading: false,
    //         alertMessage: 'لا يوجد اتصال في الانترنت الرجاء المحاولة مرة اخرى',
    //       });
    //     } else {
    //       this.props.changeFilterData(null);
    //       this.props.changeFilterData({type: selectedType});

    //       this.setState({
    //         cardView: false,
    //         loading: true,
    //         realEstateListData: [],
    //         pageNumber: 1,
    //       });
    //       this.props.getRealEstate({
    //         pageNumber: this.state.pageNumber,
    //         pageSize: this.state.smallIcon ? 200 : 10,
    //         lat2: this.state.currentLocation.northEast.latitude,
    //         long2: this.state.currentLocation.northEast.longitude,
    //         lat1: this.state.currentLocation.southWest.latitude,
    //         long1: this.state.currentLocation.southWest.longitude,
    //         ...this.props.filterData,
    //         type:
    //           this.state.selectedType &&
    //           this.state.selectedType._id !== 1 &&
    //           this.state.selectedType,
    //         status: this.state.selectedStatus && this.state.selectedStatus,
    //       });
    //       console.log(item, 'hello shit');
    //     }
    //   });
    // return

    this.doReq();
  }

  handlePurposeFilter(item) {
    console.log(item);
    this.setState({selectedPurpose: item});

    // if(!this.state.mapView)
    //     return this.checkNet().then(res => {
    //         if(!res.isConnected){
    //             this.setState({showAlert: true, loading: false, alertMessage: 'لا يوجد اتصال في الانترنت الرجاء المحاولة مرة اخرى' })
    //         }else {

    //             let s = null

    //             switch (item._id) {
    //                 case 1:
    this.setState({selectedStatus: item._id === 1 ? null : item._id});
    //                     break;

    //                 default:
    //                     this.setState({selectedStatus: item._id})
    //                     break;
    //             }

    this.setState({
      cardView: false,
      loading: true,
      realEstateListData: [],
      pageNumber: 1,
    });
    this.props.getRealEstate({
      pageNumber: 1,
      pageSize: this.state.smallIcon ? 200 : 10,
      lat2: this.state.currentLocation.northEast.latitude,
      long2: this.state.currentLocation.northEast.longitude,
      lat1: this.state.currentLocation.southWest.latitude,
      long1: this.state.currentLocation.southWest.longitude,
      ...this.props.filterData,
      type:
        this.state.selectedType &&
        this.state.selectedType._id !== 1 &&
        this.state.selectedType,
      status: item._id === 1 && item._id,
    });
    console.log(item, 'hello shit');
    //         }
    //     })
    //     // return

    this.doReq();
  }

  typeListPress = () => {
    if (this.state.showTypesList) {
      this.setState({showTypesList: false});
      Animated.timing(this.state.Animation.typesList, {
        toValue: 0,
        duration: 550,
      }).start();
    } else {
      Animated.timing(this.state.Animation.typesList, {
        toValue: 1,
        duration: 550,
      }).start(() => {
        this.setState({showTypesList: true});
      });
    }
  };

  handleChangeStatus = item => {
    // if (this.state.selectedStatus && this.state.selectedStatus._id === item._id){
    //     this.setState({selectedStatus: null})
    //     // this.doReq();
    //     // return
    // }else{
    this.setState({selectedStatus: item._id === 1 ? null : item});
    // }
    if (!this.state.mapView) {
      return this.checkNet().then(res => {
        if (!res.isConnected) {
          this.setState({
            showAlert: true,
            loading: false,
            alertMessage: 'لا يوجد اتصال في الانترنت الرجاء المحاولة مرة اخرى',
          });
        } else {
          this.setState({
            cardView: false,
            loading: true,
            realEstateListData: [],
            pageNumber: 1,
          });
          this.props.getRealEstate({
            pageNumber: this.state.pageNumber,
            pageSize: this.state.smallIcon ? 200 : 10,
            lat2: this.state.currentLocation.northEast.latitude,
            long2: this.state.currentLocation.northEast.longitude,
            lat1: this.state.currentLocation.southWest.latitude,
            long1: this.state.currentLocation.southWest.longitude,
            ...this.props.filterData,
            type:
              this.state.selectedType &&
              this.state.selectedType._id !== 1 &&
              this.state.selectedType,
            status: this.state.selectedStatus && this.state.selectedStatus,
          });
          console.log(item, 'hello shit');
        }
      });
    }
    // return

    this.doReq();
  };

  handleSugesstionPress = i => {
    this.setState({sugesstionData: null, searchValue: ''});
    this.mapRef.animateToRegion({
      latitude: i.geometry.location.lat,
      longitude: i.geometry.location.lng,
      latitudeDelta: 0.1,
      longitudeDelta: 0.001,
    });
  };

  render() {
    const theme = this.context;

    const testStyle = this.state.Animation.mapButtonAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [201, Metrics.screenHeight - 160],
    });

    const {
      sugesstionData,
      searchValue,
      realEstateListData,
      shortSugesstionData,
      mapView,
      realestate,
      realestateTypes,
    } = this.state;

    const testRotate = this.state.Animation.test.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '90deg'],
    });

    const testRotate2 = this.state.Animation.test2.interpolate({
      inputRange: [0, 1],
      outputRange: ['90deg', '0deg'],
    });

    const rotateListLabel = this.state.Animation.listLabel.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '90deg'],
    });

    const rotateListLabel2 = this.state.Animation.listLabel2.interpolate({
      inputRange: [0, 1],
      outputRange: ['90deg', '0deg'],
    });

    const filterScale = this.state.Animation.filterAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 100],
    });

    const typesHeight = this.state.Animation.typesList.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 200],
    });
    const typesWidth = this.state.Animation.typesList.interpolate({
      inputRange: [0, 1],
      outputRange: [0, Metrics.screenWidth - 5],
    });
    const typesPositionHor = this.state.Animation.typesList.interpolate({
      inputRange: [0, 1],
      outputRange: [60, 0],
    });

    return (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View
          style={{
            flex: 1,
            backgroundColor: theme === 'dark' ? '#202126' : '#fff',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {(sugesstionData || []).length > 0 && (
            <SugestionComp
              itemPress={i => this.handleSugesstionPress(i)}
              sugesstionData={sugesstionData}
              doAnimation={true}
            />
          )}

          <Animated.View
            style={{
              position: 'absolute',
              // bottom: typesPosition,
              // bottom: -220,
              top: Platform.OS === 'android' ? 125 : ifIphoneX(170, 135),
              zIndex: 99999999999999999,
              left: typesPositionHor,
              width: typesWidth,
              alignSelf: 'center',

              // width: Metrics.screenWidth-10,
              borderRadius: 10,
              backgroundColor: '#fff',
              paddingVertical: 15,
              alignItems: 'center',
              height: typesHeight,
              // height: 200
            }}>
            <View
              style={{
                flex: 1,
                flexDirection: 'row-reverse',
                flexWrap: 'wrap',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              {this.state.showTypesList &&
                _.map(
                  _.concat(
                    [{_id: 1, nameAr: 'كل العقارات'}],
                    (this.state.info &&
                      this.state.info.realEstateTypes &&
                      this.state.info.realEstateTypes) ||
                      [],
                  ),
                  (item, index) => {
                    return (
                      <TouchableOpacity
                        key={item._id}
                        style={[
                          styles.itemContainer1,
                          {
                            backgroundColor:
                              this.state.selectedType &&
                              this.state.selectedType._id === item._id
                                ? Colors.darkSeafoamGreen
                                : '#ffffff',
                          },
                          Platform.OS === 'sdfsdf' && {
                            transform: [{rotate: '180deg'}],
                          },
                        ]}
                        // onPress={() => {props.selectedTypePressed(item); setDoAnimation(false)}}
                        onPress={() => {
                          this.handleTypeFilter(item);
                          this.typeListPress();
                        }}>
                        <Text
                          style={[
                            Fonts.style.normal,
                            styles.itemText,
                            {
                              color:
                                this.state.selectedType &&
                                this.state.selectedType._id === item._id
                                  ? Colors.white
                                  : Colors.black,
                            },
                          ]}>
                          {item.nameAr}
                        </Text>
                      </TouchableOpacity>
                    );
                  },
                )}
            </View>
          </Animated.View>

          <HomeHeader
            info={this.props.info}
            filterSelected={this.handleFilterList}
            selectedTypeFilter={this.state.selecedFilter}
            mapView={true}
            showTypesList={() => this.setState({showTypesList: true})}
            filterData={this.props.filterData}
            selectedType={this.state.selectedType && this.state.selectedType}
            selectedTypePressed={item => this.handleTypeFilter(item)}
            selectedPurposePressed={item => this.handleChangeStatus(item)}
            // selectedPurpose={this.state.selectedStatus}
            types={
              this.state.info &&
              this.state.info.realEstateTypes &&
              this.state.info.realEstateTypes
            }
            status={
              this.state.info &&
              this.state.info.realEstateStatus &&
              this.state.info.realEstateStatus
            }
            selectedStatus={this.state.selectedStatus}
            statusPress={i => this.handleChangeStatus(i)}
            sugesstionData={
              searchValue.length < 4 ? shortSugesstionData : sugesstionData
            }
            sugesstionLoading={this.state.sugesstionLoading}
            onChangeText={this.handleSearch}
            searchValue={searchValue}
            onFilterPress={this.onFilterPress}
            itemPress={i => this.handleSugesstionPress(i)}
            typeListPress={this.typeListPress}
            onSortPress={() =>
              this.state.mapView
                ? this.setState({
                    showErrorMessage: true,
                    green: true,
                    errorMessage:
                      'للاستفادة الكبرى من ترتيب القائمة الرجاء الانتقال للقائمة',
                  })
                : this.setState({showFilterList: true})
            }
          />

          {this.state.filterActive && (
            <Animated.View
              style={{
                // width: filterPageWidth,
                // height: filterPageHeight,
                width: 40,
                height: 40,
                position: 'absolute',
                top: 60,
                zIndex: 9999,
                left: 10,
                backgroundColor: '#fff',
                borderRadius: 20,
                transform: [{scale: filterScale}],
              }}
            />
          )}

          {this.state.loading && (
            <View
              style={{
                position: 'absolute',
                width: 150,
                height: 50,
                backgroundColor: '#fff',
                zIndex: 999,
                bottom: 85,
                borderRadius: 5,
                shadowColor: '#ccc',
                shadowOffset: {width: 0, height: 0},
                shadowOpacity: 2,
                shadowRadius: 4,
                elevation: 2,
              }}>
              <DotIndicator color={'green'} size={8} />
            </View>
          )}

          <ListFilter
            selectMethod={this.handleFilterMethod}
            selectedTypeFilter={this.state.selecedFilter}
            isVisible={this.state.showFilterList}
            onSwipe={() => this.setState({showFilterList: false})}
            filterType={'الاسعار'}
            selectMethodValue={this.state.selectedMethod}
          />

          {!this.state.showTypesList && (
            <Animated.View
              style={[
                ApplicationStyles.mapButton,
                {
                  // top: startAnimation? Animation.interpolate({inputRange: [0, 1], outputRange: [201, Metrics.screenHeight - 160 ]}): 445,
                  // top: Metrics.screenHeight - 160,
                  top: testStyle,
                  shadowColor: 'rgba(0, 0, 0, 0.16)',
                  shadowOffset: {
                    width: -6,
                    height: 0,
                  },
                  shadowRadius: 6,
                  shadowOpacity: 1,
                  right: 20,
                  zIndex: 1,
                  elevation: 2,
                },
              ]}>
              <TouchableOpacity
                style={{
                  width: '100%',
                  height: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={this.handleViewPress}>
                {!this.state.mapView ? (
                  <Image source={Images.mapIconForList} />
                ) : (
                  <Icon name={'list'} color={'#fff'} size={22} />
                )}
              </TouchableOpacity>
            </Animated.View>
          )}

          <AlertModal
            contentMessage={this.state.alertMessage}
            closeErrorModel={() => this.setState({showAlert: false})}
            isVisible={this.state.showAlert}
          />

          {this.state.showErrorMessage && (
            <ErroAlert
              green={this.state.green}
              moreSecond={this.state.moreSecond}
              setAnimation={() => this.setState({showErrorMessage: false})}
              errorMessage={this.state.errorMessage}
              doAnimation={this.state.showErrorMessage}
            />
          )}

          {mapView && !this.state.showTypesList && !searchValue && (
            <View
              style={[
                {
                  width: 40,
                  //    borderWidth: 1,
                  top: 251,
                  right: 25,
                  position: 'absolute',
                  height: 90,
                },
              ]}>
              {/* <TouchableOpacity
                                style={[styles.circleButton]}
                                onPress={()=> alert('yet')}
                            >
                                <Image source={Images.penIcon} />
                            </TouchableOpacity> */}

              <TouchableOpacity
                style={[styles.circleButton, {marginTop: 5}]}
                onPress={() => this.goToUserLocation()}>
                <Image source={Images.gbsIcon} />
              </TouchableOpacity>
            </View>
          )}

          <Animated.View
            style={[
              {
                ...StyleSheet.absoluteFillObject,
                zIndex: -1,
                transform: [{rotateY: testRotate}],
              },
            ]}>
            <MapView
              provider={PROVIDER_GOOGLE} // remove if not using Google Maps //, {transform: [{rotateY: '20deg'}]}
              ref={ref => (this.mapRef = ref)}
              style={[styles.map]}
              customMapStyle={theme === 'dark' ? MapStyleDark : MapStyle}
              // initialRegion={{
              //     latitude: 24.78825,
              //     longitude: 46.622831,
              //     latitudeDelta: 0.8,
              //     longitudeDelta: 0.001,
              // }}
              minZoomLevel={10}
              onMapReady={() => this.setState({mapReady: true})}
              followsUserLocation
              // scrollEnabled={false}
              // zoomEnabled={false}
              onRegionChangeComplete={v => this.mapUpdate(v)}
              moveOnMarkerPress={false}
              // onPress={()=> this.setState({cardView: false})}
              showsUserLocation={true}>
              {this.state.mapReady &&
                realestate &&
                (realestate || []).map(item => {
                  if (this.state.smallIcon) {
                    return (
                      <MarkerSmall
                        smallIcon={true}
                        focusMarker={
                          this.state.cardView
                            ? this.state.selectedRealEstate._id
                            : null
                        }
                        tracksViewChanges={this.state.tracksViewChanges}
                        key={item._id}
                        item={item}
                        onPress={() => this.handleMarkerPress(item)}
                        showDetailForSmallIcon={false}
                      />
                    );
                  }
                  return (
                    <Marker
                      smallIcon={false && this.state.smallIcon}
                      focusMarker={
                        this.state.cardView
                          ? this.state.selectedRealEstate._id
                          : null
                      }
                      tracksViewChanges={this.state.tracksViewChanges}
                      key={item._id}
                      item={item}
                      onPress={() => this.handleMarkerPress(item)}
                      showDetailForSmallIcon={false}
                    />
                  );
                })}
            </MapView>
          </Animated.View>
          {!mapView && (
            <Animated.View
              style={[
                styles.map,
                {
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: ifIphoneX(120, 92),
                  transform: [{rotateY: testRotate2}],
                },
              ]}>
              <View
                style={{
                  width: '100%',
                  flexWrap: 'wrap',
                  flexDirection: 'row-reverse',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                }}>
                {this.state.numberOfRealEstateShow ? (
                  <Animated.View
                    style={{
                      borderRadius: 12,
                      backgroundColor: Colors.darkSlateBlue,
                      alignItems: 'center',
                      justifyContent: 'center',
                      alignSelf: 'flex-end',
                      marginTop: 50,
                      marginEnd: 16,
                      padding: 10,
                      transform: [{rotateX: rotateListLabel2}],
                    }}>
                    <Text
                      style={[
                        Fonts.style.normal,
                        {
                          fontSize: 10,
                          color: '#fff',
                          fontWeight: 'normal',
                        },
                      ]}>
                      {(realEstateListData || []).length > 0
                        ? `${this.state.numberOfRealEstate} /  ${
                            (realEstateListData || []).length
                          } `
                        : 'لا يوجد عقارات في هذه المنطقة'}
                    </Text>
                  </Animated.View>
                ) : (
                  <Animated.View
                    style={{
                      borderRadius: 12,
                      backgroundColor: Colors.darkSeafoamGreen,
                      alignItems: 'center',
                      justifyContent: 'center',
                      alignSelf: 'flex-end',
                      marginTop: 50,
                      marginEnd: 16,
                      padding: 10,
                      transform: [{rotateX: rotateListLabel}],
                    }}>
                    <Text
                      style={[
                        Fonts.style.normal,
                        {
                          fontSize: 10,
                          color: '#fff',
                          fontWeight: 'normal',
                        },
                      ]}>
                      {'عرض العقارات بناءا علي حدود الخريطة الظاهرة في الخريطة'}
                    </Text>
                  </Animated.View>
                )}
              </View>
              <RealEstatList
                handleGetMoreDatat={this.handleGetMoreDatat}
                numberOfRealEstate={this.state.numberOfRealEstate}
                onItemPress={v => this.handleCardPress(v)}
                realestateData={realEstateListData}
                onMapButtonPress={this.handleViewPress}
              />
            </Animated.View>
          )}

          {this.state.cardView && (
            <CardItem
              selectedRealEstate={this.state.selectedRealEstate}
              onCardPress={() =>
                this.handleCardPress(this.state.selectedRealEstate)
              }
              doAnimation={true}
              onFavPress={this.handleFavPress}
              fav={this.props.checker || this.state.fav}
            />
          )}
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

// export default HomePage

const mapDispatchToProps = dispatch => ({
  getRealEstate: (pageNumber, lat, long, maxPrice, minPrice, sort) =>
    dispatch(
      RealEstateAction.getRealEstate(
        pageNumber,
        lat,
        long,
        maxPrice,
        minPrice,
        sort,
      ),
    ),
  checkRealEstateInFav: realEstateId =>
    dispatch(FavoriteAction.checkFavourte(realEstateId)),
  addRealEstateTFav: (realEstate, token) =>
    dispatch(FavoriteAction.addToFavourte(realEstate, token)),
  deleteRealEstateFromFav: (realEstate, token) =>
    dispatch(FavoriteAction.removeFromFavourte(realEstate, token)),
  getInfo: () => dispatch(RealEstateAction.getAddingAqarInfo()),
  changeFilterData: data => dispatch(UserAction.changeFilter(data)),
  firstTimeDone: () => dispatch(UserAction.firstTimeDone()),
});

const mapStateToProps = state => {
  console.log('state', state);
  return {
    user: state.user.user && state.user.user.user && state.user.user.user,
    realEstateList: state.realEstate.realEstateList,
    checker: state.Favourte.checker && state.Favourte.checker,
    info: state.realEstate.AddingAqarInfo,
    filterData: state.user.filterData,
    firstTime: state.user.firstTime,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HomePage);

const styles = StyleSheet.create({
  container: {
    //   ...StyleSheet.absoluteFillObject,
    height: 100,
    width: 400,
    borderWidth: 1,
    //   justifyContent: 'flex-end',
    //   alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    marginTop: ifIphoneX(130, 98),
    zIndex: -1,
  },
  circleButton:
    // ApplicationStyles.mapButton,
    {
      width: 44,
      height: 44,
      backgroundColor: Colors.darkSeafoamGreen,
      shadowColor: 'rgba(0, 0, 0, 0.16)',
      shadowOffset: {
        width: -6,
        height: 0,
      },
      elevation: 2,
      shadowRadius: 20,
      shadowOpacity: 1,
      zIndex: 99999999999999,
      borderRadius: 22,
      justifyContent: 'center',
      alignItems: 'center',
    },
  itemContainer1: {
    marginHorizontal: 10,
    // flex:1,
    height: 33,
    width: '25%',
    borderRadius: 100,
    shadowColor: 'rgba(0, 0, 0, 0.08)',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 20,
    shadowOpacity: 1,
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: 10,
    elevation: ifIphoneX(0, 1),
  },
  itemText: {
    fontSize: 12,
    fontWeight: 'normal',
    fontStyle: 'normal',
    lineHeight: 16,
    letterSpacing: 0,
    textAlign: 'right',
    color: Colors.black,
  },
});

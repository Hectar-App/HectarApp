import React from 'react';
import {
  Animated,
  Dimensions,
  Image,
  Keyboard,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  Platform,
} from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import Geolocation from '@react-native-community/geolocation';

import NetInfo from '@react-native-community/netinfo';
import SugestionComp from '../../../Component/sugestionComp';

import OfficesHeader from '../../../Component/OfficesHeader';
import CardItem from '../../../Component/itemCard';
import {
  ApplicationStyles,
  Colors,
  Fonts,
  Images,
  Metrics,
} from '../../../Themes';
import Marker from '../../../Component/MarkerOffice';
import MarkerSmall from '../../../Component/Marker.1';
import OfficeList from '../../../Component/OfficeList';
import { ifIphoneX } from 'react-native-iphone-x-helper';
import MapStyle from '../../../Themes/mapStyle.json';
import MapStyleDark from '../../../Themes/mapStyleDark.json';

import { ThemeContext } from 'react-navigation';

import { connect } from 'react-redux';
import OfficesActions from '../../../Redux/OfficesRedux';

import Icon from 'react-native-vector-icons/Feather';

import _ from 'lodash';

import AlertModal from '../../../Component/Alert';
import ErroAlert from '../../../Component/ErrorAlert';

import ListFilter from '../../../Component/listFilter';

import { DotIndicator } from 'react-native-indicators';

const { width } = Dimensions.get('window');

class OfficesPage extends React.Component {
  static contextType = ThemeContext;

  constructor(props) {
    super(props);
    // Refs
    this.mapRef = null;

    this.state = {
      offices: [],
      searchValue: '',
      showFilterList: false,
      mapView: true,
      tracksViewChanges: true,
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
      numberOfOfficesShow: false,
    };
  }

  startMoveButton = () => {
    Animated.timing(this.state.Animation.mapButtonAnimation, {
      duration: 900,
      toValue: !this.state.mapView ? 0 : 1,
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
    this.setState({ filterActive: true });
    this.state.Animation.filterAnimation.setValue(0);
    Animated.timing(this.state.Animation.filterAnimation, {
      duration: 950,
      toValue: 1,
    }).start(() => {
      this.props.navigation.navigate('FilterPage', {
        selectedType: this.state.selectedType,
      });
      setTimeout(() => {
        this.setState({ filterActive: false });
      }, 750);
    });
  };

  handleSearch = val => {
    this.setState({ searchValue: val });
    this.setState({ sugesstionLoading: true });
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
        this.setState({ sugesstionLoading: false });
        if ((responseJson.results || []).length > 0) {
          this.setState({ sugesstionData: responseJson.results });
        }
      })
      .catch(err => console.log('err GOOGLE => ', err));
  };

  handleMarkerPress = item => {
    this.setState({
      cardView: true,
      selectedOffice: item,
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
        this.setState({ mapView: false, cardView: false });
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
              this.setState({ numberOfOfficesShow: true });
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
      this.setState({ mapView: true, numberOfOfficesShow: false });
      this.goToUserLocation();
      Animated.timing(this.state.Animation.test, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }).start();
    });
  };

  handleViewPress = () => {
    this.setState({ offices: this.state.office || this.props.offices });
    console.log({ badawey: this.state.office });
    console.log({ badawey2: this.state });
    console.log({ badawey3: this.props });
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
        if (this.props.filterData && this.props.filterData.type) {
          this.setState({
            selectedType:
              this.props.filterData && this.props.filterData.type
                ? this.props.filterData.type
                : { _id: 1 },
            status:
              this.props.filterData && this.props.filterData.status
                ? this.props.filterData.status
                : null,
          });
        }
        this.doReq();
      },
    );
  }

  componentDidMount() {
    this.goToUserLocation();
  }

  componentWillUnmount() {
    this.didFocusListener.remove();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ loading: false });
    if (nextProps.OfficeList !== this.props.OfficeList) {
      console.log('offices', nextProps.OfficeList);
      console.log('badawey500', nextProps.OfficeList);
      this.setState({
        loading: false,
        tracksViewChanges: true,
        numberOfOfficesShow:
          nextProps.OfficeList && nextProps.OfficeList.numberOfOffices,
      });
      if (this.state.pageNumber === 1) {
        this.setState({
          office:
            nextProps.OfficeList &&
            nextProps.OfficeList.office &&
            nextProps.OfficeList.office,
          officesData: nextProps.OfficeList.office,
        });
      } else {
        if ((nextProps.OfficeList.office || []).length > 0) {
          let arr2 = _.concat(
            this.state.officesData,
            nextProps.OfficeList.office,
          );
          this.setState({ officesData: arr2 });
        }
      }
    }

    if (nextProps.checker !== this.props.checker) {
      console.log('checker', nextProps.checker);
      this.setState({ fav: nextProps.checker, tracksViewChanges: true });
    }

    if (nextProps.info !== this.props.info) {
      this.setState({ loading: false, info: nextProps.info });
    }
  }

  handleFilterList = i => {
    this.setState({
      selectedMethod:
        this.state.selecedFilter === i ? this.state.selectedMethod : null,
      selecedFilter: i,
      showFilterList: i !== 3 && true,
    });

    if (i !== 3) {
      this.setState({ offices: this.state.office });
    }
  };

  goToUserLocation = () => {
    try {
      Geolocation.getCurrentPosition(
        res => {
          this.setState({ userLocation: res.coords });
          this.setState({ loading: true });
          this.mapRef.animateToRegion({
            latitude: res.coords.latitude,
            longitude: res.coords.longitude,
            latitudeDelta: 0.1,
            longitudeDelta: 0.001,
          });
        },
        err => {
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

    this.props.checker
      ? this.props.deleteRealEstateFromFav(
          this.state.selectedOffice._id,
          this.props.user.token,
        )
      : this.props.addRealEstateTFav(
          this.state.selectedOffice,
          this.props.user.token,
        );

    this.props.checkRealEstateInFav(this.state.selectedOffice._id);
  };

  handleFilterMethod = i => {
    let arr = this.state.offices || [];

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

    this.setState({
      offices: arr,
      showFilterList: false,
      selectedMethod: i,
    });
  };

  onFilterPress = () => {
    this.startFilterAnimation();
  };

  handleCardPress = v => {
    console.log(this.props)
    this.props.navigation.push('OfficeDetails', { officeDetails: v });
  };

  mapUpdate = v => {
    this.setState({ sugesstionData: null });
    if (Math.log2(360 * (width / 256 / v.longitudeDelta)) + 1 < 11.5) {
      this.setState({ smallIcon: true });
    } else {
      this.setState({ smallIcon: false });
    }
    this.doReq(v);
  };

  doReq(v) {
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
        this.setState({
          cardView: false,
          loading: true,
          currentLocation: res,
          pageNumber: 1,
        });
        this.props.getOffices({
          lat: v.latitude,
          lng: v.longitude,
          radius: 10000,
          pageNumber: 1,
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
      }
    });
  };

  handleTypeFilter(item) {
    this.setState({ selectedType: item });
    this.doReq();
  }

  handlePurposeFilter(item) {
    this.setState({ selectedPurpose: item });
    this.setState({ selectedStatus: item._id === 1 ? null : item._id });

    this.setState({
      cardView: false,
      loading: true,
      offices: [],
      pageNumber: 1,
    });
    this.doReq();
  }

  typeListPress = () => {
    if (this.state.showTypesList) {
      this.setState({ showTypesList: false });
      Animated.timing(this.state.Animation.typesList, {
        toValue: 0,
        duration: 550,
      }).start();
    } else {
      Animated.timing(this.state.Animation.typesList, {
        toValue: 1,
        duration: 550,
      }).start(() => {
        this.setState({ showTypesList: true });
      });
    }
  };

  handleChangeStatus = item => {
    this.setState({ selectedStatus: item._id === 1 ? null : item });
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
            offices: [],
            pageNumber: 1,
          });
        }
      });
    }

    this.doReq();
  };

  handleSugesstionPress = i => {
    this.setState({ sugesstionData: null, searchValue: '' });
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

    const { sugesstionData, searchValue, mapView } = this.state;

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
            backgroundColor: theme === 'dark' ? '#202126' : '#fcfcfc',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {(sugesstionData || []).length > 0 && (
            <SugestionComp
              itemPress={i => this.handleSugesstionPress(i)}
              sugesstionData={sugesstionData}
              doAnimation={true}
              office
            />
          )}
          <OfficesHeader
            onSearch={this.handleSearch}
            searchValue={searchValue}
            sugesstionLoading={this.state.sugesstionLoading}
          />
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
                    [{ _id: 1, nameAr: 'كل العقارات' }],
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
                            transform: [{ rotate: '180deg' }],
                          },
                        ]}
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

          {this.state.filterActive && (
            <Animated.View
              style={{
                width: 40,
                height: 40,
                position: 'absolute',
                top: 60,
                zIndex: 9999,
                left: 10,
                backgroundColor: '#fff',
                borderRadius: 20,
                transform: [{ scale: filterScale }],
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
                shadowOffset: { width: 0, height: 0 },
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
            onSwipe={() => this.setState({ showFilterList: false })}
            filterType={'الاسعار'}
            selectMethodValue={this.state.selectedMethod}
          />

          {!this.state.showTypesList && (
            <Animated.View
              style={[
                ApplicationStyles.mapButton,
                {
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
            closeErrorModel={() => this.setState({ showAlert: false })}
            isVisible={this.state.showAlert}
          />

          {this.state.showErrorMessage && (
            <ErroAlert
              green={this.state.green}
              moreSecond={this.state.moreSecond}
              setAnimation={() => this.setState({ showErrorMessage: false })}
              errorMessage={this.state.errorMessage}
              doAnimation={this.state.showErrorMessage}
            />
          )}

          {mapView && !this.state.showTypesList && !searchValue && (
            <View
              style={[
                {
                  width: 40,
                  top: 251,
                  right: 25,
                  position: 'absolute',
                  height: 90,
                },
              ]}>
              <TouchableOpacity
                style={[styles.circleButton, { marginTop: 5 }]}
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
                transform: [{ rotateY: testRotate }],
              },
            ]}>
            <MapView
              provider={PROVIDER_GOOGLE} // remove if not using Google Maps //, {transform: [{rotateY: '20deg'}]}
              ref={ref => (this.mapRef = ref)}
              style={[styles.map]}
              customMapStyle={theme === 'dark' ? MapStyleDark : MapStyle}
              onMapReady={() => this.setState({ mapReady: true })}
              followsUserLocation
              onRegionChangeComplete={v => this.mapUpdate(v)}
              moveOnMarkerPress={false}
              showsUserLocation={true}>
              {this.state.mapReady &&
                this.props.offices.map(item => {
                  if (this.state.smallIcon) {
                    return (
                      <MarkerSmall
                        smallIcon={true}
                        focusMarker={
                          this.state.cardView
                            ? this.state.selectedOffice.place_id
                            : null
                        }
                        tracksViewChanges={this.state.tracksViewChanges}
                        key={item.place_id}
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
                          ? this.state.selectedOffice.place_id
                          : null
                      }
                      tracksViewChanges={this.state.tracksViewChanges}
                      key={item.place_id}
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
                  transform: [{ rotateY: testRotate2 }],
                },
              ]}>
              <View
                style={{
                  width: '100%',
                  flexWrap: 'wrap',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  flex: 1,
                  marginTop: 35,
                  marginBottom: 55,
                }}>
                {/* {this.state.numberOfOfficesShow ? (
                  <Animated.View
                    style={{
                      borderRadius: 12,
                      backgroundColor: Colors.darkSlateBlue,
                      alignItems: 'center',
                      justifyContent: 'center',
                      alignSelf: 'center',
                      marginTop: 50,
                      marginEnd: 16,
                      padding: 10,
                      transform: [{ rotateX: rotateListLabel2 }],
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
                      {(this.props.offices || []).length > 0
                        ? `${this.props.offices.length} /////  ${
                            (this.props.offices || []).length
                          } `
                        : 'لا يوجد مكاتب عقارية في هذه المنطقة'}
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
                      transform: [{ rotateX: rotateListLabel }],
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
                      {
                        'عرض المكاتب العقارية بناءا علي حدود الخريطة الظاهرة في الخريطة'
                      }
                    </Text>
                  </Animated.View>
                )} */}
                <OfficeList
                  handleGetMoreDatat={this.handleGetMoreDatat}
                  numberOfOffices={this.state.numberOfOffices}
                  onItemPress={v => this.handleCardPress(v)}
                  officesData={this.props.offices}
                  loading={false}
                  doAnimation={true}
                  onMapButtonPress={this.handleViewPress}
                />
              </View>
            </Animated.View>
          )}

         
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

// export default OfficesPage

const mapDispatchToProps = dispatch => ({
  getOffices: ({ lat, lng, radius, pageNumber }) => {
    dispatch(OfficesActions.getOffices(lat, lng, radius, pageNumber));
  },
});

const mapStateToProps = state => {
  return {
    offices: state.realEstateOffices.offices,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(OfficesPage);

const styles = StyleSheet.create({
  container: {
    height: 100,
    width: 400,
    borderWidth: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    marginTop: ifIphoneX(160, 110),
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

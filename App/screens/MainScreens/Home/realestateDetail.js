import React from 'react';
import {
  View,
  Animated,
  Text,
  Keyboard,
  Share,
  TouchableWithoutFeedback,
  Linking,
  TouchableOpacity,
  Image,
  Platform,
  StyleSheet,
} from 'react-native';

import { connect } from 'react-redux';
import FavoriteAction from '../../../Redux/FavourteRedux';
import RealEstateAcion from '../../../Redux/RealEstateRedux';

import { Fonts, Colors, Metrics, Images, CustomIcon } from '../../../Themes';

import AqarFeatures from '../../../Component/AqarFeaturesLis';
import BluePrintList from '../../../Component/BluePrintList';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import RatingModal from '../../../Component/RatingModal';

import RequestModal from '../../../Component/RequestModal';

import Gallery from '../../../Component/galerry';

import NearAqarFeatures from '../../../Component/NearFeaturesAqar';
import SugesstionRealEstate from '../../../Component/SugesstionAqars';
import PanoramView from '../../../Component/360View';

import HeadreRealestateDetail from '../../../Component/headerRealestateDetailsOwner';
import HeadreRealestateDetailPersentage from '../../../Component/headerRealestateDetailsOwnerPersentage';

import api from '../../../Services/API';

import { ifIphoneX } from 'react-native-iphone-x-helper';
import { IconButton, ActivityIndicator } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { BallIndicator } from 'react-native-indicators';

import AlertModal from '../../../Component/Alert';
import ErroAlert from '../../../Component/ErrorAlert';

import moment from 'moment';
import 'moment/locale/ar';
import Tags from '../../../Component/core/Tags';
import { perfectWidth } from '../../../utils/commonFunctions';

const HEADER_MIN_HEIGHT = 120;
const HEADER_MAX_HEIGHT = Metrics.screenHeight * 0.4;

const API = api.create();
class RealEstateDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      realEstateItem:
        this.props.navigation.state &&
        this.props.navigation.state.params &&
        this.props.navigation.state.params.realEstate,
      toPreview: this.props.navigation.getParam('toPreview'),
      animation: {
        Animation: new Animated.Value(0),
        animtion3: new Animated.Value(0),
        animtion4: new Animated.Value(0),
        Animation2: new Animated.Value(0),
        Animation6: new Animated.Value(0),
      },
      sliderActiveSlide: 0,
      showRating: false,
      shaowNearFeatures: false,
      imageFullScreen: false,
      showPanoramaView: false,
      selectedImage: null,
      fav: false,
      like: false,
      rate: true,
      loadingFlag: true,
      showAlert: false,
    };
    this.scrollViewRef = null;
  }

  componentDidMount() {
    console.log('RealEstate', this.state.realEstateItem);
    if (!this.state.toPreview) {
      this.props.addShow(this.state.realEstateItem._id);
    }

    if (!this.state.toPreview) {
      this.props.getRealEstateDetails(this.state.realEstateItem._id);
    }

    if (this.state.toPreview) {
      const { imagesSmall, images } = this.state.realEstateItem;

      this.setState({
        images:
          (imagesSmall || []).length > 0
            ? imagesSmall
            : this.state.realEstateItem.images,
        compaond: this.state.realEstateItem.type.nameEn === 'compound',
      });
    }

    this.didFocusListener = this.props.navigation.addListener(
      'didFocus',
      () => {
        if (!this.state.toPreview) {
          this.props.getRealEstateDetails(this.state.realEstateItem._id);
        }
      },
    );
  }

  componentWillMount() {
    console.log('RealEstate', this.state.realEstateItem);
    this.startAllAnimation();
  }

  startAllAnimation() {
    Animated.timing(this.state.animation.Animation2, {
      toValue: 1,
      duration: 550,
    }).start();
  }

  componentWillReceiveProps(nextProps) {
    console.log('nextProps', nextProps);
    if (nextProps.checker !== this.props.checker) {
      return this.setState({ fav: nextProps.checker });
    }
    if (nextProps.checkRealEstate !== this.props.checkRealEstate) {
      console.log('checker Request => ', nextProps.checkRealEstate);
      if (nextProps.checkRealEstate !== null) {
        return this.setState({
          like:
            nextProps.checkRealEstate.likes && nextProps.checkRealEstate.likes,
          loadingFlag: false,
          rate: this.state.owner ? true : nextProps.checkRealEstate.rating,
          request1:
            nextProps.checkRealEstate.request1 &&
            nextProps.checkRealEstate.request1,
          request2:
            nextProps.checkRealEstate.request2 &&
            nextProps.checkRealEstate.request2,
          request3:
            nextProps.checkRealEstate.request3 &&
            nextProps.checkRealEstate.request3,
        });
      }
    }
    if (nextProps.likeRealEstateResult !== this.props.likeRealEstateResult) {
      this.props.getRealEstateDetails(this.state.realEstateItem._id);
      if (
        nextProps.likeRealEstateResult.message &&
        nextProps.likeRealEstateResult.message === 'done' &&
        !this.state.like
      ) {
        return this.setState({ like: true });
      } else {
        return this.setState({ like: false });
      }
    }

    if (nextProps.rateRealEstateResult !== this.props.rateRealEstateResult) {
      if (nextProps.rateRealEstateResult.message) {
        // return alert(nextProps.rateRealEstateResult.message)
        this.setState({ loading: false, done: true, rate: true });

        setTimeout(() => {
          this.setState({ showRating: false });
        }, 2000);
      }
    }

    if (nextProps.realEstateDetail !== this.props.realEstateDetail) {
      if (nextProps.realEstateDetail) {
        this.setState({ realEstateItem: nextProps.realEstateDetail });

        if (this.props.user && this.props.user.token && !this.state.toPreview) {
          this.props.checkRealEstateInFav(this.state.realEstateItem._id);
          this.props.checkLikeRating(
            this.state.realEstateItem._id,
            this.props.user.token,
          );
        }

        if (
          this.state.realEstateItem &&
          this.state.realEstateItem.owner &&
          !this.state.toPreview
        ) {
          this.setState({
            owner:
              this.props.user &&
              this.props.user._id === this.state.realEstateItem.owner._id,
          });
        }

        if (!this.props.user && !this.state.toPreview) {
          this.setState({ rate: false });
        }
        const { imagesSmall, images } = this.state.realEstateItem;
        if (imagesSmall) {
          this.setState({
            images:
              (imagesSmall || []).length > 0
                ? imagesSmall
                : this.state.realEstateItem.images,
            compaond: this.state.realEstateItem.type.nameEn === 'compound',
          });
        }
      } else {
        this.props.navigation.goBack();
      }
    }

    if (nextProps.rateRealEstateError !== this.props.rateRealEstateError) {
      if (nextProps.rateRealEstateError.error) {
        if (nextProps.rateRealEstateError.error) {
          return alert(nextProps.rateRealEstateError.error);
        }
      }
    }

    if (nextProps.addRequestError !== this.props.addRequestError) {
      this.setState({ requestLoading: null });
      if (nextProps.addRequestError.message) {
        return alert(nextProps.addRequestError.message);
      }

      if (nextProps.addRequestError.error) {
        return alert(nextProps.addRequestError.error);
      }
    }

    if (nextProps.addRequestResult !== this.props.addRequestResult) {
      if (this.state.request === 1) {
        this.setState({ request1: true });
      } else if (this.state.request === 2) {
        this.setState({ request2: true });
      } else {
        this.setState({ request3: true });
      }
      this.setState({ requestLoading: null, done: true });
    }
  }

  handleShare = () => {
    if (this.state.toPreview) {
      return;
    }
    Share.share({
      message:
        'لاعجابي الشديد بهذا العقار وددت مشاركته ' +
        'https://hectar.io/property/' +
        this.state.realEstateItem._id +
        '/0',
    });
  };

  handleGetSuggestion = () => {
    console.log(this.state.suggestionDate);
    if (this.state.suggestionDate === undefined && !this.state.sugLoading) {
      this.setState({ sugLoading: true });
      API.suggestionRealEstate(this.state.realEstateItem._id)
        .then(res => {
          if (res.data && !res.data.message) {
            console.log('res', res);
            this.setState({ suggestionDate: res.data, sugLoading: false });
          }
        })
        .catch(err => this.setState({ sugLoading: true }));
    }
  };

  goToDetail = () => {
    if (this.state.toPreview) {
      return;
    }

    this.props.navigation.navigate('FirstStepAddAqar', {
      fromDetail: true,
      realEstate: this.state.realEstateItem,
    });
  };

  handleLogin = () => {
    this.setState({ showAlert: false });
    this.props.navigation.navigate('LoginPage');
  };

  addLike = () => {
    if (this.state.toPreview) {
      return;
    }
    if (!this.props.user || !this.props.user.token) {
      return this.setState({
        showAlert: true,
        alertMessage: 'الرجاء تسجيل الدخول للاستفادة',
      });
    }

    this.props.addLike(
      this.state.realEstateItem._id,
      this.state.like ? 2 : 1,
      this.props.user.token,
    );
  };

  timeSince(date) {
    var seconds = Math.floor((new Date() - date) / 1000);

    var interval = Math.floor(seconds / 31536000);

    if (interval > 1) {
      return 'قبل' + interval + ' سنوات';
    }
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {
      return 'قبل' + interval + ' شهور';
    }
    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
      return 'قبل' + interval + ' ايام';
    }
    interval = Math.floor(seconds / 3600);
    if (interval > 1) {
      return 'قبل' + interval + ' ساعات';
    }
    interval = Math.floor(seconds / 60);
    if (interval > 1) {
      return 'قبل' + interval + ' دقائق';
    }
    return 'قبل' + Math.floor(seconds) + ' ثواني';
  }

  favProccess = () => {
    if (this.state.toPreview) {
      return;
    }
    if (!this.props.user || !this.props.user.token) {
      return this.setState({
        showAlert: true,
        alertMessage: 'الرجاء تسجيل الدخول للاستفادة',
      });
    }
    this.setState({ fav: !this.state.fav });
    this.state.fav
      ? this.props.deleteRealEstateFromFav(
          this.state.realEstateItem._id,
          this.props.user.token,
        )
      : this.props.addRealEstateTFav(
          this.state.realEstateItem,
          this.props.user.token,
        );
  };

  handleRating(rating, selected) {
    if (this.props.user && this.props.user.token) {
      console.log('selected', selected);
      let reason = '';
      (selected || []).map(
        i => (reason += i.name !== undefined ? '،' + i.name : ''),
      ); //t
      this.props.rateRealEstate(
        this.state.realEstateItem._id,
        rating,
        reason,
        this.props.user.token,
      );
    } else {
      return this.setState({
        showAlert: true,
        alertMessage: 'الرجاء تسجيل الدخول للاستفادة',
      });
    }
  }

  handleRequest(request) {
    if (this.props.user && this.props.user.token) {
      console.log('selected', request);
      this.setState({ requestLoading: request._id, request: request._id });
      this.props.addRequest(
        this.state.realEstateItem._id,
        request._id,
        this.props.user.token,
      );
    } else {
      return alert('الرجاء تسجيل الدخول للاستفادة');
    }
  }

  kFormatter(num) {
    return Math.abs(num) > 999 && Math.abs(num) < 999999
      ? Math.sign(num) * (Math.abs(num) / 1000).toFixed(1) + ' الف'
      : Math.abs(num) > 999999
      ? Math.sign(num) * (Math.abs(num) / 1000000).toFixed(1) + ' مليون'
      : Math.sign(num) * Math.abs(num);
  }

  componentWillUnmount() {
    this.didFocusListener.remove();
  }

  render() {
    const { realEstateItem, owner, like, fav, showRating, images } = this.state;
    const typeFemale =
      realEstateItem.type &&
      (realEstateItem.type.nameEn === 'land' ||
        realEstateItem.type.nameEn === 'villa' ||
        realEstateItem.type.nameEn === 'building' ||
        realEstateItem.type.nameEn === 'flat');
    const shop = realEstateItem.type && realEstateItem.type.nameEn === 'shop';
    const flat = realEstateItem.type && realEstateItem.type.nameEn === 'flat';
    const land = realEstateItem.type && realEstateItem.type.nameEn === 'land';

    const populationShow =
      realEstateItem.type &&
      (realEstateItem.type.nameEn === 'villa' ||
        realEstateItem.type.nameEn === 'building' ||
        realEstateItem.type.nameEn === 'flat');
    const purposeShow =
      realEstateItem.type &&
      (realEstateItem.type.nameEn === 'land' ||
        realEstateItem.type.nameEn === 'building' ||
        realEstateItem.type.nameEn === 'compound');

    var opacity = this.state.animation.Animation.interpolate({
      inputRange: [0, 180],
      outputRange: [1, 0],
    });

    const headerHeight = this.state.animation.Animation.interpolate({
      inputRange: [0, (HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT) * 2],
      outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
      extrapolate: 'clamp',
    });

    const headerBackgroundColor = this.state.animation.Animation.interpolate({
      inputRange: [0, (HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT) / 8],
      outputRange: ['transparent', '#fff'],
      extrapolate: 'clamp',
    });

    const headerBackgroundColorText = this.state.animation.Animation.interpolate(
      {
        inputRange: [0, (HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT) / 8],
        outputRange: ['#fff', Colors.darkSlateBlue],
        extrapolate: 'clamp',
      },
    );

    return (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
          <View style={{ flex: 1 }}>
            <Animated.View
              style={{
                width: '100%',
                height: headerHeight,
                backgroundColor: '#fff',
                // borderWidth: 1
              }}>
              <Animated.View
                style={{
                  position: 'absolute',
                  width: '100%',
                  height: 130,
                  backgroundColor: headerBackgroundColor,
                  bottom: 0,
                  zIndex: 9999099,
                  paddingTop: 28,
                  justifyContent: 'center',
                  shadowColor: 'rgba(0, 0, 0, 0.6)',
                  shadowOffset: {
                    width: 0,
                    height: 1,
                  },
                  shadowRadius: 6,
                  shadowOpacity: 1,
                  elevation: 4,
                }}>
                <View
                  style={{
                    width: '100%',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingRight: 21,
                    paddingLeft: 41,
                  }}>
                  <Animated.Text
                    style={[
                      Fonts.style.normal,
                      { marginBottom: 9, color: headerBackgroundColorText },
                    ]}>
                    <Text style={{ ...Fonts.style.boldText }}>
                      {(realEstateItem &&
                        realEstateItem.price &&
                        this.kFormatter(realEstateItem.price)) ||
                        ' السعر غير محدد '}
                    </Text>
                    {realEstateItem &&
                      realEstateItem.price &&
                      (realEstateItem && realEstateItem.payType == '0'
                        ? ' ريال / سنوي'
                        : realEstateItem.payType === 1
                        ? ' ريال / شهري'
                        : realEstateItem.payType === 2
                        ? ' / يومي'
                        : ' ريال')}
                  </Animated.Text>

                  <Animated.Text
                    style={[
                      Fonts.style.normal,
                      {
                        marginBottom: 9,
                        fontSize: 18,
                        color: headerBackgroundColorText,
                      },
                    ]}>
                    {realEstateItem &&
                      realEstateItem.type &&
                      realEstateItem.type.nameAr &&
                      realEstateItem.type.nameAr}{' '}
                    {realEstateItem &&
                      realEstateItem.purpose &&
                      realEstateItem.purpose.nameAr &&
                      !flat &&
                      purposeShow &&
                      !shop &&
                      realEstateItem.purpose.nameAr}{' '}
                    {realEstateItem &&
                      realEstateItem.status &&
                      realEstateItem.status.nameAr &&
                      realEstateItem.status.nameAr}
                  </Animated.Text>
                </View>

                <Animated.View
                  style={{
                    opacity,
                    flexWrap: 'wrap',
                    position: 'absolute',
                    bottom: 70,
                    left: 10,
                  }}>
                  <Pagination
                    dotsLength={(this.state.images || []).length}
                    activeDotIndex={this.state.sliderActiveSlide}
                    dotStyle={{
                      backgroundColor: Colors.white,
                    }}
                    inactiveDotStyle={{
                      width: 8,
                      height: 8,
                      borderRadius: 4,
                      marginHorizontal: 0,
                      backgroundColor: Colors.brownGrey,
                    }}
                    inactiveDotOpacity={1}
                    inactiveDotScale={1}
                  />
                </Animated.View>

                <View
                  style={{
                    width: '100%',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingRight: 21,
                    paddingLeft: 41,
                  }}>
                  {!this.state.toPreview && (
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                      }}>
                      <Animated.Text
                        style={[
                          Fonts.style.normal,
                          styles.textStyle,
                          {
                            fontWeight: 'normal',
                            color: headerBackgroundColorText,
                          },
                        ]}>
                        {moment(realEstateItem.updatedAt).fromNow()}
                        {/* {this.timeSince(new Date(realEstateItem.updatedAt))} */}
                      </Animated.Text>
                      <CustomIcon
                        name={'clock3'}
                        color={Colors.white}
                        size={16}
                        style={{ marginStart: 10 }}
                      />
                    </View>
                  )}

                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      flex: 5,
                      justifyContent: 'flex-end',
                      width: '80%',
                    }}>
                    <Animated.Text
                      numberOfLines={2}
                      style={[
                        Fonts.style.normal,
                        {
                          fontSize: 12,
                          textAlign: 'right',
                          width: '90%',
                          marginEnd: 8,
                          alignSelf: 'center',
                          color: headerBackgroundColorText,
                        },
                      ]}>
                      {realEstateItem &&
                        realEstateItem.address &&
                        realEstateItem.address.address}
                    </Animated.Text>
                    <Image source={Images.locationFlagCardIcon} />
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    flex: 5,
                    justifyContent: 'flex-end',
                    marginRight: perfectWidth(13.5),
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-around',
                    }}>
                    {this.state.realEstateItem?.tags?.map(tag => (
                      <Tags text={tag} />
                    ))}
                  </View>
                </View>
              </Animated.View>
              <Gallery
                isVisible={this.state.imageFullScreen}
                images={this.state.images}
                onBackPress={() => this.setState({ imageFullScreen: false })}
              />

              <Carousel
                data={(this.state.images || []).length > 0 ? images : [{}]}
                renderItem={item => {
                  return (
                    <TouchableOpacity
                      onPress={() =>
                        this.state.toPreview ||
                        (this.state.images || []).length <= 0
                          ? null
                          : this.setState({
                              imageFullScreen: true,
                              selectedImage: item.item,
                            })
                      }>
                      <Animated.Image
                        source={
                          images && (images || []).length > 0
                            ? { uri: item?.item?.uri || item.item }
                            : Images.testCardImage
                        }
                        style={[
                          { width: '100%', height: '100%', opacity },
                          Platform.OS && { width: Metrics.screenWidth },
                        ]}
                      />
                      <View
                        style={{
                          width: '100%',
                          height: '100%',
                          position: 'absolute',
                          opacity: 0.2,
                          backgroundColor: Colors.brownGrey,
                        }}
                      />
                    </TouchableOpacity>
                  );
                }}
                style={{
                  zIndex: 999,
                }}
                sliderWidth={Metrics.screenWidth}
                itemWidth={Metrics.screenWidth}
                containerCustomStyle={[{ overflow: 'visible' }]}
                loop={true}
                loopClonesPerSide={2}
                autoplayInterval={3000}
                onSnapToItem={index =>
                  this.setState({ sliderActiveSlide: index })
                }
              />
            </Animated.View>

            <Animated.View
              style={[
                styles.ballView,
                {
                  position: 'absolute',
                  width: 34,
                  height: 34,
                  borderRadius: 17,
                  opacity,
                  backgroundColor: 'rgba(199,183,169, .80)',
                  justifyContent: 'center',
                  alignItems: 'center',
                  top: ifIphoneX(50, 20),
                  right: 15,
                  zIndex: 99999,
                },
              ]}>
              <TouchableOpacity
                style={[
                  styles.ballView,
                  {
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: 99999,
                    marginEnd: 0,
                  },
                ]}
                onPress={() => this.props.navigation.goBack()}>
                <IconButton
                  icon={'chevron-right'}
                  color={'#fff'}
                  style={{ alignSelf: 'center' }}
                />
              </TouchableOpacity>
            </Animated.View>

            <Animated.View
              style={[
                styles.ballView,
                {
                  position: 'absolute',
                  opacity,
                  justifyContent: 'center',
                  alignItems: 'center',
                  top: ifIphoneX(50, 20),
                  left: 15,
                  zIndex: 99999,
                },
              ]}>
              <TouchableOpacity
                style={[
                  styles.ballView,
                  {
                    width: 34,
                    height: 34,
                    borderRadius: 17,
                    backgroundColor: 'rgb(255,255,255)',
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: 99999,
                  },
                ]}
                onPress={this.favProccess}>
                <CustomIcon
                  name={
                    (this.props.checker || fav) && !this.state.toPreview
                      ? 'bookmark2'
                      : 'bookmark2'
                  }
                  size={15}
                  color={
                    (this.props.checker || fav) && !this.state.toPreview
                      ? Colors.darkSeafoamGreen
                      : Colors.grey
                  }
                />
              </TouchableOpacity>

              {owner && (
                <TouchableOpacity
                  style={[
                    styles.ballView,
                    {
                      width: 34,
                      height: 34,
                      marginTop: 15,
                      borderRadius: 17,
                      backgroundColor: 'rgb(255,255,255)',
                      justifyContent: 'center',
                      alignItems: 'center',
                      zIndex: 99999,
                    },
                  ]}
                  onPress={this.goToDetail}>
                  <CustomIcon
                    name={'pencil'}
                    size={15}
                    color={Colors.darkSeafoamGreen}
                  />
                </TouchableOpacity>
              )}
            </Animated.View>

            <AlertModal
              closeErrorModel={this.handleLogin}
              okTextStyle={{ color: Colors.redWhite }}
              buttonText={'تسجيل دخول'}
              twoButtons={false}
              contentMessage={this.state.alertMessage}
              closePress={() => this.setState({ showAlert: false })}
              isVisible={this.state.showAlert}
            />

            {this.state.showErrorMessage && (
              <ErroAlert
                setAnimation={() => this.setState({ showErrorMessage: false })}
                doAnimation={this.state.showErrorMessage}
              />
            )}

            <Animated.ScrollView
              ref={ref => (this.scrollViewRef = ref)}
              bounces={false}
              scrollEventThrottle={16}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                paddingTop: 0,
                paddingBottom: 100,
                paddingLeft: 20,
                alignItems: 'center',
                paddingRight: 20,
              }}
              style={{ paddingBottom: 180, marginBottom: 0 }}
              onScroll={Animated.event(
                [
                  {
                    nativeEvent: {
                      contentOffset: { y: this.state.animation.Animation },
                    },
                  },
                ],
                {
                  listener: e => {
                    let {
                      layoutMeasurement,
                      contentOffset,
                      contentSize,
                    } = e.nativeEvent;
                    const paddingToBottom = 20;

                    if (
                      layoutMeasurement.height + contentOffset.y >=
                      contentSize.height - paddingToBottom
                    ) {
                      if (!this.state.toPreview && !owner) {
                        this.handleGetSuggestion();
                      }
                    }
                  },
                },
              )}>
              <TouchableWithoutFeedback
                style={{
                  paddingBottom: 10,
                  flex: 1,
                  backgroundColor: 'tomato',
                }}>
                <Animated.View
                  style={{
                    paddingBottom: 30,
                  }}>
                  {owner || (this.state.toPreview && realEstateItem.type) ? (
                    <HeadreRealestateDetailPersentage
                      numberOfView={realEstateItem.shows + ' '}
                      toPreview={this.state.toPreview}
                      progress={realEstateItem.completePercentage}
                      owner={realEstateItem.owner}
                      onPress={this.goToDetail}
                    />
                  ) : realEstateItem.type ? (
                    <HeadreRealestateDetail
                      numberOfView={
                        realEstateItem && realEstateItem.shows + ' '
                      }
                      withOutQR={true}
                      owner={realEstateItem.owner}
                      onPress={() =>
                        this.props.navigation.navigate('OwnerRealEstates', {
                          user: realEstateItem.owner,
                        })
                      }
                    />
                  ) : null}

                  <Animated.View
                    style={[
                      {
                        width: Metrics.screenWidth * 0.8,
                        justifyContent: 'space-between',
                        alignItems: 'flex-end',
                        flexDirection: 'row',
                        marginHorizontal: 30,
                        marginTop: 10,
                        flexWrap: 'wrap',
                        opacity: 1,
                        alignSelf: 'center',
                      },
                    ]}>
                    <TouchableOpacity
                      style={[styles.ballView]}
                      onPress={() =>
                        this.setState({ shaowNearFeatures: true })
                      }>
                      <IconButton
                        icon={'map'}
                        size={20}
                        color={Colors.darkSeafoamGreen}
                      />

                      <Text
                        style={[
                          Fonts.style.normal,
                          {
                            fontWeight: 'normal',
                            fontSize: 10,
                            color: Colors.darkSlateBlue,
                          },
                        ]}>
                        عرض بالخريطة
                      </Text>
                    </TouchableOpacity>

                    <View>
                      <TouchableOpacity
                        style={[styles.ballView, {}]}
                        onPress={this.addLike}>
                        {/* <IconButton icon={'heart'} size={18} color={ like? 'tomato': Colors.darkSeafoamGreen} /> */}
                        <CustomIcon
                          name={like ? 'thumbs-up' : 'thumbs-o-up'}
                          size={20}
                          color={Colors.darkSeafoamGreen}
                        />
                      </TouchableOpacity>

                      {this.state.realEstateItem.numberOfLikes > 0 && (
                        <View
                          style={[
                            Fonts.style.normal,
                            {
                              fontWeight: 'normal',
                              marginTop: 10,
                              fontSize: 12,
                              position: 'absolute',
                              color: Colors.darkSlateBlue,
                              top: -15,
                              right: -15,
                              width: 20,
                              height: 20,
                              borderRadius: 10,
                              justifyContent: 'center',
                              alignItems: 'center',
                              backgroundColor: Colors.darkSlateBlue,
                            },
                          ]}>
                          <Text
                            style={[
                              Fonts.style.boldText,
                              {
                                fontWeight: 'normal',
                                fontSize: 12,
                                color: Colors.white,
                              },
                            ]}>
                            {this.state.realEstateItem.numberOfLikes}
                          </Text>
                        </View>
                      )}

                      <Text
                        style={[
                          Fonts.style.normal,
                          {
                            fontWeight: 'normal',
                            marginTop: 10,
                            fontSize: 10,
                            // position:'absolute',
                            color: Colors.darkSlateBlue,
                            // bottom: -22,
                            // left: 14
                          },
                        ]}>
                        اعجاب
                      </Text>
                    </View>

                    <TouchableOpacity
                      style={[styles.ballView]}
                      onPress={this.handleShare}
                      // onPress={()=> props.addRealEstateTFav(realEstateItem)}
                    >
                      {/* <Image source={Images.starDetail} /> */}
                      <CustomIcon
                        name={'share'}
                        size={20}
                        color={false ? 'tomato' : Colors.darkSeafoamGreen}
                      />

                      <Text
                        style={[
                          Fonts.style.normal,
                          {
                            fontWeight: 'normal',
                            marginTop: 10,
                            fontSize: 10,
                            // position:'absolute',
                            color: Colors.darkSlateBlue,
                            // bottom: -22,
                            // left: 14
                          },
                        ]}>
                        مشاركة
                      </Text>

                      {/* <FavIcon color={Colors.darkSeafoamGreen} doAnimation={ this.props.checker || fav} /> */}
                    </TouchableOpacity>
                  </Animated.View>

                  <View
                    style={{
                      width: Metrics.screenWidth * 0.87466667,
                      height: 0,
                      borderStyle: 'solid',
                      borderWidth: 0.5,
                      borderColor: '#e5e5e5',
                      // position: 'absolute',
                      bottom: 0,
                      alignSelf: 'center',
                      marginTop: 25,
                      marginBottom: 12,
                    }}
                  />

                  <View
                    style={{
                      flexDirection: 'row-reverse',
                      // width: Metrics.screenWidth * 0.87466667,
                      width: Metrics.screenWidth - 50,
                      // marginRight: Metrics.screenWidth * 0.12533333 / 2,
                      marginHorizontal: 20,
                      marginTop: 17,
                      flexWrap: 'wrap',
                      alignSelf: 'center',
                      justifyContent: 'space-between',

                      // justifyContent:'space-around',
                      // alignItems: 'center',
                      // borderWidth: 1,
                    }}>
                    {realEstateItem && !land && (
                      <Animated.View
                        style={{
                          alignItems: 'center',
                          height: 70,
                          paddingHorizontal: 10,
                          justifyContent: 'center',
                          // transform: [{scale: scaleAnimation}]
                        }}>
                        <Image source={Images.kitchenIcon} />
                        <Text
                          style={[
                            Fonts.style.normal,
                            {
                              fontWeight: 'normal',
                              marginTop: 8,
                              fontSize: 12,
                              color: Colors.darkSlateBlue,
                            },
                          ]}>
                          {'المطابخ'}
                        </Text>
                        <Text
                          style={[
                            Fonts.style.normal,
                            {
                              fontWeight: 'normal',
                              marginTop: 8,
                              fontSize: 12,
                              color: '#000',
                            },
                          ]}>
                          {realEstateItem.numberOfKitchenUnit || 0}
                        </Text>
                      </Animated.View>
                    )}

                    {realEstateItem && !land && (
                      <Animated.View
                        style={{
                          alignItems: 'center',
                          height: 70,
                          paddingHorizontal: 10,
                          justifyContent: 'center',
                          // transform: [{scale: scaleAnimation}]
                        }}>
                        {/* <Image source={Images.sofaIcon} />  */}
                        <CustomIcon
                          name={'bed'}
                          size={25}
                          color={Colors.primaryGreen}
                        />
                        <Text
                          style={[
                            Fonts.style.normal,
                            {
                              fontWeight: 'normal',
                              marginTop: 8,
                              fontSize: 12,
                              color: Colors.darkSlateBlue,
                            },
                          ]}>
                          {realEstateItem.numberOfRooms ? 'الغرف' : 'الوحدات'}
                        </Text>
                        <Text
                          style={[
                            Fonts.style.normal,
                            {
                              fontWeight: 'normal',
                              marginTop: 8,
                              fontSize: 12,
                              color: '#000',
                            },
                          ]}>
                          {realEstateItem.numberOfRooms ||
                            realEstateItem.numberOfUnit ||
                            0}
                        </Text>
                      </Animated.View>
                    )}

                    {realEstateItem && !land && (
                      <Animated.View
                        style={{
                          alignItems: 'center',
                          height: 70,
                          paddingHorizontal: 10,
                          justifyContent: 'center',
                          // transform: [{scale: scaleAnimation}]
                        }}>
                        {/* <Image source={Images.sofaIcon} />  */}
                        <CustomIcon
                          name='hall'
                          color={Colors.primaryGreen}
                          size={25}
                        />

                        {/* <CustomIcon name={'bed'} size={25} color={Colors.primaryGreen} /> */}
                        <Text
                          style={[
                            Fonts.style.normal,
                            {
                              fontWeight: 'normal',
                              marginTop: 8,
                              fontSize: 12,
                              color: Colors.darkSlateBlue,
                            },
                          ]}>
                          {this.state.compaond ? 'الصالات' : 'الصالات'}
                        </Text>
                        <Text
                          style={[
                            Fonts.style.normal,
                            {
                              fontWeight: 'normal',
                              marginTop: 8,
                              fontSize: 12,
                              color: '#000',
                            },
                          ]}>
                          {realEstateItem.numberOfLivingRoom || 0}
                        </Text>
                      </Animated.View>
                    )}

                    {realEstateItem && !land && (
                      <Animated.View
                        style={{
                          alignItems: 'center',
                          height: 70,
                          paddingHorizontal: 10,
                          justifyContent: 'center',
                          // transform: [{scale: scaleAnimation}]
                        }}>
                        {/* <Image source={Images.bathRoomIcon} />  */}
                        <CustomIcon
                          name='bathroom'
                          color={Colors.primaryGreen}
                          size={25}
                        />
                        <Text
                          style={[
                            Fonts.style.normal,
                            {
                              fontWeight: 'normal',
                              marginTop: 8,
                              fontSize: 12,
                              color: Colors.darkSlateBlue,
                            },
                          ]}>
                          {'دورة مياه'}
                        </Text>
                        <Text
                          style={[
                            Fonts.style.normal,
                            {
                              fontWeight: 'normal',
                              marginTop: 8,
                              fontSize: 12,
                              color: Colors.darkSlateBlue,
                            },
                          ]}>
                          {realEstateItem.numberOfBathRoom || 0}
                        </Text>
                      </Animated.View>
                    )}
                  </View>

                  {/* {realEstateItem.notes && <Text style={[Fonts.style.normal,{fontSize: 18, alignSelf:'flex-end', marginTop: 38, marginEnd: 16, paddingRight: 20, fontWeight: Platform.OS === 'android'?'400': "bold", color: Colors.black}]} >{'نبذة عن العقار'}</Text>}
                                { realEstateItem.notes &&
                                    <Text style={[Fonts.style.normal,{fontSize: 12, alignSelf:'flex-end', textAlign: 'right', marginTop: 13, marginEnd: 16, fontWeight: 'normal', color: Colors.black,
                                        padding: 5,
                                        //   height: 96,
                                        opacity: 0.8,
                                        fontSize: 12,
                                        fontWeight: "normal",
                                        fontStyle: "normal",
                                        lineHeight: 24,
                                        letterSpacing: 0,
                                        paddingRight: 20,
                                        textAlign: "right",
                                    }]} >{realEstateItem.notes}</Text>
                                } */}

                  {/* <AqarPropertiesList sides={realEstateItem.selectedSides} buildYear={realEstateItem.age} space={realEstateItem.space} purpose={realEstateItem.purpose} features={true} containerStyle={{marginTop: 20 }} /> */}

                  {(realEstateItem.numberOfKitchenUnit ||
                    realEstateItem.numberOfBathRoom ||
                    realEstateItem.numberOfLivingRoom ||
                    (realEstateItem.numberOfRooms ||
                      realEstateItem.numberOfUnit)) &&
                    !land && (
                      <View
                        style={{
                          width: Metrics.screenWidth * 0.87466667,
                          height: 0,
                          borderStyle: 'solid',
                          borderWidth: 1,
                          borderColor: '#e5e5e5',
                          // position: 'absolute',
                          bottom: 0,
                          alignSelf: 'center',
                          marginTop: 20,
                          marginBottom: 20,
                        }}
                      />
                    )}

                  <View
                    style={{
                      width: Metrics.screenWidth - 50,
                      alignSelf: 'center',
                      marginHorizontal: 24,

                      // marginTop: 20
                    }}>
                    {/* <TimeAgo style={[Fonts.style.normal, styles.textStyle, {fontWeight: 'normal', marginBottom: 20}]} time={realEstateItem.createdAt} interval={2000} /> */}

                    {realEstateItem._id && (
                      <View
                        style={{
                          width: '100%',
                          marginVertical: 5,
                          // flexDirection: 'row',
                          justifyContent: 'flex-end',
                          alignItems: 'flex-end',
                          flexWrap: 'wrap',
                          borderBottomWidth: 0.3,
                          paddingBottom: 8,
                          borderBottomColor: '#e7e7e7',
                        }}>
                        <View
                          style={{
                            flexDirection: 'row-reverse',
                            alignSelf: 'flex-end',
                            width: '100%',
                          }}>
                          <CustomIcon
                            name={'city'}
                            color={Colors.primaryGreen}
                            size={16}
                            style={{ marginStart: 10 }}
                          />
                          <Text
                            style={[
                              Fonts.style.normal,
                              styles.textStyle,
                              { color: Colors.darkSlateBlue },
                            ]}>
                            {'رقم الاعلان'}:{' '}
                          </Text>
                          <Text style={[Fonts.style.normal, styles.textStyle]}>
                            {realEstateItem._id}
                          </Text>
                        </View>
                      </View>
                    )}
                    {realEstateItem.notes && (
                      <View
                        style={{
                          width: '100%',
                          marginVertical: 5,
                          // flexDirection: 'row',
                          justifyContent: 'flex-end',
                          alignItems: 'flex-end',
                          flexWrap: 'wrap',
                          borderBottomWidth: 0.3,
                          paddingBottom: 8,
                          borderBottomColor: '#e7e7e7',
                        }}>
                        <View
                          style={{
                            flexDirection: 'row-reverse',
                            alignSelf: 'flex-end',
                            width: '100%',
                          }}>
                          <CustomIcon
                            name={'city'}
                            color={Colors.primaryGreen}
                            size={16}
                            style={{ marginStart: 10 }}
                          />
                          <Text
                            style={[
                              Fonts.style.normal,
                              styles.textStyle,
                              { color: Colors.darkSlateBlue },
                            ]}>
                            {'نبذة عن العقار'}:{' '}
                          </Text>
                        </View>
                        <Text
                          style={[
                            Fonts.style.normal,
                            styles.textStyle,
                            { width: '80%', margin: 12 },
                          ]}>
                          {realEstateItem.notes}
                        </Text>
                      </View>
                    )}

                    {/* { !this.state.toPreview &&
                                        <View
                                            style={{
                                                width: '100%',
                                                marginBottom: 15,
                                                flexDirection: 'row',
                                                justifyContent:'flex-end',
                                                alignItems: 'center',
                                                borderBottomWidth: .5,
                                                paddingBottom: 8,
                                                borderBottomColor: '#e7e7e7'
                                            }}
                                        >
                                            <Text
                                                style={[Fonts.style.normal, styles.textStyle, {fontWeight: 'normal', color: Colors.darkSlateBlue }]}
                                            >
                                                {this.timeSince(new Date(realEstateItem.updatedAt))}
                                            </Text>
                                                <CustomIcon name={'clock3'} color={Colors.primaryGreen} size={16} style={{marginStart: 10}} />
                                        </View>
                                    } */}

                    {/* {realEstateItem.shows && <View
                                        style={{
                                            width: '100%',
                                            marginBottom: 15,
                                            flexDirection: 'row',
                                            justifyContent:'flex-end',
                                            alignItems: 'center',
                                            borderBottomWidth: .5,
                                            paddingBottom: 6,
                                            borderBottomColor: '#e7e7e7'
                                        }}
                                    >
                                        <Text style={[Fonts.style.normal, styles.textStyle]} >{realEstateItem.shows}</Text>
                                        <Text style={[Fonts.style.normal, styles.textStyle, {color: Colors.darkSlateBlue}]} >{'عدد المشاهدات'}: </Text>
                                        <CustomIcon name={'eye'} size={16} color={Colors.primaryGreen} style={{marginStart: 10}} />
                                    </View>} */}

                    {realEstateItem.address && !this.state.toPreview && (
                      <View
                        style={{
                          width: '100%',
                          marginBottom: 10,
                          flexDirection: 'row',
                          justifyContent: 'flex-end',
                          alignItems: 'center',
                          borderBottomWidth: 0.3,
                          paddingBottom: 8,
                          borderBottomColor: '#e7e7e7',
                        }}>
                        <TouchableOpacity
                          onPress={() => {
                            const scheme = Platform.select({
                              ios: 'maps:0,0?q=',
                              android: 'geo:0,0?q=',
                            });
                            const latLng = `${
                              realEstateItem.address.coordinates[0]
                            },${realEstateItem.address.coordinates[1]}`;
                            const label = 'Custom Label';
                            const url = Platform.select({
                              ios: `${scheme}${label}@${latLng}`,
                              android: `${scheme}${latLng}(${label})`,
                            });
                            Linking.openURL(url);
                          }}>
                          <Text
                            style={[
                              Fonts.style.normal,
                              styles.textStyle,
                              {
                                color: Colors.darkSeafoamGreen,
                                alignSelf: 'flex-end',
                                width: '65%',
                              },
                            ]}
                            numberOfLines={1}>
                            {' '}
                            {(realEstateItem &&
                              realEstateItem.address &&
                              realEstateItem.address.address) ||
                              (realEstateItem &&
                                realEstateItem.address &&
                                realEstateItem.address.coordinates[0] +
                                  ' , ' +
                                  realEstateItem &&
                                realEstateItem.address &&
                                realEstateItem.address.coordinates[1])}
                          </Text>
                        </TouchableOpacity>
                        <Text
                          style={[
                            Fonts.style.normal,
                            styles.textStyle,
                            { color: Colors.darkSlateBlue },
                          ]}>
                          {'الموقع'}:{' '}
                        </Text>
                        <CustomIcon
                          name={'map-marker'}
                          color={Colors.primaryGreen}
                          size={16}
                          style={{ marginStart: 10 }}
                        />
                      </View>
                    )}

                    {realEstateItem.purpose && purposeShow && !flat && !shop && (
                      <View
                        style={{
                          width: '100%',
                          marginBottom: 10,
                          flexDirection: 'row',
                          justifyContent: 'flex-end',
                          alignItems: 'center',
                          borderBottomWidth: 0.5,
                          paddingBottom: 6,
                          borderBottomColor: '#e7e7e7',
                        }}>
                        <Text style={[Fonts.style.normal, styles.textStyle]}>
                          {realEstateItem.purpose.nameAr}
                          {typeFemale && 'ة'}
                        </Text>
                        <View style={{ flexDirection: 'row' }}>
                          <Text
                            style={[
                              Fonts.style.normal,
                              styles.textStyle,
                              { color: Colors.darkSlateBlue },
                            ]}>
                            {'الغرض من العقار'}:{' '}
                          </Text>
                          <CustomIcon
                            name={'bullhorn'}
                            color={Colors.primaryGreen}
                            style={{ marginStart: 10 }}
                            size={16}
                          />
                        </View>
                      </View>
                    )}

                    {(realEstateItem.space || realEstateItem.space === 0) && (
                      <View
                        style={{
                          width: '100%',
                          marginBottom: 10,
                          flexDirection: 'row',
                          justifyContent: 'flex-end',
                          alignItems: 'center',
                          borderBottomWidth: 0.5,
                          paddingBottom: 8,
                          borderBottomColor: '#e7e7e7',
                        }}>
                        <Text style={[Fonts.style.normal, styles.textStyle]}>
                          {realEstateItem.space + ''}
                        </Text>
                        <View style={{ flexDirection: 'row' }}>
                          <Text
                            style={[
                              Fonts.style.normal,
                              styles.textStyle,
                              { color: Colors.darkSlateBlue },
                            ]}>
                            {'المساحة'}:{' '}
                          </Text>
                          <CustomIcon
                            name={'area'}
                            color={Colors.primaryGreen}
                            style={{ marginStart: 10 }}
                            size={16}
                          />
                        </View>
                      </View>
                    )}

                    {(realEstateItem.streetWidth ||
                      realEstateItem.streetWidth === 0) && (
                      <View
                        style={{
                          width: '100%',
                          marginBottom: 10,
                          flexDirection: 'row',
                          justifyContent: 'flex-end',
                          alignItems: 'center',
                          borderBottomWidth: 0.5,
                          paddingBottom: 8,
                          borderBottomColor: '#e7e7e7',
                        }}>
                        <Text style={[Fonts.style.normal, styles.textStyle]}>
                          {realEstateItem.streetWidth + ''}
                        </Text>
                        <View style={{ flexDirection: 'row' }}>
                          <Text
                            style={[
                              Fonts.style.normal,
                              styles.textStyle,
                              { color: Colors.darkSlateBlue },
                            ]}>
                            {'عرض الشارع'}:{' '}
                          </Text>
                          <CustomIcon
                            name={'road'}
                            color={Colors.primaryGreen}
                            style={{ marginStart: 10 }}
                            size={16}
                          />
                        </View>
                      </View>
                    )}

                    {(realEstateItem.age || realEstateItem.age === 0) && (
                      <View
                        style={{
                          width: '100%',
                          marginBottom: 10,
                          flexDirection: 'row',
                          justifyContent: 'flex-end',
                          alignItems: 'center',
                          borderBottomWidth: 0.5,
                          paddingBottom: 8,
                          borderBottomColor: '#e7e7e7',
                        }}>
                        <Text style={[Fonts.style.normal, styles.textStyle]}>
                          {realEstateItem.age}
                        </Text>
                        <View style={{ flexDirection: 'row' }}>
                          <Text
                            style={[
                              Fonts.style.normal,
                              styles.textStyle,
                              { color: Colors.darkSlateBlue },
                            ]}>
                            {'عمر العقار'}:{' '}
                          </Text>
                          <CustomIcon
                            name={'calender'}
                            color={Colors.primaryGreen}
                            style={{ marginStart: 10 }}
                            size={16}
                          />
                        </View>
                      </View>
                    )}

                    {realEstateItem.floor && (
                      <View
                        style={{
                          width: '100%',
                          marginBottom: 10,
                          flexDirection: 'row',
                          justifyContent: 'flex-end',
                          alignItems: 'center',
                          borderBottomWidth: 0.5,
                          paddingBottom: 8,
                          borderBottomColor: '#e7e7e7',
                        }}>
                        <Text style={[Fonts.style.normal, styles.textStyle]}>
                          {realEstateItem.floor}
                        </Text>
                        <View style={{ flexDirection: 'row' }}>
                          <Text
                            style={[
                              Fonts.style.normal,
                              styles.textStyle,
                              { color: Colors.darkSlateBlue },
                            ]}>
                            {'الدور'}:{' '}
                          </Text>
                          <CustomIcon
                            name={'layers'}
                            color={Colors.primaryGreen}
                            style={{ marginStart: 10 }}
                            size={16}
                          />
                        </View>
                      </View>
                    )}

                    {realEstateItem.populationType && populationShow && (
                      <View
                        style={{
                          width: '100%',
                          marginBottom: 10,
                          flexDirection: 'row',
                          justifyContent: 'flex-end',
                          alignItems: 'center',
                          borderBottomWidth: 0.5,
                          paddingBottom: 8,
                          borderBottomColor: '#e7e7e7',
                        }}>
                        <Text style={[Fonts.style.normal, styles.textStyle]}>
                          {(realEstateItem.populationType &&
                            realEstateItem.populationType.nameAr) ||
                            ''}
                        </Text>
                        <View style={{ flexDirection: 'row' }}>
                          <Text
                            style={[
                              Fonts.style.normal,
                              styles.textStyle,
                              { color: Colors.darkSlateBlue },
                            ]}>
                            {'الساكن'}:{' '}
                          </Text>
                          <CustomIcon
                            name={'user'}
                            color={Colors.primaryGreen}
                            size={16}
                            style={{ marginStart: 10 }}
                          />
                        </View>
                      </View>
                    )}

                    {(realEstateItem.selectedSides || []).length > 0 && (
                      <View
                        style={{
                          width: '100%',
                          marginVertical: 5,
                          flexDirection: 'row',
                          justifyContent: 'flex-end',
                          alignItems: 'center',
                          borderBottomWidth: 0.5,
                          paddingBottom: 8,
                          borderBottomColor: '#e7e7e7',
                        }}>
                        <View style={{ flexDirection: 'row' }}>
                          {(realEstateItem.selectedSides || []).map(
                            (item, index) => (
                              <Text
                                style={[
                                  Fonts.style.normal,
                                  styles.textStyle,
                                  { paddingHorizontal: 1 },
                                ]}>
                                {item === '0'
                                  ? 'الجنوبية'
                                  : item === '1'
                                  ? 'الشرقية'
                                  : item === '2'
                                  ? 'الغربية'
                                  : 'الشمالية'}
                              </Text>
                            ),
                          )}
                        </View>
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                          }}>
                          <Text
                            style={[
                              Fonts.style.normal,
                              styles.textStyle,
                              { color: Colors.darkSlateBlue },
                            ]}>
                            {'الواجهة'}:{' '}
                          </Text>
                          <Icon
                            name={'directions-fork'}
                            color={Colors.primaryGreen}
                            style={{ marginStart: 10 }}
                            size={16}
                          />
                        </View>
                      </View>
                    )}
                    {(realEstateItem.features || []).length > 0 && (
                      <View
                        style={{
                          width: '100%',
                          marginTop: 15,
                          flexDirection: 'row',
                          justifyContent: 'flex-end',
                          alignItems: 'center',
                          borderBottomColor: '#e7e7e7',
                        }}>
                        <Text
                          style={[
                            Fonts.style.normal,
                            {
                              fontSize: 18,
                              fontWeight:
                                Platform.OS === 'android' ? 'normal' : 'normal',
                              color: Colors.black,
                            },
                          ]}>
                          {'مميزات العقار'}
                        </Text>
                        <Icon
                          name={'home'}
                          color={Colors.primaryGreen}
                          style={{ marginStart: 10 }}
                          size={18}
                        />
                      </View>
                    )}
                  </View>

                  {(realEstateItem.features || []).length > 0 && (
                    <AqarFeatures
                      realEstateFeatures={realEstateItem.features}
                    />
                  )}

                  {(realEstateItem.bluePrint || []).length > 0 && (
                    <Text
                      style={[
                        Fonts.style.normal,
                        {
                          fontSize: 18,
                          alignSelf: 'flex-end',
                          marginTop: 38,
                          marginEnd: 16,
                          paddingRight: 12,
                          fontWeight:
                            Platform.OS === 'android' ? 'normal' : 'normal',
                          color: Colors.black,
                        },
                      ]}>
                      {'مخططات العقار'}
                    </Text>
                  )}

                  {(realEstateItem.bluePrint || []).length > 0 && (
                    <BluePrintList
                      containerStyle={{ marginTop: 20 }}
                      bluePrint={realEstateItem.bluePrint}
                      doAnimation={true}
                    />
                  )}
                  {this.state.suggestionDate &&
                    (this.state.suggestionDate || []).length > 0 && (
                      <Text
                        style={[
                          Fonts.style.normal,
                          {
                            fontSize: 18,
                            alignSelf: 'flex-end',
                            marginTop: 38,
                            marginEnd: 16,
                            paddingRight: 12,
                            fontWeight:
                              Platform.OS === 'android' ? '400' : 'bold',
                            color: Colors.black,
                          },
                        ]}>
                        {'العقارات المشابهة'}
                      </Text>
                    )}
                  {this.state.sugLoading && (
                    <BallIndicator style={{ marginTop: 20 }} color={'green'} />
                  )}
                  {this.state.suggestionDate && (
                    <SugesstionRealEstate
                      itemPress={i =>
                        this.props.navigation.push('RealEstateDetail', {
                          realEstate: i,
                        })
                      }
                      data={this.state.suggestionDate}
                      containerStyle={{
                        marginTop: 40,
                        width: Metrics.screenWidth,
                      }}
                    />
                  )}
                </Animated.View>
              </TouchableWithoutFeedback>
            </Animated.ScrollView>

            <RatingModal
              loading={this.state.loading}
              done={this.state.done}
              isVisible={this.state.showRating}
              onClose={() => this.setState({ showRating: false })}
              onSwipe={() => this.setState({ showRating: false })}
              onDonePress={(rating, selected) =>
                this.handleRating(rating, selected)
              }
            />

            {owner && !this.state.loadingFlag && this.state.showRequest && (
              <RequestModal
                request1={this.state.request1}
                request2={this.state.request2}
                request3={this.state.request3}
                loading={this.state.requestLoading}
                done={this.state.done}
                isVisible={this.state.showRequest}
                onClose={() => this.setState({ showRequest: false })}
                onSwipe={() => this.setState({ showRequest: false })}
                onRequest={request => this.handleRequest(request)}
              />
            )}

            {/* <FooterButton /> */}
            {!this.state.rate && !this.state.toPreview && (
              <Animated.View style={[styles.backgroundStyle]}>
                <Animated.View
                  style={[
                    styles.container,
                    this.props.halfButton && {
                      width: Metrics.screenWidth * 0.42933333,
                      height: 46,
                    },
                    {
                      backgroundColor: this.props.doAnimation
                        ? this.state.animation.animtion3.interpolate({
                            inputRange: [0, 1],
                            outputRange: ['#fff', Colors.darkSeafoamGreen],
                          })
                        : this.props.backgroundColorT
                        ? this.props.backgroundColorT
                        : Colors.darkSeafoamGreen,
                      shadowColor:
                        this.props.shadowColor || 'rgba(61, 186, 126, 0.25)',
                    },
                    this.props.containerStyle,
                  ]}>
                  <TouchableOpacity
                    disabled={this.props.disabled}
                    style={styles.row}
                    onPress={() => {
                      if (!this.props.user || !this.props.user.token) {
                        return this.setState({
                          showAlert: true,
                          alertMessage: 'الرجاء تسجيل الدخول للاستفادة',
                        });
                      }
                      this.setState({ showRating: true });
                    }}>
                    {!this.props.loading ? (
                      <Text
                        style={[
                          Fonts.style.normal,
                          styles.inputStyle,
                          this.props.textPropsStyle,
                        ]}>
                        {' '}
                        {this.props.buttonText
                          ? this.props.buttonText
                          : 'قيم تجربتك لهذا العقار'}
                      </Text>
                    ) : (
                      <ActivityIndicator color={'#fff'} animating={true} />
                    )}
                  </TouchableOpacity>
                </Animated.View>
              </Animated.View>
            )}

            {!this.state.toPreview &&
              realEstateItem &&
              realEstateItem.address && (
                <NearAqarFeatures
                  address={
                    realEstateItem &&
                    realEstateItem.address &&
                    realEstateItem.address
                  }
                  isVisible={this.state.shaowNearFeatures}
                  onBackPress={() =>
                    this.setState({ shaowNearFeatures: false })
                  }
                />
              )}

            {!this.state.toPreview && (
              <PanoramView
                id={realEstateItem._id}
                isVisible={this.state.showPanoramaView}
                onBackPress={() => this.setState({ showPanoramaView: false })}
              />
            )}
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  checkRealEstateInFav: realEstateId =>
    dispatch(FavoriteAction.checkFavourte(realEstateId)),
  addRealEstateTFav: (realEstate, token) =>
    dispatch(FavoriteAction.addToFavourte(realEstate, token)),
  deleteRealEstateFromFav: (realEstate, token) =>
    dispatch(FavoriteAction.removeFromFavourte(realEstate, token)),
  addLike: (_id, state, token) =>
    dispatch(RealEstateAcion.likeRealEstate(_id, state, token)),
  checkLikeRating: (_id, token) =>
    dispatch(RealEstateAcion.checkRealEstate(_id, token)),
  addRequest: (_id, status, token) =>
    dispatch(RealEstateAcion.addRequest(_id, status, token)),
  addShow: _id => dispatch(RealEstateAcion.addShow(_id)),
  rateRealEstate: (_id, stars, reason, token) =>
    dispatch(RealEstateAcion.rateRealEstate(_id, stars, reason, token)),
  getRealEstateDetails: _id =>
    dispatch(RealEstateAcion.getRealEstateDetails(_id)),
});

const mapStateToProps = state => {
  console.log('DetailOfRealEstateState', state);
  return {
    user: state.user.user && state.user.user.user && state.user.user.user,
    checker: state.Favourte.checker && state.Favourte.checker,
    checkRealEstate:
      state.realEstate.checkRealEstate && state.realEstate.checkRealEstate,
    likeRealEstateResult:
      state.realEstate.likeRealEstateResult &&
      state.realEstate.likeRealEstateResult,
    rateRealEstateResult:
      state.realEstate.rateRealEstateResult &&
      state.realEstate.rateRealEstateResult,
    rateRealEstateError:
      state.realEstate.rateRealEstateError &&
      state.realEstate.rateRealEstateError,
    addRequestResult:
      state.realEstate.addRequestResult && state.realEstate.addRequestResult,
    addRequestError:
      state.realEstate.addRequestError && state.realEstate.addRequestError,
    realEstateDetail:
      state.realEstate.realEstateDetail && state.realEstate.realEstateDetail,
    realEstateDetailError:
      state.realEstate.realEstateDetailError &&
      state.realEstate.realEstateDetailError,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RealEstateDetail);

const styles = StyleSheet.create({
  backgroundStyle: {
    width: Metrics.screenWidth,
    height: 105,
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowRadius: 30,
    shadowOpacity: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    elevation: 4,
    backgroundColor: '#fff',
  },
  container: {
    width: 316,
    height: 48,
    borderRadius: 12,
    shadowColor: 'rgba(61, 186, 126, 0.25)',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    elevation: 4,
    shadowRadius: 15,
    shadowOpacity: 1,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    width: '100%',
    height: '100%',
  },
  inputStyle: {
    width: '100%',
    fontSize: 14,
    fontWeight: 'normal',
    fontStyle: 'normal',
    lineHeight: 16,
    letterSpacing: 0,
    textAlign: 'center',
    color: Colors.white,
    paddingEnd: 17,
    alignSelf: 'center',
  },
  ballView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStyle: {
    fontSize: 13,
    fontWeight: Platform.OS === 'android' ? 'normal' : 'normal',
    fontStyle: 'normal',
    lineHeight: 17,
    letterSpacing: 0,
    textAlign: 'right',
    color: Colors.black,
  },
});

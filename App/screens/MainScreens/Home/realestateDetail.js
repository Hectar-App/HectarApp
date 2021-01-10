import React from 'react';
import {
  View,
  Animated,
  Text,
  Keyboard,
  Share,
  Dimensions,
  TouchableWithoutFeedback,
  Linking,
  TouchableOpacity,
  ScrollView,
  Image,
  Platform,
  StyleSheet,
} from 'react-native';
import {StackActions, NavigationActions} from 'react-navigation';

import {connect} from 'react-redux';
import FavoriteAction from '../../../Redux/FavourteRedux';
import RealEstateAcion from '../../../Redux/RealEstateRedux';

import {Fonts, Colors, Metrics, Images, CustomIcon} from '../../../Themes';

import AqarFeatures from '../../../Component/AqarFeaturesLis';
import BluePrintList from '../../../Component/BluePrintList';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import RatingModal from '../../../Component/RatingModal';

import RequestModal from '../../../Component/RequestModal';

import Gallery from '../../../Component/galerry';

import NearAqarFeatures from '../../../Component/NearFeaturesAqar';
import SugesstionRealEstate from '../../../Component/SugesstionAqars';
import PanoramView from '../../../Component/360View';

import HeadreRealestateDetail from '../../../Component/headerRealestateDetailsOwner';
import HeadreRealestateDetailPersentage from '../../../Component/headerRealestateDetailsOwnerPersentage';

import api from '../../../Services/API';

import {ifIphoneX} from 'react-native-iphone-x-helper';
import {IconButton, ActivityIndicator} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import HectarIcon from '../../../assets/imgs/svgImagesComponents/HectarIcon';
import LinearGradient from 'react-native-linear-gradient';

import {BallIndicator} from 'react-native-indicators';

import AlertModal from '../../../Component/Alert';
import ErroAlert from '../../../Component/ErrorAlert';

import TimeAgo from 'react-native-timeago';
import moment from 'moment';

const HEADER_MIN_HEIGHT = 120;
const HEADER_MAX_HEIGHT = 220;

const NAVBAR_HEIGHT = 64;
const STATUS_BAR_HEIGHT = Platform.select({ios: 50, android: 24});

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
    // const scrollViewRef = React.createRef();

    // console.log('HelloEfect')
    if (this.props.user && this.props.user.token && !this.state.toPreview) {
      this.props.checkRealEstateInFav(this.state.realEstateItem._id);
      this.props.checkLikeRating(
        this.state.realEstateItem._id,
        this.props.user.token,
      );
    }
    // console.log('props.checker', props.checker)
    // setFav(props.checker)

    if (this.state.realEstateItem && !this.state.toPreview) {
      this.setState({
        owner:
          this.props.user &&
          this.props.user._id === this.state.realEstateItem.owner._id,
        // images: this.state.realEstateItem.images,
        // compaond: this.state.realEstateItem.type.nameEn === "compound"
      });
    }

    if (!this.props.user && !this.state.toPreview) {
      this.setState({rate: false});
    }
    const {imagesSmall, images} = this.state.realEstateItem;
    this.setState({
      images:
        (imagesSmall || []).length > 0
          ? imagesSmall
          : this.state.realEstateItem.images,
      compaond: this.state.realEstateItem.type.nameEn === 'compound',
    });

    // this.startAllAnimation()

    // setLike(props.checkRealEstate && props.checkRealEstate.likes)
  }

  componentWillMount() {
    console.log('RealEstate', this.state.realEstateItem);
    this.startAllAnimation();
  }

  startAllAnimation() {
    Animated.timing(this.state.animation.Animation2, {
      toValue: 1,
      duration: 550,
      // useNativeDriver: true
    }).start();
  }

  componentWillReceiveProps(nextProps) {
    console.log('nextProps', nextProps);
    if (nextProps.checker !== this.props.checker) {
      return this.setState({fav: nextProps.checker});
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
      // return this.setState({like: nextProps.checkLikeRating.likes})
      if (
        nextProps.likeRealEstateResult.message &&
        nextProps.likeRealEstateResult.message === 'done' &&
        !this.state.like
      ) {
        return this.setState({like: true});
      } else {
        return this.setState({like: false});
      }
    }

    if (nextProps.rateRealEstateResult !== this.props.rateRealEstateResult) {
      if (nextProps.rateRealEstateResult.message) {
        // return alert(nextProps.rateRealEstateResult.message)
        this.setState({loading: false, done: true, rate: true});

        setTimeout(() => {
          this.setState({showRating: false});
        }, 2000);
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
      this.setState({requestLoading: null});
      if (nextProps.addRequestError.message) {
        return alert(nextProps.addRequestError.message);
      }

      if (nextProps.addRequestError.error) {
        return alert(nextProps.addRequestError.error);
      }
    }

    if (nextProps.addRequestResult !== this.props.addRequestResult) {
      if (this.state.request === 1) {
        this.setState({request1: true});
      } else if (this.state.request === 2) {
        this.setState({request2: true});
      } else {
        this.setState({request3: true});
      }
      this.setState({requestLoading: null, done: true});
      // this.props.checkLikeRating(this.state.realEstateItem._id, this.props.user.token)
      // setTimeout(()=> {
      //     this.setState({showRequest: false, done: false})
      // }, 2000)
      // if(nextProps.rateRealEstateError.error)
      //     return alert(nextProps.addRequestResult.error)
    }
  }

  handleShare = () => {
    Share.share({
      message:
        'لاعجابي الشديد بهذا الحساب وددت مشاركته ' +
        'http://dev.hectar.io/property/' +
        this.state.realEstateItem._id +
        '/0',
    });
  };

  handleGetSuggestion = () => {
    console.log(this.state.suggestionDate);
    if (this.state.suggestionDate === undefined && !this.state.sugLoading) {
      this.setState({sugLoading: true});
      API.suggestionRealEstate(this.state.realEstateItem._id)
        .then(res => {
          if (res.data && !res.data.message) {
            console.log('res', res);
            this.setState({suggestionDate: res.data, sugLoading: false});
          }
        })
        .catch(err => this.setState({sugLoading: true}));
    }
  };

  goToDetail = () => {
    if (this.state.toPreview) {
      return alert('لم يتم اضافة العقار بعد');
    }

    this.props.navigation.navigate('FirstStepAddAqar', {
      fromDetail: true,
      realEstate: this.state.realEstateItem,
    });
  };

  handleLogin = () => {
    this.setState({showAlert: false});
    this.props.navigation.navigate('LoginPage');
  };

  addLike = () => {
    if (this.state.toPreview) {
      return alert('لم يتم اضافة العقار بعد');
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
    // setLike(s => s = !s)
  };

  timeSince(date) {
    // console.log('date', date)
    // console.log('date', this.state.realEstateItem)
    var seconds = Math.floor((new Date() - date) / 1000);

    var interval = Math.floor(seconds / 31536000);

    if (interval > 1) {
      return interval + ' سنوات';
    }
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {
      return interval + ' شهور';
    }
    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
      return interval + ' ايام';
    }
    interval = Math.floor(seconds / 3600);
    if (interval > 1) {
      return interval + ' ساعات';
    }
    interval = Math.floor(seconds / 60);
    if (interval > 1) {
      return interval + ' دقائق';
    }
    return Math.floor(seconds) + ' ثواني';
  }

  // useEffect(()=> {
  //     setLike(props.checkRealEstate && props.checkRealEstate.likes)
  // },[props.addLike])

  favProccess = () => {
    if (this.state.toPreview) {
      return alert('لم يتم اضافة العقار بعد');
    }
    if (!this.props.user || !this.props.user.token) {
      return this.setState({
        showAlert: true,
        alertMessage: 'الرجاء تسجيل الدخول للاستفادة',
      });
    }
    // return alert('الرجاء تسجيل الدخول للاستفادة')
    this.setState({fav: !this.state.fav});
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
      this.setState({requestLoading: request._id, request: request._id});
      this.props.addRequest(
        this.state.realEstateItem._id,
        request._id,
        this.props.user.token,
      );
    } else {
      return alert('الرجاء تسجيل الدخول للاستفادة');
    }
  }

  // const compaond = realEstateItem.type === '5e41786a48e2f5185ac4b090'

  kFormatter(num) {
    return Math.abs(num) > 999 && Math.abs(num) < 999999
      ? Math.sign(num) * (Math.abs(num) / 1000).toFixed(1) + ' الف'
      : Math.abs(num) > 999999
      ? Math.sign(num) * (Math.abs(num) / 1000000).toFixed(1) + ' مليون'
      : Math.sign(num) * Math.abs(num);
  }

  render() {
    // let scrollViewStartOffsetY = 0

    // const imagess = [{ url: this.state.selectedImage, props: { source: this.state.images } }]

    const changeWidth = this.state.animation.animtion4.interpolate({
      inputRange: [0, 1],
      outputRange: [Metrics.screenWidth * 0.42933333, 48],
    });

    let opacity = 1;

    const {realEstateItem, owner, like, fav, showRating, images} = this.state;
    const typeFemale =
      realEstateItem.type &&
      (realEstateItem.type.nameEn === 'land' ||
        realEstateItem.type.nameEn === 'villa' ||
        realEstateItem.type.nameEn === 'building' ||
        realEstateItem.type.nameEn === 'flat');

    // var opacity = this.state.animation.Animation.interpolate({
    // inputRange: [0, 180],
    // outputRange: [1, 0]
    // });

    const headerHeight = this.state.animation.Animation.interpolate({
      inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
      outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
      extrapolate: 'clamp',
    });

    const headerBackgroundColor = this.state.animation.Animation.interpolate({
      inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
      outputRange: ['transparent', '#fff'],
      extrapolate: 'clamp',
    });

    const headerBackgroundColorText = this.state.animation.Animation.interpolate(
      {
        inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
        outputRange: ['#fff', Colors.darkSlateBlue],
        extrapolate: 'clamp',
      },
    );

    const footerAnimation = this.state.animation.Animation.interpolate({
      inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
      outputRange: [0, Colors.darkSlateBlue],
      extrapolate: 'clamp',
    });

    const scaleAnimation = this.state.animation.Animation2.interpolate({
      inputRange: [0, 1],
      outputRange: [0.1, 1],
    });

    const navbarTranslate = this.state.animation.Animation.interpolate({
      // inputRange: [0, NAVBAR_HEIGHT - STATUS_BAR_HEIGHT],
      // outputRange: [0, -(NAVBAR_HEIGHT - STATUS_BAR_HEIGHT)],
      // extrapolate: 'clamp',
      inputRange: [0, 100],
      outputRange: [1, 100],
    });
    const navbarOpacity = this.state.animation.Animation.interpolate({
      inputRange: [0, NAVBAR_HEIGHT - STATUS_BAR_HEIGHT],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    });

    const navbarTranslate4 = this.state.animation.Animation6.interpolate({
      // inputRange: [0, NAVBAR_HEIGHT - STATUS_BAR_HEIGHT],
      // outputRange: [0, -(NAVBAR_HEIGHT - STATUS_BAR_HEIGHT)],
      // extrapolate: 'clamp',
      inputRange: [0, 100],
      outputRange: [1, 100],
    });

    return (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={{flex: 1, backgroundColor: '#fff'}}>
          <View style={{flex: 1}}>
            <Animated.View
              style={{
                width: '100%',
                // height: headerHeight,
                height: HEADER_MAX_HEIGHT,
                backgroundColor: '#fff',
                zIndex: 999999,
              }}>
              <LinearGradient
                colors={['rgba(0,0,0,0.8)', 'rgba(0,0,0,.8)', 'rgba(0,0,0,.8)']}
                style={[
                  {
                    position: 'absolute',
                    opacity: opacity > 0 ? 0.3 : 0,
                    bottom: 0,
                    width: '100%',
                    height: 100,
                    zIndex: 9999999999999,
                  },
                ]}
              />

              <Animated.View
                style={{
                  position: 'absolute',
                  width: '100%',
                  // width: '40%',
                  height: 90,
                  // backgroundColor: headerBackgroundColor,
                  // backgroundColor: '#fff',
                  bottom: 0,
                  // left: 8,
                  // borderRadius: 5,
                  elevation: 2,
                  paddingTop: 28,
                  // justifyContent: 'center',
                  // shadowColor: "rgba(0, 0, 0, 0.6)",
                  // shadowOffset: {
                  //     width: 0,
                  //     height: 1
                  // },
                  // shadowRadius: 6,
                  // shadowOpacity: 1,
                  // elevation: 4,
                  // borderWidth: 1,
                  // borderColor: "#5B5750",
                  // shadowOffset: {
                  //     width: 0,
                  //     height: 12,
                  // },
                  // shadowOpacity: Platform.OS === 'android'? 1: 0.58,
                  // shadowRadius: 16.00,
                  // opacity: 1,
                  // elevation: 4,
                  backgroundColor: 'red',
                  zIndex: 9999999999999,
                  borderWidth: 1,
                }}>
                {/* <LinearGradient colors={['rgba(0,0,0,0.8)', 'rgba(0,0,0,.8)','rgba(0,0,0,.8)']} style={[{position: 'absolute', opacity: opacity > 0 ? .3: 0, bottom: 0, width: '100%', height: 100, zIndex: 9999999999999}]} /> */}

                <View
                // style={{width: '100%', borderTopStartRadius: 5, borderTopEndRadius: 5, flex: 1, justifyContent: 'center', backgroundColor: Colors.darkSlateBlue }}
                >
                  {/* <Animated.Text style={[Fonts.style.normal, {marginBottom: 9, width: '100%', textAlign: 'center',
                                            // color: headerBackgroundColorText
                                            color: '#fff', fontWeight: 'normal'
                                        }]} >{realEstateItem && realEstateItem.type && realEstateItem.type.nameAr && realEstateItem.type.nameAr} {realEstateItem && realEstateItem.purpose && realEstateItem.purpose.nameAr && realEstateItem.purpose.nameAr} {realEstateItem && realEstateItem.status && realEstateItem.status.nameAr && realEstateItem.status.nameAr}</Animated.Text> */}
                  <Animated.Text
                    style={[
                      Fonts.style.normal,
                      {
                        marginBottom: 9,
                        width: '100%',
                        textAlign: 'center',
                        color: '#fff',
                        // color: headerBackgroundColorText
                      },
                    ]}>
                    {realEstateItem &&
                      realEstateItem.type &&
                      realEstateItem.type.nameAr &&
                      realEstateItem.type.nameAr}{' '}
                    {realEstateItem &&
                      realEstateItem.purpose &&
                      realEstateItem.purpose.nameAr &&
                      realEstateItem.purpose.nameAr}{' '}
                    {realEstateItem &&
                      realEstateItem.status &&
                      realEstateItem.status.nameAr &&
                      realEstateItem.status.nameAr}
                  </Animated.Text>
                </View>

                {/* <HectarIcon style={{width: 60, position: 'absolute', height: 60, opacity: .08}} /> */}

                <View
                // style={{width: '100%', flex: 1, borderBottomEndRadius: 5, borderBottomStartRadius: 5, backgroundColor: '#fff', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', }}
                >
                  <Animated.Text
                    style={[
                      Fonts.style.normal,
                      {
                        marginTop: 7,
                        // color: headerBackgroundColorText
                        color: '#FFF',
                        width: '100%',
                        textAlign: 'center',
                        fontWeight: 'normal',
                      },
                    ]}>
                    <Text style={{color: Colors.primaryGreen}}>
                      {(realEstateItem &&
                        realEstateItem.price &&
                        this.kFormatter(realEstateItem.price)) ||
                        'علي السوم'}
                    </Text>
                    {realEstateItem &&
                      realEstateItem.price &&
                      (realEstateItem && realEstateItem.payType == '0'
                        ? ' ريال / سنوي'
                        : realEstateItem.payType === 1
                        ? ' ريال / شهري'
                        : realEstateItem.payType === 2
                        ? ' / يومي'
                        : '')}
                  </Animated.Text>

                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Animated.Text
                      style={[
                        Fonts.style.normal,
                        {
                          fontSize: 12,
                          alignSelf: 'center',
                          // color: headerBackgroundColorText
                          color: '#000',
                        },
                      ]}>
                      {realEstateItem &&
                        realEstateItem.address &&
                        realEstateItem.address.coordinates[0]}
                      ,{' '}
                      {realEstateItem &&
                        realEstateItem.address &&
                        realEstateItem.address.coordinates[1]}
                    </Animated.Text>
                    <Image source={Images.locationFlagCardIcon} />
                  </View>
                </View>
              </Animated.View>

              <Pagination
                dotsLength={(this.state.images || []).length}
                activeDotIndex={this.state.sliderActiveSlide}
                containerStyle={[
                  {
                    width: 200,
                    flexWrap: 'wrap',
                    // transform: [{rotate: '180deg',}],
                    position: 'absolute',
                    bottom: 20,
                    right: 10,
                    zIndex: 999999,
                    paddingVertical: 5,
                    opacity,
                  },
                ]}
                dotStyle={{
                  backgroundColor: Colors.darkSeafoamGreen,
                  marginTop: 3,
                }}
                inactiveDotStyle={{
                  width: 8,
                  height: 8,
                  borderRadius: 4,
                  marginHorizontal: 0,
                  backgroundColor: Colors.white,
                  marginTop: 3,
                }}
                inactiveDotOpacity={1}
                inactiveDotScale={1}
              />

              <Gallery
                isVisible={this.state.imageFullScreen}
                images={this.state.images}
                onBackPress={() => this.setState({imageFullScreen: false})}
              />

              <Carousel
                data={(this.state.images || []).length > 0 ? images : [{}]}
                renderItem={item => {
                  return (
                    <TouchableOpacity
                      onPress={() =>
                        this.state.toPreview
                          ? null
                          : this.setState({
                              imageFullScreen: true,
                              selectedImage: item.item,
                            })
                      }>
                      {/* <Image source={images && (images || []).length > 0 ?{uri: item.item} : Images.testCardImage} style={{width: '100%', height: '100%'}} /> */}
                      <Animated.Image
                        source={
                          images && (images || []).length > 0
                            ? this.state.toPreview
                              ? {uri: item.item.uri ? item.item.uri : item}
                              : {uri: item.item}
                            : Images.testCardImage
                        }
                        style={[
                          {width: '100%', height: '100%', opacity},
                          Platform.OS && {width: Metrics.screenWidth},
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
                    // <Animated.Image source={{uri: item.item}} style={[{zIndex: -1, opacity, }, Platform.OS && {width: Metrics.screenWidth}]}  />
                  );
                }}
                style={{
                  // borderWidth: 1,
                  zIndex: 999,
                }}
                // sliderWidth={'100%'}
                // itemWidth={itemWidth}
                sliderWidth={Metrics.screenWidth}
                itemWidth={Metrics.screenWidth}
                // hasParallaxImages={true}
                // firstItem={0}
                // inactiveSlideScale={0.94}
                // inactiveSlideOpacity={0.7}
                // inactiveSlideShift={20}
                containerCustomStyle={[{overflow: 'visible'}]}
                // contentContainerCustomStyle={styles.sliderContentContainer}
                loop={true}
                loopClonesPerSide={2}
                // autoplay={true}
                // autoplayDelay={500}
                autoplayInterval={3000}
                onSnapToItem={index =>
                  this.setState({sliderActiveSlide: index})
                }
              />

              {/* <Animated.Image source={require('../../../assets/imgs/kitchen21657561920.png')} style={{zIndex: -1, opacity}}  /> */}
            </Animated.View>

            <View
              style={[
                styles.ballView,
                {
                  position: 'absolute',
                  opacity,
                  justifyContent: 'center',
                  alignItems: 'center',
                  top: ifIphoneX(50, 20),
                  left: 30,
                  zIndex: 99999999999999,
                },
              ]}>
              <TouchableOpacity
                onPress={this.favProccess}
                style={[
                  {
                    width: 33,
                    height: 33,
                    backgroundColor: '#f5fefa78',
                    // backgroundColor: 'red',
                    // marginEnd: 5,
                    borderRadius: 16.5,
                    justifyContent: 'center',
                    alignItems: 'center',
                  },
                ]}>
                {/* <Image source={Images.shareIcon} width={30} height={30} /> */}
                <CustomIcon
                  name={this.props.checker || fav ? 'bookmark2' : 'bookmark2-o'}
                  size={25}
                  color={Colors.darkSeafoamGreen}
                />

                {/* <CustomIcon name={'bookmark'} size={20} color={Colors.primaryGreen} /> */}
              </TouchableOpacity>
            </View>

            <Animated.View
              style={[
                styles.ballView,
                {
                  position: 'absolute',
                  opacity,
                  justifyContent: 'center',
                  alignItems: 'center',
                  top: ifIphoneX(50, 20),
                  right: 10,
                  zIndex: 99999999999999,
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
                    width: 33,
                    height: 33,
                    backgroundColor: 'rgb(199, 183, 169)',
                    // backgroundColor: 'red',
                    // marginEnd: 5,
                    borderRadius: 16.5,
                  },
                ]}
                onPress={() => this.props.navigation.goBack()}>
                <IconButton
                  icon={'chevron-right'}
                  size={35}
                  color={Colors.darkSeafoamGreen}
                  style={{alignSelf: 'center'}}
                />
              </TouchableOpacity>
            </Animated.View>
            {/* <Image source={Images.bac} /> */}

            <AlertModal
              closeErrorModel={this.handleLogin}
              okTextStyle={{color: Colors.redWhite}}
              buttonText={'تسجيل دخول'}
              twoButtons={false}
              contentMessage={this.state.alertMessage}
              closePress={() => this.setState({showAlert: false})}
              isVisible={this.state.showAlert}
            />

            {this.state.showErrorMessage && (
              <ErroAlert
                setAnimation={() => this.setState({showErrorMessage: false})}
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
              style={{paddingBottom: 180, marginBottom: 0}}
              onScroll={Animated.event(
                [
                  {
                    nativeEvent: {
                      contentOffset: {y: this.state.animation.Animation6},
                    },
                    //     console.log(e)
                    // }
                    // nativeEvent: {
                    //     contentOffset: {
                    //       y: y =>
                    //         Animated.block([
                    //           Animated.set(this.state.animation.Animation, y),
                    //           Animated.call(
                    //             [y],
                    //             ([offsetY]) => (scrollViewStartOffsetY = offsetY)
                    //           )
                    //         ])
                    //     }
                    //   }
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
                      // console.log('End Scroll')
                      if (!this.state.toPreview && !owner) {
                        this.handleGetSuggestion();
                      }
                    }
                  },
                  // useNativeDriver: true,
                  // listener: e => {
                  //     // console.log('e', e)
                  //     const offsetY = e.nativeEvent.contentOffset.y;

                  //     // console.log(e.nativeEvent)
                  //     // this.scrollView.scrollToEnd({animated: true});
                  //     // scrollViewRef.current.scrollTo({x: 150})
                  //     // scrollViewRef.current.getNode().scrollTo({y:0, animated:true});
                  //     // this.ScrollView
                  //     // if(scrollViewRef.current){
                  //     //     console.log('Hello Ref')
                  //     if (scrollViewStartOffsetY > offsetY && scrollViewStartOffsetY !== 0) {
                  //         //Shift down, ScrollView component scrolls up
                  //         console.log('up');
                  //         // this.scrollViewScrollDirection = SCROLLVIEW_DIRECTION_UP;
                  //         // this.setState({
                  //             //                         scrollViewScrollDirection: 'ScrollView component scrolls up'
                  //             // });
                  //             scrollViewRef.current.getNode().scrollTo({y:0, animated:true});
                  //     } else if (scrollViewStartOffsetY < offsetY) {
                  //         // Animated.event([nativeEvent])
                  //                         //The gesture slides up and the ScrollView component scrolls down
                  //                         // scrollViewRef.current.getNode().scrollTo({y:0, animated:true});
                  //                         console.log('down');
                  //         // this.scrollViewScrollDirection = SCROLLVIEW_DIRECTION_DOWN;
                  //         // this.setState({
                  //                                 // scrollViewScrollDirection: 'ScrollView component scrolls down'
                  //         // });
                  //     }

                  //     // console.log(scrollViewStartOffsetY)
                  //     // scrollViewStartOffsetY = offsetY
                  //     //     this.scrollView.
                  //     //     scrollViewRef.getNode().scrollTo({x:100,y:100, animated:false});
                  //     //     // scrollViewRef.current.scrollTo({x:150})
                  //     //    }
                  //     // scrollViewRef.scrollToEnd({animated: true})
                  // }
                },
                // { listener: this._handleScroll.bind(this) }, //Added listener
                // {
                // useNativeDriver: true
                // }
              )}
              // onScrollAnimationEnd=
              // onScroll={(e)=>{
              // }}
            >
              <TouchableWithoutFeedback
                style={{paddingBottom: 10, flex: 1, backgroundColor: 'tomato'}}>
                <Animated.View
                  style={{
                    paddingBottom: 30,
                    // paddingTop: navbarTranslate
                  }}>
                  {owner || this.state.toPreview ? (
                    <HeadreRealestateDetailPersentage
                      progress={0.9}
                      owner={realEstateItem.owner}
                      onPress={this.goToDetail}
                    />
                  ) : (
                    // <View />
                    <HeadreRealestateDetail
                      withOutQR={true}
                      owner={realEstateItem.owner}
                      onPress={() =>
                        this.props.navigation.navigate('OwnerRealEstates', {
                          user: realEstateItem.owner,
                        })
                      }
                    />
                  )}

                  <Animated.View
                    style={[
                      {
                        // position: 'absolute',
                        // height: owner? 162: 122,
                        width: Metrics.screenWidth * 0.8,
                        // top: ifIphoneX(50, 20),
                        // left: 20,
                        justifyContent: 'space-between',
                        alignItems: 'flex-end',
                        flexDirection: 'row',
                        marginHorizontal: 30,
                        marginTop: 17,
                        flexWrap: 'wrap',
                        opacity: 1,
                        alignSelf: 'center',
                        // borderWidth: 1
                        // opacity
                      },
                    ]}>
                    <TouchableOpacity
                      style={[styles.ballView]}
                      onPress={() => this.setState({shaowNearFeatures: true})}>
                      {/* <Image source={Images.mapIconForList} style={{borderWidth: 1}} /> */}
                      {/* <CustomIcon name={'map-marker'} size={18} color={Colors.darkSeafoamGreen} /> */}
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
                            // marginTop: 10,
                            fontSize: 10,
                            // position:'absolute',
                            color: Colors.darkSlateBlue,
                            // bottom: -22,
                            // left: 14
                          },
                        ]}>
                        عرض بالخريطة
                      </Text>

                      {/* <Image source={Images.mapIconForList} style={{borderWidth: 1}}/> */}
                    </TouchableOpacity>

                    {true && (
                      <TouchableOpacity
                        style={[styles.ballView]}
                        onPress={() => this.setState({showPanoramaView: true})}>
                        {/* <Image source={Images.scopeDetail} /> */}
                        {/* <CustomIcon name={'world-o'} size={22} color={Colors.darkSeafoamGreen} /> */}
                        <Text
                          style={[
                            Fonts.style.normal,
                            {
                              fontWeight: 'normal',
                              fontSize: 16,
                              color: Colors.darkSeafoamGreen,
                            },
                          ]}>
                          360°
                        </Text>

                        <Text
                          style={[
                            Fonts.style.normal,
                            {
                              fontWeight: 'normal',
                              marginTop: 10,
                              fontSize: 10,
                              // position:'absolute',
                              color: Colors.darkSlateBlue,
                              // paddingTop: 12
                              // bottom: -22,
                              // left: 14
                            },
                          ]}>
                          عرض 360
                        </Text>
                      </TouchableOpacity>
                    )}

                    {owner && (
                      <TouchableOpacity
                        style={[styles.ballView, {}]}
                        onPress={this.goToDetail}>
                        {/* <IconButton icon={'playlist-edit'} size={18} color={Colors.darkSeafoamGreen} /> */}
                        <CustomIcon
                          name={'pencil'}
                          size={18}
                          color={Colors.darkSeafoamGreen}
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
                          تعديل
                        </Text>
                      </TouchableOpacity>
                    )}
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
                      {/* <Text style={[ Fonts.style.normal, {
                                            fontWeight: "normal",
                                            marginTop: 10,
                                            fontSize: 12,
                                            position:'absolute',
                                            color: Colors.darkSlateBlue,
                                            bottom: -22,
                                            left: 14
                                        }]}>
                                                {this.state.realEstateItem.numberOfLikes}
                                        </Text> */}

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
                    {realEstateItem && realEstateItem.numberOfKitchenUnit && (
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
                          {realEstateItem.numberOfKitchenUnit}
                        </Text>
                      </Animated.View>
                    )}

                    {realEstateItem &&
                      (realEstateItem.numberOfRooms ||
                        realEstateItem.numberOfUnit) && (
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
                              realEstateItem.numberOfUnit}
                          </Text>
                        </Animated.View>
                      )}

                    {realEstateItem && realEstateItem.numberOfLivingRoom && (
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
                          name="hall"
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
                          {realEstateItem.numberOfLivingRoom}
                        </Text>
                      </Animated.View>
                    )}

                    {realEstateItem && realEstateItem.numberOfBathRoom && (
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
                          name="bathroom"
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
                          {realEstateItem.numberOfBathRoom}
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
                      realEstateItem.numberOfUnit)) && (
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
                    {!this.state.toPreview && (
                      <View
                        style={{
                          width: '100%',
                          // marginBottom: 10,
                          flexDirection: 'row',
                          justifyContent: 'flex-end',
                          alignItems: 'center',
                          // borderBottomWidth: .3,
                          paddingBottom: 6,
                          // borderBottomColor: '#e7e7e7'
                        }}>
                        <Text
                          style={[
                            Fonts.style.normal,
                            styles.textStyle,
                            {fontWeight: 'normal', color: Colors.darkSlateBlue},
                          ]}>
                          {/* {moment(realEstateItem.updatedAt).fromNow(false)} */}
                          {this.timeSince(new Date(realEstateItem.updatedAt))}
                        </Text>
                        <CustomIcon
                          name={'clock3'}
                          color={Colors.primaryGreen}
                          size={16}
                          style={{marginStart: 10}}
                        />
                      </View>
                    )}

                    {realEstateItem.shows && (
                      <View
                        style={{
                          width: '100%',
                          marginBottom: 10,
                          flexDirection: 'row',
                          justifyContent: 'flex-end',
                          alignItems: 'center',
                          borderBottomWidth: 0.3,
                          paddingBottom: 6,
                          borderBottomColor: '#e7e7e7',
                        }}>
                        <Text style={[Fonts.style.normal, styles.textStyle]}>
                          {realEstateItem.shows}
                        </Text>
                        <Text
                          style={[
                            Fonts.style.normal,
                            styles.textStyle,
                            {color: Colors.darkSlateBlue},
                          ]}>
                          {'عدد المشاهدات'}:{' '}
                        </Text>
                        <CustomIcon
                          name={'eye'}
                          size={16}
                          color={Colors.primaryGreen}
                          style={{marginStart: 10}}
                        />
                      </View>
                    )}

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
                              {color: Colors.darkSeafoamGreen},
                            ]}>
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
                            {color: Colors.darkSlateBlue},
                          ]}>
                          {'الموقع'}:{' '}
                        </Text>
                        <CustomIcon
                          name={'map-marker'}
                          color={Colors.primaryGreen}
                          size={16}
                          style={{marginStart: 10}}
                        />
                      </View>
                    )}

                    {realEstateItem.purpose && (
                      <View
                        style={{
                          width: '100%',
                          marginBottom: 10,
                          flexDirection: 'row',
                          justifyContent: 'flex-end',
                          alignItems: 'center',
                          borderBottomWidth: 0.3,
                          paddingBottom: 6,
                          borderBottomColor: '#e7e7e7',
                        }}>
                        <Text style={[Fonts.style.normal, styles.textStyle]}>
                          {realEstateItem.purpose.nameAr}
                          {typeFemale && 'ة'}
                        </Text>
                        <View style={{flexDirection: 'row'}}>
                          <Text
                            style={[
                              Fonts.style.normal,
                              styles.textStyle,
                              {color: Colors.darkSlateBlue},
                            ]}>
                            {'الغرض من العقار'}:{' '}
                          </Text>
                          <CustomIcon
                            name={'bullhorn'}
                            color={Colors.primaryGreen}
                            style={{marginStart: 10}}
                            size={16}
                          />
                        </View>
                      </View>
                    )}

                    {realEstateItem.space && (
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
                        <Text style={[Fonts.style.normal, styles.textStyle]}>
                          {realEstateItem.space}
                        </Text>
                        <View style={{flexDirection: 'row'}}>
                          <Text
                            style={[
                              Fonts.style.normal,
                              styles.textStyle,
                              {color: Colors.darkSlateBlue},
                            ]}>
                            {'المساحة'}:{' '}
                          </Text>
                          <CustomIcon
                            name={'area'}
                            color={Colors.primaryGreen}
                            style={{marginStart: 10}}
                            size={16}
                          />
                        </View>
                      </View>
                    )}

                    {realEstateItem.age && (
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
                        <Text style={[Fonts.style.normal, styles.textStyle]}>
                          {realEstateItem.age}
                        </Text>
                        <View style={{flexDirection: 'row'}}>
                          <Text
                            style={[
                              Fonts.style.normal,
                              styles.textStyle,
                              {color: Colors.darkSlateBlue},
                            ]}>
                            {'عمر '}:{' '}
                          </Text>
                          <CustomIcon
                            name={'calender'}
                            color={Colors.primaryGreen}
                            style={{marginStart: 10}}
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
                          borderBottomWidth: 0.3,
                          paddingBottom: 8,
                          borderBottomColor: '#e7e7e7',
                        }}>
                        <Text style={[Fonts.style.normal, styles.textStyle]}>
                          {realEstateItem.floor}
                        </Text>
                        <View style={{flexDirection: 'row'}}>
                          <Text
                            style={[
                              Fonts.style.normal,
                              styles.textStyle,
                              {color: Colors.darkSlateBlue},
                            ]}>
                            {'الدور'}:{' '}
                          </Text>
                          <CustomIcon
                            name={'layers'}
                            color={Colors.primaryGreen}
                            style={{marginStart: 10}}
                            size={16}
                          />
                        </View>
                      </View>
                    )}

                    {realEstateItem.populationType && (
                      <View
                        style={{
                          width: '100%',
                          marginBottom: 8,
                          flexDirection: 'row',
                          justifyContent: 'flex-end',
                          alignItems: 'center',
                          borderBottomWidth: 0.3,
                          paddingBottom: 8,
                          borderBottomColor: '#e7e7e7',
                        }}>
                        <Text style={[Fonts.style.normal, styles.textStyle]}>
                          {(realEstateItem.populationType &&
                            realEstateItem.populationType.nameAr) ||
                            ''}
                        </Text>
                        <View style={{flexDirection: 'row'}}>
                          <Text
                            style={[
                              Fonts.style.normal,
                              styles.textStyle,
                              {color: Colors.darkSlateBlue},
                            ]}>
                            {'الساكن'}:{' '}
                          </Text>
                          <CustomIcon
                            name={'user'}
                            color={Colors.primaryGreen}
                            size={16}
                            style={{marginStart: 10}}
                          />
                        </View>
                      </View>
                    )}

                    {(realEstateItem.streetWidth ||
                      realEstateItem.streetWidth === '') && (
                      <View
                        style={{
                          width: '100%',
                          marginBottom: 8,
                          flexDirection: 'row',
                          justifyContent: 'flex-end',
                          alignItems: 'center',
                          borderBottomWidth: 0.3,
                          paddingBottom: 8,
                          borderBottomColor: '#e7e7e7',
                        }}>
                        <Text style={[Fonts.style.normal, styles.textStyle]}>
                          {realEstateItem.streetWidth || ''}
                        </Text>
                        <View style={{flexDirection: 'row'}}>
                          <Text
                            style={[
                              Fonts.style.normal,
                              styles.textStyle,
                              {color: Colors.darkSlateBlue},
                            ]}>
                            {'الساكن'}:{' '}
                          </Text>
                          <CustomIcon
                            name={'user'}
                            color={Colors.primaryGreen}
                            size={16}
                            style={{marginStart: 10}}
                          />
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
                            style={{marginStart: 10}}
                          />
                          <Text
                            style={[
                              Fonts.style.normal,
                              styles.textStyle,
                              {color: Colors.darkSlateBlue},
                            ]}>
                            {'نبذة عن العقار'}:{' '}
                          </Text>
                        </View>
                        <Text
                          style={[
                            Fonts.style.normal,
                            styles.textStyle,
                            {width: '80%', margin: 12},
                          ]}>
                          {realEstateItem.notes}
                        </Text>
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
                          borderBottomWidth: 0.3,
                          paddingBottom: 8,
                          borderBottomColor: '#e7e7e7',
                        }}>
                        <View style={{flexDirection: 'row'}}>
                          {(realEstateItem.selectedSides || []).map(
                            (item, index) => (
                              <Text
                                style={[
                                  Fonts.style.normal,
                                  styles.textStyle,
                                  {paddingHorizontal: 1},
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
                          style={{flexDirection: 'row', alignItems: 'center'}}>
                          <Text
                            style={[
                              Fonts.style.normal,
                              styles.textStyle,
                              {color: Colors.darkSlateBlue},
                            ]}>
                            {'الواجهة'}:{' '}
                          </Text>
                          <Icon
                            name={'directions-fork'}
                            color={Colors.primaryGreen}
                            style={{marginStart: 10}}
                            size={16}
                          />
                        </View>
                      </View>
                    )}
                  </View>

                  {(realEstateItem.features || []).length > 0 && (
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
                      {'مميزات العقار'}
                    </Text>
                  )}

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
                      containerStyle={{marginTop: 20}}
                      bluePrint={realEstateItem.bluePrint}
                      doAnimation={true}
                    />
                  )}

                  {/* { realEstateItem.features && <Text style={[Fonts.style.normal,{fontSize: 18, alignSelf:'flex-end', marginTop: 38, marginEnd: 16, paddingRight: 12, fontWeight: Platform.OS === 'android'?'400': "bold", color: Colors.black}]} >{'مميزات العقار'}</Text>}

                                { realEstateItem.features && <AqarFeatures realEstateFeatures={realEstateItem.features} />}



                            {realEstateItem.bluePrint && <BluePrintList containerStyle={{marginTop: 20 }} doAnimation={true}   />} */}

                  {this.state.suggestionDate && (
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
                    <BallIndicator style={{marginTop: 20}} color={'green'} />
                  )}
                  {this.state.suggestionDate && (
                    <SugesstionRealEstate
                      itemPress={i =>
                        this.props.navigation.push('RealEstateDetail', {
                          realEstate: i,
                        })
                      }
                      data={this.state.suggestionDate}
                      containerStyle={{marginTop: 40}}
                    />
                  )}
                </Animated.View>
              </TouchableWithoutFeedback>
            </Animated.ScrollView>

            <RatingModal
              loading={this.state.loading}
              done={this.state.done}
              isVisible={this.state.showRating}
              onClose={() => this.setState({showRating: false})}
              onSwipe={() => this.setState({showRating: false})}
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
                onClose={() => this.setState({showRequest: false})}
                onSwipe={() => this.setState({showRequest: false})}
                onRequest={request => this.handleRequest(request)}
              />
            )}

            {/* <FooterButton /> */}
            {!this.state.rate && !this.state.toPreview && (
              <Animated.View
                style={[
                  styles.backgroundStyle,
                  // { transform: [{ translateY: navbarTranslate }] }
                ]}>
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
                      this.setState({showRating: true});
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

            {this.state.owner && (
              <Animated.View
                style={[
                  styles.backgroundStyle,
                  // { transform: [{ translateY: navbarTranslate }] }
                ]}>
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
                        return alert('الرجاء تسجيل الدخول للاستفادة');
                      }
                      this.setState({showRequest: true});
                    }}>
                    {!this.props.loading ? (
                      <Text
                        style={[
                          Fonts.style.normal,
                          styles.inputStyle,
                          this.props.textPropsStyle,
                        ]}>
                        {' '}
                        {'إطلب إحدى خدماتنا الآن!'}
                      </Text>
                    ) : (
                      <ActivityIndicator color={'#fff'} animating={true} />
                    )}
                  </TouchableOpacity>
                </Animated.View>
              </Animated.View>
            )}

            {!this.state.toPreview && (
              <NearAqarFeatures
                address={
                  realEstateItem &&
                  realEstateItem.address &&
                  realEstateItem.address
                }
                isVisible={this.state.shaowNearFeatures}
                onBackPress={() => this.setState({shaowNearFeatures: false})}
              />
            )}

            {!this.state.toPreview && (
              <PanoramView
                id={realEstateItem._id}
                isVisible={this.state.showPanoramaView}
                onBackPress={() => this.setState({showPanoramaView: false})}
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
    // backgroundColor: Colors.darkSeafoamGreen,
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
    // width: 34,
    // height: 34,
    // backgroundColor: "#fff",
    // backgroundColor: Colors.darkSeafoamGreen,
    // shadowColor: "rgba(0, 0, 0, 0.16)",
    // shadowOffset: {
    //   width: 0,
    //   height: 3
    // },
    // elevation: 2,
    // shadowRadius: 6,
    // shadowOpacity: 1,
    // borderRadius: 17,
    justifyContent: 'center',
    alignItems: 'center',
    // marginEnd: 22,
    // borderWidth: 1
  },
  // container:{
  //     alignItems:'flex-end',
  //     justifyContent:'center',
  //     alignSelf:'center',
  //     // flexDirection: 'row',
  //     width: Metrics.screenWidth - 80,
  //     marginHorizontal: 40,
  // },

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

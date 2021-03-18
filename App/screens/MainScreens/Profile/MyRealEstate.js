import React, { useEffect, useState } from 'react';
import {
  View,
  Animated,
  Text,
  Keyboard,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';

import Header from '../../../Component/Header';
import MainTypes from '../../../Component/MainFilterTypes';
import { Fonts, Colors, Metrics, Images } from '../../../Themes';

import RealestateType from '../../../Component/realestateType';
import CountWithTitle from '../../../Component/CountWithTitle';
import RangeItem from '../../../Component/rangeItem';
import Button from '../../../Component/Button';
import ProgressBar from '../../../Component/ProgressBar';
import RealEstateTypesList from '../../../Component/RealestateTypeList';
import RealEstateList from '../../../Component/realEstateList';
import ImageViewr from 'react-native-image-zoom-viewer';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import _ from 'lodash';
import { ifIphoneX } from 'react-native-iphone-x-helper';
import Input from '../../../Component/Input';

import AlertModal from '../../../Component/Alert';
import ErroAlert from '../../../Component/ErrorAlert';

import CardPlaceHolder from '../../../Component/cardPlaceHolder';

import { connect } from 'react-redux';
import RealEstateAction from '../../../Redux/RealEstateRedux';
import { ActivityIndicator } from 'react-native-paper';

import api from '../../../Services/API';

const API = api.create();

class MyRealEstate extends React.Component {
  state = {
    finishedRealEstate: [
      {
        _id: 3,
        nameAr: 'شقق سكنية',
        nameEn: 'area',
        smallIcon: true,
        showDetail: false,
        coordinates: { lat: 24.78827, long: 46.0005 },
      },
      {
        _id: 2,
        nameAr: 'فيلا للبيع',
        nameEn: 'area',
        smallIcon: false,
        showDetail: false,
        coordinates: { lat: 24.78826, long: 46.882281 },
      },
      {
        _id: 1,
        nameAr: 'بيت للايجار',
        nameEn: 'area',
        smallIcon: true,
        showDetail: false,
        coordinates: { lat: 24.78825, long: 46.622831 },
      },
      {
        _id: 4,
        nameAr: 'قطعة أرض',
        nameEn: 'area',
        smallIcon: false,
        showDetail: false,
        coordinates: { lat: 24.78828, long: 47.122831 },
      },
      {
        _id: 5,
        nameAr: 'قطعة أرض',
        nameEn: 'area',
        smallIcon: true,
        showDetail: false,
        coordinates: { lat: 24.78829, long: 46.922831 },
      },
      {
        _id: 6,
        nameAr: 'قطعة أرض',
        nameEn: 'area',
        smallIcon: false,
        showDetail: false,
        coordinates: { lat: 24.7882, long: 46.222831 },
      },
    ],
    activeRealEstate: [
      {
        _id: 3,
        nameAr: 'شقق233 سكنية',
        nameEn: 'area',
        smallIcon: true,
        showDetail: false,
        coordinates: { lat: 24.78827, long: 46.0005 },
      },
      {
        _id: 2,
        nameAr: 'فيلا للبيع',
        nameEn: 'area',
        smallIcon: false,
        showDetail: false,
        coordinates: { lat: 24.78826, long: 46.882281 },
      },
      {
        _id: 1,
        nameAr: 'بيت للايجار',
        nameEn: 'area',
        smallIcon: true,
        showDetail: false,
        coordinates: { lat: 24.78825, long: 46.622831 },
      },
      {
        _id: 4,
        nameAr: 'قطعة أرض',
        nameEn: 'area',
        smallIcon: false,
        showDetail: false,
        coordinates: { lat: 24.78828, long: 47.122831 },
      },
      {
        _id: 5,
        nameAr: 'قطعة أرض',
        nameEn: 'area',
        smallIcon: true,
        showDetail: false,
        coordinates: { lat: 24.78829, long: 46.922831 },
      },
      {
        _id: 6,
        nameAr: 'قطعة أرض',
        nameEn: 'area',
        smallIcon: false,
        showDetail: false,
        coordinates: { lat: 24.7882, long: 46.222831 },
      },
    ],
    disActiveRealEstate: [
      {
        _id: 3,
        nameAr: 'شقق3434 سكنية',
        nameEn: 'area',
        smallIcon: true,
        showDetail: false,
        coordinates: { lat: 24.78827, long: 46.0005 },
      },
      {
        _id: 2,
        nameAr: 'فيلا للبيع',
        nameEn: 'area',
        smallIcon: false,
        showDetail: false,
        coordinates: { lat: 24.78826, long: 46.882281 },
      },
      {
        _id: 1,
        nameAr: 'بيت للايجار',
        nameEn: 'area',
        smallIcon: true,
        showDetail: false,
        coordinates: { lat: 24.78825, long: 46.622831 },
      },
      {
        _id: 4,
        nameAr: 'قطعة أرض',
        nameEn: 'area',
        smallIcon: false,
        showDetail: false,
        coordinates: { lat: 24.78828, long: 47.122831 },
      },
      {
        _id: 5,
        nameAr: 'قطعة أرض',
        nameEn: 'area',
        smallIcon: true,
        showDetail: false,
        coordinates: { lat: 24.78829, long: 46.922831 },
      },
      {
        _id: 6,
        nameAr: 'قطعة أرض',
        nameEn: 'area',
        smallIcon: false,
        showDetail: false,
        coordinates: { lat: 24.7882, long: 46.222831 },
      },
    ],
    selectedRealestateType: '',
    selctedTap: 'active',
    showAlert: false,
    showErrorMessage: false,
    imageFullScreen: false,
    pageNumber: 1,
    numberOfRealEstate: 0,
    // realestateData: []
  };

  componentWillMount() {
    this.setState({ loading: true });
    this.props.getUserRealEstate(this.props.user._id, this.state.pageNumber);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.userRealEstate !== this.props.userRealEstate) {
      if (
        nextProps.userRealEstate &&
        nextProps.userRealEstate.realEstates &&
        this.state.pageNumber > 1
      ) {
        let arr2 = _.concat(
          this.state.realestateData,
          nextProps.userRealEstate.realEstates,
        );
        console.log(
          'arra  after merge',
          this.state.realestateData,
          nextProps.userRealEstate.realEstates,
        );
        this.setState({ realestateData: arr2, moreDataLoading: false });
      } else if (
        nextProps.userRealEstate &&
        nextProps.userRealEstate.realEstates
      ) {
        this.setState({
          realestateData: nextProps.userRealEstate.realEstates,
          realestateCount: nextProps.userRealEstate.realEstatesCount,
          loading: false,
        });
      }
    }
  }

  handleRefreshItem = async item => {
    this.setState({ dismassLoading: item._id, optionsSelected: null });
    const res = await API.refreshRealEstate(item._id, this.props.user.token);
    console.log('res', res);
    if (res && res.ok) {
      this.setState({
        dismassLoading: null,
        showAlert: true,
        alertMessage: 'تم تحديث العقار',
      });
      // alert('تم')
      this.setState({ loading: true });
      this.props.getUserRealEstate(this.props.user._id);
      // this.props.navigation.goBack()
    }
  };

  handleDeleteItem = async () => {
    let item = this.state.deleteItem;
    // return this.setState({showAlert: true, alertMessage: 'هل انت متأكد من حذف هذا العقار ؟'})
    this.setState({
      dismassLoading: item._id,
      optionsSelected: null,
      showAlert: false,
    });
    const res = await API.deletRealEstate(item._id, this.props.user.token);
    console.log('res', res);
    if (res && res.ok) {
      this.setState({
        dismassLoading: item._id,
        twoButtons: false,
        alertMessage: 'تم حذف العقار بنجاح',
        showAlert: true,
      });
      // alert('تم')
      this.setState({ loading: true });
      this.props.getUserRealEstate(this.props.user._id);
    }
  };

  onDismassPress(item) {
    console.log(item);
    // this.saveUpdate(item)
  }

  onQRCodePress = () => {
    this.setState({ imageFullScreen: true });
  };

  handleGetMoreDatat = () => {
    if (!this.state.moreDataLoading && this.state.pageNumber < 2) {
      this.setState({
        pageNumber: ++this.state.pageNumber,
        moreDataLoading: true,
      });
      console.log('hello', this.state.pageNumber);
      this.props.getUserRealEstate(this.props.user._id, this.state.pageNumber);
    }
  };

  render() {
    // const imagess = [{ url: Images.testCardImage}]
    const imagess = [{ url: '', props: { source: Images.QRImage } }];
    return (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={{ flex: 1 }}>
          <Header
            withQR={false}
            onQRCodePress={this.onQRCodePress}
            headerTitle={'عقاراتي'}
            doAnimation={true}
            onBackPress={() => this.props.navigation.goBack()}
            containerStyle={{ borderBottomWidth: 0 }}
          />

          <AlertModal
            onOkPress={this.handleDeleteItem}
            okTextStyle={{ color: Colors.redWhite }}
            okButtonText={'حذف'}
            twoButtons={this.state.twoButtons}
            contentMessage={this.state.alertMessage}
            closeErrorModel={() => this.setState({ showAlert: false })}
            isVisible={this.state.showAlert}
          />

          {this.state.showErrorMessage && (
            <ErroAlert
              setAnimation={() => this.setState({ showErrorMessage: false })}
              doAnimation={this.state.showErrorMessage}
            />
          )}

          {this.state.loading && (
            <View>
              <CardPlaceHolder />

              <CardPlaceHolder />

              <CardPlaceHolder />

              <CardPlaceHolder />

              <CardPlaceHolder />
            </View>
          )}

          {!this.state.loading &&
            (this.state.realestateData || []).length <= 0 && (
              <View
                style={{
                  alignSelf: 'center',
                  backgroundColor: 'transparnt',
                  position: 'absolute',
                  zIndex: 2,
                  top: 250,
                }}>
                <Text style={[Fonts.style.normal]}>
                  {'ليس لديك عقارات مضافة'}
                </Text>
              </View>
            )}

          {/* {this.state.loading && <ActivityIndicator color={Colors.darkSeafoamGreen} />} */}
          <RealEstateList
            onScroll={() => this.setState({ optionsSelected: null })}
            deletePress={i =>
              this.setState({
                showAlert: true,
                alertMessage: 'هل انت متأكد من حذف هذا العقار ؟',
                deleteItem: i,
                twoButtons: true,
              })
            }
            editRealEstate={x =>
              this.props.navigation.navigate('FirstStepAddAqar', {
                fromDetail: true,
                realEstate: x,
              })
            }
            refreshPress={i => this.handleRefreshItem(i)}
            popupOf={this.state.optionsSelected}
            onOptionsPress={i =>
              this.state.optionsSelected
                ? this.setState({ optionsSelected: null })
                : this.setState({ optionsSelected: i._id })
            }
            listType={'small'}
            dismassLoading={this.state.dismassLoading}
            onDismassPress={item => this.onDismassPress(item)}
            mine={true}
            loading={this.state.loading}
            onItemPress={x => {
              //  alert(1);
              this.state.optionsSelected
                ? this.setState({ optionsSelected: null })
                : this.props.navigation.navigate('RealEstateDetail', {
                    realEstate: x,
                  });
            }}
            numberOfRealEstate={this.state.realestateCount}
            handleGetMoreDatat={this.handleGetMoreDatat}
            moreDataLoading={this.state.moreDataLoading}
            realestateData={this.state.realestateData}
            containerStyle={{ paddingTop: 20 }}
          />
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  getUserRealEstate: (_id, pageNumber) =>
    dispatch(RealEstateAction.getUserRealEstate(_id, pageNumber)),
});

const mapStateToProps = state => {
  console.log('owner real Estate state', state);
  return {
    user: state.user.user && state.user.user.user && state.user.user.user,
    userRealEstate: state.realEstate.userRealEstate,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MyRealEstate);

import React from 'react';
import { View, Text, Keyboard, TouchableWithoutFeedback } from 'react-native';

import Header from '../../../Component/Header';
import { Fonts, Colors } from '../../../Themes';

import RealEstateList from '../../../Component/realEstateList';

import _ from 'lodash';

import AlertModal from '../../../Component/Alert';
import ErroAlert from '../../../Component/ErrorAlert';

import CardPlaceHolder from '../../../Component/cardPlaceHolder';

import { connect } from 'react-redux';
import RealEstateAction from '../../../Redux/RealEstateRedux';

import api from '../../../Services/API';

const API = api.create();

class MyRealEstate extends React.Component {
  state = {
    finishedRealEstate: [],
    activeRealEstate: [],
    disActiveRealEstate: [],
    selectedRealestateType: '',
    selctedTap: 'active',
    showAlert: false,
    showErrorMessage: false,
    imageFullScreen: false,
    pageNumber: 1,
    numberOfRealEstate: 0,
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
      this.setState({ loading: true });
      this.props.getUserRealEstate(this.props.user._id);
    }
  };

  handleDeleteItem = async () => {
    let item = this.state.deleteItem;
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
    return (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={{ flex: 1 }}>
          <Header
            withQR={false}
            onQRCodePress={this.onQRCodePress}
            headerTitle={'عقاراتي'}
            doAnimation={true}
            onBackPress={() => this.props.navigation.goBack()}
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

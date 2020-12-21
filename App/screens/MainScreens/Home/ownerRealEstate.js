import React, {useEffect, useState} from 'react';
import {
  View,
  Animated,
  Text,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import {StackActions, NavigationActions} from 'react-navigation';

import Header from '../../../Component/Header';
import MainTypes from '../../../Component/MainFilterTypes';
import {Fonts, Colors, Metrics, Images} from '../../../Themes';

import RealestateType from '../../../Component/realestateType';
import CountWithTitle from '../../../Component/CountWithTitle';
import RangeItem from '../../../Component/rangeItem';
import Button from '../../../Component/Button';
import ProgressBar from '../../../Component/ProgressBar';
import RealEstateTypesList from '../../../Component/RealestateTypeList';
import RealEstateList from '../../../Component/realEstateList';

import * as Progress from 'react-native-progress';
import {ifIphoneX} from 'react-native-iphone-x-helper';
import Input from '../../../Component/Input';
import HeadreRealestateDetail from '../../../Component/headerRealestateDetailsOwner';
import ImageViewr from 'react-native-image-zoom-viewer';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Modal from 'react-native-modal';

import {connect} from 'react-redux';
import RealEstateAction from '../../../Redux/RealEstateRedux';
import {ActivityIndicator} from 'react-native-paper';

class OwnerRealEstates extends React.Component {
  state = {
    selectedRealestateType: '',
    selctedTap: 'active',
    user: this.props.navigation.getParam('user'),
    imageFullScreen: false,
  };

  componentDidMount() {
    this.setState({loading: true});
    console.log('this .user', this.state.user);
    this.props.getUserRealEstate(this.state.user._id);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.userRealEstate !== this.props.userRealEstate) {
      this.setState({
        realestateData: nextProps.userRealEstate.realEstates,
        loading: false,
      });
    }
  }

  onQRCodePress = () => {
    this.setState({imageFullScreen: true});
  };

  render() {
    const imagess = [{url: '', props: {source: Images.QRImage}}];

    return (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={{flex: 1}}>
          <Header
            withQR={false}
            headerTitle={`عقارات ${this.state.user && this.state.user.name}`}
            doAnimation={true}
            onBackPress={() => this.props.navigation.goBack()}
            containerStyle={{borderBottomWidth: 0}}
          />

          <HeadreRealestateDetail
            onQRCodePress={this.onQRCodePress}
            ownerPage={true}
            owner={this.state.user}
            onPress={null}
            containerStyle={{}}
            withOutQR={false}
            userQR={this.state.user && false}
          />

          {/* <View
                        style={{
                            height: 50,
                            backgroundColor: "#ffffff",
                            shadowColor: "rgba(0, 0, 0, 0.1)",
                            shadowOffset: {
                                width: 0,
                                height: 7
                            },
                            shadowRadius: 6,
                            shadowOpacity: 1,
                            zIndex: -1, 
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            elevation: 2,
                            paddingHorizontal: 20
                        }}
                    >
                        <TouchableOpacity onPress={()=> this.setState({selctedTap: 'disActive' })} style={[this.state.selctedTap === 'disActive'?{borderBottomWidth: 2, borderBottomColor: Colors.darkSeafoamGreen, height: '100%', alignItems: 'center', justifyContent: 'center'}: {}]} >
                            <Text style={[Fonts.style.normal,{fontSize: 13, }, this.state.selctedTap === 'disActive' ? {color: Colors.black}: {color: '#8e8e93'}]} > العقارات المخفية </Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=> this.setState({selctedTap: 'finished' })} style={[this.state.selctedTap === 'finished'?{borderBottomWidth: 2, borderBottomColor: Colors.darkSeafoamGreen, height: '100%', alignItems: 'center', justifyContent: 'center'}: {}]} >
                            <Text style={[Fonts.style.normal,{fontSize: 13, }, this.state.selctedTap === 'finished' ? {color: Colors.black}: {color: '#8e8e93'}]} > العقارات المنتهية </Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=> this.setState({selctedTap: 'active'})} style={[ this.state.selctedTap === 'active' ?{borderBottomWidth: 2, borderBottomColor: Colors.darkSeafoamGreen, height: '100%', alignItems: 'center', justifyContent: 'center'}: {}]} >
                            <Text style={[Fonts.style.normal,{fontSize: 13, }, this.state.selctedTap === 'active' ? {color: Colors.black}: {color: '#8e8e93'}]} > العقارات النشطة  </Text>
                        </TouchableOpacity>
                    </View>
     */}

          <Modal
            visible={this.state.imageFullScreen}
            style={{
              width: Metrics.screenWidth,
              height: Metrics.screenHeight,
              margin: 0,
            }}
            onBackdropPress={() => this.setState({imageFullScreen: false})}
            transparent={true}>
            <TouchableOpacity
              style={[
                // styles.modalCloseBtn,
                {
                  top: 60,
                  backgroundColor: '#fff',
                  // opacity: 0.5,
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: Metrics.screenWidth * 0.1,
                  height: Metrics.screenWidth * 0.1,
                  borderRadius: (Metrics.screenWidth * 0.1) / 2,
                  right: 20,
                  position: 'absolute',
                  zIndex: 999999,
                },
              ]}
              activeOpacity={0.65}
              onPress={() => this.setState({imageFullScreen: false})}>
              <Icon
                name={'close-octagon-outline'}
                size={25}
                color={'#3a2f2f'}
              />
            </TouchableOpacity>

            <ImageViewr
              imageUrls={imagess}
              // imageUrls={[{originUrl: '', props:{source: Images.testCardImage}}]}
              style={[{height: '90%'}]}
            />
          </Modal>

          {this.state.loading && (
            <ActivityIndicator
              style={{marginTop: 40}}
              color={Colors.primaryGreen}
            />
          )}

          <RealEstateList
            onItemPress={x =>
              this.props.navigation.push('RealEstateDetail', {realEstate: x})
            }
            realestateData={this.state.realestateData}
            containerStyle={{paddingTop: 20}}
          />
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  getUserRealEstate: _id => dispatch(RealEstateAction.getUserRealEstate(_id)),
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
)(OwnerRealEstates);

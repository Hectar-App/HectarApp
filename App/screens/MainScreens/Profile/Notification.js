import React, {useEffect, useState} from 'react';
import {
  View,
  Animated,
  Text,
  Keyboard,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {StackActions, NavigationActions} from 'react-navigation';
import Row from '../../../Component/Row';
import Header from '../../../Component/Header';
import {Metrics, Fonts, Colors} from '../../../Themes';

import {connect} from 'react-redux';
import RealEstateAcion from '../../../Redux/RealEstateRedux';
import {ActivityIndicator} from 'react-native-paper';

import TimeAgo from 'react-native-timeago';
import moment from 'moment';
import {ScrollView} from 'react-native-gesture-handler';
import api from '../../../Services/API';
import Interactable from 'react-native-interactable';
import AlertModal from '../../../Component/Alert';
import {BallIndicator} from 'react-native-indicators';

const API = api.create();

const Item = props => {
  let {item} = props;
  // console.log('item', props);
  // let title = item.request === 1 ? 'طلب خدمة التصوير الأحترافي': item.request === 2 ? 'طلب خدمة تصوير 360 درجة': 'طلب خدمة QR كود'
  // let state = item.status === 1 ? 'جديد': item.status === 2 ? 'قيد التنفيذ': item.status === 3 ? 'تم التنفيذ': "تم الغاءه"
  // let color = item.status === 1 ? Colors.darkSeafoamGreen: item.status === 2 ? Colors.yellow: item.status === 3 ? '#606aa1': Colors.whiteRed

  const {realEstate} = item;

  return (
    <Row onDeletePress={props.deleteItem} damping={1 - 0.6} tension={300}>
      <TouchableOpacity
        style={{
          height: 70,
          width: Metrics.screenWidth,
          justifyContent: 'center',
          alignItems: 'flex-end',
          paddingEnd: 30,
          paddingStart: 16,
          backgroundColor: props.item.status && '#3dba7e0d',
        }}
        onPress={props.onPress}>
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'space-between',
            marginBottom: 7,
          }}>
          {/* <Text style={[ Fonts.style.normal, {fontSize: 11, color: color ,}]} >{state}</Text> */}
          {moment(item.date).fromNow(false) && (
            <Text
              style={[
                Fonts.style.normal,
                {fontWeight: 'normal', color: '#424a4e', fontSize: 12},
              ]}>
              {moment(item.date).fromNow(false)}
            </Text>
          )}

          <Text
            style={[
              Fonts.style.normal,
              {color: Colors.black, maxWidth: '80%', textAlign: 'right'},
            ]}>
            {props.item.title}
          </Text>
        </View>
      </TouchableOpacity>
    </Row>
  );
  return (
    <Interactable.View
      horizontalOnly={true}
      snapPoints={[{x: 0}, {x: -200}]}
      gravityPoints={[{x: 0, y: 0, strength: 8000, falloff: 40, damping: 0.5}]}
      onSnap={() => console.log('snaping')}>
      <TouchableOpacity
        style={{
          height: 70,
          width: Metrics.screenWidth,
          justifyContent: 'center',
          alignItems: 'flex-end',
          paddingEnd: 30,
          paddingStart: 16,
          backgroundColor: props.item.status && '#f7cfcf54',
        }}
        onPress={props.onPress}>
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'space-between',
            marginBottom: 7,
          }}>
          {/* <Text style={[ Fonts.style.normal, {fontSize: 11, color: color ,}]} >{state}</Text> */}
          {moment(item.date).fromNow(false) && (
            <Text
              style={[
                Fonts.style.normal,
                {fontWeight: 'normal', color: '#424a4e', fontSize: 12},
              ]}>
              {moment(item.date).fromNow(false)}
            </Text>
          )}

          <Text
            style={[
              Fonts.style.normal,
              {color: Colors.black, maxWidth: '80%', textAlign: 'right'},
            ]}>
            {props.item.title}
          </Text>
        </View>
      </TouchableOpacity>
    </Interactable.View>
  );
};

class NotificationPage extends React.Component {
  state = {
    showAlert: false,
    // requests: [{title: 'انتهت مدة الاعلان', desc: 'شقة للايجار'}]
    // {title: 'تقييم جديد', desc: 'لقد حصل عقار " شقة سكنية للبيع " على تقييم جيديد', from: 'منذ 24 د'},
    // {title: 'تقييم جديد', desc: 'لقد حصل عقار " شقة سكنية للبيع " على تقييم جيديد', from: 'منذ 24 د'},
    // {title: 'تقييم جديد', desc: 'لقد حصل عقار " شقة سكنية للبيع " على تقييم جيديد', from: 'منذ 24 د'},
    // {title: 'تقييم جديد', desc: 'لقد حصل عقار " شقة سكنية للبيع " على تقييم جيديد', from: 'منذ 24 د'}
  };

  componentWillReceiveProps(nextProps) {
    console.log('nextprops', nextProps);
    if (nextProps.userNotification !== this.props.userNotification) {
      console.log('nextProps.userRequests', nextProps.userNotification);
      this.setState({
        requests:
          nextProps.userNotification &&
          nextProps.userNotification.notification &&
          nextProps.userNotification.notification,
        loading: false,
      });
      setTimeout(() => {
        if (
          nextProps.userNotification &&
          nextProps.userNotification.notification &&
          nextProps.userNotification.notification
        ) {
          (nextProps.userNotification.notification || []).map(item => {
            // console.log('item', item);
            if (item.status) {
              this.changeStateAndDelete(item._id, false).then(res => {
                console.log('res', res);
              });
            }
          });
        }
      }, 8000);
    }
  }

  async changeStateAndDelete(_id, deleteFlag) {
    let res = await API.setOneNotification(
      _id,
      deleteFlag,
      this.props.user.token,
    );
    console.log('res', res, _id);
    if (res.ok) {
      this.loadRequests(true);
    }

    return res;
  }

  componentWillMount() {
    this.loadRequests();
  }

  loadRequests(i) {
    if (this.props.user && this.props.user.token) {
      if (!i) {
        this.setState({loading: true});
      }
      this.props.getUserNotification(this.props.user.token);
    } else {
      this.setState({noUser: true});
    }
  }

  componentDidMount() {
    if (!this.props.user || !this.props.user.token) {
      return this.setState({
        showAlert: true,
        alertMessage: 'يجب تسجيل الدخول لمشاهدة التنبيهات',
      });
    }
  }

  handleBackPress = () => {
    return this.props.navigation.dispatch(
      StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({routeName: 'bottomTab'})],
      }),
    );
  };

  handleLogin = () => {
    this.setState({showAlert: false});
    this.props.navigation.navigate('LoginPage');
  };

  handleItemPress = ({item}) => {
    console.log(item);
    if (item.request) {
      this.props.navigation.navigate('Request');
    } else if (item.realEstate) {
      this.props.navigation.navigate('MyRealEstate');
    }

    // item.item.realEstate && this.props.navigation.navigate('RealEstateDetail', {realEstate: item.item.realEstate})
  };

  render() {
    return (
      // <View onPress={() => Keyboard.dismiss()}>
      <View style={{flex: 1}}>
        <Header
          noBackButton={true}
          headerTitle={'التنبيهات'}
          doAnimation={true}
          onBackPress={() => this.props.navigation.goBack()}
        />

        {/* {this.state.loading && <ActivityIndicator style={{marginTop: 20}} color={Colors.darkSeafoamGreen} />} */}

        {this.state.requests && (
          <FlatList
            data={(this.state.requests || []).reverse()}
            renderItem={item => (
              <Item
                deleteItem={() =>
                  this.changeStateAndDelete(item.item._id, true)
                }
                item={item.item}
                onPress={() => this.handleItemPress(item)}
              />
            )}
            // bounces={true}
            style={{flex: 1, zIndex: 9999, marginBottom: 90}}
            contentContainerStyle={{
              paddingTop: 20,
              zIndex: 9999,
              marginBottom: 130,
            }}
            refreshing={this.state.loading}
            onRefresh={() => this.loadRequests()}
            // on={()=> alret()}
            // onRefresh={()=> alert()}

            // onRefresh={() => this.loadRequests()}
            // refreshControl={() => this.loadRequests()}
          />
        )}

        {this.state.loading && (
          <View
            style={{
              position: 'absolute',
              // width: 150,
              // height:50,
              // backgroundColor: '#fff',
              // zIndex: 999,
              // top: 150,
              alignSelf: 'center',
              marginTop: 350,
              // borderRadius: 5,
              // shadowColor: '#ccc',
              // shadowOffset: {width: 0, height: 0},
              // shadowOpacity: 2,
              // shadowRadius: 4,
              // elevation: 2,
            }}>
            <BallIndicator color={'green'} />
          </View>
        )}

        <AlertModal
          closePress={this.handleBackPress}
          closeErrorModel={this.handleLogin}
          buttonText={'تسجيل الدخول'}
          contentMessage={this.state.alertMessage}
          isVisible={this.state.showAlert}
        />

        {!this.state.loading && (this.state.requests || []).length <= 0 && (
          <View
            style={{
              alignSelf: 'center',
              backgroundColor: 'transparnt',
              position: 'absolute',
              zIndex: 2,
              top: 250,
            }}>
            <Text style={[Fonts.style.normal]}>
              {this.state.noUser
                ? 'يجب عليك تسجيل الدخول '
                : ' لا يوجد لديك اشعارات'}
            </Text>
          </View>
        )}
      </View>
      // </View>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  getUserNotification: token =>
    dispatch(RealEstateAcion.getUserNotification(token)),
});

const mapStateToProps = state => {
  console.log('DetailOfRealEstateState', state);
  return {
    user: state.user.user && state.user.user.user && state.user.user.user,
    userNotification:
      state.realEstate.userNotification && state.realEstate.userNotification,
    userNotificationError:
      state.realEstate.userNotificationError &&
      state.realEstate.userNotificationError,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NotificationPage);

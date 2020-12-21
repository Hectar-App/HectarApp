import React, {useEffect, useState} from 'react'
import {View, Animated, Text, Keyboard, TouchableOpacity, FlatList} from 'react-native'
import { StackActions, NavigationActions } from 'react-navigation';

import Header from '../../../Component/Header'
import { Metrics, Fonts, Colors } from '../../../Themes';

import {connect} from 'react-redux'
import RealEstateAcion from '../../../Redux/RealEstateRedux'
import { ActivityIndicator } from 'react-native-paper';

import TimeAgo from 'react-native-timeago'
import moment from 'moment'
import { ScrollView } from 'react-native-gesture-handler';


import AlertModal from '../../../Component/Alert'
import {
    BallIndicator,
  } from 'react-native-indicators';

const Item = (props) => {
    let {item} = props
    console.log('item', item)
    let title = item.request === 1 ? 'طلب خدمة التصوير الأحترافي': item.request === 2 ? 'طلب خدمة تصوير 360 درجة': 'طلب خدمة QR كود'
    let state = item.status === 1 ? 'جديد': item.status === 2 ? 'قيد التنفيذ': item.status === 3 ? 'تم التنفيذ': "ملغي"
    let color = item.status === 1 ? Colors.darkSeafoamGreen: item.status === 2 ? Colors.yellow: item.status === 3 ? '#606aa1': Colors.whiteRed

    const {
        realEstate
    } = item

    return(
    <TouchableOpacity
        style={{
            height: 70, 
            width: Metrics.screenWidth, 
            justifyContent:'center',
            alignItems: 'flex-end',
            paddingEnd: 30,
            paddingStart: 16
        }}
        onPress={props.onPress}
    >
        <View
            style={{flexDirection: 'row', width: '100%', justifyContent: 'space-between', marginBottom: 7}}
        >
            <Text style={[ Fonts.style.normal, {fontSize: 11, color: color ,}]} >{state}</Text>
            <Text style={[ Fonts.style.normal, { color: Colors.black, maxWidth: '80%', textAlign: 'right' }]} > {title} {realEstate && realEstate.type && realEstate.type.nameAr && realEstate.type.nameAr} {realEstate && realEstate.status && realEstate.status.nameAr && realEstate.status.nameAr} </Text>
        </View>
        {/* <Text style={[ Fonts.style.normal, {color: '#424a4e', fontSize: 12}]} > {item.createdAt} </Text> */}
        {/* <TimeAgo style={[Fonts.style.normal, {fontWeight: 'normal', color: '#424a4e', fontSize: 12}]} time={item.createdAt} interval={2000} /> */}
        { moment(item.createdAt).fromNow(false) && 
            <Text
                style={[Fonts.style.normal, {fontWeight: 'normal', color: '#424a4e', fontSize: 12}]}
            >
                {moment(item.createdAt).fromNow(false)} 
            </Text>
        }

    </TouchableOpacity>
)}

class Requests extends React.Component {

    state = {
        showAlert: false,
        // requests: []
            // {title: 'تقييم جديد', desc: 'لقد حصل عقار " شقة سكنية للبيع " على تقييم جيديد', from: 'منذ 24 د'},
            // {title: 'تقييم جديد', desc: 'لقد حصل عقار " شقة سكنية للبيع " على تقييم جيديد', from: 'منذ 24 د'},
            // {title: 'تقييم جديد', desc: 'لقد حصل عقار " شقة سكنية للبيع " على تقييم جيديد', from: 'منذ 24 د'},
            // {title: 'تقييم جديد', desc: 'لقد حصل عقار " شقة سكنية للبيع " على تقييم جيديد', from: 'منذ 24 د'}
    }


    componentWillReceiveProps(nextProps){
        console.log('nextprops', nextProps)
        if( nextProps.userRequests !== this.props.userRequests ){
            console.log('nextProps.userRequests', nextProps.userRequests)
            this.setState({requests: nextProps.userRequests, loading: false})
        }
    }

    componentWillMount () {

       this.loadRequests()

    }

    loadRequests(){
        if( this.props.user && this.props.user.token ){
            this.setState({loading: true})
            this.props.getUserRequest(this.props.user.token)
        }else{
            this.setState({noUser: true})
        }
    }

    componentDidMount () {
        if (!this.props.user ||!this.props.user.token)
            return this.setState({showAlert: true, alertMessage: 'يجب تسجيل الدخول لاضافة عقارك' })
    }

    handleBackPress = () => {

        return this.props.navigation.dispatch(StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: 'bottomTab' })],
        }))

    }

    handleLogin = () => {
        this.setState({ showAlert: false })
        this.props.navigation.navigate('LoginPage')
    }


    render () {
        return (
            // <View onPress={() => Keyboard.dismiss()}>
                <View style={{flex:1}} >
    
                    <Header headerTitle={"طلباتي"} doAnimation={true} onBackPress={()=> this.props.navigation.goBack()} />

                    {/* {this.state.loading && <ActivityIndicator style={{marginTop: 20}} color={Colors.darkSeafoamGreen} />} */}

                    {this.state.requests && 
                        <FlatList 
                            data={this.state.requests}
                            renderItem={(item) => <Item item={item.item} onPress={()=> item.item.realEstate && this.props.navigation.navigate('RealEstateDetail', {realEstate: item.item.realEstate})} />}
                            // bounces={true}
                            style={{ flex: 1, zIndex: 9999, marginBottom: 90}}
                            contentContainerStyle={{ paddingTop: 20, zIndex: 9999, marginBottom: 130}}
                            refreshing={ this.state.loading}
                            onRefresh={()=> this.loadRequests()}
                            // on={()=> alret()}
                            // onRefresh={()=> alert()}
                            
                            // onRefresh={() => this.loadRequests()}
                            // refreshControl={() => this.loadRequests()}
                        />
                    }

                    { this.state.loading && <View 
                        style={{
                            position: 'absolute',
                            // width: 150, 
                            // height:50,
                            // backgroundColor: '#fff',
                            // zIndex: 999,
                            // top: 150,
                            alignSelf: 'center', 
                            marginTop: 350
                            // borderRadius: 5,
                            // shadowColor: '#ccc',
                            // shadowOffset: {width: 0, height: 0},
                            // shadowOpacity: 2, 
                            // shadowRadius: 4,
                            // elevation: 2,
                        }}
                    >
                        <BallIndicator color={'green'}    />
                    </View>}

                    <AlertModal closePress={this.handleBackPress} closeErrorModel={this.handleLogin} buttonText={'تسجيل الدخول'} contentMessage={this.state.alertMessage}  isVisible={this.state.showAlert} />

                    {   !this.state.loading &&
                        (this.state.requests || []).length <= 0 && (
                            <View style={{alignSelf: 'center', backgroundColor: 'transparnt', position: 'absolute', zIndex: 2, top: 250}} >
                                <Text style={[Fonts.style.normal]} >
                                   {this.state.noUser? "يجب عليك تسجيل الدخول ": " لا يوجد لديك طلبات"}
                                </Text>
                            </View>
                        )
                    }
    
    
                </View>
            // </View>
        )
    }
}


const mapDispatchToProps = dispatch => ({
   
    getUserRequest: (token) => dispatch(RealEstateAcion.getUserRequests(token)),
 });
 
 const mapStateToProps = state => {
     console.log('DetailOfRealEstateState', state)
   return {
     user: state.user.user && state.user.user.user && state.user.user.user,
     userRequests: state.realEstate.userRequests && state.realEstate.userRequests,
     userRequestsError: state.realEstate.userRequestsError && state.realEstate.userRequestsError
   };
 };
 
 export default connect(
   mapStateToProps,
   mapDispatchToProps
 )(Requests);
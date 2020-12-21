import React, {useEffect, useState} from 'react'
import {View, Animated, Text, Keyboard, TouchableWithoutFeedback} from 'react-native'
import { StackActions, NavigationActions } from 'react-navigation';

import Header from '../../../Component/Header'
import RealEstateList from '../../../Component/realEstateList'

import {Fonts} from '../../../Themes'

import {connect} from 'react-redux'
import FavoriteAction from '../../../Redux/FavourteRedux'
import AlertModal from '../../../Component/Alert'

FavoratePage = (props) => {


    const [realestateData, setRealestateData]= useState([
        { _id: 3, nameAr: 'شقق3434 سكنية', nameEn: 'area', smallIcon: true, showDetail: false, coordinates: {lat: 24.78827, long: 46.0005} },
        { _id: 2, nameAr: 'فيلا للبيع', nameEn: 'area', smallIcon: false, showDetail: false, coordinates: {lat: 24.78826, long: 46.882281} },
        { _id: 1, nameAr: 'بيت للايجار', nameEn: 'area', smallIcon: true, showDetail: false, coordinates: {lat: 24.78825, long: 46.622831} },
        { _id: 4, nameAr: 'قطعة أرض', nameEn: 'area', smallIcon: false, showDetail: false, coordinates: {lat: 24.78828, long: 47.122831} },
        { _id: 5, nameAr: 'قطعة أرض', nameEn: 'area', smallIcon: true, showDetail: false, coordinates: {lat: 24.78829, long: 46.922831} },
        { _id: 6, nameAr: 'قطعة أرض', nameEn: 'area', smallIcon: false, showDetail: false, coordinates: {lat: 24.7882, long: 46.222831} }
    ])

    const [showAlert, setShowAlert] = useState(false)
    const [loading, setLoading] = useState(false)
    const [alertMessage, setAlertMessage] = useState('')


    const favProccess = (item) => {
        if(!props.user || !props.user.token)
            return alert('الرجاء تسجيل الدخول للاستفادة')

            // console.log(item)
        props.deleteRealEstateFromFav(item.realEstate? item.realEstate._id: item._id, props.user.token)
    }

    useEffect(()=> {
        if (!props.user ||!props.user.token)
            setShowAlert(true)
            setAlertMessage('يجب تسجيل الدخول لاضافة عقارك')
        return
    },[])

    const handleBackPress = () => {

        return props.navigation.dispatch(StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: 'bottomTab' })],
        }))

    }

    const handleLogin = () => {
        // this.setState({ showAlert: false })
        setShowAlert(false)
        props.navigation.navigate('LoginPage')
    }

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
             <View style={{flex: 1,}} >
                
                <Header noBackButton={true} headerTitle={'المفضلة'} doAnimation={true} onBackPress={()=> props.navigation.goBack()} />

                <AlertModal closePress={handleBackPress} closeErrorModel={handleLogin} buttonText={'تسجيل الدخول'} contentMessage={alertMessage}  isVisible={showAlert} />

                {
                    (props.favorite || []).length <= 0 && (
                        <View style={{alignSelf: 'center', backgroundColor: 'transparnt', position: 'absolute', zIndex: 2, top: 250}} >
                            <Text style={[Fonts.style.normal]} >
                                لا يوجد لديك عقارات في المفضلة
                            </Text>
                        </View>
                    )
                }

                {(props.favorite || []).length > 0 && <RealEstateList onItemPress={(item)=> props.navigation.navigate('RealEstateDetail', {realEstate: item.realEstate ? item.realEstate: item})} onFavPress={(item)=>favProccess(item)}  realestateData={props.favorite} listType={'favorate'} containerStyle={{paddingTop: 10, backgroundColor: 'red'}} />}

            </View>
        </TouchableWithoutFeedback>
    )
}


const mapDispatchToProps = dispatch => ({
    deleteRealEstateFromFav: (realEstate, token)=> dispatch(FavoriteAction.removeFromFavourte(realEstate, token))
 });
 
 const mapStateToProps = state => {
     console.log('DetailOfRealEstateState', state)
   return {
     user: state.user.user && state.user.user.user && state.user.user.user,
     favorite: state.Favourte && state.Favourte.realEstates
    //  checker: state.Favourte.checker && state.Favourte.checker
   };
 };
 
 export default connect(
   mapStateToProps,
   mapDispatchToProps
 )(FavoratePage);
import React, {useEffect, useState} from 'react'
import {View, Animated, Text, Keyboard, TouchableWithoutFeedback, TouchableOpacity, ScrollView} from 'react-native'
import { StackActions, NavigationActions } from 'react-navigation';


import Header from '../../../Component/Header'
import MainTypes from '../../../Component/MainFilterTypes'
import {Fonts, Colors, Metrics, Images} from '../../../Themes'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
// import RealestateType from '../../../Component/realestateType'
// import CountWithTitle from '../../../Component/CountWithTitle'
// import RangeItem from '../../../Component/rangeItem'
import MapModal from '../../../Component/MapModal'
import InputButton from '../../../Component/InputButton'
import RealEstateTypesList from '../../../Component/RealestateTypeList'
import RadioButton from '../../../Component/RadioButtonList'
import Input from '../../../Component/Input'


import * as Progress from 'react-native-progress';
// import { ifIphoneX } from 'react-native-iphone-x-helper';


import {connect} from 'react-redux'
import RealEstateAction from '../../../Redux/RealEstateRedux'
import { ActivityIndicator } from 'react-native-paper';

class firstStepAddAqar extends React.Component {

    state={
        selectedType: {},
        progressNumber: 0,
        price: '',
        loading: false,
        mapModalVisabl: false
    }


    statusPress (i) {
        this.setState({selectedStatus: i})
    }

    // componentDidUpdate(){
    //     this.props.pageInfo(this.state)
    // }
    // shouldComponentUpdate = (n,l) =>  console.log('n', n, 'l', l)
    shouldComponentUpdate = () => true
    componentWillReceiveProps (nextProps) {
        if( nextProps.realEstate !== this.props.realEstate ){
            // console.log('realEstate', nextProps.realEstate)
            // alert('hello')
            this.setState({loading: false})
            this.props.nextLevel(nextProps.realEstate)
        }
    }


    onNextPress = () => {
        const { selectedType, price, selectedLocation, selectedStatus, selectedPurpose } = this.state
        if( selectedType && price && selectedLocation && selectedStatus && selectedPurpose ){
            this.setState({loading: true})
            // console.log('hello', selectedType, price, selectedLocation, selectedStatus, selectedPurpose, this.props.user.token)
            this.props.addRealEstate(selectedStatus._id, selectedType._id, selectedPurpose._id, price, this.state.selectedLocation.latitude, this.state.selectedLocation.longitude, this.props.user.token)
        }else{
            alert('الرجاء اكمال البيانات ')
        }
        // this.setState({loading: true})
        // this.props.nextLevel()
    }

    render () {
        return (
            <View style={{flex: 1,}} >
                <KeyboardAwareScrollView style={{marginBottom: 140}} >
                    <TouchableWithoutFeedback  >
                        <View>
                            <MainTypes status={this.props.status} doAnimation={true} statusPress={ (i) => this.statusPress(i)}  selectedType={this.state.selectedStatus}  />
                
                            <Text style={[Fonts.style.mainTitle, {marginTop: 40, alignSelf: 'flex-end', marginEnd: 16 }]}> أختر نوع العقار </Text>
                
                            <RealEstateTypesList selectedType={(i)=> this.setState({ selectedType: i}) } containerStyle={{marginEnd: 20}} types={this.props.type} />
                
                            <Text style={[Fonts.style.mainTitle, {marginTop: 40, alignSelf: 'flex-end', marginEnd: 16 }]}> الغرض من العقار </Text>
                
                            <RadioButton selectedPourpose={(i)=> this.setState({ selectedPurpose: i})} purpose={this.props.purpose} doAnimation={true} />
                
                            <Input withButton={true} number={true} onChangeText={val => this.setState({ price: val })} value={this.state.price} containerStyle={{marginTop: 35}} withDesc desc={'ريال سعودي'} InputPlaceHolder={'سعر المتر '} doAnimation={true} />

                            
                            <InputButton onPress={()=> this.setState({mapModalVisabl: true})} InputPlaceHolder={ this.state.selectedLocation && this.state.selectedLocation.latitude + ',' + this.state.selectedLocation.longitude || 'حدد موقع العقار'} Icon={Images.userLocationIcon} containerStyle={{marginTop: 18}}  />

                        </View>
                    </TouchableWithoutFeedback>
                </KeyboardAwareScrollView>
                
                {this.state.mapModalVisabl && 
                <MapModal 
                    selectedLocation={(x) => this.setState({mapModalVisabl: false, selectedLocation: x})}
                />}

                <TouchableOpacity style={{ position: 'absolute', bottom: 125, left: 50, zIndex: 999}} onPress={this.onNextPress} >
                    {   this.state.loading ? 
                        <ActivityIndicator color={Colors.darkSeafoamGreen} />
                        :<View style={{flexDirection: 'row'}} >
                            <Text style={[Fonts.style.normal ]} > {'<'} </Text>
                            <Text style={[Fonts.style.normal ]} >{ this.state.mapModalVisabl || 'التالي'}</Text>
                        </View>
                    }
                </TouchableOpacity>
            </View>
        )
    }
}



const mapDispatchToProps = dispatch => ({
    addRealEstate: (selectedStatus, selectedType, selectedPurpose, price, lat, long, token)=> dispatch(RealEstateAction.addRealEstate(selectedStatus, selectedType, selectedPurpose, price, lat, long, token)),
  });
  
  const mapStateToProps = state => {
      console.log('state', state)
    return {
        // info: state.realEstate.AddingAqarInfo
        user: state.user.user && state.user.user.user && state.user.user.user ,
        realEstate: state.realEstate.addAqarSuccess && state.realEstate.addAqarSuccess.realEstate
    };
  };
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(firstStepAddAqar);
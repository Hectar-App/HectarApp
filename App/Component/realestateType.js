import React, {useState} from 'react'
import { View, Text, TextInput, StyleSheet, Animated, TouchableOpacity, FlatList, Image } from 'react-native';
import { useAnimation } from '../assets/Animation/animation'
import {Fonts, Metrics, Colors, Images} from '../Themes'
import BackButton from './BackButton'
import { ifIphoneX } from 'react-native-iphone-x-helper'
import FavIcon from '../assets/imgs/svgImagesComponents/favorateIcon'

const realestateTypeItem = (props) => {
    // const animtion = useAnimation({ doAnimation: props.doAnimation, duration:900, test: 1000})
    // const scaleAnimation = animtion.interpolate({inputRange: [props.index * 25 - 25 ,  props.index * 25 + 25], outputRange: [ 0, 1], extrapolate: 'clamp'})
    let t = ''
    if ( props.forEditeng ){
        switch (props.item) {
            case '0':
                t = 'الجنوبية'
                break;
            case '1':
                t = 'الشرقية'
                break;
            case '2':
                t = 'الغربية'
                break;
            case '3':
                t = 'الشمالية'
                break;
            default:
                break;
        }
    }
    // props.doAnimation? scaleAnimation:
    return (
    <TouchableOpacity style={{ transform: [{scale:  1}] , borderWidth:1, borderRadius: 20, marginTop: 16, marginRight: 6, borderColor: props.selected? Colors.darkSeafoamGreen:  Colors.cloudyBlue, backgroundColor: props.selected? Colors.darkSeafoamGreen:'#fff'}} onPress={props.onPress} >
        <Text style={[Fonts.style.normal,{fontSize: 12, alignSelf:'center', paddingVertical: 8, paddingHorizontal: 24, borderRadius: 20, color: props.selected? '#fff': '#6a7685' }]} >{ props.item && props.item.realEstateFeaturesName? props.item.realEstateFeaturesName: props.item.nameAr? props.item.nameAr: props.item.nameAr? props.item.nameAr: props.forEditeng? t: 'قطعة أرض'}</Text>
    </TouchableOpacity>
)}

const styles = StyleSheet.create({
    container:{
        // backgroundColor: Colors.brownGrey,
        // position:'absolute',
        shadowColor: "rgba(0, 0, 0, 0.08)",
        shadowOffset: {
          width: 0,
          height: 7
        },
        shadowRadius: 15,
        shadowOpacity: 1,
        alignItems: 'center',
        borderWidth: 1,
        elevation: 2,
    },
})

export default (realestateTypeItem)


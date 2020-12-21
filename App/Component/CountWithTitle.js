import React, {useState} from 'react'
import { View, Text, TextInput, StyleSheet, Animated, TouchableOpacity, FlatList, Image, TouchableHighlight } from 'react-native';
import { useAnimation } from '../assets/Animation/animation'
import {Fonts, Metrics, Colors, Images} from '../Themes'
import BackButton from './BackButton'
import { ifIphoneX } from 'react-native-iphone-x-helper'
import FavIcon from '../assets/imgs/svgImagesComponents/favorateIcon'

const realestateTypeItem = (props) => {
    const animtion = useAnimation({ doAnimation: props.doAnimation, duration:750, test: 500})
    const scaleAnimation = animtion.interpolate({inputRange: [0,1], outputRange: [(.1 * props.index) /1, 1]})
    return (
    <View 
        style={[styles.container, props.containerStyle]} 
    >
        <View
            style={{
                height: '100%',
                flexDirection: 'row',
                alignItems: 'center',
                marginStart: 29
            }}
        >
            <TouchableHighlight
                underlayColor={'rgb(230,230,230)'}
                onPress={props.onDecreasePress}
                style={{width: 20, height: 20 , borderRadius: 10, backgroundColor: Colors.darkSeafoamGreen, justifyContent: 'center', alignItems: 'center'}}
            >
                <Text style={[Fonts.style.normal, {fontSize: 16, color: '#fff', }]} >-</Text>
            </TouchableHighlight>
            
            <Text style={[Fonts.style.normal, styles.textStyle, {marginHorizontal: 20}]} >{props.number}</Text>

            <TouchableHighlight
                underlayColor={'rgb(230,230,230)'}
                onPress={props.onIncreasePress}
                style={{width: 20, height: 20 , borderRadius: 10, backgroundColor: Colors.darkSeafoamGreen, justifyContent: 'center', alignItems: 'center',}}
            >
                <Text style={[Fonts.style.normal, {fontSize: 16, color: '#fff', }]} >+</Text>
            </TouchableHighlight>

        </View>
        <Text style={[Fonts.style.normal, styles.textStyle, {marginEnd: 23}]} >{props.title}</Text>
    </View>
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
        flexDirection: 'row',
        justifyContent: 'space-between',
        elevation: 2
    },
    textStyle: {
        fontSize: 16, 
        alignSelf:'center', 
        paddingVertical: 8, 
        // paddingHorizontal: 24, 
        color: Colors.darkSlateBlue,
        fontWeight: 'normal'
    }
})

export default (realestateTypeItem)


import React, {useState} from 'react'
import { View, Text, Platform, TextInput, StyleSheet, Animated, TouchableOpacity, FlatList, Image } from 'react-native';
import { useAnimation } from '../assets/Animation/animation'
import {Fonts, Metrics, Colors, Images} from '../Themes'
import BackButton from './BackButton'
import { ifIphoneX } from 'react-native-iphone-x-helper'
import FavIcon from '../assets/imgs/svgImagesComponents/favorateIcon'

const itemCard = (props) => {
    const animtion = useAnimation({ doAnimation: props.doAnimation, duration:550})
    const marginEndAnim = animtion.interpolate({inputRange: [0, 1], outputRange: [ Metrics.screenWidth, 0]})
    console.log('hello', props)
    return (
    <View style={[styles.container, props.containerStyle]}>
        {/* <View
            style={[styles.typeItem, { backgroundColor: props.selectedType === 'rent' ? 'rgb(61,186,126)':'rgb(230,230,230)', marginEnd: 0, justifyContent:'center'}]}
        >
            <TouchableOpacity
                onPress={props.rentPress}
                style={{ width: '100%', height: '100%', alignItems:'center', justifyContent:'center'}}
            >
                    <Text style={[Fonts.style.normal,{color: props.selectedType !== 'rent' ? 'rgb(141,141,141)': '#Fff', fontSize: 12, fontWeight: Platform.OS === 'android'?'400': "bold", alignSelf:'center'}]} >{'للايجار'}</Text>
            </TouchableOpacity>
        </View> */}

        {
            (props.status || []).map(i => 
                {   
                    return (
                        <View
                            style={[styles.typeItem, { backgroundColor: props.selectedType && props.selectedType._id === i._id ? 'rgb(61,186,126)':'rgb(230,230,230)', marginEnd: 0, justifyContent:'center'}, props.boxStyle]}
                        >
                            <TouchableOpacity
                                onPress={()=> props.statusPress(i)}
                                // onPress={()=> console.log('i', i)}
                                style={[{ width: '100%', height: '100%', alignItems:'center', justifyContent:'center'}]}
                            >
                                    <Text style={[Fonts.style.normal,{color: props.selectedType && props.selectedType._id === i._id ? '#Fff': 'rgb(141,141,141)', fontSize: 12, fontWeight: Platform.OS === 'android'?'400': "bold", alignSelf:'center'}]} >{i.nameAr}</Text>
                            </TouchableOpacity>
                        </View>
                )}
            )
        }

        {/* <View
            style={[styles.typeItem, {marginStart: 2,  backgroundColor: props.selectedType === 'sell' ? 'rgb(61,186,126)':'rgb(230,230,230)', justifyContent:'center'}]}
        >
            <TouchableOpacity
                onPress={props.sellPress}
                style={{ width: '100%', height: '100%', alignItems:'center', justifyContent:'center'}}
            >
                    <Text style={[Fonts.style.normal,{color: props.selectedType !== 'sell' ? 'rgb(141,141,141)': '#Fff', fontSize: 12, alignSelf:'center',fontWeight: Platform.OS === 'android'?'400': "bold",}]} >{'للبيع'}</Text>
            </TouchableOpacity>
        </View> */}
    </View>
)}

const styles = StyleSheet.create({
    container:{
        width: Metrics.screenWidth,
        height: 40,
        marginTop: 40,
        // backgroundColor: Colors.brownGrey,
        zIndex: 99999,
        shadowColor: "rgba(0, 0, 0, 0.08)",
        shadowOffset: {
          width: 0,
          height: 7
        },
        shadowRadius: 15,
        shadowOpacity: 1,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        elevation: 2,
        paddingHorizontal: 28
    },
    typeItem: {
        // width: Metrics.screenWidth * 0.45,
        height: 35,
       borderRadius: 5,
       marginStart: 7,
       flex: 1
    }
})

export default (itemCard)


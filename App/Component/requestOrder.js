import React, {useState} from 'react'
import { View, Text, TextInput, StyleSheet, Animated, TouchableOpacity, FlatList, Image } from 'react-native';
import { useAnimation } from '../assets/Animation/animation'
import {Fonts, Metrics, Colors, Images, CustomIcon} from '../Themes'
import BackButton from './BackButton'
import { ifIphoneX } from 'react-native-iphone-x-helper'
import FavIcon from '../assets/imgs/svgImagesComponents/favorateIcon'
import { ActivityIndicator } from 'react-native-paper';

import {BallIndicator} from 'react-native-indicators'

const requestOrder = (props) => {
    const animtion = useAnimation({ doAnimation: props.doAnimation, duration:900, test: 500})
    return (
    <View style={[styles.container, props.containerStyle]} onPress={props.onPress} >
        {/* <Text style={[Fonts.style.normal,{fontSize: 13, fontWeight: 'normal', paddingHorizontal: 4 , color: Colors.black, alignSelf:'center', flex: 2, flexWrap: 'wrap' }]} >
            {props.price|| 'مجانا'}/
            <Text
                style={{
                    fontSize: 10,
                    fontWeight: 'normal'
                }}
            >
                {props.measurement|| 'لفترة محدودة'}
            </Text>


        </Text> */}

        {/* <View></View> */}
        <TouchableOpacity onPress={props.infoPress} >
            <CustomIcon name={'info-o'} size={24} style={{marginEnd: 5}} />
        </TouchableOpacity>

        <TouchableOpacity disabled={props.reqested} onPress={props.onPress} style={[{ paddingHorizontal: 10, paddingVertical: 7, borderRadius: 5 , backgroundColor:  props.reqested ? Colors.white:  Colors.darkSeafoamGreen},  props.reqested? {borderWidth: 1, borderColor: Colors.darkSeafoamGreen}:{}]} >
            {props.loading ? <BallIndicator color={'#fff'} size={14} />: <Text style={[Fonts.style.normal,{fontSize: 13, color: props.reqested ? Colors.black: Colors.white, alignSelf:'center', fontWeight: 'normal' }]} > { props.reqested? 'تم الطلب':' اطلب الأن'}</Text>}
        </TouchableOpacity>
        <View style={{
             flex: 4,
             alignItems: 'flex-end',
             justifyContent: 'center', 
        }} >
            <Text style={[Fonts.style.normal,{fontSize: 13, fontWeight: 'normal', color: Colors.black, textAlign:'right', paddingVertical: 8, borderRadius: 20 }]} >{props.orderName}</Text>

            <Text 
            // style={[Fonts.style.normal,{fontSize: 13, fontWeight: 'normal', paddingHorizontal: 4, textAlign:'right', borderWidth: 1 , color: Colors.black, alignSelf:'center', flexWrap: 'wrap' }]} 
            style={[Fonts.style.normal,{fontSize: 13, fontWeight: 'normal', color: Colors.black, textAlign:'right', borderRadius: 20 }]}
            >
                {props.price|| 'مجانا'}/
                <Text
                    style={{
                        fontSize: 10,
                        fontWeight: 'normal'
                    }}
                >
                    {props.measurement|| 'لفترة محدودة'}
                </Text>


            </Text>

        </View>
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
        justifyContent:'space-between',
        elevation: 2,
        paddingHorizontal: 7
    },
})

export default (requestOrder)


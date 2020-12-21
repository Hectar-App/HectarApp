import React, {useState} from 'react'
import { View, Text, Platform, TextInput, StyleSheet, Animated, TouchableOpacity, FlatList, Image } from 'react-native';
import { useAnimation } from '../assets/Animation/animation'
import {Fonts, Metrics, Colors, Images} from '../Themes'
import BackButton from './BackButton'
import { ifIphoneX } from 'react-native-iphone-x-helper'
import FavIcon from '../assets/imgs/svgImagesComponents/favorateIcon'
import RangeSlider from 'rn-range-slider';

const rangeItem = (props) => {
    const animtion = useAnimation({ doAnimation: props.doAnimation, duration:750, test: 500})

    return (
        <View style={[styles.container]} >

            <RangeSlider
                style={{width: Metrics.screenWidth * 0.82933333, height: 80, alignSelf:'center'}}
                gravity={'center'}
                min={props.min || 100}
                max={props.max || 1800}
                step={props.steps || 20}
                initialLowValue={props.initialLowValue}
                initialHighValue={props.initialHighValue}
                selectionColor={Colors.darkSlateBlue}
                blankColor="#e5e5e5"
                thumbBorderColor={Colors.darkSeafoamGreen}
                labelBackgroundColor={Colors.darkSlateBlue}
                labelBorderColor={Colors.darkSlateBlue}
                onValueChanged={props.onValueChanged}
            />
            <View
                style={{
                    width: Metrics.screenWidth * 0.82933333,
                    flexDirection: 'row',
                    justifyContent:'space-between'
                }}
            >
                <Text style={[Fonts.style.normal, styles.numberText]} >{props.min || 100} {props.cuuruncy ? '$': props.space? ' متر مربع':''} </Text>
                <Text style={[Fonts.style.normal, styles.numberText]} >{props.max || 1800} {props.cuuruncy ? '$': props.space? ' متر مربع':''} </Text>
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
        elevation: 2,
    },
    numberText: {

        fontSize: 13,
        fontWeight: Platform.OS === 'android'?'400': "bold",
        fontStyle: "normal",
        lineHeight: 17,
        letterSpacing: 0,
        textAlign: "right",
        color: "#66798b"
    }
})

export default (rangeItem)


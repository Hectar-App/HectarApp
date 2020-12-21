import React from 'react'
import { View, Text, Platform, TextInput, StyleSheet, Animated, TouchableOpacity } from 'react-native';
import { useAnimation } from '../assets/Animation/animation'
import {Fonts, Metrics, Colors} from '../Themes'

const TitleDesc = (props) => {
    return (
    <View style={[styles.container, props.containerStyle]}>
       <Text style={[Fonts.style.normal, {fontWeight: Platform.OS === 'android'?'400': "bold", color: '#000000'}]} >{props.title}</Text>
       {!props.noDesc && <Text style={[Fonts.style.normal, styles.textDesc ]} >{props.desc}</Text>}
    </View>
)}

const styles = StyleSheet.create({
    container:{
        width: Metrics.screenWidth * 0.84,
        alignSelf:'center',
        justifyContent:'center',
        // height: 50,
        borderRadius: 8,
        borderStyle: "solid",
        alignItems:'flex-end'
    },
    row:{
        flexDirection:'row',
    },
    inputStyle: {
        width: '100%',
        fontSize: 14,
        fontWeight: "normal",
        fontStyle: "normal",
        lineHeight: 16,
        letterSpacing: 0,
        textAlign: "right",
        color: Colors.black,
        paddingEnd:17
    },
    passShowView:{ 
        height:20, 
        position:'absolute', 
        left:20, 
        alignSelf:'center',
        zIndex:99
    },
    textTitle:{
        color: Colors.black,
        // width: 100,
        // height: 29,
        fontFamily: "TheMixArabic",
        fontSize: 18,
        // fontWeight: Platform.OS === 'android'?'400': "bold",
        // fontStyle: "normal",
        lineHeight: 29,
        letterSpacing: 0,
        textAlign: "right",
    },
    textDesc:{
        width: 279,
        height: 52,
        fontSize: 13,
        fontWeight: "normal",
        fontStyle: "normal",
        lineHeight: 22,
        letterSpacing: 0,
        textAlign: "right",
        color: "#424a4e",
        paddingTop: 7
    }
})

export default (TitleDesc)


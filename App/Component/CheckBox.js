import React from 'react'
import { View, Text, TextInput, StyleSheet, Animated, TouchableOpacity } from 'react-native';
import { useAnimation } from '../assets/Animation/animation'
import {Fonts, Metrics, Colors} from '../Themes'

const Checkbox = (props) => {
    // let doAnimation = false
    const animtion = useAnimation({ doAnimation: props.doAnimation, duration:880})
    const color = animtion.interpolate({ inputRange:[0,1], outputRange:["#cbccd0",Colors.darkSeafoamGreen]})
    const backgroundColor = animtion.interpolate({ inputRange:[0,1], outputRange:["#fff",Colors.darkSeafoamGreen]})
    const textSize = animtion.interpolate({inputRange: [0, 1],outputRange: [35, 15]})
    return (
    <TouchableOpacity onPress={props.onPress} style={[styles.container, props.containerStyle]}>
        <View style={[styles.row, {marginEnd:12}]}>
            <TouchableOpacity style={[Fonts.style.normal, styles.textTitle, {color:Colors.darkSeafoamGreen} ]} onPress={props.onPrivacyPress} > 
                <Text style={[Fonts.style.normal, styles.textTitle, {color:Colors.darkSeafoamGreen} ]} >{' سياسة الخصوصية'}</Text> 
            </TouchableOpacity>
            <Text style={[Fonts.style.normal, styles.textTitle ]} >{props.title || ' و'}</Text>
           <TouchableOpacity style={[Fonts.style.normal, styles.textTitle, {color:Colors.darkSeafoamGreen} ]} onPress={props.onPrivacyPress} >
                <Text style={[Fonts.style.normal, styles.textTitle, {color:Colors.darkSeafoamGreen} ]} >{' الشروط والأحكام'}</Text> 
            </TouchableOpacity>
            <Text style={[Fonts.style.normal, styles.textTitle ]} >{props.title || 'أوافق على'}</Text>
        </View>
        <Animated.View style={[styles.checkBox, { borderColor: props.doAnimation? color: '#cbccd0', justifyContent:'center', alignItems:'center',  backgroundColor: props.doAnimation? backgroundColor: Colors.white, }]} >
            <Animated.Text style={{fontSize: props.doAnimation? textSize: 15, color: Colors.white, }} >✓</Animated.Text>
        </Animated.View>
    </TouchableOpacity>
)}

const styles = StyleSheet.create({
    container:{
        width: Metrics.screenWidth * 0.84,
        alignSelf:'center',
        justifyContent:'flex-end',
        height: 50,
        borderRadius: 8,
        borderStyle: "solid",
        alignItems:'center',
        // borderWidth:1,
        flexDirection:'row'
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
        fontSize: 12,
        // fontWeight: "bold",
        fontStyle: "normal",
        lineHeight: 16,
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
    },
    checkBox:{
        width: 19,
        height: 19,
        borderRadius: 2,
        backgroundColor: Colors.white,
        borderStyle: "solid",
        borderWidth: 1,

    }
})

export default (Checkbox)


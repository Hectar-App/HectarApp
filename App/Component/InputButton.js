import React from 'react'
import { View, Image, Text, TextInput, StyleSheet, Animated, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { useAnimation } from '../assets/Animation/animation'
import {Fonts, Metrics, Colors, Images} from '../Themes'

function formatPhoneNumber(phoneNumberString) {
    var cleaned = ('' + phoneNumberString).replace(/\D/g, '')
    var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/)
    if (match) {
      return '(' + match[1] + ') ' + match[2] + '-' + match[3]
    }
    return null
  }

const InputButton = (props) => {

    console.log(formatPhoneNumber('566586882'))

    return (
        props.text ? 
    <View style={[styles.container, props.containerStyle]} onPress={props.onPress} >
        <View style={styles.row}>
                <Text style={[Fonts.style.normal, styles.inputStyle,{color: Colors.brownGrey, paddingEnd: props.Icon? 35: 17} ]}>{formatPhoneNumber("0"+props.InputPlaceHolder+"")}</Text> 
                {props.Icon && <Image source={props.Icon} style={[styles.iconStyle]} />}
        </View>
    </View>
    :    
    <TouchableOpacity style={[styles.container, props.containerStyle]} onPress={props.onPress} >
        <View style={styles.row}>
                <Text style={[Fonts.style.normal, styles.inputStyle,{color: Colors.black, paddingEnd: props.Icon? 35: 17} ]}>{props.InputPlaceHolder}</Text> 
                {props.Icon && <Image source={props.Icon} style={[styles.iconStyle]} />}
        </View>
    </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container:{
        width: Metrics.screenWidth * 0.84,
        alignSelf:'center',
        justifyContent:'center',
        height: 50,
        borderRadius: 8,
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: Colors.cloudyBlue

    },
    row:{
        flexDirection:'row',
    },
    inputStyle: {
        width: '100%',
        fontSize: 12,
        fontWeight: "normal",
        fontStyle: "normal",
        lineHeight: 16,
        letterSpacing: 0,
        textAlign: "right",
        color: Colors.black,
        paddingEnd:35
    },
    passShowView:{ 
        height:20, 
        position:'absolute', 
        left:20, 
        alignSelf:'center',
        zIndex:99
    },
    text:{
        fontSize:12,
        color:'rgb(141,141,141)'
    },
    textPhone:{
        // width: 32,
        height: 18,
        fontSize: 12,
        fontWeight: "normal",
        fontStyle: "normal",
        lineHeight: 18,
        letterSpacing: 0,
        textAlign: "center",
        color: Colors.darkSlateBlue
    },
    iconStyle: {
        position: 'absolute', 
        right: 20, 
        alignSelf:'center'
    }
})

export default (InputButton)


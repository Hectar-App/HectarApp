import React from 'react'
import { View, Text, TextInput, StyleSheet, Animated, TouchableOpacity, Image } from 'react-native';
import { useAnimation } from '../assets/Animation/animation'
import {Fonts, Metrics, Colors, Images, CustomIcon} from '../Themes'
import icon from 'react-native-vector-icons/FontAwesome5'
const Button = (props) => {
    const animtion = useAnimation({ doAnimation: props.doAnimation, duration:550})
    return (
    <Animated.View style={[styles.container, props.containerStyle, {width: props.doAnimation? animtion.interpolate({inputRange:[0,1], outputRange:[0,Metrics.screenWidth - 34]}): Metrics.screenWidth - 34 }]}>
        <TouchableOpacity style={styles.row} onPress={props.onPress} >
               {/* <Image source={Images.userProfileIcon} style={{width: 15.9, height: 21, marginStart: 7}} /> */}

                <CustomIcon name={ props.iconName || 'home-1'} style={{marginEnd: 2, marginStart: 6}} color={Colors.darkSeafoamGreen} size={18} />
               <Text style={[Fonts.style.normal, styles.inputStyle]} > {props.buttonText}</Text>
        </TouchableOpacity>
    </Animated.View>
)}

const styles = StyleSheet.create({
    container:{

        height: 50,
        borderRadius: 12,
        alignItems:'flex-end',
        justifyContent:'center',
        alignSelf:'flex-end',
        // borderBottomWidth:1,
        borderStyle: "solid",
        borderColor: "rgba(107, 124, 147, 0.1)",
        marginEnd:17,
        // paddingTop:10
    },
    row:{
        flexDirection:'row-reverse',
        // justifyContent:'space-between',
        alignItems:'center',
        // alignSelf:'center',
        width:'100%',
        height: '100%'
    },
    inputStyle: {
        // width: 140,
        height: 20,
        fontSize: 15,
        fontWeight: "normal",
        fontStyle: "normal",
        lineHeight: 20,
        letterSpacing: 0,
        textAlign: "left",
        color: Colors.black,
    }
})

export default (Button)


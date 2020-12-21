import React from 'react'
import { View, Text, Platform, TextInput, StyleSheet, Animated, TouchableOpacity, } from 'react-native';
import { useAnimation } from '../assets/Animation/animation'
import {Fonts, Metrics, Colors} from '../Themes'
import { ActivityIndicator } from 'react-native-paper';

const LinkButton = (props) => {
    const animtion = useAnimation({ doAnimation: props.doAnimation, duration:550})
    return (
    <Animated.View style={[styles.container, props.containerStyle]}>
        <View style={styles.row}>
            <TouchableOpacity disabled={props.loading} onPress={props.onPress} >
                { props.loading ? 
                    <ActivityIndicator style={{paddingHorizontal: 8}} color={Colors.primaryGreen} />:
                    <Text style={[Fonts.style.normal, styles.inputStyle, props.textStyle]} >{props.buttonText}</Text>
                }
            </TouchableOpacity>
            
        </View>
    </Animated.View>
)}

const styles = StyleSheet.create({
    container:{
        // width: Metrics.screenWidth * 0.84,
        alignSelf:'center',
        justifyContent:'center',
        height: 50,
        borderRadius: 8,
        borderStyle: "solid",
        // borderWidth: 1,
        // borderColor: Colors.cloudyBlue

    },
    row:{
        flexDirection:'row',
    },
    inputStyle: {
        width: '100%',
        fontSize: 12,
        fontWeight: Platform.OS === 'android'?'400': "bold",
        fontStyle: "normal",
        lineHeight: 16,
        letterSpacing: 0,
        textAlign: "right",
        color: Colors.black,
        // paddingEnd:17
    }
})

export default (LinkButton)

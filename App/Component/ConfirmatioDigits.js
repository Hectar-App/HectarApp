import React, {useState, useRef} from 'react'
import { View, Text, TextInput, StyleSheet, Animated, TouchableOpacity } from 'react-native';
import { useAnimation } from '../assets/Animation/animation'
import {Fonts, Metrics, Colors} from '../Themes'

const ConfirmationDigits = (props) => {
    const animtion = useAnimation({ doAnimation: props.doAnimation, duration:550})
    const inputs = useRef([])
    const inputs1 = useRef(null)
    const inputs2 = useRef(null)
    const [n1, setN1]= useState()
    props.test4 = n1


    console.log('props', props.test4)
    return (
    <Animated.View style={[styles.container, props.containerStyle]}>
        <View style={[styles.row]}>
                <TextInput 
                    placeholder={props.InputPlaceHolder}
                    // value={n1}
                    style={[Fonts.style.normal, styles.inputStyle]}
                    placeholderTextColor={Colors.brownGrey}
                    keyboardType={props.number? 'numeric':'default'}
                    secureTextEntry={props.passShow}
                    maxLength={1}
                    // ref={inputs['four']}
                    onChangeText={(v)=> props.test4 = props.test4 + v}
                    // onChangeText={()=> inputs['three'].focus() }
                />
                <TextInput 
                    placeholder={props.InputPlaceHolder}
                    value={props.inputValue}
                    style={[Fonts.style.normal, styles.inputStyle]}
                    placeholderTextColor={Colors.brownGrey}
                    onChange={props.onChange}
                    keyboardType={props.number? 'numeric':'default'}
                    secureTextEntry={props.passShow}
                    maxLength={1}
                    // ref={inputs['three']}
                    onChangeText={(v)=> props.test4 = props.test4 + v}
                    // onChangeText={()=> inputs['three'].focus() }
                />
                <TextInput 
                    placeholder={props.InputPlaceHolder}
                    value={props.inputValue}
                    style={[Fonts.style.normal, styles.inputStyle]}
                    placeholderTextColor={Colors.brownGrey}
                    onChange={props.onChange}
                    keyboardType={props.number? 'numeric':'default'}
                    secureTextEntry={props.passShow}
                    maxLength={1}
                    // ref={inputs2}
                    onChangeText={(v)=> props.test4 = props.test4 + v}
                />
                <TextInput 
                    placeholder={props.InputPlaceHolder}
                    value={props.inputValue}
                    style={[Fonts.style.normal, styles.inputStyle]}
                    placeholderTextColor={Colors.brownGrey}
                    onChange={props.onChange}
                    keyboardType={props.number? 'numeric':'default'}
                    secureTextEntry={props.passShow}
                    maxLength={1}
                    // onChangeText={(val)=> {
                    //     setN1(val)
                    //     inputs2.focus()
                    // }}
                    onChangeText={(v)=> props.test4 = props.test4 + v}
                    // ref={inputs['one']}
                />
        </View>
    </Animated.View>
)}

const styles = StyleSheet.create({
    container:{
        width: Metrics.screenWidth * 0.84,
        alignSelf:'center',
        justifyContent:'space-between',
        height: 50,
        borderRadius: 8,
        borderStyle: "solid",
        // borderWidth: 1,
        borderColor: Colors.cloudyBlue,
        alignItems:'center',

    },
    row:{
        flexDirection:'row-reverse',
        justifyContent:'space-between',
        width: Metrics.screenWidth * 0.64,
    },
    inputStyle: {
        // width: '100%',
        // fontSize: 14,
        // fontWeight: "normal",
        // fontStyle: "normal",
        // lineHeight: 16,
        // letterSpacing: 0,
        textAlign: "center",
        // color: Colors.black,
        // paddingEnd:17,
        // borderWidth:1,
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: Colors.white,
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: "#89a3c2"
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
        fontSize: 14,
        fontWeight: "normal",
        fontStyle: "normal",
        lineHeight: 18,
        letterSpacing: 0,
        textAlign: "center",
        color: Colors.darkSlateBlue
    }
})

export default (ConfirmationDigits)


import React, {useState} from 'react'
import { View, Text, Platform, TextInput, StyleSheet, Animated, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import Modal from "react-native-modal";

import { useAnimation } from '../assets/Animation/animation'
import {Fonts, Metrics, Colors} from '../Themes'

import Input from './Input'
import Button from './Button'
import { IconButton } from 'react-native-paper';

const InputCo = (props) => {
    
    const animtion = useAnimation({ doAnimation: props.doAnimation, duration:550})
    const [password, setPassword] = useState('')
    const [cPassword, setCPassword] = useState('')
    const [prevPassword, setPrevPassword] = useState('')

    const handlePress = () => {
        console.log('list after editeng', password, cPassword)
        if( password !== cPassword || (password || '').length < 7  )
               return alert('كلمة المرور لا تتطابق مع تأكيد كلمة المرور')
        if( prevPassword.length < 7  )
               return alert('الرجاء ادخال كلمة المرور السابقة')
        
        props.getPassword(prevPassword, password)
    }

    return (
    <Animated.View style={[styles.container]}>
       <Modal 
            isVisible={props.isVisible}
            // avoidKeyboard
        >
          <View style={{justifyContent:'center', alignItems:'center', backgroundColor:'#fff', width: Metrics.screenWidth * 0.84, paddingTop: 36, paddingBottom: 40, borderRadius: 10}}>

            <IconButton onPress={props.onClosePress} size={20} icon={'close-circle-outline'} color={Colors.darkSlateBlue} style={{position: 'absolute', top: 0, right: 10}} />
       
            <TouchableOpacity >
                <View style={[{width: '100%', marginTop: 10, alignItems:'center', justifyContent:'center' }]} >
                    <Input value={prevPassword} onChangeText={(val)=> setPrevPassword(val)} InputPlaceHolder={'كلمة المرور السابقة'} styleAfterAnimation={{width: '90%', alignSelf: 'center'}} />
                </View>
            </TouchableOpacity>

            <TouchableOpacity >
                <View style={[{width: '100%', marginTop: 10, alignItems:'center', justifyContent:'center' }]} >
                    <Input value={password} onChangeText={(val)=> setPassword(val)} InputPlaceHolder={'كلمة المرور'} styleAfterAnimation={{width: '90%', alignSelf: 'center'}} />
                </View>
            </TouchableOpacity>

            <TouchableOpacity >
                <View style={[{width: '100%', marginTop: 10, alignItems:'center', justifyContent:'center' }]} >
                    <Input value={cPassword} onChangeText={(val)=> setCPassword(val)} InputPlaceHolder={'تأكيد كلمة المرور'} styleAfterAnimation={{width: '90%', alignSelf: 'center'}} />
                </View>
            </TouchableOpacity>
      
            

            <Button buttonText={'تأكيد'} halfButton={true} containerStyle={{width: Metrics.screenWidth * 0.64, marginTop: 20}} onPress={()=> handlePress()} />
          </View>
        </Modal>
    </Animated.View>
)}

const styles = StyleSheet.create({
    container:{
        width: Metrics.screenWidth,
        alignSelf:'center',
        justifyContent:'center',
        height: Metrics.screenHeight,
        borderRadius: 8,
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: Colors.cloudyBlue, 
        // backgroundColor:'red', 
        position:'absolute', 
        zIndex: 99

    },
    row:{
        flexDirection:'row',
    },
    inputStyle: {
        width: '100%',
        fontSize: 13,
        fontWeight: Platform.OS === 'android'?'400': "bold",
        fontStyle: "normal",
        // lineHeight: 16,
        letterSpacing: 0,
        textAlign: "right",
        color: Colors.black,
        paddingEnd:17,
        marginBottom: 20
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
        fontSize: 14,
        fontWeight: "normal",
        fontStyle: "normal",
        lineHeight: 18,
        letterSpacing: 0,
        textAlign: "right",
        color: "#424a4e"
      
    }
})

export default (InputCo)


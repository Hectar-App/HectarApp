import React, {useState} from 'react'
import { View, Text, Platform, TextInput, StyleSheet, Animated, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import Modal from "react-native-modal";

import { useAnimation } from '../assets/Animation/animation'
import {Fonts, Metrics, Colors} from '../Themes'
import {IconButton} from 'react-native-paper'
import RadioButtonList from './RadioButtonList'

const InputCo = (props) => {
    
    const animtion = useAnimation({ doAnimation: props.doAnimation, duration:550})
    const [selectedOption, setSelectedOption] = useState(1)

    return (
    <Animated.View style={[styles.container]}>
       <Modal 
            isVisible={props.isVisible}
            // avoidKeyboard
            onBackdropPress={() => props.onPress(props.selectedOption)}
        >
          <View style={{justifyContent:'center', alignItems:'center', backgroundColor:'#fff', width: Metrics.screenWidth * 0.84, paddingTop: 26, paddingBottom: 40, borderRadius: 10}}>
            <Text style={[Fonts.style.normal, styles.inputStyle]}>{ props.title || "إختر نوع الحساب"}</Text>

            <IconButton icon={'close'} onPress={() => props.onPress(props.selectedOption)} style={{position: 'absolute', top: 10, left: 10}} />

            {
                (props.data || []).map(item => {
                    return (
                        <TouchableOpacity onPress={()=> props.onPress(item)} key={item._id} >
                            <View style={[{width: '100%', marginTop: 10,alignItems:'center', justifyContent:'flex-end' }, styles.row]} >
                                <Text style={[Fonts.style.normal, styles.textPhone ]}> {item.userTypeName}</Text>
                                <View style={{
                                    width: 13,
                                    height: 13,
                                    backgroundColor: "#ffffff",
                                    borderStyle: "solid",
                                    borderWidth: 1,
                                    borderColor: props.selectedOption._id === item._id? Colors.darkSeafoamGreen: Colors.cloudyBlue,
                                    marginStart: 15,
                                    marginEnd: 12,
                                    borderRadius: 13/2,
                                    justifyContent: 'center'
                                }} >
                                        {
                                            props.selectedOption._id === item._id &&
                                            <Animated.View 
                                                style={{
                                                    width: 8, 
                                                    height: 8,
                                                    backgroundColor: Colors.darkSeafoamGreen,
                                                    borderRadius: 4,
                                                    alignSelf: 'center',
                                                    opacity: animtion.interpolate({inputRange: [0,1], outputRange: [0,1]})
                                                }}
                                            />
                                        }
                                </View>
                            </View>
                        </TouchableOpacity>
                    )
                })
            }
            
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


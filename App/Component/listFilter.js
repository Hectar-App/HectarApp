import React, {useState, useEffect} from 'react'
import { View, Text, Platform, Image, StyleSheet, Animated, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import Modal from "react-native-modal";
import {IconButton, ActivityIndicator} from 'react-native-paper'
import { useAnimation } from '../assets/Animation/animation'
import {Fonts, Metrics, Colors, Images} from '../Themes'
import StarRating from 'react-native-star-rating';
import Button from './Button'

import RequestOrder from './requestOrder';

import RadioButtonItem from './RadioButtonItem'

const ListFilter = (props) => {
    const animtion = useAnimation({ doAnimation: props.doAnimation, duration:550})

    const [radioButtonD, setRadioButtonD]= useState([
        {_id: 1, name: 'طلب خدمة التصوير الأحترافي', reqested: props.request1 },
        {_id: 2, name: 'طلب خدمة تصوير 360 درجة', reqested: props.request2 },
        {_id: 3, name: 'طلب خدمة QR كود', reqested: props.request3 }
    ])
    
    

    // console.log(radioButtonD)
    const [request360, setRequest360]= useState()

    const [selectedOption, setSelectedOption]= useState({_id: 0 })

    useEffect(()=> {
        console.log( 'props. of requests', props)
        setRadioButtonD([
            {_id: 1, name: 'طلب خدمة التصوير الأحترافي', reqested: props.request1 },
        {_id: 2, name: 'طلب خدمة تصوير 360 درجة', reqested: props.request2 },
        {_id: 3, name: 'طلب خدمة QR كود', reqested: props.request3 }
        ])
    }, [props.request1, props.request2, props.request3])

    return (
    <Animated.View style={[styles.container]}>
       <Modal 
            isVisible={props.isVisible}
            // isVisible={false}
            animationIn={"fadeInUp"}
            animationOut={'slideOutDown'}
            animationOutTiming={750}
            animationInTiming={750}
            swipeDirection={"down"}
            swipeThreshold={50}
            onSwipe={props.onSwipe}
            style={{ width: Metrics.screenWidth, height: Metrics.screenHeight}}
        >
            <View style={[styles.containerView]}>

                <IconButton icon={'close'} style={{position: 'absolute', top: 10, right: 10}} onPress={props.onSwipe} />

                <Text style={[
                    Fonts.style.normal, 
                    {
                        color: '#000', 
                        fontSize: 18, 
                        fontWeight: 'normal', 
                        position: 'absolute', 
                        top: 18,
                        alignSelf: 'center'
                    }]} 
                >
                    ترتيب {'القائمة'}
                </Text>

                <View
                    style={{
                        width: '100%',
                        paddingVertical: 12,
                        height: '100%'
                    }}
                >
                    <View
                        style={{
                            flex: 1, 
                            justifyContent: 'center', 
                            paddingEnd: 20, 
                            borderBottomWidth: .4, 
                            paddingBottom: 5, 
                            marginHorizontal: 12, 
                            borderBottomColor: Colors.brownGrey
                        }}
                    >  
                        <RadioButtonItem onPress={()=> props.selectMethod(1)} text={'السعر من الاعلى للاقل'} selected={props.selectMethodValue === 1} />
                    </View>

                    <View
                        style={{
                            flex: 1, 
                            marginTop: 10,
                            justifyContent: 'center', 
                            paddingEnd: 20, 
                            borderBottomWidth: .4, 
                            paddingBottom: 5, 
                            marginHorizontal: 12, 
                            borderBottomColor: Colors.brownGrey
                        }}
                    >
                        <RadioButtonItem onPress={()=> props.selectMethod(2)} text={'السعر من الاقل للاعلى'} selected={props.selectMethodValue === 2} />
                    </View>

                    {/* <View
                        style={{
                            flex: 1, 
                            marginTop: 10,
                            justifyContent: 'center', 
                            paddingEnd: 20, 
                            borderBottomWidth: .4, 
                            paddingBottom: 5, 
                            marginHorizontal: 12, 
                            borderBottomColor: Colors.brownGrey
                        }}
                    >
                        <RadioButtonItem onPress={()=> props.selectMethod(3)} text={'المساحة من الاعلى للاقل'} selected={props.selectMethodValue === 3} />
                    </View>

                    <View
                        style={{
                            flex: 1, 
                            marginTop: 10,
                            justifyContent: 'center', 
                            paddingEnd: 20, 
                            borderBottomWidth: .4, 
                            paddingBottom: 5, 
                            marginHorizontal: 12, 
                            borderBottomColor: Colors.brownGrey
                        }}
                    >
                        <RadioButtonItem onPress={()=> props.selectMethod(4)} text={'المساحة من الاقل للاعلى'} selected={props.selectMethodValue === 4} />
                    </View> */}

                    <View
                        style={{
                            flex: 1, 
                            marginTop: 10,
                            justifyContent: 'center', 
                            paddingEnd: 20, 
                            borderBottomWidth: .4, 
                            paddingBottom: 5, 
                            marginHorizontal: 12, 
                            borderBottomColor: Colors.brownGrey
                        }}
                    >
                        <RadioButtonItem onPress={()=> props.selectMethod(5)} text={'الاحدث'} selected={props.selectMethodValue === 5} />
                    </View>
                </View>

            </View>
        </Modal>
    </Animated.View>
)}

const styles = StyleSheet.create({
    container:{
        width: Metrics.screenWidth,
        // alignSelf:'center',
        // justifyContent:'center',
        // height: Metrics.screenHeight,
        borderRadius: 8,
        borderStyle: "solid",
        // borderWidth: 1,
        borderColor: Colors.cloudyBlue, 
        // backgroundColor:'red', 
        position:'absolute', 
        zIndex: 99,
    },
    row:{
        flexDirection:'row',
    },
    inputStyle: {
        // width: '100%',
        fontSize: 13,
        fontStyle: "normal",
        // lineHeight: 16,
        letterSpacing: 0,
        textAlign: "right",
        color: Colors.black,
        // paddingEnd: Metrics.screenWidth * .32,
        alignSelf: 'center',
        fontSize: 20,
        fontWeight: Platform.OS === 'android'?'400': "bold",
        fontStyle: "normal",
        lineHeight: 29,
        letterSpacing: 0,
        textAlign: "right",
        color: Colors.black,
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
        fontWeight: Platform.OS === 'android'?'400': "bold",
        fontStyle: "normal",
        lineHeight: 18,
        letterSpacing: 0,
        textAlign: "right",
        color: Colors.black
      
    },
    containerView: {
        // justifyContent:'center', 
        // alignItems:'center', 
        backgroundColor:'#fff', 
        width: Metrics.screenWidth , 
        paddingTop: 64, 
        paddingBottom: 40, 
        borderRadius: 20,
        height: 280,
        bottom:-20,
        position: 'absolute',
        right: 20,
        left: -20, 
    }
})

export default (ListFilter)


import React, {useState} from 'react'
import { View, Text, Platform, TextInput, StyleSheet, Animated, TouchableOpacity, FlatList, TouchableWithoutFeedback } from 'react-native';
import Modal from "react-native-modal";
import {IconButton} from 'react-native-paper'
import { useAnimation } from '../assets/Animation/animation'
import {Fonts, Metrics, Colors} from '../Themes'
import Button from './Button'
import Header from './Header'
import MapView, {Marker} from 'react-native-maps'
import * as THREE from 'three'
// import { Canvas, extend, useFrame, useThree, useLoader } from 'react-three-fiber'

import { WebView } from 'react-native-webview';

import {
    DotIndicator,
    BallIndicator
  } from 'react-native-indicators';

const PanoramView = (props) => {
    const animtion = useAnimation({ doAnimation: props.doAnimation, duration:550})

    const [radioButtonD, setRadioButtonD]= useState([
        {_id: 0, name: 'لم يتم التجاوب ' },
        {_id: 1, name: 'مواصفات العقار غير متطابقة' },
        {_id: 2, name: 'عدم الالتزام في المواعيد' },
        {_id: 3, name: 'سوء المعاملة' }
    ])


    const [loading, setLoading]= useState(true)
    const [selectedType, setSelectedType]= useState(1)
    console.log('propsNear', props)

    return(
        <Animated.View style={[styles.container]}>
            <Modal 
                isVisible={props.isVisible}

                // isVisible={true}
                animationIn={"fadeInUp"}
                animationInTiming={750}
                // swipeDirection={"down"}
                // swipeThreshold={50}
                // onSwipe={props.onSwipe}
                style={{ width: Metrics.screenWidth, height: Metrics.screenHeight}}
            >
                <View style={[styles.containerView, {paddingBottom: 0}]}>

                <Header headerTitle={'عرض ٣٦٠'} containerStyle={{marginTop: 0,}} onBackPress={()=> {setLoading(true);props.onBackPress()}} />

                {/* <View
                style={{
                    // marginTop: 13.5,
                    height: 50,
                    backgroundColor: "#f9f9f9",
                    justifyContent:'center',
                    alignItems: 'flex-end', 
                }}
                >
                <FlatList 
                    horizontal
                    data={(props.types || [{_id: 0, nameAr: 'الحوش'}, {_id: 1, nameAr: 'غرفة النوم'}, {_id: 2, nameAr: 'غرفة المعيشة'}, {_id: 3, nameAr: 'الصالة'}])}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({item, index})=>{
                        return(
                            <TouchableOpacity
                                key={index}
                                style={[styles.itemContainer,{backgroundColor: selectedType === item._id ? Colors.darkSeafoamGreen: "#ffffff"}]}
                                onPress={()=> setSelectedType(item._id)}
                            >
                                <Text style={[Fonts.style.normal, styles.itemText, { color: selectedType === item._id ? Colors.white: Colors.black}]} >{item.nameAr}</Text>
                            </TouchableOpacity>
                        )
                    }}
                />

                </View> */}
                
                { loading && 
                    <View 
                        style={{
                            position: 'absolute',
                            // width: 150, 
                            // height:50,
                            zIndex: 999,
                            alignSelf: 'center', 
                            top: '40%'
                        }}
                    >
                        <BallIndicator color={'green'} size={40}   />
                    </View>
                }
                <WebView
                    // source={{ uri: 'https://infinite.red' }}
                    // source={{html: require('./file.html')}}
                    // source={{html: '<h1>hellosdflkuhsd lkjsdhf</h1>', }}
                    // source={{uri: `http://p1-customer.zeem.sa/property/${props.id}/1`}}
                    source={{uri: 'http://p1-customer.zeem.sa/property/5e8a3790dd52b367fcc089e2/1'}}
                    // source={{uri: "http://dev.hectar.io/property/5eb081377cdcbb10d19d905f/1"}}
                    // source={{uri: "https://twitter.com/home"}}
                    style={{ width: '100%' }}
                    // renderLoading={}
                    onLoadEnd={()=>setLoading(false)}
                />
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
        width: '100%',
        fontSize: 13,
        fontStyle: "normal",
        // lineHeight: 16,
        letterSpacing: 0,
        textAlign: "right",
        color: Colors.black,
        paddingEnd:25,
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
        // paddingTop: 70, 
        paddingBottom: 40, 
        borderRadius: 20,
        height: Metrics.screenHeight,
        bottom:-20,
        position: 'absolute',
        right: 0,
        left: -20
    },
    inputStyle: {
        fontSize: 17,
        fontWeight: "normal",
        fontStyle: "normal",
        lineHeight: 22,
        letterSpacing: 0,
        textAlign: "center",
        color: Colors.black,
        // borderWidth:1,
        paddingBottom:14
    }, 
    searchContainer: {
        width: Metrics.screenWidth,
        flexDirection: 'row-reverse', 
        justifyContent:'center'
    },
    searchBox: {
        width: Metrics.screenWidth * 0.78666667,
        height: 40,
        borderRadius: 24,
        backgroundColor: "#ffffff",
        shadowColor: "rgba(0, 0, 0, 0.08)",
        shadowOffset: {
            width: 0,
            height: 7
        },
        shadowRadius: 20,
        shadowOpacity: 1,
        marginStart: 4,
        elevation: 2,
    },
    inputS: {
        width: '100%',
        height: '100%',
        paddingEnd: 40,
        textAlign: 'right',
        fontSize: 12
    },
    itemText: {
        fontSize: 12,
        fontWeight: "normal",
        fontStyle: "normal",
        lineHeight: 16,
        letterSpacing: 0,
        textAlign: "right",
        color: Colors.black
    },
    itemContainer:{
        paddingHorizontal: 15,
        height: 33,
        borderRadius: 100,
        shadowColor: "rgba(0, 0, 0, 0.08)",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowRadius: 20,
        shadowOpacity: 1,
        justifyContent:'center',
        alignSelf: 'center',
        marginEnd: 10,
        elevation: 2,
    },
    map: {
        ...StyleSheet.absoluteFillObject,
          marginTop: 130,
          zIndex: -1
      },
})

export default (PanoramView)


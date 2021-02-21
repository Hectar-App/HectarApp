import React, {useState} from 'react'
import { View, Text, Platform, TextInput, StyleSheet, Animated, TouchableOpacity, FlatList, Image } from 'react-native';
import { useAnimation } from '../assets/Animation/animation'
import {Fonts, Metrics, Colors, Images, CustomIcon} from '../Themes'
import BackButton from './BackButton'
import { ifIphoneX } from 'react-native-iphone-x-helper'
import FavIcon from '../assets/imgs/svgImagesComponents/favorateIcon'
import FastImage from 'react-native-fast-image'

const officeCard = (props) => {
    const animtion = useAnimation({ doAnimation: props.doAnimation, duration:550})

    const [selectedType, setSelectedType]= useState(1)
    const scaleAnimatio = animtion.interpolate({inputRange: [0, 1], outputRange: [ .3, 1]})

    const {
        geometry:{
            location: {
                lat,
                lng
            }
        },
        name
        // imagesSmall
    }= props.selectedOffice

    // console.log('props.selected', props.selectedRealEstate)
    function kFormatter(num) {
        return Math.abs(num) > 999 && Math.abs(num) < 999999 ? Math.sign(num)*((Math.abs(num)/1000).toFixed(1)) + ' الف' : Math.abs(num) > 999999  ? Math.sign(num)*((Math.abs(num)/1000000).toFixed(1)) + ' مليون' : Math.sign(num)*Math.abs(num)
    }
    
    return (
        <TouchableOpacity style={[styles.container]} onPress={props.onCardPress} >
            <Animated.View style={[ props.containerStyle,  {transform:[{scale: props.doAnimation?  scaleAnimatio: 1}]}]}>
            <View style={styles.conView} >
                    <View
                        style={{flex: 1, height: 81, alignSelf: 'center', justifyContent: 'center', alignItems: 'flex-end'}}
                    >
                        <Text style={[Fonts.style.normal, styles.textCard, {marginBottom: 9}]} >{name}</Text>
                        <View style={{flexDirection: 'row', alignItems:'center'}}>
                            <Text style={[Fonts.style.normal, {fontSize: 12, width: '90%', textAlign: 'right', marginEnd: 5, alignSelf:'center', color: '#464646',}]} >{name}</Text>
    
                        </View>
                        <Text style={[Fonts.style.normal, styles.textCard, {marginTop: 7}]} ></Text>
                    </View>
                    <View
                        style={{height: 81 , width: Metrics.screenWidth * 0.21066667, alignSelf: 'center', marginStart: 13, marginEnd: 16, borderRadius: 10  }}
                    >
                        {/* <Image source={(images && images[0])? {uri: images[0] }:Images.mapCardImage} style={{width: '100%', height: '100%'}}  /> */}
                       
                    </View>

                    <TouchableOpacity
                        style={{
                            width: 25,
                            height: 25,
                            borderRadius: 5,
                            backgroundColor: 'rgba(17,51,81,.03)',
                            position: 'absolute',
                            top: 15,
                            left: 19,
                            justifyContent:'center',
                            alignItems: 'center',
                            zIndex: 999,
                        }}
                        onPress={props.onFavPress}
                    >
                        {/* <Image source={Images.favorateIcon} /> */}
                        {/* <FavIcon doAnimation={props.fav} /> */}
                        <CustomIcon name={props.fav? "bookmark2": 'bookmark2-o'} size={18} color={Colors.darkSeafoamGreen} />

                        {/* <CustomIcon name={''} /> */}
                    </TouchableOpacity>


                </View>
            </Animated.View>
        </TouchableOpacity>
)}

const styles = StyleSheet.create({
    container:{
        width: Metrics.screenWidth,
        height: 164,
        // backgroundColor: Colors.brownGrey,
        position:'absolute',
        zIndex: 99999,
        bottom: ifIphoneX(125,90),
        shadowColor: "rgba(0, 0, 0, 0.08)",
        shadowOffset: {
          width: 0,
          height: 7
        },
        shadowRadius: 15,
        shadowOpacity: 1,
        paddingTop: ifIphoneX(60,40),
        alignItems: 'center',
        elevation: 2,
    },
    conView: {
        width: Metrics.screenWidth * 0.91466667,
        height: Metrics.screenWidth * 0.30666667,
        backgroundColor: "#ffffff",
        shadowColor: "rgba(0, 0, 0, 0.1)",
        shadowOffset: {
            width: 0,
            height: 7
        },
        borderRadius: 20,
        shadowOpacity: 1,
        flexDirection: 'row',
        elevation: 2,
    },
    textCard: {
        fontSize: 15, 
        alignSelf:'center', 
        color: Colors.darkSlateBlue, 
        fontWeight: Platform.OS === 'android'?'400': "bold",
        width: '100%', 
        textAlign: 'right' ,
        
    }
})

export default (officeCard)


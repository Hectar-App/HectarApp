import React, {useState} from 'react'
import { View, Text, Platform, TextInput, StyleSheet, Animated, TouchableOpacity, Image } from 'react-native';
import { useAnimation } from '../assets/Animation/animation'
import {Fonts, Metrics, Colors, Images} from '../Themes'
import {IconButton} from 'react-native-paper'
import * as Progress from 'react-native-progress';
import RealestateType from './realestateType'
import {
    BallIndicator
} from 'react-native-indicators'
const BluePrintList = (props) => {
    const animtion = useAnimation({ doAnimation: props.doAnimation, duration:550})
  
    const heightAnimation = animtion.interpolate({inputRange: [0,1], outputRange: [110,295]})

    const [ features, setFeatures ] = useState(
        [
            { _id: 1, nameAr: 'مخطط الدور الاول', desc: 'سكني', selected: false},
            { _id: 2, nameAr: 'مخطط الدور الثاني', desc: '1450 متر مربع', selected: false},
            { _id: 3, nameAr: 'مخطط الدور الثالث', desc: '1200 ريال', selected: false},
        ]
    )

    const [selectedMap, setSelectedMap]= useState(30)
    const [loading, setLoading]= useState(true)

    return (
    <Animated.View style={[styles.container, props.containerStyle,]}>
        <View style={{  justifyContent: 'flex-end', width: '100%'}} >
            {
                (props.bluePrint || []).map( (item, index) => {
                    console.log('item', item)
                    return(
                    <View
                    >
                        <TouchableOpacity
                            style={{
                                width: Metrics.screenWidth * 0.87733333,
                                marginVertical: 5,
                                flexDirection: 'row',
                                justifyContent:'space-between',
                                alignItems: 'center',
                                height: 50,
                                backgroundColor: selectedMap === index? Colors.darkSlateBlue: '#f2f2f2',
                                borderRadius: 10,
                                paddingHorizontal: 12
                            }}
                            onPress={() => selectedMap === index ? setSelectedMap(99): setSelectedMap(index)}
                        >
                            {/* <Text style={[Fonts.style.normal, styles.textStyle]} >{item.desc}</Text> */}
                            <View style={{flexDirection: 'row', alignItems: 'center'}} >
                                {/* <IconButton icon={'close'} size={8}  color={  selectedMap === index? '#fff': '#000'} /> */}
                                {props.canDelete && <TouchableOpacity onPress={()=> props.handleDeleteItem(index)} source={Images.imageDeleteCloseIcon} style={{width: 16, justifyContent:'center', alignItems:'center', height: 16, borderRadius: 8,  backgroundColor: Colors.redWhite,}} >
                                    <Image source={Images.imageDeleteCloseIcon} style={{width: 5.9, height: 5.9}} />
                                </TouchableOpacity>}
                                <IconButton icon={'triangle'} size={8}  color={  selectedMap === index? '#fff': '#000'} />
                            </View>
                            <Text style={[Fonts.style.normal, styles.textStyle, {width: '90%'} , selectedMap === index && {color: '#fff'}]} >{item.title ? item.title: 'مخطط ' +(index +1)}</Text>
                        </TouchableOpacity>
                        { selectedMap === index &&
                            <Animated.View
                                style={{
                                    // height: 295,
                                    // height: props.doAnimation? heightAnimation: 295,
                                    // borderWidth: 1,
                                    marginTop: 10,
                                    zIndex: -1,
                                    backgroundColor: '#fff',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    borderStyle: "solid",
                                    // borderWidth: 1,
                                    borderColor: "#e0e0e0",
                                    borderRadius: 24,
                                    // paddingTop: 10,
 
                                    borderRadius: 20,
                                }}
                            >
                                <Image 
                                    // source={{uri: item}} 
                                    source={{uri: item && item.bluePrint? item.bluePrint.uri? item.bluePrint.uri: item.bluePrint :item.image.uri? item.image.uri: item.image? item.image: item}}
                                    style={{width: 220, resizeMode: 'cover',  height: 220, borderRadius: 20}}  
                                    onLoadEnd={() => setLoading(false)}
                                />

                                {loading && <BallIndicator 
                                    style={{
                                        position: 'absolute'
                                    }}

                                    color={Colors.primaryGreen}
                                />}
                                {(item.desc || item.desc === '')&& <Text 
                                    style={[Fonts.style.normal, {
                                        opacity: 0.8,
                                        fontSize: 12,
                                        fontWeight: "normal",
                                        fontStyle: "normal",
                                        lineHeight: 24,
                                        letterSpacing: 0,
                                        textAlign: "right",
                                        color: Colors.black,
                                        marginTop: 22,
                                        width: Metrics.screenWidth * 0.87733333 - 20
                                        // width: '100%'
                                    }]}
                                >
                                    { item.desc || ''}
                                </Text>}
                            </Animated.View>
                        }
                    </View>
                ) })
            }
        </View>
           
    </Animated.View>
)}

const styles = StyleSheet.create({
    container:{
        alignItems:'flex-end',
        justifyContent:'center',
        alignSelf:'center',
        // flexDirection: 'row',
        // width: Metrics.screenWidth - 80,
        // marginHorizontal: 40,
    },

    textStyle: {
        fontSize: 13,
        fontWeight: Platform.OS === 'android'?'400': "bold",
        fontStyle: "normal",
        lineHeight: 17,
        letterSpacing: 0,
        textAlign: "right",
        color: Colors.black,
    }
   
})

export default (BluePrintList)


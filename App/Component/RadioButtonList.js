import React, {useState, useEffect} from 'react'
import { View, Text, TextInput, StyleSheet, Animated, TouchableOpacity, Image } from 'react-native';
import { useAnimation } from '../assets/Animation/animation'
import {Fonts, Metrics, Colors, Images} from '../Themes'
import * as Progress from 'react-native-progress';
import RealestateType from './realestateType'

const Button = (props) => {
    const animtion = useAnimation({ doAnimation: props.doAnimation|| doAnimation, duration:550})
    const [selectedRealestateType, setSelectedRealestateType]= useState(props.selectedPourposeByProps && props.selectedPourposeByProps._id || 90)


    const [ realestateType, setRealestatTypes ] = useState(
        [
            { _id: 2, nameAr: 'سكني'},
            { _id: 5, nameAr: 'تجاري'},
            { _id: 6, nameAr: 'اخرى'},
        ]
    )

    return (
    <Animated.View style={[styles.container, props.containerStyle,]}>
        
        <View style={{ width: '100%',  alignItems: 'flex-end', marginEnd: 28.5}} >
            {
                ( props.purpose || realestateType).map( (item, index) => 
                    <TouchableOpacity onPress={()=> {setSelectedRealestateType(item._id); props.selectedPourpose(item)}} >
                        <View  style={{flexDirection: 'row-reverse', marginTop: 17}} >
                            <View
                                style={{
                                    width: 20,
                                    height: 20,
                                    backgroundColor: "#ffffff",
                                    borderStyle: "solid",
                                    borderWidth: 1,
                                    borderColor: Colors.darkSeafoamGreen,
                                    borderRadius: 10, 
                                    marginStart: 10,
                                    justifyContent:'center'
                                }}
                            >
                                {
                                    selectedRealestateType === item._id &&
                                    <Animated.View 
                                        style={{
                                            width: 12, 
                                            height: 12,
                                            backgroundColor: Colors.darkSeafoamGreen,
                                            borderRadius: 6,
                                            alignSelf: 'center',
                                            opacity: animtion.interpolate({inputRange: [0,1], outputRange: [0,1]})
                                        }}
                                    />
                                }
                            </View>
                            <Text style={[Fonts.style.normal, {color: '#000', fontSize: 15, fontWeight: 'normal'}]} >{item.nameAr}</Text>
                        </View>
                    </TouchableOpacity>
                )
            }
        </View>
    </Animated.View>
)}

const styles = StyleSheet.create({
    container:{
        alignItems:'flex-end',
        justifyContent:'center',
        alignSelf:'center',
        flexDirection: 'row',
    },

    textStyle: {
    
    }
   
})

export default (Button)


import React, {useState} from 'react'
import { View, Text, TextInput, StyleSheet, Animated, TouchableOpacity, Image, FlatList } from 'react-native';
import { useAnimation } from '../assets/Animation/animation'
import {Fonts, Metrics, Colors, Images} from '../Themes'
import * as Progress from 'react-native-progress';
import RealestateType from './realestateType'
import RealEstateItem from './realEstateItem'

const SugesstionAqars = (props) => {
    const animtion = useAnimation({ doAnimation: props.doAnimation, duration:550})
    const [selectedRealestateType, setSelectedRealestateType]= useState('')




    return (
    <Animated.View style={[styles.container, props.containerStyle, {}]}>
        <View style={{flexDirection: 'row',  flexWrap: 'wrap',  justifyContent: 'flex-end'}} >
            <FlatList 
                data={props.data}
                // horizontal
                style={{}}
                renderItem={({item, index})=> {

                    console.log('itemList', item)
                    return(
                        <RealEstateItem onPress={()=> props.itemPress(item)} item={item} doAnimation={true} index={index} />
                    )
                }}
            />
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

export default (SugesstionAqars)


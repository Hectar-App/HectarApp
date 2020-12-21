import React, {useState} from 'react'
import { View, Text, TextInput, StyleSheet, Animated, TouchableOpacity, FlatList, TouchableHighlight } from 'react-native';
import { useAnimation } from '../assets/Animation/animation'
import {Fonts, Metrics, Colors} from '../Themes'
import BackButton from './BackButton'
import { ifIphoneX } from 'react-native-iphone-x-helper'
import Marker from './Marker'

const MarkerList = (props) => {
    const animtion = useAnimation({ doAnimation: props.doAnimation, duration:550})
    
    return (
    <Animated.View style={[styles.container, props.containerStyle]}>
      
    </Animated.View>
)}

const styles = StyleSheet.create({
   
})

export default (MarkerList)


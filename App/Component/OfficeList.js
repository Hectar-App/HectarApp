import React, {useState} from 'react'
import { View, Text, TextInput, StyleSheet, Animated, TouchableOpacity, FlatList, Image, TouchableHighlight } from 'react-native';
import { useAnimation } from '../assets/Animation/animation'
import {Fonts, Metrics, Colors, Images, ApplicationStyles} from '../Themes'


import { ifIphoneX } from 'react-native-iphone-x-helper'

import LinearGradient from 'react-native-linear-gradient'
import { ActivityIndicator } from 'react-native-paper';
import CardItem from './officeCard'

const officeList = (props) => {
    const animtion = useAnimation({ doAnimation: props.doAnimation, duration:550})
    return (
        <LinearGradient colors={['#fff', '#fff','#fff']} style={[styles.container, props.containerStyle]} >
            {/* <Animated.View style={[styles.container, props.containerStyle]}> */}
                {props.loading && <ActivityIndicator color={Colors.darkSeafoamGreen} />}
                <FlatList 
                    onScroll={props.onScroll}
                    data={props.officesData}
                    renderItem={({item, index})=>{
                        console.log('office',item)
                       return(
                             <CardItem onItemPress={()=> props.onItemPress(item)} onFavPress={()=> props.onFavPress(item)} doAnimation={true} selectedOffice={item} doAnimation={true} index={index} />
                         )
                          
                        }
                    }
                    onEndReached={() => props.numberOfOffices? (props.officesData || []).length === props.numberOfOffices ? null: props.handleGetMoreDatat(): null}
                    // bounces={false}
                    onEndReachedThreshold={
                    // 5
                        props.numberOfListFlag ? 0 : 1
                    }
                />

                {props.moreDataLoading && 
                    <View style={{paddingTop: 20, paddingBottom: 50}} >
                        <ActivityIndicator color={Colors.primaryGreen} />
                    </View>
                }
              
        </LinearGradient>
)}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: Metrics.screenWidth,
        height: '100%',
        paddingTop: ifIphoneX(20,20),
        paddingBottom: 70,

    },
    mapButton: {
        width: 44,
        height: 44,
        backgroundColor: Colors.darkSeafoamGreen,
        shadowColor: "rgba(17, 51, 81, 0.63)",
        shadowOffset: {
          width: 0,
          height: 10
        },
        shadowRadius: 20,
        shadowOpacity: 1,
        position: 'absolute',
        bottom: 96,
        right: 20,
        zIndex: 99999999999,
        borderRadius: 22,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 2,
    }
})

export default (officeList)


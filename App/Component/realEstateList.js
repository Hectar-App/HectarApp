import React, {useState} from 'react'
import { View, Text, TextInput, StyleSheet, Animated, TouchableOpacity, FlatList, Image, TouchableHighlight } from 'react-native';
import { useAnimation } from '../assets/Animation/animation'
import {Fonts, Metrics, Colors, Images, ApplicationStyles} from '../Themes'
import RealEstateItem from './realEstateItem'
import RealEstateItemSmall from './realEstateItemSmall'
import RealEstateItemSmallFavorate from './realEstateItemSmallFavorate'

import { ifIphoneX } from 'react-native-iphone-x-helper'
import Marker from './Marker'
import LinearGradient from 'react-native-linear-gradient'
import { ActivityIndicator } from 'react-native-paper';
import CardItem from './itemCard'

const realEstateList = (props) => {
    const animtion = useAnimation({ doAnimation: props.doAnimation, duration:550})
    // console.log('ite', props)
    return (
        <LinearGradient colors={['#fff', '#fff','#fff']} style={[styles.container, props.containerStyle]} >
            {/* <Animated.View style={[styles.container, props.containerStyle]}> */}
                {props.loading && <ActivityIndicator color={Colors.darkSeafoamGreen} />}
                <FlatList 
                    onScroll={props.onScroll}
                    data={props.realestateData}
                    renderItem={({item, index})=> 
                        {
                            return props.listType === 'small' ?(
                                <RealEstateItemSmall editRealEstate={()=>props.editRealEstate(item)} deletePress={() => props.deletePress(item)} refreshPress={() => props.refreshPress(item)} popupOf={props.popupOf} onOptionsPress={()=> props.onOptionsPress(item)} item={item} dismassLoading={props.dismassLoading} onDismassPress={()=> props.onDismassPress(item)} mine={props.mine} doAnimation={false} index={index} onPress={(x)=> props.onItemPress(x)} />
                            ) : props.listType === 'favorate'?(
                                <RealEstateItemSmallFavorate onItemPress={()=> props.onItemPress(item)} onFavPress={()=> props.onFavPress(item)} item={item} doAnimation={true} index={index} />
                            ) :props.listType === 'testSmall'?(
                                <CardItem onItemPress={()=> props.onItemPress(item)} onFavPress={()=> props.onFavPress(item)} doAnimation={true} selectedRealEstate={item} doAnimation={true} index={index} />
                            ) :(
                                <RealEstateItem dismassLoading={props.dismassLoading} onDismassPress={()=> props.onDismassPress(item)} mine={props.mine} onPress={(x)=>props.onItemPress(x)} item={item} doAnimation={true} index={index} />
                            ) 
                        }
                    }
                    onEndReached={() => props.numberOfRealEstate? (props.realestateData || []).length === props.numberOfRealEstate ? null: props.handleGetMoreDatat(): null}
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

export default (realEstateList)


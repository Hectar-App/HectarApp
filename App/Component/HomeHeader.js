import React, {useState, useEffect} from 'react'
import { View, Text, Platform, TextInput, StyleSheet, Keyboard, Animated, TouchableOpacity, FlatList, TouchableHighlight, Image } from 'react-native';
import { useAnimation } from '../assets/Animation/animation'
import {Fonts, Metrics, Colors, Images, CustomIcon} from '../Themes'
import BackButton from './BackButton'
import { ifIphoneX } from 'react-native-iphone-x-helper'
import MainTypes from './MainFilterTypes'
import {useTheme} from 'react-navigation'
import useKeyboard from '../Component/utils/keyboard'
import Icon from 'react-native-vector-icons/MaterialIcons'
import _ from 'lodash'
import SugestionComp from './sugestionComp'
import { ActivityIndicator } from 'react-native-paper';

const HomeHeader = (props) => {

    const theme = useTheme()
    const [doAnimation, setDoAnimation] = useState(false)
    const animtion = useAnimation({ doAnimation: doAnimation, duration:550})
    const searchWidth = animtion.interpolate({inputRange: [0, 1], outputRange: [Metrics.screenWidth * 0.58666667, Metrics.screenWidth * 0.88666667]})
    const typesHeight = animtion.interpolate({inputRange: [0, 1], outputRange: [0, 200]})
    const typesWidth = animtion.interpolate({inputRange: [0, 1], outputRange: [0, Metrics.screenWidth]})
    const typesPosition = animtion.interpolate({inputRange: [0, 1], outputRange: [0,  Platform.OS === 'android'? -220: -202]})
    const typesPositionHor = animtion.interpolate({inputRange: [0, 1], outputRange: [60, 0]})
    const [selectedType, setSelectedType]= useState(1)
    const keyboardStatus = useKeyboard()
    const inputRef = React.createRef()


    return (
    <Animated.View style={[styles.container, props.containerStyle]}>
        <View style={styles.searchContainer} >



        {/* { !doAnimation &&
                // <MainTypes boxStyle={{width: 'auto', backgroundColor: 'white', paddingHorizontal: 20}} containerStyle={{marginTop: 0, width: 'auto', backgroundColor: 'red'}} status={props.info && props.info.realEstateStatus} doAnimation={true} statusPress={ (i) => setSelectedStatus(i)}  selectedType={1}  />
                <View style={{flexDirection: 'row'}} >
                {
                    (props.status || []).map(item => {
                        return (<View
                            style={[styles.typeItem, { backgroundColor: props.selectedStatus && props.selectedStatus._id === item._id ? 'rgb(61,186,126)':'rgb(230,230,230)', marginEnd: 0, justifyContent:'center',
                            // width: Metrics.screenWidth * 0.456,
                                width: 'auto',
                                height: 35,
                                borderRadius: 5,
                                marginStart: 5,
                                paddingHorizontal: 12
                            }]}
                        >
                            <TouchableOpacity
                                onPress={()=> props.statusPress(item)}
                                // onPress={()=> console.log('i', i)}
                                style={{ height: '100%', alignItems:'center',  justifyContent:'center'}}
                            >
                                    <Text style={[Fonts.style.normal,{color: props.selectedStatus && props.selectedStatus._id === item._id  ? '#Fff': 'rgb(141,141,141)', fontSize: 12, fontWeight: Platform.OS === 'android'?'400': "bold", alignSelf:'center'}]} >{item.nameAr || 'للايجار'}</Text>
                            </TouchableOpacity>
                        </View>)
                    })
                }
                </View>
            } */}

            <Animated.View
                style={[styles.searchBox, {width: Metrics.screenWidth * 0.78666667, backgroundColor: theme === 'dark'? '#25303e':"#fff", } ]}
            >
                <TouchableOpacity
                    style={[{width: '100%', height: '100%'}]}
                    onPress={() => {doAnimation? Keyboard.dismiss(): inputRef.current.focus() ; doAnimation && setDoAnimation(s => s = !s);}}
                >
                    {true && <TextInput 
                        style={[Fonts.style.normal,styles.inputS]}
                        placeholder={'المدينة , الحي '}
                        ref={inputRef}
                        value={props.searchValue}
                        onChangeText={props.onChangeText}
                        placeholderTextColor={theme === 'dark'? '#b7b7b9':''}
                        // onFocus={() => setDoAnimation(s => s = !s)}
                        returnKeyType={'search'}
                        onSubmitEditing={()=> setDoAnimation(false)}
                    />}
                    {props.sugesstionLoading && <ActivityIndicator style={{position: 'absolute', left: 50, top: 7}} color={Colors.primaryGreen} />}

                    <Image source={Images.searchIcon} style={!doAnimation && false ? {alignSelf:'center', position:'absolute', top: 12}: { position:'absolute', right: 9, top: 12, alignSelf:'center' }} />
                    {/* {doAnimation && <Icon name={'close'} size={18} style={!doAnimation && false ? {alignSelf:'center', position:'absolute', top: 12}: { position:'absolute', left: 9, top: 12, alignSelf:'center' }} />} */}
                </TouchableOpacity>
            </Animated.View>
            

            <View style={{flexDirection: 'row-reverse'}} >

            {/* {   !doAnimation &&
                <TouchableOpacity
                    style={{
                        width: 40,
                        height: 40,
                        borderRadius: 16,
                        backgroundColor: "#ffffff",
                        shadowColor: "rgba(0, 0, 0, 0.08)",
                        shadowOffset: {
                            width: 0,
                            height: 7
                        },
                        shadowRadius: 20,
                        shadowOpacity: 1, 
                        justifyContent:'center',
                        alignItems:'center',
                        elevation: ifIphoneX(0,6),
                        marginStart: 5
                    }}
                    onPress={props.onSortPress}
                >   
                    <View style={{width: '100%', height: '100%', justifyContent:'center', alignItems:'center'}} >
                        <Icon name={'sort'} size={20} />
                    </View>
                </TouchableOpacity>
            } */}
            
            { <TouchableOpacity
                style={{
                    width: 40,
                    height: 40,
                    borderRadius: 16,
                    backgroundColor: theme === 'dark'? '#25303e': "#ffffff",
                    shadowColor: "rgba(0, 0, 0, 0.08)",
                    shadowOffset: {
                        width: 0,
                        height: 7
                    },
                    shadowRadius: 20,
                    shadowOpacity: 1, 
                    justifyContent:'center',
                    alignItems:'center',
                    elevation: ifIphoneX(0,6)
                }}
                onPress={props.onFilterPress}
            >   
                <View style={{width: '100%', height: '100%', justifyContent:'center', alignItems:'center'}} >
                    <Image source={Images.filterIcon} />
                    {props.filterData && <View style={{
                        width: 14, 
                        height: 14, 
                        // backgroundColor: '#e49b40',
                        backgroundColor: Colors.primaryGreen,
                        borderRadius: 7,
                        position: 'absolute',
                        top: -3,
                        left: 0,
                        shadowColor: "rgba(0, 0, 0, 0.08)",
                        shadowOffset: {
                            width: 0,
                            height: 7
                        },
                        shadowRadius: 20,
                        shadowOpacity: 1, 
                        elevation: ifIphoneX(0,6)
                    }} />}
                </View>
                {/* <View /> */}
            </TouchableOpacity>}
        </View>
            </View>


           

        <View
            style={{
                marginTop: 13.5,
                height: 50,
                backgroundColor: theme === 'dark' ? '#202126': "#f9f9f9",
                justifyContent:'center',
                alignItems: 'center',
                flexDirection: 'row-reverse',
                paddingHorizontal: 8
            }}
        >


                    <View style={{...styles.porpuseStyle, flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center'}} >

                        <TouchableOpacity
                                            // key={item._id}
                            style={[styles.itemContainer,{backgroundColor: props.selectedStatus && props.status && props.selectedStatus._id === props.status[1]._id ? Colors.darkSeafoamGreen: theme === 'dark'? '#25303e':  "#ffffff", borderTopStartRadius: 10, borderBottomStartRadius: 10, borderRightWidth: 1, borderRightColor: '#f9f9f9'}, Platform.OS === 'sdf' && {transform: [{rotate: '180deg'}]}]}
                            onPress={() => props.selectedPurposePressed(props.status[1])}
                        >
                            <Text style={[Fonts.style.normal, styles.itemText, { color: props.selectedStatus && props.status && props.selectedStatus._id === props.status[1]._id ? Colors.white:theme === 'dark'? '#fff': Colors.black}]} >{"للبيع"}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                                            // key={item._id}
                            style={[styles.itemContainer,{backgroundColor: props.selectedStatus && props.status && props.selectedStatus._id === props.status[0]._id ? Colors.darkSeafoamGreen:theme === 'dark'? '#25303e':  "#ffffff", borderRightWidth: 1, borderRightColor: '#f9f9f9'}, Platform.OS === 'sdf' && {transform: [{rotate: '180deg'}]}]}
                            onPress={() => props.selectedPurposePressed(props.status[0])}
                        >
                            <Text style={[Fonts.style.normal, styles.itemText, { color: props.selectedStatus && props.status && props.selectedStatus._id === props.status[0]._id ? Colors.white:theme === 'dark'? '#fff':  Colors.black}]} >{"للايجار"}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                                            // key={item._id}
                            style={[styles.itemContainer,{backgroundColor: (props.selectedStatus && props.selectedStatus._id === 1 || props.selectedStatus === null) ? Colors.darkSeafoamGreen: "#ffffff", borderTopEndRadius: 10, borderBottomEndRadius: 10,}, Platform.OS === 'sdf' && {transform: [{rotate: '180deg'}]}]}
                            onPress={() => props.selectedPurposePressed({_id: 1, nameAr: 'الكل'})}
                        >
                            <Text style={[Fonts.style.normal, styles.itemText, { color: (props.selectedStatus && props.selectedStatus._id === 1 || props.selectedStatus === null) ? Colors.white: Colors.black}]} >{"الكل"}</Text>
                        </TouchableOpacity>

                    </View>

                    <View style={{...styles.porpuseStyle, backgroundColor: 'transparent', flex: 3 }} >

                        <TouchableOpacity
                                            // key={item._id}
                            style={[styles.itemContainer,{backgroundColor: props.selectedPropuse === 1 ? Colors.darkSeafoamGreen: theme === 'dark'? '#25303e':"#ffffff", flex: 0, width: 100, borderRadius: 10}, Platform.OS === 'sdf' && {transform: [{rotate: '180deg'}]}]}
                            // onPress={() => props.selectedTypePressed({_id: 1, nameAr: 'الكل'})}
                            // onPress={()=> setDoAnimation(s => s = !s)}
                            onPress={props.typeListPress}
                        >
                            <View style={{...styles.row, alignItems: 'center', width: '100%', justifyContent: 'space-between', paddingHorizontal: 12}} >
                                <Icon name={'keyboard-arrow-down'} color={theme === 'dark'? '#fff':''} />
                                <Text style={[Fonts.style.normal, styles.itemText, { color: props.selectedPropuse === 1 || theme === 'dark' ? Colors.white: Colors.black}]} >{props.selectedType.nameAr || "كل العقارات"}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity
                        style={{
                            width: 40,
                            height: 36,
                            borderRadius: 16,
                            backgroundColor:theme === 'dark'? '#25303e': "#ffffff",
                            shadowColor: "rgba(0, 0, 0, 0.08)",
                            shadowOffset: {
                                width: 0,
                                height: 7
                            },
                            shadowRadius: 20,
                            shadowOpacity: 1, 
                            justifyContent:'center',
                            alignItems:'center',
                            elevation: ifIphoneX(0,6),
                            marginStart: 5
                        }}
                        onPress={props.onSortPress}
                    >   
                        <View style={{width: '100%', height: '100%', justifyContent:'center', alignItems:'center'}} >
                            <Icon name={'sort'} size={20} color={theme === 'dark'? '#fff':''} />
                        </View>
                    </TouchableOpacity>
            {/* {props.mapView?
             <FlatList 
                horizontal
                data={(props.types || [])}
                showsHorizontalScrollIndicator={false}
                style={[{direction: Platform.OS === 'android'? 'rtl': 'rtl'},  Platform.OS === 'android' && {transform: [{rotate: '180deg'}]}]}
                renderItem={({item, index})=>{
                    if(index === 0) {
                        return(
                            <View style={{flexDirection: 'row', paddingStart: 8}}>
                                <TouchableOpacity
                                    key={item._id}
                                    style={[styles.itemContainer,{backgroundColor: props.selectedType === 1 ? Colors.darkSeafoamGreen: "#ffffff"}, Platform.OS === 'android' && {transform: [{rotate: '180deg'}]}]}
                                    onPress={() => props.selectedTypePressed({_id: 1, nameAr: 'الكل'})}
                                >
                                    <Text style={[Fonts.style.normal, styles.itemText, { color: props.selectedType === 1 ? Colors.white: Colors.black}]} >{"الكل"}</Text>
                                </TouchableOpacity>
                                
                                <TouchableOpacity
                                    key={index}
                                    style={[styles.itemContainer,{backgroundColor: props.selectedType === item._id ? Colors.darkSeafoamGreen: "#ffffff",}, Platform.OS === 'android' && {transform: [{rotate: '180deg'}]}]}
                                    onPress={() => props.selectedTypePressed(item)}
                                >
                                    <Text style={[Fonts.style.normal, styles.itemText, { color: props.selectedType === item._id ? Colors.white: Colors.black}]} >{item.nameAr}</Text>
                                </TouchableOpacity>

                            </View>
                        )
                    }
                    return(
                        <TouchableOpacity
                            key={item._id}
                            style={[styles.itemContainer,{backgroundColor: props.selectedType === item._id ? Colors.darkSeafoamGreen: "#ffffff"},  Platform.OS === 'android' && {transform: [{rotate: '180deg'}]}]}
                            onPress={() => props.selectedTypePressed(item)}
                        >
                            <Text style={[Fonts.style.normal, styles.itemText, { color: props.selectedType === item._id ? Colors.white: Colors.black}]} >{item.nameAr}</Text>
                        </TouchableOpacity>
                    )
                }}
            />:
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent:'space-around', 
                        width:'100%', 
                    }}
                >
                    <TouchableOpacity
                        // key={item._id}
                        style={[styles.itemContainer,{backgroundColor: props.selectedTypeFilter === 1 ? Colors.darkSeafoamGreen: "#ffffff"}]}
                        onPress={() => props.filterSelected(1)}
                    >
                        <Text style={[Fonts.style.normal, styles.itemText, { color: props.selectedTypeFilter === 1 ? Colors.white: Colors.black}]} >{'المساحة'}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        // key={item._id}
                        style={[styles.itemContainer,{backgroundColor: props.selectedTypeFilter === 2 ? Colors.darkSeafoamGreen: "#ffffff"}]}
                        onPress={() => props.filterSelected(2)}
                    >
                        <Text style={[Fonts.style.normal, styles.itemText, { color: props.selectedTypeFilter === 2 ? Colors.white: Colors.black}]} >{'السعر'}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        // key={item._id}
                        style={[styles.itemContainer,{backgroundColor: props.selectedTypeFilter === 3 ? Colors.darkSeafoamGreen: "#ffffff"}]}
                        onPress={() => props.filterSelected(3)}
                    >
                        <Text style={[Fonts.style.normal, styles.itemText, { color: props.selectedTypeFilter === 3 ? Colors.white: Colors.black}]} >{'الاحدث'}</Text>
                    </TouchableOpacity>
                </View>
            } */}
        </View>

        <Animated.View style={{position: 'absolute', bottom: typesPosition,zIndex: 9998848485151515151848, left: typesPositionHor, width: typesWidth, borderRadius: 10, backgroundColor: '#fff', height: typesHeight}} >
            <View style={{flex: 1, flexDirection: 'row-reverse', flexWrap: 'wrap', }} >
                { doAnimation  &&
                    _.map( _.concat([{_id: 1, nameAr: 'كل العقارات'}]  ,(props.types || [])), (item, index)=>{
                        return(
                            <TouchableOpacity
                                key={item._id}
                                style={[styles.itemContainer1,{backgroundColor: props.selectedType && props.selectedType._id === item._id ? Colors.darkSeafoamGreen: "#ffffff"},  Platform.OS === 'sdfsdf' && {transform: [{rotate: '180deg'}]}]}
                                onPress={() => {props.selectedTypePressed(item); setDoAnimation(false)}}
                            >
                                <Text style={[Fonts.style.normal, styles.itemText, { color: props.selectedType && props.selectedType._id === item._id ? Colors.white: Colors.black}]} >{item.nameAr}</Text>
                            </TouchableOpacity>
                        )})
                }
            </View>
        </Animated.View>

        {/* {(props.sugesstionData || []).length > 0 && <SugestionComp itemPress={(i) => props.itemPress(i)} sugesstionData={props.sugesstionData} doAnimation={true} />} */}
    </Animated.View>
)}

const styles = StyleSheet.create({
    container:{
        width: Metrics.screenWidth,
        height: ifIphoneX(164,98),
        // backgroundColor: Colors.brownGrey,
        position:'absolute',
        zIndex: 99,
        top: 0,
        shadowColor: "rgba(0, 0, 0, 0.08)",
        shadowOffset: {
          width: 0,
          height: 7
        },
        elevation: 2,
        shadowRadius: 15,
        shadowOpacity: 1,
        paddingTop: Platform.OS === 'android'? 15: ifIphoneX(60,30),
    },
    row:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        alignSelf:'center',
    },
    porpuseStyle: {
        flex: 5,
        // borderWidth: 1,
        // height: '100%',
        backgroundColor: '#fff',
        borderRadius: 15,
        flexDirection: 'row', 
        marginHorizontal: 5,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center'
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
        justifyContent:'space-between',
         paddingHorizontal: 25
        // alignItems: 'space-between'
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
        elevation: ifIphoneX(0,6),
    },
    inputS: {
        width: '100%',
        height: '100%',
        paddingEnd: 35,
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
        // paddingHorizontal: 15,
        flex:1,
        height: 33,
        // borderRadius: 100,
        shadowColor: "rgba(0, 0, 0, 0.08)",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowRadius: 20,
        shadowOpacity: 1,
        justifyContent:'center',
        alignSelf: 'center',
        alignItems: 'center',
        // marginEnd: 10,
        elevation: ifIphoneX(0,1)
    },
    itemContainer1:{
        marginHorizontal: 15,
        // flex:1,
        height: 33,
        width: '25%',
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
        alignItems: 'center',
        marginTop: 10,
        elevation: ifIphoneX(0,1)
    }
})

export default (HomeHeader)


import React, {useState} from 'react'
import { View, Text, Platform, TextInput, StyleSheet, Animated, TouchableOpacity, Image } from 'react-native';
import { useAnimation } from '../assets/Animation/animation'
import {Fonts, Metrics, Colors, Images} from '../Themes'
import {IconButton} from 'react-native-paper'
import * as Progress from 'react-native-progress';
import RealestateType from './realestateType'
import { FlatList } from 'react-native-gesture-handler';
const FAQsItem = (props) => {
    const animtion = useAnimation({ doAnimation: test, duration:550})
  
    const heightAnimation = animtion.interpolate({inputRange: [0,1], outputRange: [110, 110]})

    const [ features, setFeatures ] = useState(
        [
            { _id: 1, nameAr: 'كيف يمكنني بيع العقار من خلال التطبيق ', desc: 'سكني', selected: false},
            { _id: 2, nameAr: 'كيف يمكنني بيع العقار من خلال التطبيق ', desc: '1450 متر مربع', selected: false},
            { _id: 3, nameAr: 'كيف يمكنني بيع العقار من خلال التطبيق ', desc: '1200 ريال', selected: false},
            { _id: 4, nameAr: 'كيف يمكنني بيع العقار من خلال التطبيق ', desc: '1450 متر مربع', selected: false},
            { _id: 5, nameAr: 'كيف يمكنني بيع العقار من خلال التطبيق ', desc: '1200 ريال', selected: false},
            { _id: 6, nameAr: 'كيف يمكنني بيع العقار من خلال التطبيق ', desc: '1450 متر مربع', selected: false},
            { _id: 7, nameAr: 'كيف يمكنني بيع العقار من خلال التطبيق ', desc: '1200 ريال', selected: false},
            { _id: 8, nameAr: 'كيف يمكنني بيع العقار من خلال التطبيق ', desc: '1450 متر مربع', selected: false},
            { _id: 9, nameAr: 'كيف يمكنني بيع العقار من خلال التطبيق ', desc: '1200 ريال', selected: false},
        ]
    )

    const [test, setTest]= useState(false)
    const [selectedMap, setSelectedMap]= useState( { _id: 0, nameAr: 'الغرض من العقار', desc: 'سكني', selected: false},)

    return (
    <Animated.View style={[styles.container, props.containerStyle,]}>
        <View style={{  justifyContent: 'flex-end', width: '100%'}} >
            <FlatList 
                data={props.FAQs}
                // showsVerticalScrollIndicator={false}
                style={{width: Metrics.screenWidth,  }}
                contentContainerStyle={{justifyContent:'center', alignItems:'center', paddingBottom: 130}}
                
                renderItem={({item}, index) => {
                    return (<View
                    >
                        <TouchableOpacity
                            style={{
                                width: Metrics.screenWidth * 0.87733333,
                                marginVertical: 5,
                                flexDirection: 'row',
                                justifyContent:'space-between',
                                alignItems: 'center',
                                // height: 50,
                                paddingVertical: 8,
                                backgroundColor: selectedMap._id === item._id? Colors.darkSlateBlue: Colors.primaryGreen,
                                borderRadius: 10,
                                paddingHorizontal: 12
                            }}
                            onPress={() => {selectedMap._id === item._id ? setSelectedMap({_id: 0}): setSelectedMap(item); setTest(s => s=!s) }}
                        >
                            {/* <Text style={[Fonts.style.normal, styles.textStyle]} >{item.desc}</Text> */}
                            <IconButton icon={'triangle'} size={8}  color={   '#fff'} />
                            <Text style={[Fonts.style.normal, styles.textStyle , {color: '#fff'}]} >{item.question}</Text>
                        </TouchableOpacity>
                        { selectedMap._id === item._id &&
                            <Animated.View
                                style={{
                                    // height: 295,
                                    // height: props.doAnimation? heightAnimation: 295,
                                    marginTop: -10,
                                    zIndex: -1,
                                    backgroundColor: '#fff',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    borderStyle: "solid",
                                    // borderWidth: 1,
                                    borderColor: "#e0e0e0",
                                    borderRadius: 4,
                                    paddingHorizontal: 8,
                                    width: Metrics.screenWidth * 0.87733333
                                }}
                            >
                                {/* <Image source={require('../assets/imgs/kChy7Iu.png')}  /> */}
                                <Text 
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
                                        marginBottom: 22
                                    }]}
                                >
                                    {item.answer}
                                </Text>
                            </Animated.View>
                        }
                    </View>)

                }}
            />

            {/* {
                (props.FAQs || []).map( (item, index) => (
                ) )
            } */}
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
        // borderWidth: 1,
        width: '80%', 
        paddingHorizontal: 3
    }
   
})

export default (FAQsItem)


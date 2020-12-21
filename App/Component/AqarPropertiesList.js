import React, {useState} from 'react'
import { View, Text, Platform, TextInput, StyleSheet, Animated, TouchableOpacity, Image } from 'react-native';
import { useAnimation } from '../assets/Animation/animation'
import {Fonts, Metrics, Colors, Images} from '../Themes'
import * as Progress from 'react-native-progress';
import RealestateType from './realestateType'
const AqarPropertiesList = (props) => {
    const animtion = useAnimation({ doAnimation: props.doAnimation, duration:550})
  

    const [ features, setFeatures ] = useState(
        [
            { _id: 1, nameAr: 'الغرض من العقار', desc: 'سكني', selected: false},
            { _id: 2, nameAr: 'المساحة', desc: '1450 متر مربع', selected: false},
            { _id: 3, nameAr: 'سعر المتر', desc: '1200 ريال', selected: false},
            { _id: 4, nameAr: 'سنة البناء', desc: '2009', selected: false},
        ]
    )

    return (
    <Animated.View style={[styles.container, props.containerStyle,]}>
        <View style={{  justifyContent: 'flex-end', width: '100%'}} >
            {/* {
                features.map( (item, index) => ( */}
            {props.buildYear && <View
                style={{
                    width: '100%',
                    marginVertical: 5,
                    flexDirection: 'row',
                    justifyContent:'space-between',
                    alignItems: 'center'
                }}
            >
                <Text style={[Fonts.style.normal, styles.textStyle]} >{props.buildYear}</Text>
                <Text style={[Fonts.style.normal, styles.textStyle]} >{"سنة البناء"}</Text>
            </View>}

            {props.purpose && <View
                style={{
                    width: '100%',
                    marginVertical: 5,
                    flexDirection: 'row',
                    justifyContent:'space-between',
                    alignItems: 'center'
                }}
            >
                <Text style={[Fonts.style.normal, styles.textStyle]} >{props.purpose.nameAr}</Text>
                <Text style={[Fonts.style.normal, styles.textStyle]} >{'الغرض من العقار'}</Text>
            </View>}

            {props.space && <View
                style={{
                    width: '100%',
                    marginVertical: 5,
                    flexDirection: 'row',
                    justifyContent:'space-between',
                    alignItems: 'center'
                }}
            >
                <Text style={[Fonts.style.normal, styles.textStyle]} >{props.space}</Text>
                <Text style={[Fonts.style.normal, styles.textStyle]} >{'المساحة'}</Text>
            </View>}

            {(props.sides || []).length > 0 && <View
                style={{
                    width: '100%',
                    marginVertical: 5,
                    flexDirection: 'row',
                    justifyContent:'space-between',
                    alignItems: 'center'
                }}
            >
                <View style={{flexDirection: 'row'}} >
                    {(props.sides || []).map((item , index)=> <Text style={[Fonts.style.normal, styles.textStyle, {paddingHorizontal: 1}]} >{item === '0'? 'الجنوبية': item === '1'? 'الشرقية': item === '2'? 'الغربية': 'الشمالية'}</Text>)}
                </View>
                <Text style={[Fonts.style.normal, styles.textStyle]} >{'الواجهة'}</Text>
            </View>}

                {/* ) ) */}
            {/* } */}
        </View>
           
    </Animated.View>
)}

const styles = StyleSheet.create({
    container:{
        alignItems:'flex-end',
        justifyContent:'center',
        alignSelf:'center',
        // flexDirection: 'row',
        width: Metrics.screenWidth - 80,
        marginHorizontal: 40,
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

export default (AqarPropertiesList)


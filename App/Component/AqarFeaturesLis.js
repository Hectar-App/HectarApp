import React, {useState} from 'react'
import { View, Text, TextInput, StyleSheet, Animated, TouchableOpacity, Image } from 'react-native';
import { useAnimation } from '../assets/Animation/animation'
import {Fonts, Metrics, Colors, Images} from '../Themes'
import * as Progress from 'react-native-progress';
import RealestateType from './realestateType'
const AqarFeatures = (props) => {
    const animtion = useAnimation({ doAnimation: props.doAnimation, duration:550})
    const [selectedRealestateType, setSelectedRealestateType]= useState('')


    const [ realestateType, setRealestatTypes ] = useState(
        [
            // { _id: 1, nameAr: 'الكل'},
            { _id: 2, nameAr: 'تكييف مركزي'},
            { _id: 5, nameAr: 'غرفة غسيل'},
            { _id: 6, nameAr: 'نوافذ مبطنة'},
            { _id: 4, nameAr: 'حوض سباحة'},
            { _id: 3, nameAr: 'صالة جيم'},
            { _id: 7, nameAr: 'انترنت'},
        ]
    )

    const [selectedFeatures, setSelectedFeatures]= useState([])

    const [ features, setFeatures ] = useState(
        [
            { _id: 1, nameAr: 'انترنت', selected: false},
            { _id: 2, nameAr: 'صالة جيم', selected: false},
            { _id: 5, nameAr: 'بالقرب من مدرسة ', selected: false},
            { _id: 4, nameAr: 'كراج', selected: false},
            { _id: 3, nameAr: 'حوض سباحة', selected: false},
            { _id: 6, nameAr: 'نوافذ مبطنة', selected: false}
        ]
    )



    const handleMarkerPress = (item) => {
        const index = features.findIndex(ite => ite._id === item._id)
        features[index]={...features[index], selected: true}
        let arr = []
        features.forEach(item0 => item0._id === item._id ? arr.push({...features[index], selected: !item.selected}):arr.push(item0))
        setFeatures(arr)
    }
    
    console.log('Hello Features', props)

    return (
    <Animated.View style={[styles.container, props.containerStyle,]}>
        {
            props.features?
            <View style={{flexDirection: 'row', flexWrap: 'wrap',  justifyContent: 'flex-end'}} >
                {
                    features.map( (item, index) => <RealestateType key={index} doAnimation={true} item={item} index={index} onPress={()=> setSelectedRealestateType(item)} selected={ selectedRealestateType._id === item._id } /> )
                }
            </View>
            :
            <View style={{flexDirection: 'row', flexWrap: 'wrap',  justifyContent: 'flex-end', width: '100%'}} >
                {
                    (props.realEstateFeatures || []).map( (item, index) => (
                        // <RealestateType key={index} doAnimation={true} item={item} index={index} onPress={()=> setSelectedRealestateType(item)} selected={ selectedRealestateType._id === item._id } />
                        <View
                            style={{
                                flexDirection: 'row',
                                marginRight: 10,
                                marginTop: 10,
                                alignSelf:'center',
                                justifyContent:'flex-end',
                                alignItems: 'flex-end',
                                paddingHorizontal: 10
                                // width: Metrics.screenWidth * 0.25466667,
                            }}
                        >
                            <Text
                                style={[ Fonts.style.normal,{
                                    opacity: 0.8,
                                    fontSize: 13,
                                    fontWeight: "normal",
                                    fontStyle: "normal",
                                    lineHeight: 17,
                                    letterSpacing: 0,
                                    textAlign: "right",
                                    color: Colors.black,
                                    marginRight: 7,
                                }]}
                            >{item.nameAr}</Text>
                            <Image source={Images.checkBoxIcon} />
                        </View>
                        ) )
                }
            </View>
        }
    </Animated.View>
)}

const styles = StyleSheet.create({
    container:{
        alignItems:'flex-end',
        justifyContent:'center',
        alignSelf:'center',
        flexDirection: 'row',
        marginTop: 20
    },

    textStyle: {
    
    }
   
})

export default (AqarFeatures)


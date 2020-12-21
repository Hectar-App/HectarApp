import React, {useState, useEffect} from 'react'
import { View, Text, Platform, Image, StyleSheet, Animated, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import Modal from "react-native-modal";
import {IconButton} from 'react-native-paper'
import { useAnimation } from '../assets/Animation/animation'
import {Fonts, Metrics, Colors, Images} from '../Themes'
import StarRating from 'react-native-star-rating';
import Button from './Button'

const RatingModal = (props) => {
    const animtion = useAnimation({ doAnimation: props.doAnimation, duration:550})

    const [radioButtonD, setRadioButtonD]= useState([
        {_id: 0, name: 'المعلومات المعروضة غير لائقة' },
        {_id: 1, name: 'معاملة سيئة' },
        {_id: 2, name: 'معلومات غير صحيحة' },
    ])

    const radio1 = [
        {_id: 0, name: 'المعلومات المعروضة غير لائقة' },
        {_id: 1, name: 'معاملة سيئة' },
        {_id: 2, name: 'معلومات غير صحيحة' },
    ]
    
    const radio2 = [
        {_id: 0, name: 'ليس هنك رد' },
        {_id: 1, name: 'إخلاف في المواعيد' },
        {_id: 2, name: 'معلومات مغلوطة' },
        {_id: 3, name: 'مواصفات الواقع غير مطابقة للإعلان' }
    ]

    const radio3 = [
        {_id: 0, name: ' تجاوب جيد' },
        {_id: 1, name: 'إلتزام بالمواعيد' },
        {_id: 2, name: 'التمكن من معاينة العقار' },
    ]

    const radio4 = [
        {_id: 0, name: 'تجاوب سريع' },
        {_id: 1, name: 'رد سريع' },
        {_id: 2, name: 'مواصفات العقار مطابقة للإعلان' },
        // {_id: 3, name: 'مقبول' }
    ]

    const radio5 = [
        {_id: 0, name: ' تجاوب رائع' },
        {_id: 1, name: 'معاملة راقية' },
        {_id: 2, name: ' تجربة مميزة' },
        {_id: 3, name: 'مواصفات العقار تفوق التوقع' }
    ]


    const [rating, setRating]= useState(1)

    const [selectedOption, setSelectedOption]= useState({_id: 0 })
    const [selectedOption1, setSelectedOption1]= useState([{_id: 18, name: '' }])

    // useEffect(()=> {
    //     alert(1)
    // }, [selectedOption1, setSelectedOption1])

    const handleAddItem = (item) => {
        let checker = selectedOption1.findIndex(i => i._id === item._id )
        
        let arr = selectedOption1; 
        // console.log('Checker', checker)
        
        if( checker !== -1 ){
            arr.splice(checker, 1)
        }else{
            arr.push(item); 
        }
        console.log('selectedOption1', arr)
        setSelectedOption1( x => x = [...arr])
        console.log('selectedOption1', selectedOption1)

        // setRating(rating); 
        // setRadioButtonD(( rating === 1 || rating === 2 )? radio2: ( rating === 3 )? radio3: radio4 ); 
        // setSelectedOption1([radioButtonD[0]])
    }





    return (
    <Animated.View style={[styles.container]}>
       <Modal 
            isVisible={props.isVisible}
            // isVisible={true}
            animationIn={"fadeInUp"}
            animationInTiming={750}
            swipeDirection={"down"}
            swipeThreshold={50}
            onSwipe={props.onSwipe}
            style={{ width: Metrics.screenWidth, height: Metrics.screenHeight}}
        >
          {!props.done ? 
            <View style={[styles.containerView]}>

                <IconButton icon={'close'} style={{position: 'absolute', top: 10, right: 10}} onPress={props.onClose} />
                <Text style={[Fonts.style.normal, styles.inputStyle]}>إختر نوع الحساب</Text>
                <Text style={[Fonts.style.normal, {
                    fontSize: 13,
                    fontWeight: "normal",
                    fontStyle: "normal",
                    lineHeight: 17,
                    letterSpacing: 0,
                    textAlign: "right",
                    color: "#424a4e",
                    marginEnd: 30,
                    marginTop: 10
                }]}>من فضلك , اخبرنا اكثر عن تجربتك لهذا العقار</Text>

                <StarRating
                    disabled={false}
                    maxStars={5}
                    rating={rating}
                    fullStarColor={ rating === 1? Colors.fire: rating === 2? Colors.primaryOrange: rating === 3? Colors.yellow: rating === 4? Colors.eventsCategories.education: Colors.darkSeafoamGreen}
                    emptyStarColor={'rgba(17, 51, 81, 0.5)'}
                    containerStyle={{width: 217.5, alignSelf: 'center', marginTop: 30, marginBottom: 20}}
                    selectedStar={(rating) => {setRating(rating); setRadioButtonD(( rating === 1 )? radio1: ( rating === 2 )? radio2: ( rating === 3 )? radio3: ( rating === 4 )? radio4: radio5 ); setSelectedOption1([radioButtonD[0]])}}
                />
                    {  radioButtonD.map((item) => {
                        let checker = selectedOption1.findIndex(i => i._id === item._id )
                        console.log('Checker', checker)
                        return(
                            <TouchableOpacity onPress={()=> handleAddItem(item)} style={[{width: '100%', paddingRight: 19, marginTop: 10,alignItems:'center', justifyContent:'flex-end' }, styles.row]} >
                                {/* <Text style={[Fonts.style.normal, styles.textPhone ]}> {item.name} </Text> */}
                                <View style={{
                                    // width: 13,
                                    // height: 13,
                                    // backgroundColor:  "#ffffff",
                                    // borderStyle: "solid",
                                    // borderWidth: 1,
                                    // borderColor: Colors.darkSeafoamGreen,
                                    // marginStart: 15,
                                    // marginEnd: 12,
                                    // borderRadius: 13/2, 
                                    // justifyContent:'center',
                                    // alignItems:'center'
                                }} >
                                    {/* { checker !== -1 &&
                                        <View style={{
                                            width:8, height:8, borderRadius: 4, 
                                            backgroundColor:Colors.darkSeafoamGreen
                                        }} />
                                    } */}

                                    <TouchableOpacity onPress={()=> handleAddItem(item)} style={[styles.container2, props.containerStyle]}>
                                        <View style={[styles.row, {marginEnd:12}]}>
                                            <Text style={[Fonts.style.normal, styles.textTitle ]} >{item.name || 'أوافق على'}</Text>
                                        </View>
                                        <Animated.View style={[styles.checkBox, { borderColor: props.doAnimation? color: '#cbccd0', justifyContent:'center', alignItems:'center',  backgroundColor: props.doAnimation? backgroundColor: Colors.white, }]} >
                                            { checker !== -1 && 
                                                <View style={{
                                                    width:12, height: 12,
                                                    borderRadius: 1,
                                                    backgroundColor:Colors.darkSeafoamGreen
                                                }} />
                                            }
                                        </Animated.View>
                                    </TouchableOpacity>

                                </View>
                            </TouchableOpacity>
                        )
                    })
                    }


                    <Button loading={props.loading} disabled={props.loading} containerStyle={{marginTop: 40, position: 'absolute', bottom: 30}}  buttonText={'تم'} onPress={() => props.onDonePress(rating, selectedOption1)} />
            </View>
          :  <View style={[styles.containerView]}>
                  <IconButton icon={'close-circle-outline'} style={{position: 'absolute', top: 10, right: 10}} onPress={props.onClose} />
                  <Text style={[Fonts.style.normal, styles.inputStyle, {textAlign: 'center',}]}>شكرا لك</Text>

                  <Image source={Images.gifTest} style={{width: '70%', marginTop: 20, borderRadius: 20, height: '70%', alignSelf: 'center',shadowColor: '#fff', shadowOffset: {width:0, height: 0}, shadowOpacity: 1, shadowRadius: 2,}} />

                  <Text style={[Fonts.style.normal, {
                    fontSize: 13,
                    fontWeight: "400",
                    fontStyle: "normal",
                    lineHeight: 17,
                    letterSpacing: 0,
                    textAlign: "center",
                    color: '#000',
                    // marginEnd: 30,
                    marginTop: 10
                }]}>شكرا لتقييم تجربتك مع هذا العقار</Text>
            </View>
          }
        </Modal>
    </Animated.View>
)}

const styles = StyleSheet.create({
    container:{
        width: Metrics.screenWidth,
        // alignSelf:'center',
        // justifyContent:'center',
        // height: Metrics.screenHeight,
        borderRadius: 8,
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: Colors.cloudyBlue, 
        // backgroundColor:'red', 
        position:'absolute', 
        zIndex: 99,
    },
    container2: {
        width: Metrics.screenWidth * 0.84,
        alignSelf:'center',
        justifyContent:'flex-end',
        // height: 50,
        borderRadius: 8,
        borderStyle: "solid",
        alignItems:'center',
        // borderWidth:1,
        flexDirection:'row'
    },
    row:{
        flexDirection:'row',
    },
    inputStyle: {
        // width: '100%',
        fontSize: 13,
        fontStyle: "normal",
        // lineHeight: 16,
        letterSpacing: 0,
        textAlign: "right",
        color: Colors.black,
        marginBottom: 25,
        alignSelf: 'center',
        fontSize: 20,
        fontWeight: Platform.OS === 'android'?'400': "bold",
        fontStyle: "normal",
        lineHeight: 29,
        letterSpacing: 0,
        textAlign: "right",
        color: Colors.black,
    },
    passShowView:{ 
        height:20, 
        position:'absolute', 
        left:20, 
        alignSelf:'center',
        zIndex:99
    },
    text:{
        fontSize:12,
        color:'rgb(141,141,141)'
    },
    textPhone:{
        fontSize: 14,
        fontWeight: Platform.OS === 'android'?'400': "bold",
        fontStyle: "normal",
        lineHeight: 18,
        letterSpacing: 0,
        textAlign: "right",
        color: Colors.black
      
    },
    containerView: {
        // justifyContent:'center', 
        // alignItems:'center', 
        backgroundColor:'#fff', 
        width: Metrics.screenWidth , 
        paddingTop: 15, 
        paddingBottom: 40, 
        borderRadius: 20,
        height: 500,
        bottom:-20,
        position: 'absolute',
        right: 0,
        left: -20
    },
    textTitle:{
        color: Colors.black,
        // width: 100,
        // height: 29,
        fontFamily: "TheMixArabic",
        fontSize: 12,
        // fontWeight: "bold",
        fontStyle: "normal",
        lineHeight: 16,
        letterSpacing: 0,
        textAlign: "right",
        
    },
    textDesc:{
        width: 279,
        height: 52,
        fontSize: 13,
        fontWeight: "normal",
        fontStyle: "normal",
        lineHeight: 22,
        letterSpacing: 0,
        textAlign: "right",
        color: "#424a4e",
        paddingTop: 7
    },
    checkBox:{
        width: 19,
        height: 19,
        borderRadius: 2,
        backgroundColor: Colors.white,
        borderStyle: "solid",
        borderWidth: 1,

    }
})

export default (RatingModal)


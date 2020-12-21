import React, {useState, useEffect} from 'react'
import { View, Text, Platform, Image, StyleSheet, Animated, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import Modal from "react-native-modal";
import {IconButton, ActivityIndicator} from 'react-native-paper'
import { useAnimation } from '../assets/Animation/animation'
import {Fonts, Metrics, Colors, Images} from '../Themes'
import StarRating from 'react-native-star-rating';
import Button from './Button'

import RequestOrder from './requestOrder';
import AlertModal from './Alert'

const RequestModal = (props) => {
    const animtion = useAnimation({ doAnimation: props.doAnimation, duration:550})

    const [radioButtonD, setRadioButtonD]= useState([
        {_id: 1, name: 'تصوير احترافي', price: '٧٠ ريال', measurement: 'للغرفة الواحدة', reqested: props.request1 },
        {_id: 2, name: 'تصوير 360', price: '١٠٠ ريال', measurement: 'للغرفة الواحدة', reqested: props.request2 },
        {_id: 3, name: 'QR كود', price: '١٠٠ ريال', measurement: 'للوحة الواحدة', reqested: props.request3 }
    ])
    const [showAlert, setShowAlert] = useState(false)
    const [alertMessage, setAlertMessage] = useState('')
    const [alertTitle, setAlertTitle] = useState('')
    

    // console.log(radioButtonD)
    const [request360, setRequest360]= useState()

    const [selectedOption, setSelectedOption]= useState({_id: 0 })

    useEffect(()=> {
        console.log( 'props. of requests', props)
        setRadioButtonD([
            {_id: 1, name: 'تصوير احترافي', price: '٧٠ ريال', measurement: 'للغرفة الواحدة', desc: 'احصل على صور احترافية عالية الدقة لعقارك', reqested: props.request1 },
        {_id: 2, name: 'تصوير 360', price: '١٠٠ ريال', measurement: 'للغرفة الواحدة', desc: 'احصل على صور ٣٦٠ درجة لعقارك، اجعل الزائر يزور عقارك بدون أن يغادر بيته', reqested: props.request2 },
        {_id: 3, name: 'QR كود', price: '١٠٠ ريال', measurement: 'للوحة الواحدة', desc: "طباعة وتركيب لوحة للكيو ار كود الخاص بك والذي يشمل موقع العقار وجميع عقاراتك الأخرى", reqested: props.request3 }
        ])
    }, [props.request1, props.request2, props.request3])

    const handleMoreInfo = (i) => {
        setAlertMessage(i.desc)
        setAlertTitle(i.name)
        setShowAlert(true)
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
          {!props.done || true ? 
            <View style={[styles.containerView]}>

                <IconButton icon={'close'} style={{position: 'absolute', top: 10, right: 10}} onPress={props.onClose} />
                <Text style={[Fonts.style.normal, {marginBottom: 14, textAlign: 'center', marginTop: 3}, styles.inputStyle]}> اطلب خدماتنا الان - طلبك الاول مجانا</Text>
                {/* <Text style={[Fonts.style.normal, {
                    fontSize: 13,
                    fontWeight: "normal",
                    fontStyle: "normal",
                    lineHeight: 17,
                    letterSpacing: 0,
                    textAlign: "right",
                    color: "#fff",
                    marginEnd: 30,
                    marginTop: 10,
                    alignSelf: 'center',
                    backgroundColor: Colors.primaryGreen,
                    padding: 7,
                }]}>طلبك الاول مجانا</Text> */}


                    <AlertModal closePress={() => setShowAlert(false)} title={alertTitle} closeErrorModel={() => setShowAlert(false)} buttonText={''} contentMessage={alertMessage}  isVisible={showAlert} />

                    {  radioButtonD.map((item) => {
                        return(
                            <RequestOrder infoPress={()=> handleMoreInfo(item)} price={item.price} measurement={item.measurement} loading={props.loading === item._id} reqested={item.reqested} onPress={()=> props.onRequest(item)} containerStyle={{marginTop: 30}} orderName={item.name} />
                        )
                    })
                    }
                    
                    {(props.request1 || props.request2 || props.request3) && 
                        <Text style={[Fonts.style.normal, {
                        fontSize: 12,
                        fontWeight: "400",
                        fontStyle: "normal",
                        lineHeight: 17,
                        letterSpacing: 0,
                        textAlign: "center",
                        color: '#000',
                        // marginEnd: 30,
                        marginTop: 15,
                        }]}>
                            سيتم التواصل معك في اقرب فرصة بخصوص الطلبات لتنفيذها
                        </Text>
                    }
                    {/* {props.loading && <ActivityIndicator style={{marginTop: 12}} color={Colors.darkSeafoamGreen} />} */}


                    {/* <Button loading={props.loading} disabled={props.loading} containerStyle={{marginTop: 40, position: 'absolute', bottom: 30}}  buttonText={'تم'} onPress={() => props.onDonePress(rating, selectedOption)} /> */}
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
                }]}>سيتم التواصل معك في اقرب فرصة  بخصوص الطلبات لتنفيذها</Text>
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
    row:{
        flexDirection:'row',
    },
    inputStyle: {
        // width: '100%',
        fontStyle: "normal",
        // lineHeight: 16,
        letterSpacing: 0,
        textAlign: "right",
        color: Colors.black,
        // paddingEnd: Metrics.screenWidth * .32,
        alignSelf: 'center',
        fontSize: 15,
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
        height: 400,
        bottom:-20,
        position: 'absolute',
        right: 20,
        left: -20, 
    }
})

export default (RequestModal)


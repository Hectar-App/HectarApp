import React, {useState, useEffect} from 'react'
import { View, Text, Platform, TextInput, Image, StyleSheet, Animated, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import Modal from "react-native-modal";
import {IconButton, } from 'react-native-paper'
import { useAnimation } from '../assets/Animation/animation'
import {Fonts, Metrics, Colors, Images, CustomIcon} from '../Themes'
import StarRating from 'react-native-star-rating';
import Button from './Button'
import ImagePicker from 'react-native-image-crop-picker';
import ImagePickerCamera from 'react-native-image-picker';

import AlertModal from './Alert'
import ErroAlert from './ErrorAlert'

const RatingModal = (props) => {


    const [title, setTitle]= useState('')
    const [desc, setDesc]= useState('')

    const [ showErrorMessage, setShowErrorMessage ] = useState(false)
    const [ errorMessage, setErrorMessage ] = useState()
    const [ showAlert, setShowAlert ] = useState(false)
    const [ alertMessage, setAlertMessage ] = useState()
    const [ okButtonText, setOkButtonText ] = useState()
    const [ cancelButtonText, setCancelButtonText ] = useState()

    const [image, setImage] = useState()

    const onAddingImagePress = () => {

        setShowAlert(true)
        setAlertMessage('اضافة الصور')
        setOkButtonText('كاميرا')
        setCancelButtonText('استديو')
    }

    const handleSaveBluePrint = () => {
        
        if(!image ){
            setErrorMessage('يجب كتابة عنوان المخطط واضافة صورته وكتابة وصف لاكمال عملية اضافة المخطط')
            setShowErrorMessage(true)
            return
        }

        props.bluePrint(image, title, desc)
    }

    const handleGallerySelect = () => {
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            // cropping: true,
            mediaType: 'image',
          }).then(image => {
           console.log('image',image)
            setImage({uri: image.path? image.path: image.sourceURL, path: image.path || image.sourceURL, type: image.mime, name: image.filename? image.filename: 'sdkjfhg'})
            // setSelectedImage(true)
            setShowAlert(false)
          });
    }

    const handleCameraSelect = () => {

        const options = {
            title: '',
            storageOptions: {
              skipBackup: true,
              path: 'images',
            },
            cancelButtonTitle: 'الغاء'
          };
        ImagePickerCamera.showImagePicker(options, (response) => {
            if (response.didCancel) {
              console.log('User cancelled image picker');
            } else if (response.error) {
              console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
              console.log('User tapped custom button: ', response.customButton);
            } else {
              if (response && response.type) {
                setImage({
                    type: response.type,
                    name: response.fileName || response.path,
                    uri: response.uri || response.path
                  })
                // setSelectedImage(true)
                setShowAlert(false)
              }
            }})

    }


    

    

    return (
    <Animated.View style={[styles.container]}>
       <Modal 
            isVisible={props.isVisible}
            // isVisible={true}
            animationIn={"fadeInLeft"}
            animationInTiming={750}
            swipeDirection={"fadeInLeft"}
            swipeThreshold={50}
            onSwipe={props.onSwipe}
            onBackdropPress={props.onSwipe}
            // style={{ width: Metrics.screenWidth, alignItems: 'center', justifyContent: 'center', height: Metrics.screenHeight}}
        >
            <View style={[styles.containerView]}>
                <View
                    style={{
                        // borderWidth: 1,
                        marginTop: 26,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        paddingHorizontal: 20
                    }}
                >
                    <View
                        style={{}}
                    >

                        <TouchableOpacity onPress={handleSaveBluePrint} style={{padding: 8}} >
                            <Text
                                style={{...Fonts.style.normal, fontWeight: 'normal', }}
                            >
                                حفظ
                            </Text>
                        </TouchableOpacity>
                        
                    </View>

                    <TextInput 
                        style={{
                            ...Fonts.style.normal, 
                            color: '#000',
                            width: 97,
                            fontSize: 13,
                            textAlign: 'right'
                        }}
                        numberOfLines={1}
                        placeholder={'اسم المخطط'}
                        value={title}
                        onChangeText={v => setTitle(v)}
                    />

                </View>

                {image ?
                <View
                    style={{
                        width: Metrics.screenWidth * .84 - 40,
                        height: 116,
                        borderRadius: 6,
                        // backgroundColor: "#fbfbfb",
                        // borderStyle: "solid",
                        // borderWidth: 1,
                        // borderColor: "rgba(17, 51, 81, 0.7)"
                        alignSelf: 'center',
                        marginTop:26,
                        justifyContent:'center',
                        alignItems:'center',
                        marginVertical: 12,
                    }}
                >
                    <Image style={{width: '100%', height: 116, borderRadius: 25}} source={{uri: image.uri? image.uri: image}} />
                    <TouchableOpacity onPress={()=> setImage(null)} source={Images.imageDeleteCloseIcon} style={{width: 16, justifyContent:'center', alignItems:'center', height: 16, borderRadius: 8, left: 12, top: 15, backgroundColor: Colors.redWhite, position: 'absolute'}} >
                        <Image source={Images.imageDeleteCloseIcon} style={{width: 5.9, height: 5.9}} />
                    </TouchableOpacity>
                </View>
                :<TouchableOpacity
                    style={{
                        width: Metrics.screenWidth * .84 - 40,
                        height: 116,
                        borderRadius: 6,
                        // backgroundColor: "#fbfbfb",
                        // borderStyle: "solid",
                        // borderWidth: 1,
                        // borderColor: "rgba(17, 51, 81, 0.7)"
                        alignSelf: 'center',
                        marginTop:26,
                        justifyContent:'center',
                        alignItems:'center',
                        marginVertical: 12,
                    }}
                    // onPress={()=> this.onAddingImagePress()}
                    onPress={onAddingImagePress}
                >
                    <View style={{justifyContent:'center'}} >
                        <Image style={{width: Metrics.screenWidth * .84 - 40, resizeMode: 'contain'}} source={require('../assets/imgs/Rectangle3.png')} />
                        <View
                            style={{
                                position: 'absolute',
                                width: 100,
                                alignSelf:'center',
                                justifyContent:'center'
                            }}
                        >
                            <IconButton icon={'plus'} color={Colors.brownGrey} style={{alignSelf:'center'}} />
                            <Text style={[ Fonts.style.normal, {alignSelf:'center', fontSize: 12, color: Colors.brownGrey }]} >أضف مخطط جديد</Text>
                        </View>
                    </View>
                </TouchableOpacity>}

                <AlertModal closePress={()=> setShowAlert(false)} closeErrorModel={handleGallerySelect} onOkPress={handleCameraSelect} whiteButton={true} cancelButtonText={cancelButtonText} okButtonText={okButtonText} twoButtons={true} contentMessage={alertMessage}  isVisible={showAlert} />

                {showErrorMessage && <ErroAlert top={-120} down={-300} errorMessage={errorMessage} setAnimation={()=> setShowErrorMessage(false)} doAnimation={showErrorMessage} /> }


                <TextInput 
                    style={{
                        ...Fonts.style.normal, 
                        color: '#000',
                        width: Metrics.screenWidth * .84 - 40 ,
                        marginHorizontal: 20,
                        fontSize: 13,
                        textAlign: 'right',
                        borderWidth: 1,
                        alignSelf: 'center',
                        height: '25%',
                        borderRadius: 5,
                        padding: 6,
                        paddingTop: 8,
                        borderColor: Colors.grey
                    }}
                    multiline={true}
                    numberOfLines={1}
                    placeholder={'توصيف'}
                    value={desc}
                    onChangeText={v => setDesc(v)}
                />

            </View>
        </Modal>
    </Animated.View>
)}

const styles = StyleSheet.create({
    container:{
        width: Metrics.screenWidth,
        // alignSelf:'center',
        // justifyContent:'center',
        // height: Metrics.screenHeight,
        // borderRadius: 8,
        // borderStyle: "solid",
        // borderWidth: 1,
        // borderColor: Colors.cloudyBlue, 
        // backgroundColor:'red', 
        // position:'absolute', 
        // zIndex: 99,
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
        alignSelf:'center', 
        backgroundColor:'#fff', 
        width: Metrics.screenWidth , 
        // paddingTop: 15, 
        // paddingBottom: 40, 
        borderRadius: 20,
        height: 356,
        width: Metrics.screenWidth * .84
        // bottom:-20,
        // position: 'absolute',
        // right: 0,
        // left: -20
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


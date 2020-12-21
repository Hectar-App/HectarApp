import React from 'react'
import {Text, View, Platform, StyleSheet} from 'react-native'
import { Colors, Fonts, Metrics, modalStyles } from "../Themes";


// import React, {useState, useEffect} from 'react'
// import { View, Text, Platform, Image, StyleSheet, Animated, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import Modal from "react-native-modal";
import {IconButton} from 'react-native-paper'
import Button from './Button'


const Alert = (props)=> {

    return(
        <Modal
        style={[modalStyles.wrapper, modalStyles.boxed.wrapper, modalStyles.tiny.wrapper]}
        animationIn={'fadeInUp'}
        animationInTiming={750}
        swipeDirection={'down'}
        swipeThreshold={50}
        // onBackdropPress={this.closeErrorModel}
        onSwipe={props.closePress || props.closeErrorModel}
        onBackdropPress={props.closePress || props.closeErrorModel}
        isVisible={props.isVisible}
        backdropColor={Colors.backdrop}>
            <View style={[modalStyles.boxed.body, modalStyles.tiny.body]}>
            {/* <Text style={{position: 'absolute', top: 20, right: 20}}>X</Text> */}
                <IconButton onPress={props.closePress? props.closePress: props.closeErrorModel} style={modalStyles.closeStyle} icon={'close'} />
                <View style={[modalStyles.tiny.content]}>
                    <Text style={modalStyles.tiny.content.title}>{ props.title || "تنبيه"}</Text>
                    <Text style={[modalStyles.tiny.content.text, {marginTop: 15, fontSize: 14}]}>{ props.contentMessage ? props.contentMessage: "حدث خطأ داخلي الرجاء المحاولة في وقت لاحق"}</Text>
                </View>
                { props.twoButtons?
                    <View style={[modalStyles.row]}>
                        <Button halfButton={true} onPress={props.closeErrorModel} buttonText={props.cancelButtonText || 'الغاء'} textPropsStyle={[{paddingEnd: 0}, props.whiteButton && {color: '#000'}]} containerStyle={[modalStyles.halfButton, props.whiteButton && modalStyles.whiteButton]} />
                        <Button onPress={props.onOkPress} halfButton={true} textPropsStyle={[{color: '#000', paddingEnd: 0}, props.okTextStyle]} buttonText={props.okButtonText || 'حسنا'} containerStyle={[modalStyles.halfButton, modalStyles.whiteButton]} />
                    </View>
                    : 
                    <Button buttonText={ props.buttonText? props.buttonText: 'حسنا'} textPropsStyle={{paddingEnd: 0}} onPress={props.closeErrorModel} containerStyle={[modalStyles.fullButton]} />
                }
            </View>
        </Modal>
    )
}

  

  export default Alert
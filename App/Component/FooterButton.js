import React from 'react'
import { View, Text, TextInput, StyleSheet, Animated, TouchableOpacity } from 'react-native';
import { useAnimation } from '../assets/Animation/animation'
import {Fonts, Metrics, Colors} from '../Themes'
import { ActivityIndicator } from 'react-native-paper';

const Button = (props) => {
    const animtion = useAnimation({ doAnimation: props.doAnimation, duration:550})
    const animtion2 = useAnimation({ doAnimation: props.doAnimation2, duration:550})

    const changeWidth = animtion2.interpolate({inputRange: [0,1], outputRange: [Metrics.screenWidth * 0.42933333, 48]})
    return (
        <Animated.View style={[styles.backgroundStyle, ]} >
            <Animated.View style={[styles.container, props.halfButton && {width: Metrics.screenWidth * 0.42933333, height: 46, }, {backgroundColor: props.doAnimation? animtion.interpolate({inputRange:[0,1], outputRange:['#fff',Colors.darkSeafoamGreen]}): props.backgroundColorT? props.backgroundColorT: Colors.darkSeafoamGreen, shadowColor: props.shadowColor || "rgba(61, 186, 126, 0.25)"}, props.loading && {width: props.doAnimation ? changeWidth: 48, borderRadius: 24}, props.containerStyle]}>
                <TouchableOpacity disabled={props.disabled} style={styles.row} onPress={props.onPress} >
                    {!props.loading ? <Text style={[Fonts.style.normal, styles.inputStyle, props.textPropsStyle]} > {props.buttonText ? props.buttonText :'قيم تجربتك لهذا العقار'}</Text>: <ActivityIndicator color={'#fff'} animating={true}  />}
                </TouchableOpacity>
            </Animated.View>
        </Animated.View>
)}

const styles = StyleSheet.create({
    backgroundStyle:{
        width: Metrics.screenWidth,
        height: 105,
        shadowColor: "rgba(0, 0, 0, 0.1)",
        shadowOffset: {
          width: 0,
          height: 0
        },
        shadowRadius: 30,
        shadowOpacity: 1,
        justifyContent:'center',
        alignItems: 'center',
        position:'absolute',
        bottom: 0,
        backgroundColor: '#fff',
        elevation: 2
    },
    container:{
        width: 316,
        height: 48,
        borderRadius: 12,
        // backgroundColor: Colors.darkSeafoamGreen,
        shadowColor: "rgba(61, 186, 126, 0.25)",
        shadowOffset: {
          width: 0,
          height: 7
        },
        shadowRadius: 15,
        shadowOpacity: 1,
        alignItems:'center',
        justifyContent:'center',
        alignSelf:'center',
        elevation: 2
    },
    row:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        alignSelf:'center',
        width: '100%',
        height: '100%'
    },
    inputStyle: {
        width: '100%',
        fontSize: 14,
        fontWeight: "normal",
        fontStyle: "normal",
        lineHeight: 16,
        letterSpacing: 0,
        textAlign: "center",
        color: Colors.white,
        paddingEnd:17,
        alignSelf:'center'
    }
})

export default (Button)


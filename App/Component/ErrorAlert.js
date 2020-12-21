import React, {useState} from 'react'
import {View, Text, Animated, TouchableOpacity} from 'react-native'

import {Metrics, Fonts, Colors} from '../Themes'

import {useAnimation} from '../assets/Animation/animation'

const ErrorAlert = (props) => {

  const [doAnime, setDoAnime] = useState(props.doAnimation ? true: false)
  const errorAnimation = useAnimation({doAnimation: doAnime, duration: 660})

  setTimeout(() => {
    setDoAnime(false)
    setTimeout(() => {
      props.setAnimation(false)
    }, 1000);
  }, props.moreSecond? 6000: 3000);

  const errorAnimationTop = errorAnimation.interpolate({
    inputRange:[0,1],
    outputRange:[props.down? props.down: -60,props.top? props.top: 80]
  })

  return (
    <Animated.View
      style={{
        width: Metrics.screenWidth * 0.90666667,
        minHeight: Metrics.screenWidth * 0.15466667,
        backgroundColor: props.green? Colors.darkSeafoamGreen : '#ef3e3f',
        // borderWidth:1,
        position:'absolute',
        zIndex:99999,
        top:errorAnimationTop,
        // top: 80,
        paddingVertical: 8,
        alignSelf:'center',
        justifyContent:'center',
        borderRadius:Metrics.screenWidth * 0.04,
        shadowColor: props.green? Colors.darkSeafoamGreen : '#ef3e3f',
        shadowOffset:{width:0,height:0},
        shadowOpacity:1,
        elevation: 6 , 
        flexDirection:'row'
      }}
    >

        <TouchableOpacity
          style={{height:'100%', width: '80%', justifyContent:'center',alignItems:'center'}}
          onPress={()=> setDoAnime(false)}
        >
          <Text style={[Fonts.style.normal,{color:'#fff' , alignSelf:'center', textAlign: 'center' , fontSize: 16 ,}]}> {props.errorMessage || 'error Message'}</Text>
        </TouchableOpacity>

    </Animated.View>
  )
}


export default ErrorAlert
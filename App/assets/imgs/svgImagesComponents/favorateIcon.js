import React from 'react'
import Svg, { Path,  } from 'react-native-svg'
import {useAnimation} from '../../Animation/animation'
import {Animated} from 'react-native'

const SvgComponent = props => 
{
    const AnimtedPath = Animated.createAnimatedComponent(Path)
    const animtion = useAnimation({ doAnimation: props.doAnimation, duration:720})
    const test = animtion.interpolate({inputRange: [0, 1], outputRange: [ props.color? props.color: '#8d8d8d', props.green? 'rgb(61,186,126)': 'orange']})
    return (
        <Svg width={12.615} height={12.064} fill={'red'} {...props} style={{ alignSelf:'center'}}  >
            <AnimtedPath
                d="M6.916.378l1.423 2.883a.679.679 0 00.512.372l3.182.462a.679.679 0 01.375 1.158l-2.3 2.244a.679.679 0 00-.2.6l.543 3.169a.679.679 0 01-.986.716l-2.846-1.5a.68.68 0 00-.632 0l-2.846 1.5a.679.679 0 01-.986-.716l.544-3.167a.679.679 0 00-.2-.6L.205 5.253a.679.679 0 01.377-1.158l3.182-.462a.679.679 0 00.512-.372L5.699.378a.679.679 0 011.217 0z"
                fill={ props.doAnimation?  test: props.color? props.color: '#8d8d8d'}
            />
        </Svg>
    )
}

export default SvgComponent

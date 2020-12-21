import { Animated } from 'react-native';
import { useState, useEffect } from 'react';

export const useAnimation = ({ doAnimation, duration, test }) => {
  const [animation, setAnimation] = useState(new Animated.Value(0));
  
  useEffect(() => {
    Animated.timing(animation, {
      toValue: doAnimation ? test ? test :1 : 0,
      duration,
    }).start();
  }, [doAnimation]);

  return animation;
}
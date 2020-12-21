import React, { useEffect, useState, useLayoutEffect } from "react";
import { View, Text, I18nManager } from "react-native";
import moment from "moment";

const Timer = props => {
  const end = moment().add(props.type, props.number);
  const [timer, setTimer] = useState(null);

  useLayoutEffect(() => {
    const interval = setInterval(() => {
      const diff = moment.utc(end).diff(moment());
      if (diff > 0) {
        const _diff = moment.duration(diff);
        // console.log('@diff', diff)
        const min = _diff.minutes() > 9 ? _diff.minutes() : `0${_diff.minutes()}`
        const sec = _diff.seconds() > 9 ? _diff.seconds() : `0${_diff.seconds()}`
        setTimer(`${min}:${sec}`);
      } else {
        clearInterval(interval);
        props.done()
      }
    }, 1000 * 1);
    return () => clearInterval(interval);
  }, []);
  return <Text style={[props.style]} >{timer || '--'}</Text>;
};

export default Timer;

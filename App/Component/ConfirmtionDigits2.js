import React, { useRef, useEffect } from "react";
import { View, StyleSheet, TextInput as Input, Keyboard, TouchableWithoutFeedback } from "react-native";
import { useImmer } from 'use-immer';
import { Fonts, Colors, Metrics } from "../Themes";
// import Spacer from "components/SpacerComponent";

export default function InputView(props) {
  const [i1v, setI1v] = useImmer(null);
  const [i2v, setI2v] = useImmer(null);
  const [i3v, setI3v] = useImmer(null);
  const [i4v, setI4v] = useImmer(null);
  const [focused, setFocused] = useImmer(null);
  useEffect(() => {
    handleComplete();
  }, [i1v, i2v, i3v, i4v]);
  const i1 = useRef();
  const i2 = useRef();
  const i3 = useRef();
  const i4 = useRef();
  handleInputsBtw = i => {
    if (i === 1) i1.current.focus();
    if (i === 2) i2.current.focus();
    if (i === 3) i3.current.focus();
    if (i === 4) i4.current.focus();
  };
  handleNextOrPrev = e => {
    if (e.nativeEvent.key === "Backspace") {
      if (focused - 1 === 0) return;
      handleInputsBtw(focused - 1);
    } else {
      if (focused + 1 >= 5) return;
      handleInputsBtw(focused + 1);
    }
  };
  handleComplete = () => {
    if (i1v && i2v && i3v && i4v) {
        Keyboard.dismiss()
        props.getCode(`${i1v}${i2v}${i3v}${i4v}`)
    }
  };
  return (
    <View style={styles.container}>
    <TouchableWithoutFeedback onPress={() => i1.current.focus()}>
      <View style={styles.iView}>
        <Input
          ref={i1}
          autoFocus
          onKeyPress={e => handleNextOrPrev(e)}
          keyboardType={'numeric'}
          onChangeText={v => setI1v(state => state = v)}
          onFocus={() => setFocused(state => state =  1)}
          onBlur={() => setFocused(state => state = null)}
          maxLength={1}
          style={styles.i}
          placeholder={"1"}
          keyboardAppearance={'dark'}
        />
      </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={() => i2.current.focus()}>
      <View style={styles.iView}>
        <Input
          ref={i2}
          onKeyPress={e => handleNextOrPrev(e)}
          keyboardType={'numeric'}
          onChangeText={v => setI2v(state => state = v)}
          onFocus={() => setFocused(state => state = 2)}
          onBlur={() => setFocused(state => state = null)}
          maxLength={1}
          style={styles.i}
          placeholder={"2"}
          keyboardAppearance={'dark'}
        />
      </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={() => i3.current.focus()}>
      <View style={styles.iView}>
        <Input
          ref={i3}
          onKeyPress={e => handleNextOrPrev(e)}
          keyboardType={'numeric'}
          onChangeText={v => setI3v(state => state = v)}
          onFocus={() => setFocused(state => state = 3)}
          onBlur={() => setFocused(state => state = null)}
          maxLength={1}
          style={styles.i}
          placeholder={"3"}
          keyboardAppearance={'dark'}
        />
      </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={() => i4.current.focus()}>
      <View style={styles.iView}>
        <Input
          ref={i4}
          onKeyPress={e => handleNextOrPrev(e)}
          keyboardType={'numeric'}
          onChangeText={v => setI4v(state => state = v)}
          onFocus={() => setFocused(state => state = 4)}
          onBlur={() => setFocused(state => state = null)}
          maxLength={1}
          style={styles.i}
          placeholder={"4"}
          // keyboardAppearance={'dark'}
        />
      </View>
      </TouchableWithoutFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: Metrics.screenWidth * 0.84,
    // height: 80,
    flexDirection: "row",
    justifyContent: "space-between",
    // borderWidth: 1,
    alignSelf: 'center'
  },
  iView: {
    // height: 40,
    // width: 80,
    justifyContent: "center",
    alignItems: "center",
    // borderWidth:1,
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.white,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#89a3c2"
  },
  sepActiv: {
    height: 2,
    width: 70,
    backgroundColor: "blue"
  },
  sep: {
    backgroundColor: "#ECE7E9",
    width: 70,
    height: 2
  },
  i: {
    color: Colors.primaryGreen,
    // fontFamily: Fonts.style.normal,
    fontSize: 20,
    fontWeight: "400",
    lineHeight: 24,
    textAlign: "center",
    // height: 40,
    // width: 40,
    // borderWidth: 3
  }
});

import React, { useRef, useEffect } from 'react';
import {
  View,
  StyleSheet,
  TextInput as Input,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import { useImmer } from 'use-immer';
import { Colors, Metrics } from '../Themes';

export default function InputView(props) {
  const [i1v, setI1v] = useImmer(null);
  const [i2v, setI2v] = useImmer(null);
  const [i3v, setI3v] = useImmer(null);
  const [i4v, setI4v] = useImmer(null);

  useEffect(() => {
    if (i1v && i2v && i3v && i4v) {
      Keyboard.dismiss();
      props.getCode(`${i1v}${i2v}${i3v}${i4v}`);
    }
  }, [i1v, i2v, i3v, i4v]); // eslint-disable-line

  const i1 = useRef();
  const i2 = useRef();
  const i3 = useRef();
  const i4 = useRef();

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={() => i1.current.focus()}>
        <View style={styles.iView}>
          <Input
            ref={i1}
            keyboardType={'numeric'}
            onChangeText={v => {
              setI1v(state => (state = v));
              i2?.current?.focus();
            }}
            maxLength={1}
            style={styles.i}
            placeholder={'1'}
            keyboardAppearance={'dark'}
          />
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={() => i2.current.focus()}>
        <View style={styles.iView}>
          <Input
            ref={i2}
            keyboardType={'numeric'}
            onChangeText={v => {
              setI2v(state => (state = v));
              i3?.current?.focus();
            }}
            maxLength={1}
            style={styles.i}
            placeholder={'2'}
            keyboardAppearance={'dark'}
          />
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={() => i3.current.focus()}>
        <View style={styles.iView}>
          <Input
            ref={i3}
            keyboardType={'numeric'}
            onChangeText={v => {
              setI3v(state => (state = v));
              i4?.current?.focus();
            }}
            maxLength={1}
            style={styles.i}
            placeholder={'3'}
            keyboardAppearance={'dark'}
          />
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={() => i4.current.focus()}>
        <View style={styles.iView}>
          <Input
            ref={i4}
            keyboardType={'numeric'}
            onChangeText={v => setI4v(state => (state = v))}
            maxLength={1}
            style={styles.i}
            placeholder={'4'}
          />
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: Metrics.screenWidth * 0.84,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
  },
  iView: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.white,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#89a3c2',
  },
  sepActiv: {
    height: 2,
    width: 70,
    backgroundColor: 'blue',
  },
  sep: {
    backgroundColor: '#ECE7E9',
    width: 70,
    height: 2,
  },
  i: {
    color: Colors.primaryGreen,
    fontSize: 20,
    fontWeight: '400',
    lineHeight: 24,
    textAlign: 'center',
  },
});

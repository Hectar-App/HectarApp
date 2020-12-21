import React, { useEffect } from "react";
import { Keyboard } from "react-native";
import { useImmer } from 'use-immer';

export default function() {
  const [show, setShow] = useImmer(false);
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener("keyboardDidShow",() => setShow(state => state = true));
    const keyboardDidHideListener = Keyboard.addListener("keyboardDidHide", () => setShow(state => state = false));
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  });
  return show
}

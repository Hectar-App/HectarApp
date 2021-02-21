import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { NavigationActions, StackActions } from 'react-navigation';
import Icon from 'react-native-vector-icons/Entypo';
import { Colors } from '../../Themes';
import {
  perfectFont,
  perfectHeight,
  perfectWidth,
} from '../../utils/commonFunctions';

const SkipButton = ({ navigation }) => {
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.dispatch(
          StackActions.reset({
            index: 0,
            actions: [
              NavigationActions.navigate({
                routeName: 'bottomTab',
              }),
            ],
          }),
        );
      }}
      style={styles.btn}>
      <View style={styles.btnInnerContainer}>
        <Icon name={'chevron-small-left'} style={styles.icon} />
        <Text style={styles.text}>تخطي</Text>
      </View>
    </TouchableOpacity>
  );
};

export default SkipButton;

const styles = StyleSheet.create({
  btn: {
    alignItems: 'center',
    justifyContent: 'center',
    width: perfectWidth(82),
    height: perfectHeight(32),
    borderRadius: perfectWidth(45),
    borderWidth: perfectWidth(1),
    borderColor: Colors.darkSeafoamGreen,
    zIndex: 990,
  },
  text: {
    fontFamily: 'TheMixArab',
    fontSize: perfectFont(14),
    color: Colors.darkSeafoamGreen,
    fontWeight: '400',
  },
  icon: {
    fontSize: perfectFont(14),
    color: Colors.darkSeafoamGreen,
  },
  btnInnerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

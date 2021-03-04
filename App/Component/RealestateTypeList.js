import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Animated,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useAnimation } from '../assets/Animation/animation';
import { Fonts, Metrics, Colors, Images } from '../Themes';
import * as Progress from 'react-native-progress';
import RealestateType from './realestateType';
const Button = props => {
  const [selectedRealestateType, setSelectedRealestateType] = useState(
    (props.selectedTypeByProps && props.selectedTypeByProps) || '',
  );

  const [realestateType, setRealestatTypes] = useState([
    // { _id: 1, nameAr: 'الكل'},
    { _id: 2, nameAr: 'فيلا' },
    { _id: 5, nameAr: 'تجاري' },
    { _id: 6, nameAr: 'كراج' },
    { _id: 4, nameAr: 'قطعة أرض' },
    { _id: 3, nameAr: 'شقق سكنية' },
  ]);

  return (
    <Animated.View style={[styles.container, props.containerStyle]}>
      {props.features ? (
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'flex-end',
            width: '100%',
            marginHorizontal: 20,
          }}>
          {(props.features && props.features).map((item, index) => {
            const selected1 = props.forEditeng
              ? (props.selectedFeatures || []).findIndex(i => i === item)
              : (props.selectedFeatures || []).findIndex(
                  i => i._id === item._id,
                );
            return (
              <RealestateType
                key={index}
                forEditeng={props.forEditeng}
                doAnimation={true}
                item={item}
                index={index}
                onPress={() => props.onItemPress(item)}
                selected={selected1 !== -1}
              />
            );
          })}
        </View>
      ) : (
        <View
          style={{
            flexDirection: 'row-reverse',
            flexWrap: 'wrap',
            justifyContent: 'flex-start',
            width: '100%',
          }}>
          {(props.types || realestateType).map((item, index) => (
            <RealestateType
              key={index}
              doAnimation={true}
              item={item}
              index={index}
              onPress={() => {
                setSelectedRealestateType(item);
                props.selectedType(item);
              }}
              selected={selectedRealestateType._id === item._id}
            />
          ))}
        </View>
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    alignSelf: 'center',
    flexDirection: 'row',
  },

  textStyle: {},
});

export default Button;

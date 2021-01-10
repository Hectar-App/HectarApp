import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Colors} from '../../Themes';
import RadioButtonItem from '../RadioButtonItem';

const filterOptions = [
  {
    label: 'السعر من الاعلى للاقل',
    value: 'priceHiLo',
  },
  {
    label: 'السعر من الاقل للاعلى',
    value: 'priceLoHi',
  },
  {
    label: 'الاحدث',
    value: 'new',
  },
  {
    label: 'الأقدم',
    value: 'old',
  },
  {
    label: 'الأكثر اعجابا',
    value: 'mostLiked',
  },
];

const RealEstatePropsFilters = ({selectMethod, selectMethodValue}) => {
  return (
    <View style={styles.container}>
      {filterOptions.map(option => (
        <View style={styles.radioButtonContainer} key={option.value}>
          <RadioButtonItem
            onPress={() => selectMethod(option.value)}
            text={option.label}
            selected={selectMethodValue === option.value}
          />
        </View>
      ))}
    </View>
  );
};

export default RealEstatePropsFilters;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingVertical: 12,
    height: '100%',
  },
  radioButtonContainer: {
    flex: 1,
    marginTop: 10,
    justifyContent: 'center',
    paddingEnd: 20,
    borderBottomWidth: 0.4,
    paddingBottom: 5,
    marginHorizontal: 12,
    borderBottomColor: Colors.brownGrey,
  },
});

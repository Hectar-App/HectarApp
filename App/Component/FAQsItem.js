import React, { useState } from 'react';
import {
  View,
  Text,
  Platform,
  StyleSheet,
  Animated,
  TouchableOpacity,
} from 'react-native';
import { Fonts, Metrics, Colors } from '../Themes';
import { IconButton } from 'react-native-paper';
import { FlatList } from 'react-native-gesture-handler';
import { pathOr } from 'ramda';
const FAQsItem = props => {
  const [selectedMap, setSelectedMap] = useState({
    _id: 0,
    nameAr: 'الغرض من العقار',
    desc: 'سكني',
    selected: false,
  });
  return (
    <Animated.View style={[styles.container, props.containerStyle]}>
      <View style={{ justifyContent: 'flex-end', width: '100%' }}>
        <FlatList
          data={pathOr([], ['FAQs', 'faqs'], props)}
          style={{ width: Metrics.screenWidth }}
          contentContainerStyle={{
            justifyContent: 'center',
            alignItems: 'center',
            paddingBottom: 130,
          }}
          renderItem={({ item }) => {
            return (
              <View>
                <TouchableOpacity
                  style={{
                    width: Metrics.screenWidth * 0.87733333,
                    marginVertical: 5,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingVertical: 8,
                    backgroundColor:
                      selectedMap._id === item._id
                        ? Colors.darkSlateBlue
                        : Colors.primaryGreen,
                    borderRadius: 10,
                    paddingHorizontal: 12,
                  }}
                  onPress={() => {
                    selectedMap._id === item._id
                      ? setSelectedMap({ _id: 0 })
                      : setSelectedMap(item);
                  }}>
                  <Text style={[Fonts.style.normal, styles.textStyle]}>
                    {item.question}
                  </Text>
                  <IconButton icon={'triangle'} size={8} color={'#fff'} />
                  <Text
                    style={[
                      Fonts.style.normal,
                      styles.textStyle,
                      { color: '#fff' },
                    ]}>
                    {item.question}
                  </Text>
                </TouchableOpacity>
                {selectedMap._id === item._id && (
                  <Animated.View
                    style={{
                      marginTop: -10,
                      zIndex: -1,
                      backgroundColor: '#fff',
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderStyle: 'solid',
                      borderColor: '#e0e0e0',
                      borderRadius: 4,
                      paddingHorizontal: 8,
                      width: Metrics.screenWidth * 0.87733333,
                    }}>
                    <Text
                      style={[
                        Fonts.style.normal,
                        {
                          opacity: 0.8,
                          fontSize: 12,
                          fontWeight: 'normal',
                          fontStyle: 'normal',
                          lineHeight: 24,
                          letterSpacing: 0,
                          textAlign: 'right',
                          color: Colors.black,
                          marginTop: 22,
                          marginBottom: 22,
                        },
                      ]}>
                      {item.answer}
                    </Text>
                  </Animated.View>
                )}
              </View>
            );
          }}
        />
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    alignSelf: 'center',
  },

  textStyle: {
    fontSize: 13,
    fontWeight: Platform.OS === 'android' ? '400' : 'bold',
    fontStyle: 'normal',
    lineHeight: 17,
    letterSpacing: 0,
    textAlign: 'right',
    color: Colors.black,
    width: '80%',
    paddingHorizontal: 3,
  },
});

export default FAQsItem;

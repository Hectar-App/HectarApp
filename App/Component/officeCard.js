import React from 'react';
import {
  Animated,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Colors, CustomIcon, Fonts, Metrics } from '../Themes';

const officeCard = props => {
  const {
    geometry: {
      location: { lat, lng },
    },
    name,
  } = props.selectedOffice;

  return (
    <TouchableOpacity style={[styles.container]} onPress={props.onCardPress}>
      <Animated.View style={[props.containerStyle]}>
        <View style={styles.conView}>
          <View
            style={{
              flex: 1,
              height: 81,
              alignSelf: 'center',
              justifyContent: 'center',
              alignItems: 'flex-end',
            }}>
            <Text
              style={[
                Fonts.style.normal,
                styles.textCard,
                { marginBottom: 9 },
              ]}>
              {name}
            </Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text
                style={[
                  Fonts.style.normal,
                  {
                    fontSize: 12,
                    width: '90%',
                    textAlign: 'right',
                    marginEnd: 5,
                    alignSelf: 'center',
                    color: '#464646',
                  },
                ]}>
                {name}
              </Text>
            </View>
            <Text
              style={[Fonts.style.normal, styles.textCard, { marginTop: 7 }]}
            />
          </View>
          <View
            style={{
              height: 81,
              width: Metrics.screenWidth * 0.21066667,
              alignSelf: 'center',
              marginStart: 13,
              marginEnd: 16,
              borderRadius: 10,
            }}
          />

          <TouchableOpacity
            style={{
              width: 25,
              height: 25,
              borderRadius: 5,
              backgroundColor: 'rgba(17,51,81,.03)',
              position: 'absolute',
              top: 15,
              left: 19,
              justifyContent: 'center',
              alignItems: 'center',
              zIndex: 999,
            }}
            onPress={props.onFavPress}>
            <CustomIcon
              name={props.fav ? 'bookmark2' : 'bookmark2-o'}
              size={18}
              color={Colors.darkSeafoamGreen}
            />
          </TouchableOpacity>
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: Metrics.screenWidth,
    height: 164,
    shadowColor: 'rgba(0, 0, 0, 0.08)',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowRadius: 15,
    shadowOpacity: 1,
    alignItems: 'center',
    elevation: 2,
  },
  conView: {
    width: Metrics.screenWidth * 0.91466667,
    height: Metrics.screenWidth * 0.30666667,
    backgroundColor: '#ffffff',
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    borderRadius: 20,
    shadowOpacity: 1,
    flexDirection: 'row',
    elevation: 2,
  },
  textCard: {
    fontSize: 15,
    alignSelf: 'center',
    color: Colors.darkSlateBlue,
    fontWeight: Platform.OS === 'android' ? '400' : 'bold',
    width: '100%',
    textAlign: 'right',
  },
});

export default officeCard;

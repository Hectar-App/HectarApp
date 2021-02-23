import React from 'react';
import {
  Animated,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Colors, Fonts, Metrics } from '../Themes';

const officeCard = props => {
  const {
    geometry: {
      location: { lat, lng },
    },
    name,
    for_rent,
    for_sale,
  } = props.selectedOffice;

  return (
    <TouchableOpacity
      style={[styles.container]}
      onPress={() => props.onItemPress(props.selectedOffice)}>
      <Animated.View style={[props.containerStyle]}>
        <View style={styles.conView}>
          <View style={[styles.textCardContainer]}>
            <Text
              style={[
                Fonts.style.normal,
                styles.textCard,
                { marginBottom: 9 },
              ]}>
              {name}
            </Text>
            <View style={{ flexDirection: 'row' }}>
              <Text
                style={[
                  Fonts.style.normal,
                  {
                    fontSize: 10,
                    width: '90%',
                    textAlign: 'right',
                    color: '#7c7c7c',
                  },
                ]}>
                {name}
              </Text>
              <Image
                style={{
                  marginStart: 5,
                }}
                source={require('../assets/imgs/001-location1.png')}
              />
            </View>
            <Text
              style={[
                Fonts.style.normal,
                styles.textCard,
                { fonrSize: 10, marginTop: 4, color: Colors.darkSeafoamGreen },
              ]}>
              مناطق الخدمة
            </Text>
            {props.showContactButtons && (
              <View style={{ flexDirection: 'row-reverse', padding: 10 }}>
                <TouchableOpacity style={[styles.contactBtn]}>
                  <Text style={{ color: Colors.white, marginHorizontal: 5 }}>
                    اتصال
                  </Text>
                  <Image source={require('../assets/imgs/call2.png')} />
                </TouchableOpacity>
                <TouchableOpacity style={{ marginHorizontal: 10 }}>
                  <Image
                    source={require('../assets/imgs/whatsapp-outline.png')}
                  />
                </TouchableOpacity>
                <TouchableOpacity style={[styles.socialBtn]}>
                  <Image
                    source={require('../assets/imgs/telegram-outlined.png')}
                  />
                </TouchableOpacity>
              </View>
            )}
          </View>
          {props.showCounts && (
            <View style={[styles.counterViewContainer]}>
              <View style={[styles.counterView]}>
                <Text style={[styles.counterViewText]}>للايجار</Text>
                <Text style={{ fontWeight: 'bold' }}>
                  {for_rent}{' '}
                  <Text
                    style={[
                      Fonts.style.normal,
                      styles.textCard,
                      { fontWeight: '100' },
                    ]}>
                    عقار
                  </Text>
                </Text>
              </View>
              <View
                style={{
                  borderBottomWidth: 0.6,
                  borderBottomColor: Colors.lightGrey,
                  width: '100%',
                }}
              />
              <View style={[styles.counterView, { paddingBottom: 5 }]}>
                <Text style={[styles.counterViewText]}>للبيع</Text>
                <Text style={{ fontWeight: 'bold' }}>
                  {for_sale}{' '}
                  <Text
                    style={[
                      Fonts.style.normal,
                      styles.textCard,
                      { fontWeight: '100' },
                    ]}>
                    عقار
                  </Text>
                </Text>
              </View>
            </View>
          )}

          {/* <TouchableOpacity
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
          </TouchableOpacity> */}
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: Metrics.screenWidth,
    marginBottom: 15,
    //height: 100,
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
  contactBtn: {
    borderRadius: 12,
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 3,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.darkSeafoamGreen,
  },
  conView: {
    // width: Metrics.screenWidth * 0.91466667,
    // height: Metrics.screenWidth * 0.35666667,
    width: '95%',
    backgroundColor: '#ffffff',
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    borderRadius: 8,
    shadowOpacity: 1,
    flexDirection: 'row-reverse',
    elevation: 2,
  },
  textCardContainer: {
    flex: 1,
    borderLeftWidth: 0.5,
    borderLeftColor: Colors.lightGrey,
  },
  textCard: {
    fontSize: 12,
    paddingTop: 10,
    paddingRight: 10,
    color: Colors.darkSlateBlue,
    width: '100%',
    textAlign: 'right',
    fontWeight: '500',
  },
  counterViewContainer: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    paddingTop: 5,
  },
  counterView: {
    paddingHorizontal: 10,
    flexDirection: 'column',
    textAlign: 'right',
    justifyContent: 'center',
    alignItems: 'flex-end',
    backgroundColor: '#fcfcfc',
  },
  socialBtn: {
    borderRadius: 50,
  },
  counterViewText: {
    ...Fonts.style.normal,
    fontSize: 12,
    color: Colors.darkSeafoamGreen,
  },
});

export default officeCard;

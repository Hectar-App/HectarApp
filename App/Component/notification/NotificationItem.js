import React from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { perfectHeight, perfectFont } from '../../utils/commonFunctions';

const notificationBillImg = require('../../assets/imgs/notification-bill.png');

const NotificationItem = () => {
  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.innerContainer}>
        <Icon
          name={'chevron-left'}
          size={perfectFont(20)}
          style={styles.icon}
        />
        <Text numberOfLines={2} style={styles.text}>
          تم اضافة عقار شقة للبيع, بحي الرياض شارع جرير، الملز بسعر ١٢١٠٠٠ ريال
        </Text>
        <Image source={notificationBillImg} />
      </View>
    </TouchableOpacity>
  );
};

export default NotificationItem;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: perfectHeight(65),
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  innerContainer: {
    width: '90%',
    alignItems: 'center',
    justifyContent: 'space-between',
    alignSelf: 'center',
    flexDirection: 'row',
  },
  icon: {
    alignSelf: 'center',
  },
  text: {
    maxWidth: '75%',
  },
});

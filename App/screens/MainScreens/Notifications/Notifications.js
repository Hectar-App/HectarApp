import React from 'react';
import { View, StyleSheet } from 'react-native';
import Header from '../../../Component/Header';
import VerticalSpace from '../../../Component/core/layouts/VerticalSpace';
import NotificationItem from '../../../Component/notification/NotificationItem';

const Notifications = () => {
  return (
    <View style={styles.container}>
      <Header
        headerTitle={'الاشعارات'}
        doAnimation={true}
        onBackPress={() => this.props.navigation.goBack()}
        backgroundColor={'#FFFFFF'}
      />
      <VerticalSpace height={8} />
      <View>
        {Array(10)
          .fill()
          .map(x => (
            <>
              <NotificationItem />
              <VerticalSpace height={8} />
            </>
          ))}
      </View>
    </View>
  );
};

export default Notifications;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E5E5E5',
  },
});

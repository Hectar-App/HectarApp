import React from 'react';

import { createMaterialTopTabNavigator } from 'react-navigation-tabs';

import MyRealEstate from '../screens/MainScreens/Profile/MyRealEstate'
import MyRealEstate1 from '../screens/MainScreens/Profile/MyRealEstate.1'
import MyRealEstate2 from '../screens/MainScreens/Profile/MyRealEstate.2'


export default  createMaterialTopTabNavigator({
    MyRealEstate: {
        screen: MyRealEstate
    },
    MyRealEstate1: {
        screen: MyRealEstate1
    },
    MyRealEstate2: {
        screen: MyRealEstate2
    }
},{
    tabBarPosition: 'top',
    swipeEnabled: true,
    animationEnabled: true,
    tabBarOptions: {
      activeTintColor: '#FFFFFF',
      inactiveTintColor: '#F8F8F8',
      style: {
        backgroundColor: '#633689',
      },
      labelStyle: {
        textAlign: 'center',
      },
      indicatorStyle: {
        borderBottomColor: '#87B56A',
        borderBottomWidth: 2,
      },
    },
})
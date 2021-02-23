import React from 'react';
import { FlatList, View } from 'react-native';

import CardItem from './officeCard';

const officeList = props => {
  return (
    <View style={{ flex: 1}}>
      <FlatList
        
        onScroll={props.onScroll}
        data={props.officesData}
        renderItem={({ item, index }) => {
          return (
            <CardItem
              onItemPress={() => props.onItemPress(item)}
              onFavPress={() => props.onFavPress(item)}
              doAnimation={true}
              showCounts = {true}
              showContactButtons = {true}
              selectedOffice={item}
              index={index}
            />
          );
        }}
        onEndReached={() =>
          props.numberOfOffices
            ? (props.officesData || []).length === props.numberOfOffices
              ? null
              : props.handleGetMoreDatat()
            : null
        }
        onEndReachedThreshold={props.numberOfListFlag ? 0 : 1}
      />
    </View>
  );
};

export default officeList;

import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { ThemeContext } from 'react-navigation';
import { connect } from 'react-redux';
import CardItem from '../../../Component/officeCard';
import FilterButton from '../../../Component/core/buttons/FilterButton';
import RealEstatList from '../../../Component/realEstateList';
import api from '../../../Services/API';
import Header from '../../../Component/Header';
import { Fonts } from '../../../Themes';
import VerticalSpace from '../../../Component/core/layouts/VerticalSpace';
import { perfectFont } from '../../../utils/commonFunctions';

const getPropertyUrl = (office, status) => {
  let url = `${api.apiURL}/get-realestate-agent-details?`;
  if (office.user_id) {
    url += `userId=${office.user_id}`;
  } else {
    url += `placeId=${office.place_id}`;
  }
  if (status) {
    url += `&type=${status}`;
  }

  return url;
};
const OfficeDetails = props => {
  const office = props.navigation.getParam('officeDetails');
  const [availableStatuses, setAvailableStatuses] = useState([]);
  const [realEstateProperties, setRealEstateProperties] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState(null);

  useEffect(() => {
    fetch(`${api.apiURL}/realEstate/getRealEstateStatus`).then(result =>
      result.json().then(data => setAvailableStatuses(data)),
    );

    fetch(getPropertyUrl(office, selectedStatus)).then(result =>
      result.json().then(data => {
        setRealEstateProperties(data.properties || data.result.properties);
      }),
    );
  }, [office, selectedStatus]);

  return (
    <View style={[styles.mainContainer]}>
      <Header
        noBackButton={false}
        headerTitle={office.name}
        withSearch={false}
        openSearch={false}
        onBackPress={() => props.navigation.goBack()}
      />
      <View style={[styles.bodyContainer]}>
        <CardItem
          onItemPress={() => ({})}
          onFavPress={() => ({})}
          doAnimation={true}
          showCounts={true}
          showContactButtons={true}
          selectedOffice={office}
        />
      </View>
      <Text style={[styles.propertiesTitle]}>
        العقارات المتاحة ل{office.name}
      </Text>
      <View style={[styles.buttonGroup]}>
        <FilterButton
          onPress={() => setSelectedStatus(null)}
          selected={selectedStatus === null}
          label={'الكل'}
        />
        {availableStatuses?.map(status => {
          return (
            <FilterButton
              onPress={() => setSelectedStatus(status._id)}
              label={status.nameAr}
              selected={status._id === selectedStatus}
            />
          );
        })}
      </View>
      {realEstateProperties?.length ? (
        <RealEstatList
          handleGetMoreDatat={() => ({})}
          numberOfRealEstate={realEstateProperties?.length || 0}
          onItemPress={() => ({})}
          realestateData={realEstateProperties}
          onMapButtonPress={() => ({})}
        />
      ) : (
        <>
          <VerticalSpace height={100} />
          <Text style={styles.empty}>لا توجد عقارات</Text>
        </>
      )}
    </View>
  );
};

export default OfficeDetails;

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  bodyContainer: {
    paddingTop: 10,
    paddingHorizontal: 5,
  },
  buttonGroup: {
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: '#ffffff',
    borderRadius: 6,
    flexDirection: 'row-reverse',
    shadowColor: 'rgba(0, 0, 0, 0.08)',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    marginTop: 5,
    shadowRadius: 15,
    shadowOpacity: 1,
    elevation: 2,
  },
  propertiesTitle: {
    fontFamily: Fonts.style.normal.fontFamily,
    fontSize: 11,
    textAlign: 'right',
    alignSelf: 'flex-end',
    padding: 12,
    paddingVertical: 10,
  },
  empty: {
    fontSize: perfectFont(22),
    textAlign: 'center',
    alignSelf: 'center',
  },
});

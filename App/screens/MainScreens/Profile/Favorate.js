import React, { useEffect, useState } from 'react';
import { View, Text, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';

import Header from '../../../Component/Header';
import RealEstateList from '../../../Component/realEstateList';

import { Fonts } from '../../../Themes';

import { connect } from 'react-redux';
import FavoriteAction from '../../../Redux/FavourteRedux';
import { onError } from '../../../utils/commonFunctions';
import { path, pathOr } from 'ramda';
import api from '../../../Services/API';

const API = api.create();

const FavoratePage = props => {
  const [userFavs, setUserFavs] = useState([]);
  const favProccess = item => {
    if (!props.user || !props.user.token) {
      return onError('الرجاء تسجيل الدخول للاستفادة');
    }
    // console.log(item)
    props.deleteRealEstateFromFav(
      item.realEstate ? item.realEstate._id : item._id,
      props.user.token,
    );
  };

  useEffect(() => {
    const token = path(['user', 'token'], props);
    if (!token) {
      onError('يجب تسجيل الدخول لاضافة عقارك');
    } else {
      API.getUserFav(token).then(res =>
        setUserFavs(pathOr([], ['data', 'fav'], res)),
      );
    }
  }, [props]);

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={{ flex: 1 }}>
        <Header
          noBackButton={true}
          headerTitle={'المفضلة'}
          doAnimation={true}
          onBackPress={() => props.navigation.goBack()}
        />
        {userFavs.length <= 0 && (
          <View
            style={{
              alignSelf: 'center',
              backgroundColor: 'transparnt',
              position: 'absolute',
              zIndex: 2,
              top: 250,
            }}>
            <Text style={[Fonts.style.normal]}>
              لا يوجد لديك عقارات في المفضلة
            </Text>
          </View>
        )}

        {userFavs.length > 0 && (
          <RealEstateList
            onItemPress={item =>
              props.navigation.navigate('RealEstateDetail', {
                realEstate: item.realEstate ? item.realEstate : item,
              })
            }
            onFavPress={item => favProccess(item)}
            realestateData={userFavs}
            listType={'favorate'}
            containerStyle={{ paddingTop: 10, backgroundColor: 'red' }}
          />
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

const mapDispatchToProps = dispatch => ({
  deleteRealEstateFromFav: (realEstate, token) =>
    dispatch(FavoriteAction.removeFromFavourte(realEstate, token)),
});

const mapStateToProps = state => {
  console.log('DetailOfRealEstateState', state);
  return {
    user: state.user.user && state.user.user.user && state.user.user.user,
    favorite: state.Favourte && state.Favourte.realEstates,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FavoratePage);

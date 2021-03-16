import React from 'react';
import { View, Text, Keyboard, TouchableWithoutFeedback } from 'react-native';
import R from 'ramda';

import Header from '../../../Component/Header';
import RealEstateList from '../../../Component/realEstateList';

import { Fonts } from '../../../Themes';

import { connect } from 'react-redux';
import FavoriteAction from '../../../Redux/FavourteRedux';
import { onError } from '../../../utils/commonFunctions';

const FavoratePage = props => {
  const userFavourites = R.pathOr([], ['favorite', 'fav'], props);
  const favProccess = item => {
    if (!props.user || !props.user.token) {
      return onError('الرجاء تسجيل الدخول للاستفادة');
    }
    props.deleteRealEstateFromFav(
      item.realEstate ? item.realEstate._id : item._id,
      props.user.token,
    );
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={{ flex: 1 }}>
        <Header
          headerTitle={'المفضلة'}
          doAnimation={true}
          onBackPress={() => props.navigation.goBack()}
        />
        {userFavourites.length <= 0 && (
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

        {userFavourites.length > 0 && (
          <RealEstateList
            onItemPress={item =>
              props.navigation.navigate('RealEstateDetail', {
                realEstate: item.realEstate ? item.realEstate : item,
              })
            }
            onFavPress={item => favProccess(item)}
            realestateData={userFavourites}
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

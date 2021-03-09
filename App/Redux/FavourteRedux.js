import {
  createActions,
  createReducer,
  Types as ReduxSauceTypes,
} from 'reduxsauce';
import Immutable from 'seamless-immutable';
import { pathOr, prop, path } from 'ramda';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  addToFavourte: ['realEstate', 'token'],
  checkFavourte: ['realEstateId'],
  removeFromFavourte: ['realEstateId', 'token'],

  getUserFav: ['token'],
  getUserFavSuccess: ['realEstates'],
});

export const FavourteTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  realEstates: [],
});

/* ------------- Reducers ------------- */

export const addToFav = (state, payload) => {
  const arr = [
    ...pathOr([], ['realEstates', 'fav'], state),
    prop('realEstate', payload),
  ];
  return {
    ...state,
    realEstates: {
      realEstatesCount: path(['realEstates', 'realEstatesCount'], state),
      fav: arr,
    },
  };
};

export const checkFav = (state, { realEstateId }) => {
  const estates = state.realEstates?.fav || [];
  if (
    estates?.findIndex(
      i => (i._id || (i.realEstate && i.realEstate._id)) === realEstateId,
    ) !== -1
  ) {
    return { ...state, checker: true };
  }
  return { ...state, checker: false };
};

export const removeItem = (state, { realEstateId }) => {
  const estates = state.realEstates?.fav || [];
  let index = estates.findIndex(
    i => (i._id || (i.realEstate && i.realEstate._id)) === realEstateId,
  );
  let newRealEstates = [...state.realEstates.fav];
  if (index === 0 && newRealEstates.length === 1) {
    return { ...state, realEstates: [], checker: false };
  }

  index === 0 ? newRealEstates.splice(0, 1) : newRealEstates.splice(index, 1);
  return { ...state, realEstates: newRealEstates, checker: false };
};

export const defaultHandler = state => state;

export const getUserFavF = state => state;

export const getUserFavSuccess = (state, { realEstates }) => {
  return { realEstates: realEstates };
};

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.ADD_TO_FAVOURTE]: addToFav,
  [Types.CHECK_FAVOURTE]: checkFav,
  [Types.REMOVE_FROM_FAVOURTE]: removeItem,

  [Types.GET_USER_FAV]: getUserFavF,
  [Types.GET_USER_FAV_SUCCESS]: getUserFavSuccess,

  [ReduxSauceTypes.DEFAULT]: defaultHandler,
});

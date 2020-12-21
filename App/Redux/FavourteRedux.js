import {
  createReducer,
  createActions,
  Types as ReduxSauceTypes
} from "reduxsauce";
import Immutable from "seamless-immutable";
import _ from "lodash";

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  addToFavourte: ["realEstate", 'token'],
  checkFavourte: ["realEstateId"],
  removeFromFavourte: ["realEstateId", 'token'],

  getUserFav: ['token'],
  getUserFavSuccess: ['realEstates']
});

export const FavourteTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  realEstates: [],
});

/* ------------- Reducers ------------- */

export const addToFav = (state, {realEstate}) => {
  // return
  let arr = [...state.realEstates]
  arr.push({...realEstate})
  console.log(arr)
  return { ...state, realEstates: arr}
};

export const checkFav = (state, { realEstateId }) => {
  console.log('state OF real estate', state.realEstates)
  if ((state.realEstates || []).findIndex(i => (i._id || i.realEstate && i.realEstate._id) === realEstateId ) !== -1) {
    console.log("yes it is", (state.realEstates || []).findIndex(i => (i._id || i.realEstate && i.realEstate._id)=== realEstateId));
    // alert(true)
    return {...state, checker: true }
  } else {
    // alert(false)
    console.log("no it is not",(state.realEstates || []).findIndex(i => (i._id || i.realEstate && i.realEstate._id) === realEstateId)!== -1);
    return {...state, checker: false }
  }
};

export const removeItem = (state, { realEstateId }) => {
  let index = (state.realEstates || []).findIndex(i => (i._id || i.realEstate && i.realEstate._id) === realEstateId )

  let newRealEstates = [...state.realEstates];
  console.log("indexsdf", index, realEstateId);

  if (index === 0 && newRealEstates.length === 1) {
    return {...state, realEstates: [], checker: false }
  }

  console.log("index", index);

  index === 0 ? newRealEstates.splice(0, 1) : newRealEstates.splice(index, 1);

  return {...state, realEstates: newRealEstates, checker: false }
};

export const defaultHandler = state => state;

export const getUserFavF = (state) => state

export const getUserFavSuccess = (state, {realEstates}) => {
  return { realEstates: realEstates }
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.ADD_TO_FAVOURTE]: addToFav,
  [Types.CHECK_FAVOURTE]: checkFav,
  [Types.REMOVE_FROM_FAVOURTE]: removeItem,

  [Types.GET_USER_FAV]: getUserFavF,
  [Types.GET_USER_FAV_SUCCESS]: getUserFavSuccess,

  [ReduxSauceTypes.DEFAULT]: defaultHandler
});

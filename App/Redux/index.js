//############# screens #############

//############# screens #############

import {combineReducers} from 'redux';

const rootReducer = combineReducers({
  user: require('./UserRedux').reducer,
  realEstate: require('./RealEstateRedux').reducer,
  Favourte: require('./FavourteRedux').reducer,
  Marker: require('./mapMarkerRedux').reducer,
  realEstateOffices: require('./OfficesRedux').reducer,
});

export default rootReducer;

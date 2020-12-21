//############# screens #############

//############# screens #############

import { combineReducers } from "redux";
import Immutable from "immutable";

const rootReducer = combineReducers({
  user: require('./UserRedux').reducer,
  realEstate: require('./RealEstateRedux').reducer,
  Favourte: require('./FavourteRedux').reducer,
  Marker: require('./mapMarkerRedux').reducer
});

export default rootReducer;

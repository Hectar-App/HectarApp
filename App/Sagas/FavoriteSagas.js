import { call, put } from 'redux-saga/effects';
import FavoriteAction from '../Redux/FavourteRedux';
import { path } from 'ramda';

export function* addToFavorite(api, action) {
  const { realEstate, token } = action;
  // make the call to the api
  let response = null;

  response = yield call(api.addToFav, realEstate._id, token);

  console.log(response);
}

export function* removeFromFavorite(api, action) {
  const { realEstateId, token } = action;
  // make the call to the api
  let response = null;

  response = yield call(api.removeFromFav, realEstateId, token);

  console.log(response, realEstateId);
}

export function* getUserFav(api, action) {
  const { token } = action;
  let res = null;

  res = yield call(api.getUserFav, token);
  console.log('getFav', res);
  if (res && res.ok && res.data) {
    const respo = path(['data'], res);

    // do data conversion here if needed
    yield put(FavoriteAction.getUserFavSuccess(respo));
  }
}

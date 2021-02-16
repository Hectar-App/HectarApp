import {call, put} from 'redux-saga/effects';
import OfficesActions from '../Redux/OfficesRedux';
import {path} from 'ramda';

export function* getOffices(api, action) {
  const {lat, lng, radius} = action;
  let response = yield call(api.getOffices, lat, lng, radius);

  console.log(response);
  // handle response
  if (response && response.ok) {
    const respo = path(['data'], response);

    // do data conversion here if needed
    yield put(OfficesActions.getOfficesSuccess(respo.results));
  } else {
    const error = path(['data'], response);
    yield put(OfficesActions.getOfficesError(error));
  }
}

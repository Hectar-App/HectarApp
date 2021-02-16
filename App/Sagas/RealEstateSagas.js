import {call, put} from 'redux-saga/effects';
import RealEstatACtion from '../Redux/RealEstateRedux';
import {path} from 'ramda';

export function* getAddingRealEstateInfo(api, action) {
  let response = yield call(api.getRealEstateAddingInfo);

  console.log(response);
  // handle response
  if (response && response.ok) {
    const respo = path(['data'], response);

    // do data conversion here if needed
    yield put(RealEstatACtion.getAddingAqarInfoSucess(respo));
  } else {
    const error = path(['data'], response);
    yield put(RealEstatACtion.getAddingAqarInfoFailed(error));
  }
}

export function* addRealEstate(api, action) {
  const {realEstateToAdd, token} = action;

  console.log('hello adding real estate');
  let response = yield call(api.addRealEstate, realEstateToAdd, token);

  console.log('hello adding real estate', response);
  // handle response
  if (response && response.ok) {
    const respo = path(['data'], response);

    // do data conversion here if needed
    yield put(RealEstatACtion.addRealEstateSuccess(respo));
  } else {
    const error = path(['data'], response);
    yield put(RealEstatACtion.addRealEstateFaild(error));
  }
}

export function* getRealEstate(api, action) {
  const {data} = action;

  let response = yield call(api.getRealEstate, data);

  console.log(response);
  // handle response
  if (response && response.ok) {
    const respo = path(['data'], response);
    // do data conversion here if needed
    yield put(RealEstatACtion.getRealEstateSuccess(respo));
  } else {
    const error = path(['data'], response);
    yield put(RealEstatACtion.getRealEstateFaild(error));
  }
}

export function* getUserRealEstate(api, action) {
  const {_id, pageNumber} = action;
  console.log(_id, pageNumber);

  let response = yield call(api.getUserRealEstate, _id, pageNumber);

  console.log(response);
  // handle response
  if (response && response.ok) {
    const respo = path(['data'], response);

    // do data conversion here if needed
    yield put(RealEstatACtion.getUserRealEstateSuccess(respo));
  } else {
    const error = path(['data'], response);
    yield put(RealEstatACtion.getUserRealEstateFaild(error));
  }
}

export function* checkRealEstate(api, action) {
  const {realEstateId, token} = action;

  let response = yield call(api.checkRealEstateLike, realEstateId, token);

  console.log(response);
  const res = path(['data'], response);
  yield put(RealEstatACtion.checkRealEstateResult(res));
}

export function* likeRealEstate(api, action) {
  const {realEstateId, state, token} = action;

  let response = yield call(api.addToLike, realEstateId, state, token);

  console.log(response);
  // handle response
  if (response && response.ok) {
    const respo = path(['data'], response);

    // do data conversion here if needed
    yield put(RealEstatACtion.likeRealEstateSuccess(respo));
  } else {
    const error = path(['data'], response);
    yield put(RealEstatACtion.likeRealEstateError(error));
  }
}

export function* addShow(api, action) {
  const {realEstateId} = action;

  let response = yield call(api.addShow, realEstateId);

  console.log(response);
}

export function* rateRealEstate(api, action) {
  const {realEstateId, stars, reason, token} = action;

  let response = yield call(api.addRating, realEstateId, stars, reason, token);

  console.log(response);
  // handle response
  if (response && response.ok) {
    const respo = path(['data'], response);
    yield put(RealEstatACtion.rateRealEstateSuccess(respo));
  } else {
    const error = path(['data'], response);
    yield put(RealEstatACtion.rateRealEstateError(error));
  }
}

export function* addRequest(api, action) {
  const {realEstateId, request, token} = action;

  let response = yield call(api.addRequest, realEstateId, request, token);

  console.log(response);
  // handle response
  if (response && response.ok) {
    const respo = path(['data'], response);
    yield put(RealEstatACtion.addRequestSuccess(respo));
  } else {
    const error = path(['data'], response);
    yield put(RealEstatACtion.addRequestError(error));
  }
}

export function* changeRequestState(api, action) {
  const {_id, status, token} = action;

  let response = yield call(api.changeRequestState, _id, status, token);

  console.log(response);
  // handle response
  if (response && response.ok) {
    const respo = path(['data'], response);
    yield put(RealEstatACtion.changeRequestStateSuccess(respo));
  } else {
    const error = path(['data'], response);
    yield put(RealEstatACtion.changeRequestStateError(error));
  }
}

export function* getUserRequests(api, action) {
  const {token} = action;

  let response = yield call(api.getUserRequests, token);

  console.log(response);
  // handle response
  if (response && response.ok) {
    const respo = path(['data'], response);
    yield put(RealEstatACtion.getUserRequestsSuccess(respo));
  } else {
    const error = path(['data'], response);
    yield put(RealEstatACtion.getUserRequestsError(error));
  }
}

export function* getUserNotifications(api, action) {
  const {token} = action;

  let response = yield call(api.getUserNotification, token);

  console.log(response);
  // handle response
  if (response && response.ok) {
    const respo = path(['data'], response);
    yield put(RealEstatACtion.getUserNotificationSuccess(respo));
  } else {
    const error = path(['data'], response);
    yield put(RealEstatACtion.getUserNotificationError(error));
  }
}

export function* getRealEstateDetails(api, action) {
  const {_id} = action;

  let response = yield call(api.getRealEstateDetails, _id);

  console.log(response);
  // handle response
  if (response && response.ok) {
    const respo = path(['data'], response);
    yield put(RealEstatACtion.getRealEstateDetailsSuccess(respo));
  } else {
    const error = path(['data'], response);
    yield put(RealEstatACtion.getRealEstateDetailsError(error));
  }
}

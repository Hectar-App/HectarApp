import { call, put } from 'redux-saga/effects';
import UserAction from '../Redux/UserRedux';
import { path } from 'ramda';

export function* userLogin(api, action) {
  const { phone, password, uuid } = action;
  // make the call to the api
  let response = null;

  response = yield call(api.login, phone, password, uuid);

  console.log(response);
  // handle response
  if (response && response.ok) {
    const user = path(['data'], response);

    // do data conversion here if needed
    yield put(UserAction.loginSuccess(user));
  } else {
    const userError = path(['data'], response);
    yield put(UserAction.loginFailed(userError));
  }
}

export function* checkPhone(api, action) {
  const { phone } = action;
  // make the call to the api
  let response = null;

  response = yield call(api.checkPhone, phone);

  console.log(response);
  // handle response
  if (response && response.ok) {
    const checkNuberSucess = path(['data'], response);
    // do data conversion here if needed
    yield put(UserAction.checkNumberSucess(checkNuberSucess));
  } else {
    const checkNuberError = path(['data'], response);
    yield put(UserAction.checkNumberFaild(checkNuberError));
  }
}

export function* verifyPhone(api, action) {
  const { phone, code } = action;
  // make the call to the api
  let response = null;

  response = yield call(api.verifyPhone, phone, code);

  console.log(response);
  // handle response
  if (response && response.ok) {
    const verfyNumberSucess = path(['data'], response);

    // do data conversion here if needed
    yield put(UserAction.verfyNumberSucess(verfyNumberSucess));
  } else {
    const verfyNumberError = path(['data'], response);
    yield put(UserAction.verfyNumberFaild(verfyNumberError));
  }
}

export function* getUserTypes(api, action) {
  // make the call to the api
  let response = null;

  response = yield call(api.userTypes);

  console.log('userTypes', response);
  // handle response
  if (response && response.ok) {
    const getUserTypes = path(['data'], response);

    // do data conversion here if needed
    yield put(UserAction.getUserTypesSucess(getUserTypes));
  } else {
    const getUserTypesError = path(['data'], response);
    yield put(UserAction.getUserTypesFaild(getUserTypesError));
  }
}

export function* registerUser(api, action) {
  const { name, phone, password, userType, email } = action;
  // make the call to the api
  let response = null;

  response = yield call(
    api.registerUser,
    name,
    phone,
    password,
    userType,
    email,
  );

  console.log('register res', response);
  // handle response
  if (response && response.ok) {
    const registerSucess = path(['data'], response);

    // do data conversion here if needed
    yield put(UserAction.registerSuccess(registerSucess));
  } else {
    const registerFaild = path(['data'], response);
    yield put(UserAction.registerFaild(registerFaild));
  }
}

export function* editUserProfile(api, action) {
  const { user } = action;
  // make the call to the api
  let response = yield call(api.editUser, user);

  // handle response
  if (response && response.ok && response.data && !response.data.error) {
    const user = path(['data'], response);

    // do data conversion here if needed
    yield put(UserAction.loginSuccess(user));
  } else {
    const editFaild = path(['data'], response);
    yield put(UserAction.editProfileFaild(editFaild));
  }
}

export function* forgetPassword(api, action) {
  const { phone } = action;
  // make the call to the api
  let response = null;

  response = yield call(api.forgetPassword, phone);

  console.log('register res', response);
  // handle response
  if (response && response.ok) {
    const status = path(['data'], response);
    // do data conversion here if needed
    yield put(UserAction.forgetPasswordSuccess(status));
  } else {
    const error = path(['data'], response);
    yield put(UserAction.forgetPasswordFaild(error));
  }
}

export function* ConfirmForgetPassword(api, action) {
  const { phone, code } = action;
  // make the call to the api
  let response = null;

  response = yield call(api.forgetPasswordVerifyPhone, phone, code);

  console.log('register res', response);
  // handle response
  if (response && response.ok) {
    const success = path(['data'], response);
    // do data conversion here if needed
    yield put(UserAction.forgetPasswordVerfyNumberSucess(success));
  } else {
    const error = path(['data'], response);
    yield put(UserAction.forgetPasswordVerfyNumberFaild(error));
  }
}

export function* resetPassword(api, action) {
  const { phone, code, password } = action;
  // make the call to the api
  let response = null;

  response = yield call(api.resetPassword, phone, code, password);

  console.log('register res', response);
  // handle response
  if (response && response.ok) {
    const success = path(['data'], response);
    // do data conversion here if needed
    yield put(UserAction.resetPasswordSucess(success));
  } else {
    const error = path(['data'], response);
    yield put(UserAction.resetPasswordFaild(error));
  }
}

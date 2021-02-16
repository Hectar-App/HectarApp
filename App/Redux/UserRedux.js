import {createReducer, createActions} from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

const {Types, Creators} = createActions({
  loginRequest: ['phone', 'password', 'uuid'],
  loginSuccess: ['user'],
  loginFailed: ['userLoginError'],
  loginCancle: [],

  checkNumber: ['phone'],
  checkNumberSucess: ['checkNuberSucess'],
  checkNumberFaild: ['checkNuberError'],

  verfyNumber: ['phone', 'code'],
  verfyNumberSucess: ['verfyNumberSucess'],
  verfyNumberFaild: ['verfyNumberError'],

  getUserTypes: [],
  getUserTypesSucess: ['userTypes'],
  getUserTypesFaild: ['userTypesError'],

  registerRequest: ['name', 'phone', 'password', 'userType', 'email'],
  registerSuccess: ['user'],
  registerFaild: ['registerError'],

  editProfile: ['user'],
  editProfileSuccess: ['user'],
  editProfileFaild: ['edietProfileError'],

  forgetPasswordRequest: ['phone'],
  forgetPasswordSuccess: ['forgetPasswordSucess'],
  forgetPasswordFaild: ['forgetPasswordError'],

  forgetPasswordVerfyNumber: ['phone', 'code'],
  forgetPasswordVerfyNumberSucess: ['forgetPasswordVerfyNumberSucess'],
  forgetPasswordVerfyNumberFaild: ['forgetPasswordVerfyNumberError'],

  resetPasswrd: ['phone', 'code', 'password'],
  resetPasswordSucess: ['resetPasswordSucess'],
  resetPasswordFaild: ['resetPasswordError'],

  changeFilter: ['filterData'],

  logout: [],

  getDeviceInfo: ['data'],

  firstTimeDone: [],
});

export const UserTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  firstTime: true,
});

/* ------------- Reducers ------------- */

export const logoutF = state => {
  return {...state, user: null};
};

export const loginRequestF = (state, action) => {
  const {phone, password, uuid} = action;
  return {...state, phone, password, uuid};
};

export const loginSuccessF = (state, action) => {
  const {user} = action;
  return {...state, user};
};

export const loginFailedF = (state, action) => {
  const {userLoginError} = action;
  return {...state, userLoginError};
};

export const loginCancleF = state => INITIAL_STATE;

export const checkNumberF = (state, action) => {
  const {phone} = action;
  return {...state, phone};
};

export const checkNumberSuccessF = (state, action) => {
  const {checkNuberSucess} = action;
  return {...state, checkNuberSucess};
};

export const checkNumberFaildF = (state, action) => {
  const {checkNuberError} = action;
  return {...state, checkNuberError};
};

export const verfyNumberF = (state, action) => {
  const {phone, code} = action;
  return {...state, phone, code};
};

export const verfyNumberSuccessF = (state, action) => {
  const {verfyNumberSucess} = action;
  return {...state, verfyNumberSucess};
};

export const verfyNumberFaildF = (state, action) => {
  const {verfyNumberError} = action;
  return {...state, verfyNumberError};
};

export const getUserTypeF = (state, action) => state;

export const getUserSuccessF = (state, action) => {
  const {userTypes} = action;
  return {...state, userTypes};
};

export const getUserFaildF = (state, action) => {
  const {userTypesError} = action;
  return {...state, userTypesError};
};

export const registerF = (state, action) => {
  const {name, phone, password, userType, email} = action;
  return {...state, name, phone, password, userType, email};
};

export const registerSuccessF = (state, action) => {
  const {user} = action;
  return {...state, user};
};

export const registerFaildF = (state, action) => {
  const {registerError} = action;
  return {...state, registerError};
};

export const editProfileF = (state, action) => {
  // const { name, phone, prevPassword, password, userType, email, token } = action;
  // 'name', 'phone', 'prevPassword', 'password', 'userType', 'email', "token"
  return {...state};
};

export const editProfileSuccessF = (state, action) => {
  const {user} = action;
  return {...state, user};
};

export const editProfileFaildF = (state, action) => {
  const {edietProfileError} = action;
  return {...state, edietProfileError};
};

export const forgetPasswordF = (state, action) => {
  const {phone} = action;
  return {...state, phone};
};

export const forgetPasswordSuccessF = (state, action) => {
  const {forgetPasswordSucess} = action;
  return {...state, forgetPasswordSucess};
};

export const forgetPasswordFaildF = (state, action) => {
  const {forgetPasswordError} = action;
  return {...state, forgetPasswordError};
};

export const forgetPasswordVerfyNumberF = (state, action) => {
  const {phone, code} = action;
  return {...state, phone, code};
};

export const forgetPasswordVerfyNumberSuccessF = (state, action) => {
  const {forgetPasswordVerfyNumberSucess} = action;
  return {...state, forgetPasswordVerfyNumberSucess};
};

export const forgetPasswordVerfyNumberFaildF = (state, action) => {
  const {forgetPasswordVerfyNumberError} = action;
  return {...state, forgetPasswordVerfyNumberError};
};

export const resetPasswrdF = (state, action) => {
  const {phone, code, password} = action;
  return {...state, phone, code, password};
};

export const resetPasswrdSuccessF = (state, action) => {
  const {resetPasswordSucess} = action;
  return {...state, resetPasswordSucess};
};

export const resetPasswrdFaildF = (state, action) => {
  const {resetPasswordError} = action;
  return {...state, resetPasswordError};
};

export const changeFilterF = (state, action) => {
  const {filterData} = action;
  return {...state, filterData: filterData};
};

export const getDeviceInfoF = (state, {data}) => {
  return {...state, deviceInfo: data};
};

export const firstTimeDoneF = state => {
  return {...state, firstTime: false};
};

export const defaultHandler = state => state;

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.LOGIN_REQUEST]: loginRequestF,
  [Types.LOGIN_SUCCESS]: loginSuccessF,
  [Types.LOGIN_FAILED]: loginFailedF,
  [Types.LOGIN_CANCLE]: loginCancleF,

  [Types.CHECK_NUMBER]: checkNumberF,
  [Types.CHECK_NUMBER_SUCESS]: checkNumberSuccessF,
  [Types.CHECK_NUMBER_FAILD]: checkNumberFaildF,

  [Types.VERFY_NUMBER]: verfyNumberF,
  [Types.VERFY_NUMBER_SUCESS]: verfyNumberSuccessF,
  [Types.VERFY_NUMBER_FAILD]: verfyNumberFaildF,

  [Types.GET_USER_TYPES]: getUserTypeF,
  [Types.GET_USER_TYPES_SUCESS]: getUserSuccessF,
  [Types.GET_USER_TYPES_FAILD]: getUserFaildF,

  [Types.REGISTER_REQUEST]: registerF,
  [Types.REGISTER_SUCCESS]: registerSuccessF,
  [Types.REGISTER_FAILD]: registerFaildF,

  [Types.EDIT_PROFILE]: editProfileF,
  [Types.EDIT_PROFILE_SUCCESS]: editProfileSuccessF,
  [Types.EDIT_PROFILE_FAILD]: editProfileFaildF,

  [Types.FORGET_PASSWORD_REQUEST]: forgetPasswordF,
  [Types.FORGET_PASSWORD_SUCCESS]: forgetPasswordSuccessF,
  [Types.FORGET_PASSWORD_FAILD]: forgetPasswordFaildF,

  [Types.FORGET_PASSWORD_VERFY_NUMBER]: forgetPasswordVerfyNumberF,
  [Types.FORGET_PASSWORD_VERFY_NUMBER_SUCESS]: forgetPasswordVerfyNumberSuccessF,
  [Types.FORGET_PASSWORD_VERFY_NUMBER_FAILD]: forgetPasswordVerfyNumberFaildF,

  [Types.RESET_PASSWRD]: resetPasswrdF,
  [Types.RESET_PASSWORD_SUCESS]: resetPasswrdSuccessF,
  [Types.RESET_PASSWORD_FAILD]: resetPasswrdFaildF,

  [Types.CHANGE_FILTER]: changeFilterF,

  [Types.LOGOUT]: logoutF,

  [Types.GET_DEVICE_INFO]: getDeviceInfoF,

  [Types.FIRST_TIME_DONE]: firstTimeDoneF,
});

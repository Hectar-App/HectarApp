import {createReducer, createActions} from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

/**
   * checkRealEstateLike,
    addToLike,
    addShow,
    addRating,
    addRequest,
    changeRequestState,
    getUserRequests
   */

const {Types, Creators} = createActions({
  getAddingAqarInfo: [],
  getAddingAqarInfoSucess: ['AddingAqarInfo'],
  getAddingAqarInfoFailed: ['AddingAqarInfoError'],

  addRealEstate: ['realEstateToAdd', 'token'],
  addRealEstateSuccess: ['addAqarSuccess'],
  addRealEstateFaild: ['addAqarError'],

  getRealEstate: ['data'],
  getRealEstateSuccess: ['realEstateList'],
  getRealEstateFaild: ['error'],

  getUserRealEstate: ['_id', 'pageNumber'],
  getUserRealEstateSuccess: ['userRealEstate'],
  getUserRealEstateFaild: ['userRealEstateError'],

  checkRealEstate: ['realEstateId', 'token'],
  checkRealEstateResult: ['result'],

  likeRealEstate: ['realEstateId', 'state', 'token'],
  likeRealEstateSuccess: ['success'],
  likeRealEstateError: ['error'],

  addShow: ['realEstateId'],

  rateRealEstate: ['realEstateId', 'stars', 'reason', 'token'],
  rateRealEstateSuccess: ['success'],
  rateRealEstateError: ['error'],

  addRequest: ['realEstateId', 'request', 'token'],
  addRequestSuccess: ['success'],
  addRequestError: ['error'],

  changeRequestState: ['_id', 'status', 'token'],
  changeRequestStateSuccess: ['success'],
  changeRequestStateError: ['error'],

  getUserRequests: ['token'],
  getUserRequestsSuccess: ['userRequests'],
  getUserRequestsError: ['error'],

  getUserNotification: ['token'],
  getUserNotificationSuccess: ['userNotification'],
  getUserNotificationError: ['error'],

  getRealEstateDetails: ['_id'],
  getRealEstateDetailsSuccess: ['realEstateDetail'],
  getRealEstateDetailsError: ['realEstateDetailError'],
});

export const RealEstateTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({});

/* ------------- Reducers ------------- */

export const getAddingAqarInfoF = state => {
  return state;
};

export const getAddingAqarInfoSucessF = (state, action) => {
  const {AddingAqarInfo} = action;
  return {...state, AddingAqarInfo};
};

export const getAddingAqarInfoFailedF = (state, action) => {
  const {AddingAqarInfoError} = action;
  return {...state, AddingAqarInfoError};
};

export const addRealEstateF = (state, action) => {
  // const { selectedStatus, selectedType, selectedPurpose, price, lat, long, token } = action;
  const {realEstateToAdd, token} = action;
  return {...state, realEstateToAdd, token};
};

export const addRealEstateSuccessF = (state, action) => {
  const {addAqarSuccess} = action;
  return {...state, addAqarSuccess};
};

export const addRealEstateFaildF = (state, action) => {
  const {addAqarError} = action;
  return {...state, addAqarError};
};

export const getRealEstate = state => {
  return state;
};

export const getRealEstateSucessF = (state, action) => {
  const {realEstateList} = action;
  return {...state, realEstateList};
};

export const getRealEstateFailedF = (state, action) => {
  const {error} = action;
  return {...state, error};
};

export const getUserRealEstate = state => {
  return state;
};

export const getUserRealEstateSucessF = (state, action) => {
  const {userRealEstate} = action;
  return {...state, userRealEstate};
};

export const getUserRealEstateFailedF = (state, action) => {
  const {userRealEstateError} = action;
  return {...state, userRealEstateError};
};

export const checkRealEstateF = (state, action) => {
  return state;
};

export const checkRealEstateResultF = (state, action) => {
  const {result} = action;
  return {...state, checkRealEstate: result};
};

export const likeRealEstateF = (state, action) => {
  return state;
};

export const likeRealEstateSuccessF = (state, action) => {
  const {success} = action;
  return {...state, likeRealEstateResult: success};
};

export const likeRealEstateErrorF = (state, action) => {
  const {error} = action;
  return {...state, likeRealEstateError: error};
};

export const rateRealEstateF = (state, action) => {
  return state;
};

export const rateRealEstateSuccessF = (state, action) => {
  const {success} = action;
  return {...state, rateRealEstateResult: success};
};

export const rateRealEstateErrorF = (state, action) => {
  const {error} = action;
  return {...state, rateRealEstateError: error};
};

export const addRequestF = (state, action) => {
  return state;
};

export const addRequestSuccessF = (state, action) => {
  const {success} = action;
  return {...state, addRequestResult: success};
};

export const addRequestErrorF = (state, action) => {
  const {error} = action;
  return {...state, addRequestError: error};
};

export const changeRequestStateF = (state, action) => {
  return state;
};

export const changeRequestStateSuccessF = (state, action) => {
  const {success} = action;
  return {...state, changeRequestStateResult: success};
};

export const changeRequestStateErrorF = (state, action) => {
  const {error} = action;
  return {...state, changeRequestStateError: error};
};

export const getUserRequestsF = (state, action) => {
  return state;
};

export const getUserRequestsSuccessF = (state, action) => {
  const {userRequests} = action;
  return {...state, userRequests: userRequests};
};

export const getUserRequestsErrorF = (state, action) => {
  const {error} = action;
  return {...state, userRequestsError: error};
};

export const getUserNotificationF = (state, action) => {
  return state;
};

export const getUserNotificationSuccessF = (state, action) => {
  const {userNotification} = action;
  return {...state, userNotification};
};

export const getUserNotificationErrorF = (state, action) => {
  const {error} = action;
  return {...state, userNotificationError: error};
};

export const addShowF = state => {
  return state;
};

export const getRealEstateDetailF = (state, action) => {
  return state;
};

export const getRealEstateDetailSuccessF = (state, action) => {
  const {realEstateDetail} = action;
  return {...state, realEstateDetail};
};

export const getRealEstateDetailErrorF = (state, action) => {
  const {realEstateDetailError} = action;
  return {...state, realEstateDetailError};
};

export const defaultHandler = state => state;

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_ADDING_AQAR_INFO]: getAddingAqarInfoF,
  [Types.GET_ADDING_AQAR_INFO_SUCESS]: getAddingAqarInfoSucessF,
  [Types.GET_ADDING_AQAR_INFO_FAILED]: getAddingAqarInfoFailedF,

  [Types.ADD_REAL_ESTATE]: addRealEstateF,
  [Types.ADD_REAL_ESTATE_SUCCESS]: addRealEstateSuccessF,
  [Types.ADD_REAL_ESTATE_FAILD]: addRealEstateFaildF,

  [Types.GET_REAL_ESTATE]: getRealEstate,
  [Types.GET_REAL_ESTATE_SUCCESS]: getRealEstateSucessF,
  [Types.GET_REAL_ESTATE_FAILD]: getRealEstateFailedF,

  [Types.GET_USER_REAL_ESTATE]: getUserRealEstate,
  [Types.GET_USER_REAL_ESTATE_SUCCESS]: getUserRealEstateSucessF,
  [Types.GET_USER_REAL_ESTATE_FAILD]: getUserRealEstateFailedF,

  //oasid
  [Types.CHECK_REAL_ESTATE]: checkRealEstateF,
  [Types.CHECK_REAL_ESTATE_RESULT]: checkRealEstateResultF,

  [Types.LIKE_REAL_ESTATE]: likeRealEstateF,
  [Types.LIKE_REAL_ESTATE_SUCCESS]: likeRealEstateSuccessF,
  [Types.LIKE_REAL_ESTATE_ERROR]: likeRealEstateErrorF,

  [Types.RATE_REAL_ESTATE]: rateRealEstateF,
  [Types.RATE_REAL_ESTATE_SUCCESS]: rateRealEstateSuccessF,
  [Types.RATE_REAL_ESTATE_ERROR]: rateRealEstateErrorF,

  [Types.ADD_REQUEST]: addRequestF,
  [Types.ADD_REQUEST_SUCCESS]: addRequestSuccessF,
  [Types.ADD_REQUEST_ERROR]: addRequestErrorF,

  [Types.CHANGE_REQUEST_STATE]: changeRequestStateF,
  [Types.CHANGE_REQUEST_STATE_SUCCESS]: changeRequestStateSuccessF,
  [Types.CHANGE_REQUEST_STATE_ERROR]: changeRequestStateErrorF,

  [Types.GET_USER_REQUESTS]: getUserRequestsF,
  [Types.GET_USER_REQUESTS_SUCCESS]: getUserRequestsSuccessF,
  [Types.GET_USER_REQUESTS_ERROR]: getUserRequestsErrorF,

  [Types.GET_USER_NOTIFICATION]: getUserNotificationF,
  [Types.GET_USER_NOTIFICATION_SUCCESS]: getUserNotificationSuccessF,
  [Types.GET_USER_NOTIFICATION_ERROR]: getUserNotificationErrorF,

  [Types.GET_REAL_ESTATE_DETAILS]: getRealEstateDetailF,
  [Types.GET_REAL_ESTATE_DETAILS_SUCCESS]: getRealEstateDetailSuccessF,
  [Types.GET_REAL_ESTATE_DETAILS_ERROR]: getRealEstateDetailErrorF,

  [Types.ADD_SHOW]: addShowF,
});

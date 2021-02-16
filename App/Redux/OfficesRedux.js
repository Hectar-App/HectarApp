import {createReducer, createActions} from 'reduxsauce';
import Immutable from 'seamless-immutable';

const {Types, Creators} = createActions({
  getOffices: ['lat', 'lng', 'radius'],
  getOfficesSuccess: ['offices'],
  getOfficesError: ['error'],
  getOfficeDetails: ['_id'],
  getOfficeDetailsSuccess: ['officeDetails'],
  getOfficeDetailsError: ['officeDetailsError'],
});

export const OfficesTypes = Types;
export default Creators;

export const INITIAL_STATE = Immutable({
  offices: [],
  officesError: '',
  officeDetails: {},
  officeDetailsError: '',
});

export const getOffices = state => {
  return state;
};

export const getOfficesSuccess = (state, action) => {
  const {offices} = action;
  return {...state, offices};
};

export const getOfficesError = (state, action) => {
  const {error} = action;
  return {...state, officeError: error};
};

export const getOfficeDetails = state => {
  return state;
};

export const getOfficeDetailsSuccess = (state, action) => {
  const {office} = action;
  return {...state, officeDetails: office};
};

export const getOfficeDetailsError = (state, action) => {
  const {error} = action;
  return {...state, officeDetailsError: error};
};

export const HANDLERS = {
  [Types.GET_OFFICES]: getOffices,
  [Types.GET_OFFICES_SUCCESS]: getOfficesSuccess,
  [Types.GET_OFFICES_ERROR]: getOfficesError,
  [Types.GET_OFFICE_DETAILS]: getOfficeDetails,
  [Types.GET_OFFICE_DETAILS_SUCCESS]: getOfficeDetailsSuccess,
  [Types.GET_OFFICE_DETAILS_ERROR]: getOfficeDetailsError,
};

export const reducer = createReducer(INITIAL_STATE, HANDLERS);

import { all, fork, takeLatest } from 'redux-saga/effects'

import { UserTypes } from '../Redux/UserRedux'

import { RealEstateTypes } from '../Redux/RealEstateRedux'

import { FavourteTypes } from '../Redux/FavourteRedux'

import { 
    userLogin, 
    verifyPhone, 
    checkPhone, 
    getUserTypes, 
    registerUser, 
    editUserProfile, 
    forgetPassword, 
    ConfirmForgetPassword, 
    resetPassword 
} from './UserSagas'

import { 
    getAddingRealEstateInfo, 
    addRealEstate, 
    getRealEstate, 
    getUserRealEstate,
    addRequest,
    addShow,
    changeRequestState,
    checkRealEstate,
    getUserRequests,
    likeRealEstate,
    rateRealEstate,
    getUserNotifications,
    getRealEstateDetails
} from './RealEstateSagas'

import { addToFavorite, removeFromFavorite, getUserFav } from './FavoriteSagas'


import API from '../Services/API'

const api = API.create()
// DebugConfig.useFixtures ? FixtureAPI :

export default function* root(){
    yield all([

        takeLatest(UserTypes.LOGIN_REQUEST, userLogin, api ),

        takeLatest(UserTypes.CHECK_NUMBER, checkPhone, api ),

        takeLatest(UserTypes.VERFY_NUMBER, verifyPhone, api ),

        takeLatest(UserTypes.GET_USER_TYPES, getUserTypes, api ),

        takeLatest(UserTypes.REGISTER_REQUEST, registerUser, api ),

        takeLatest(UserTypes.EDIT_PROFILE, editUserProfile, api ),

        takeLatest(UserTypes.FORGET_PASSWORD_REQUEST, forgetPassword, api ),

        takeLatest(UserTypes.FORGET_PASSWORD_VERFY_NUMBER, ConfirmForgetPassword, api ),

        takeLatest(UserTypes.RESET_PASSWRD, resetPassword, api ),

        takeLatest(RealEstateTypes.GET_ADDING_AQAR_INFO, getAddingRealEstateInfo, api ),

        takeLatest(RealEstateTypes.ADD_REAL_ESTATE, addRealEstate, api ),

        takeLatest(RealEstateTypes.GET_REAL_ESTATE, getRealEstate, api ),

        takeLatest(RealEstateTypes.GET_USER_REAL_ESTATE, getUserRealEstate, api ),

        takeLatest(FavourteTypes.ADD_TO_FAVOURTE, addToFavorite, api ),

        takeLatest(FavourteTypes.REMOVE_FROM_FAVOURTE, removeFromFavorite, api ),

        takeLatest(FavourteTypes.GET_USER_FAV, getUserFav, api ),

        takeLatest(RealEstateTypes.CHECK_REAL_ESTATE, checkRealEstate, api ),

        takeLatest(RealEstateTypes.LIKE_REAL_ESTATE, likeRealEstate, api ),

        takeLatest(RealEstateTypes.RATE_REAL_ESTATE, rateRealEstate, api ),

        takeLatest(RealEstateTypes.ADD_REQUEST, addRequest, api ),

        takeLatest(RealEstateTypes.CHANGE_REQUEST_STATE, changeRequestState, api ),

        takeLatest(RealEstateTypes.GET_USER_REQUESTS, getUserRequests, api ),

        takeLatest(RealEstateTypes.GET_USER_NOTIFICATION, getUserNotifications, api ),

        takeLatest(RealEstateTypes.ADD_SHOW, addShow, api ),

        takeLatest(RealEstateTypes.GET_REAL_ESTATE_DETAILS, getRealEstateDetails, api ),

    ])
}
import {
    createReducer,
    createActions,
    Types as ReduxSauceTypes
  } from "reduxsauce";
  import Immutable from "seamless-immutable";
  import _ from "lodash";
  
  /* ------------- Types and Action Creators ------------- */
  
  const { Types, Creators } = createActions({
    addToMarkers: ["realEstateId"],
    checkMarker: ["realEstateId"],
  
  });
  
  export const MarkersTypes = Types;
  export default Creators;
  
  /* ------------- Initial State ------------- */
  
  export const INITIAL_STATE = Immutable({
    realEstates: [],
  });
  
  /* ------------- Reducers ------------- */
  
  export const addToMarker = (state, {realEstateId}) => {
    console.log('HElloRealEstateToStatae', realEstateId)
    // return
    let arr = [...state.realEstates]
    let index = arr.findIndex(i => i === realEstateId)
    if(index === -1 )
        arr.push(realEstateId)

    return { ...state, realEstates: arr}
  };
  
  export const checkMArker = (state, { realEstateId }) => {
    if ((state.realEstates || []).findIndex(i => i === realEstateId) !== -1) {
    //   console.log("yes it is", (state.realEstates || []).findIndex(i => i.realEstate._id === realEstateId));
      return {...state, checker: true }
    } else {
    //   console.log("no it is not",(state.realEstates || []).findIndex(i => i.realEstate._id === realEstateId)!== -1);
      return {...state, checker: false }
    }
  };

  export const defaultHandler = state => state
  
  
  /* ------------- Hookup Reducers To Types ------------- */
  
  export const reducer = createReducer(INITIAL_STATE, {
    [Types.ADD_TO_MARKERS]: addToMarker,
    [Types.CHECK_MARKER]: checkMArker,
   
  
    [ReduxSauceTypes.DEFAULT]: defaultHandler
  });
  
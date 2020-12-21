import { createStore, applyMiddleware } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import AsyncStorage from '@react-native-community/async-storage';
import createSagaMiddleware from "redux-saga";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import saga from "./Sagas/index";
import rootReducer from "./Redux/index";
import immutableTransform from 'redux-persist-transform-immutable'

const sagaMiddleware = createSagaMiddleware();

const REDUX_PERSIST = {
  active: true,
  reducerVersion: '1.0',
  key: 'primary',
  storage: AsyncStorage,
  blacklist: ['Marker', 'realEstate'],
  transforms: [immutableTransform()],
}


const persistReducerr = persistReducer(REDUX_PERSIST, rootReducer);
export const store = createStore(
  persistReducerr,
  {},
  applyMiddleware(sagaMiddleware)
);
export const persistor = persistStore(store);
sagaMiddleware.run(saga);

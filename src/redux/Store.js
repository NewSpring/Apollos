import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'remote-redux-devtools';
import { Platform } from 'react-native';
import createSagaMiddleware from 'redux-saga';
import * as _reducers from './reducers';
import * as sagas from './sagas';
import combineSagas from './combineSagas';

const compose = composeWithDevTools({
  name: Platform.OS,
});

const sagaMiddleware = createSagaMiddleware();

const reducers = combineReducers(_reducers);
const initialState = {};
const enhancers = compose(
  applyMiddleware(sagaMiddleware),
);

const Store = createStore(
  reducers,
  initialState,
  enhancers,
);

sagaMiddleware.run(combineSagas(sagas));

export default Store;

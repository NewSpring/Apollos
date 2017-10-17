import { createStore, combineReducers } from 'redux';
import { composeWithDevTools } from 'remote-redux-devtools';
import { Platform } from 'react-native';
import * as _reducers from './reducers';

const compose = composeWithDevTools({
  name: Platform.OS,
});

const reducers = combineReducers(_reducers);
const initialState = {};
const enhancers = compose();

export default createStore(
  reducers,
  initialState,
  enhancers,
);

import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'remote-redux-devtools';
import { Platform } from 'react-native';
import createSagaMiddleware from 'redux-saga';
import * as _reducers from './reducers';
import * as sagas from './sagas';
import combineSagas from './combineSagas';
import RouterHistory from './RouterHistory';
import { changeRoute } from './route/actionCreators';

const compose = composeWithDevTools({
  name: Platform.OS,
});

const sagaMiddleware = createSagaMiddleware();

const reducers = combineReducers(_reducers);
const initialState = {
  route: RouterHistory.location,
};
const enhancers = compose(
  applyMiddleware(sagaMiddleware),
);

const Store = createStore(
  reducers,
  initialState,
  enhancers,
);

// History Listener
RouterHistory.listen((location) => {
  Store.dispatch(changeRoute(location));
});

sagaMiddleware.run(combineSagas(sagas));

export default Store;

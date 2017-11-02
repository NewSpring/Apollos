import { all } from 'redux-saga/effects';
import map from 'lodash/map';

export default function combineSagas(sagas) {
  return function* rootSaga() {
    yield all(map(sagas, saga => saga()));
  };
}


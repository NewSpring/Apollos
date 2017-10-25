import { takeLatest, call, put } from 'redux-saga/effects';
import Client from '../../apollo/Client';
import getDevotionalsQuery from '../../apollo/getDevotionals';

export function* fetchDevotionals() {
  try {
    const results = yield call(Client.query, {
      query: getDevotionalsQuery,
      variables: {
        limit: 10,
        skip: 0,
      },
    });

    yield put({
      type: 'SET_DEVOTIONALS',
      payload: results,
    });
  } catch (err) {
    yield put({
      type: 'ERROR',
      payload: err.message,
    });
  }
}

export default function* listener() {
  yield takeLatest('GET_DEVOTIONALS', fetchDevotionals);
}

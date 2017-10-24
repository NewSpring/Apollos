import { takeLatest, call, put } from 'redux-saga/effects';
import Client from '../../apollo/Client';
import getDevotionalsQuery from '../../apollo/getDevotionals';

export function* fetchDevotionals() {
  try {
    console.log('me too');
    const results = yield call(Client.query, {
      query: getDevotionalsQuery,
      variables: {
        limit: 10,
        skip: 0,
      },
    });

    console.log(results);

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
  console.log('I ran');
  yield takeLatest('GET_DEVOTIONALS', fetchDevotionals);
}

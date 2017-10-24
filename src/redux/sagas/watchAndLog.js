// import { select, take } from 'redux-saga/effects';

// export default function* watchAndLog() {
//   while (true) {
//     console.log('hi');
//     const action = yield take('*');
//     console.log('action', action);
//     const state = yield select();

//     console.log('action', action);
//     console.log('state after', state);
//   }
// }

import { delay } from 'redux-saga'
import { put, takeEvery, all } from 'redux-saga/effects'

// Our worker Saga: will perform the async increment task
export function* incrementAsync() {
  yield delay(1000)
  yield put({ type: 'INCREMENT', stuff: 'hi' })
}

// Our watcher Saga: spawn a new incrementAsync task on each INCREMENT_ASYNC
export function* watchIncrementAsync() {
  yield takeEvery('INCREMENT_ASYNC', incrementAsync)
}

export function* helloSaga() {
  console.log('Hello Sagas!')
}

export default function* rootSaga() {
  yield all([
    helloSaga(),
    watchIncrementAsync()
  ])
}
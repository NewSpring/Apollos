// import { takeEvery, call } from 'redux-saga/effects';
// import {
//   CATCH_ERROR,
// } from './actionTypes';

// export function* notifyErrorService({ payload } = {}) {
//   const {
//     id,
//     timestamp,
//     message,
//   } = payload;

//   // TODO: Not sure where to send errors
//   // eslint-disable-next-line
//   yield call(console.log, { id, timestamp, message });
// }

// export default function* () {
//   yield takeEvery(CATCH_ERROR, notifyErrorService);
// }

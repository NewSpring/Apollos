import { takeLatest, call, put } from 'redux-saga/effects';
import {
  CHECK_LOGIN_CREDENTIALS,
  SIGNUP,
} from './actionTypes';
import login from './actionCreators/login';

// The side effect of checking credentials is logging in
export function* authorizeLogin({ payload } = {}) {
  const {
    email,
    password,
  } = payload;

  // TODO: Pending graphQL login
  // eslint-disable-next-line
  yield call(console.log, { email, password });

  // data from graphQL login
  yield put(login({
    id: 'userId',
    loginToken: 'asdf',
  }));
}

// The side effect of signing up is logging in
export function* authorizeSignup({ payload } = {}) {
  const {
    email,
    password,
    firstName,
    lastName,
    agreesOnTOS,
  } = payload;

  // TODO: Pending graphQL signup
  // eslint-disable-next-line
  yield call(console.log, {
    email,
    password,
    firstName,
    lastName,
    agreesOnTOS,
  });

  // data from graphQL login
  yield put(login({
    id: 'userId',
    loginToken: 'asdf',
  }));
}

export default function* () {
  yield [
    takeLatest(CHECK_LOGIN_CREDENTIALS, authorizeLogin),
    takeLatest(SIGNUP, authorizeSignup),
  ];
}

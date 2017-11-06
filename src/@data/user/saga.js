import { takeLatest, call, put, select } from 'redux-saga/effects';
import {
  CHECK_LOGIN_CREDENTIALS,
  SIGNUP,
  REQUEST_RESET_PASSWORD,
  CHANGE_PASSWORD,
  GET_USER_PROFILE,
  GET_CURRENT_USER,
} from './actionTypes';
import login from './actionCreators/login';
import setUserProfile from './actionCreators/setUserProfile';
import setCurrentUser from './actionCreators/setCurrentUser';
import { getUser } from './selectors';

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

// The side effect of requesting a reset password is
// sending an email with reset instructions
// then showing a confirmation modal
export function* sendResetPasswordEmail({ payload } = {}) {
  const {
    email,
  } = payload;

  // TODO: Pending graphQL reset password
  // eslint-disable-next-line
  yield call(console.log, {
    email,
  });
  // yield put(flash({
  //   message: 'Success!',
  // }));
}

// The side effect of requesting a reset password is
// sending an email with reset instructions
// then showing a confirmation modal
export function* changePassword({ payload } = {}) {
  const {
    currentPassword,
    newPassword,
  } = payload;

  // TODO: Pending graphQL reset password
  // eslint-disable-next-line
  yield call(console.log, {
    currentPassword,
    newPassword,
  });
  // if (updateAuthorized) {
  //   yield put(flash({
  //     message: 'Success!',
  //   }));
  // } else {
  //   yield put(flash({
  //     message: 'Failed to update because reasons',
  //   }));
  // }
}

// The side effect of requesting a users' profile is
// setting it
export function* userProfile() {
  const {
    id,
  } = yield select(getUser);

  // TODO: Pending graphQL get user profile (this may already be available)
  // eslint-disable-next-line
  yield call(console.log, {
    id,
  });

  // TODO: Pending return graphQL user profile
  yield put(setUserProfile, {
    nickname: 'nickname',
    firstName: 'firstName',
    lastName: 'lastName',
    birthday: 1509727572168,
    campus: 'campusId',
    address: {
      city: 'city',
      country: 'country',
      zip: 'zip',
      state: 'state',
      street1: 'street1',
      street2: 'street2',
    },
    imageUrl: 'http://via.placeholder.com/350x150',
    agreesOnTOS: true,
  });
}

// The side effect of requesting the current user is
// setting it
export function* currentUser() {
  // TODO: Pending offline storage engine
  // eslint-disable-next-line
  const {
    loginToken,
    email,
    id,
  } = yield call(() => ({
    loginToken: 'loginToken',
    email: 'email@email.com',
    id: 'asdfasdf',
  }));

  yield put(setCurrentUser, {
    loginToken,
    email,
    id,
  });
}

export default function* () {
  yield [
    takeLatest(CHECK_LOGIN_CREDENTIALS, authorizeLogin),
    takeLatest(SIGNUP, authorizeSignup),
    takeLatest(REQUEST_RESET_PASSWORD, sendResetPasswordEmail),
    takeLatest(CHANGE_PASSWORD, changePassword),
    takeLatest(GET_USER_PROFILE, userProfile),
    takeLatest(GET_CURRENT_USER, currentUser),
  ];
}

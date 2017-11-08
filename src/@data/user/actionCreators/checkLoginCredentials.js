import { CHECK_LOGIN_CREDENTIALS } from '../actionTypes';

export default function checkLoginCredentials(params = {}) {
  const {
    email,
    password,
  } = params;

  return {
    type: CHECK_LOGIN_CREDENTIALS,
    payload: {
      email,
      password,
    },
  };
}

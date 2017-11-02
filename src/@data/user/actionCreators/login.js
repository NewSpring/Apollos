import { LOGIN } from '../actionTypes';

export default function login(params = {}) {
  const {
    email,
    password,
  } = params;

  return {
    type: LOGIN,
    payload: {
      email,
      password,
    },
  };
}

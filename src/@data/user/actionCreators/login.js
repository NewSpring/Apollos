import { LOGIN } from '../actionTypes';

export default function login(params = {}) {
  const {
    loginToken,
    id,
  } = params;

  return {
    type: LOGIN,
    payload: {
      loginToken,
      id,
    },
  };
}

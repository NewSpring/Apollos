import { SET_CURRENT_USER } from '../actionTypes';

export default function setCurrentUser(params = {}) {
  const {
    email,
    id,
    loginToken,
  } = params;

  return {
    type: SET_CURRENT_USER,
    payload: {
      email,
      id,
      loginToken,
    },
  };
}

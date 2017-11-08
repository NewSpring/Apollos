import { SIGNUP } from '../actionTypes';

export default function signup(params = {}) {
  const {
    email,
    password,
    firstName,
    lastName,
    agreesOnTOS,
  } = params;

  return {
    type: SIGNUP,
    payload: {
      email,
      password,
      firstName,
      lastName,
      agreesOnTOS,
    },
  };
}

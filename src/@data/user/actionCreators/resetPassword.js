import { REQUEST_RESET_PASSWORD } from '../actionTypes';

export default function resetPassword(params = {}) {
  const {
    email,
  } = params;

  return {
    type: REQUEST_RESET_PASSWORD,
    payload: {
      email,
    },
  };
}

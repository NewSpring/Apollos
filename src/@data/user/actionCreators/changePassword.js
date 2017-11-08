import { CHANGE_PASSWORD } from '../actionTypes';

export default function changePassword(params = {}) {
  const {
    currentPassword,
    newPassword,
  } = params;

  return {
    type: CHANGE_PASSWORD,
    payload: {
      currentPassword,
      newPassword,
    },
  };
}

import { LOGOUT } from '../actionTypes';

export default function logout() {
  return {
    type: LOGOUT,
    payload: {},
  };
}

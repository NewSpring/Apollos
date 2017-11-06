import {
  SET_SEEK_POSITION,
} from '../actionTypes';

export default seekProgress => ({
  type: SET_SEEK_POSITION,
  payload: { seekProgress },
});

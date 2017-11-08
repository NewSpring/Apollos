import {
  SET_PLAYLIST,
} from '../actionTypes';

export default ({ playlist } = {}) => ({
  type: SET_PLAYLIST,
  payload: {
    playlist,
  },
});

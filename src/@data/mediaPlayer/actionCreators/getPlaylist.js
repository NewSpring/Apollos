import {
  GET_PLAYLIST,
} from '../actionTypes';

export default ({ id } = {}) => ({
  type: GET_PLAYLIST,
  payload: {
    id,
  },
});

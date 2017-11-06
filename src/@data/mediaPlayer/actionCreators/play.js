import {
  PLAY,
} from '../actionTypes';

export default ({ id } = {}) => ({
  type: PLAY,
  payload: {
    id,
  },
});

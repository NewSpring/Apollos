import { SET_FEED } from '../actionTypes';

export default function setHomeFeed(params = {}) {
  const {
    content,
  } = params;

  return {
    type: SET_FEED,
    payload: {
      content,
    },
  };
}

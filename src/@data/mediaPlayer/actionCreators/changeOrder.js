import {
  ORDER_SHUFFLE,
  ORDER_NATURAL,
} from '../actionTypes';

// NOTE: Keeping it flexible in case we need to do
// more ordering options
export default direction => ({
  type: direction === 'shuffle' ? ORDER_SHUFFLE : ORDER_NATURAL,
  payload: {},
});

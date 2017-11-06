import * as actionTypes from './actionTypes';

export const INITIAL_STATE = {};

export default (state = INITIAL_STATE, { type, payload } = {}) => {
  switch (type) {
    case actionTypes.ROUTE_CHANGED: {
      return payload;
    }
    default: {
      return state;
    }
  }
};

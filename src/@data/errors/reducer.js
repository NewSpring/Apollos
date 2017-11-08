import {
  CATCH_ERROR,
} from './actionTypes';

export const INITIAL_STATE = [];
export default (state = INITIAL_STATE, { type, payload } = {}) => {
  switch (type) {
    case CATCH_ERROR: {
      const {
        id,
        message,
      } = payload;
      return [
        { id, message },
        ...state,
      ];
    }
    default: {
      return state;
    }
  }
};

import randomId from 'uuid/v4';
import {
  CATCH_ERROR,
} from './actionTypes';

export const catchError = (params = {}) => {
  const {
    message,
  } = params;

  return {
    type: CATCH_ERROR,
    payload: {
      id: randomId(),
      timestamp: Date.now(),
      message,
    },
  };
};

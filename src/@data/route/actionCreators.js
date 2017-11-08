import {
  ROUTE_CHANGED,
} from './actionTypes';

export const changeRoute = location => ({
  type: ROUTE_CHANGED,
  payload: location,
});

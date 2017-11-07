import { takeLatest, call, put, select, all } from 'redux-saga/effects';
import {
  GET_FEED,
} from './actionTypes';
import { selectHomeFeed } from './selectors';
import getHomeFeed from './actionCreators/getHomeFeed';
import setHomeFeed from './actionCreators/setHomeFeed';
import getHomeFeedQuery from './queries/getHomeFeed';
import Client from '../Client';
import { ROUTE_CHANGED } from '../route/actionTypes';
import { FOLLOWABLE_TOPICS } from './constants';

// The side effect of routing to the home feed is
// requesting the home feed
export function* orchestrator({ payload: location } = {}) {
  // TODO: Use routers' matchPath
  if (location.pathname === '/') {
    yield put(getHomeFeed());
  }
}

// The side effect of requesting the home feed is
// setting it
export function* homeFeed() {
  const {
    page,
    pageSize,
  } = yield select(selectHomeFeed);

  const { data: { feed } } = yield call(Client.query, {
    query: getHomeFeedQuery,
    variables: {
      filters: ['CONTENT'],
      // TODO: FOLLOWABLE_TOPICS should be whatever it is that
      // they are currently following OR all topics (topics is hard coded @ source)
      options: JSON.stringify({ content: { channels: FOLLOWABLE_TOPICS } }),
      limit: pageSize,
      skip: page * pageSize,
      cache: true,
    },
  });

  yield put(setHomeFeed({
    content: feed,
  }));
}

export default function* () {
  yield all([
    takeLatest(ROUTE_CHANGED, orchestrator),
    takeLatest(GET_FEED, homeFeed),
  ]);
}

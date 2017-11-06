import { takeEvery, call, put } from 'redux-saga/effects';
import {
  GET_PLAYLIST,
} from './actionTypes';
import setPlaylist from './actionCreators/setPlaylist';

export function* playlists({ payload } = {}) {
  const {
    id,
  } = payload;

  // TODO: Connect to graphql
  // eslint-disable-next-line
  const playlist = yield call(() => ([
    {
      type: 'audio', // 'audio', 'video'
      title: 'She\'s a Gift', // String
      subtitle: 'Borrtex', // String
      url: 'https://freemusicarchive.org/file/music/ccCommunity/Borrtex/Something_Special/Borrtex_-_06_-_Shes_A_Gift.mp3', // String (url)
      placeholderImage: 'https://www.nationalgeographic.com/content/dam/animals/thumbs/rights-exempt/mammals/h/horse_thumb.ngsversion.1481754630544.adapt.1900.1.jpg', // String (url)
      id: '1', // String
    },
    {
      type: 'audio', // 'audio', 'video'
      title: 'Window Shopping', // String
      subtitle: 'Podington Bear', // String
      url: 'https://freemusicarchive.org/file/music/Creative_Commons/Podington_Bear/Passages/Podington_Bear_-_Window_Shopping.mp3', // String (url)
      placeholderImage: 'http://www.wildnatureimages.com/images%202/050612-100..jpg', // String (url)
      id: '2', // String
    },
  ]), { id });

  yield put(setPlaylist({ playlist }));
}

export default function* () {
  yield takeEvery(GET_PLAYLIST, playlists);
}

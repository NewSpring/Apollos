import findIndex from 'lodash/findIndex';
import * as actionTypes from './actionTypes';

export const INITIAL_STATE = {
  isLoading: true,
  visibility: 'closed', // "closed", "docked", "expanded"
  order: 'natural', // "shuffle", "natural"
  repeat: 'no-repeat', // "repeat", "repeat-once", "no-repeat"

  // array of tracks with index used to set order
  playlist: [
    // {
    //   type: 'audio', // 'audio', 'video'
    //   title: null, // String
    //   subtitle: null, // String
    //   duration: null, // String (ms)
    //   url: null // String (url)
    //   placeholderImage: null, // String (url)
    //   id: 'asdf', // String
    // }
  ],

  // currently playing media
  current: null, // id from playlist
  isPlaying: false,
  seekProgress: 0,
};

export default (state = INITIAL_STATE, { type, payload } = {}) => {
  switch (type) {
    case actionTypes.PLAY: {
      const {
        id,
      } = payload;
      return {
        ...state,
        current: id,
        isPlaying: true,
      };
    }
    case actionTypes.PAUSE: {
      return {
        ...state,
        isPlaying: false,
      };
    }
    case actionTypes.SKIP_NEXT: {
      const {
        playlist,
        current,
        repeat,
      } = state;

      const currentIndex = findIndex(playlist, { id: current });
      // TODO: Missing repeat-once case
      const next = repeat === 'no-repeat' ? playlist[currentIndex + 1] : playlist[(currentIndex + 1) % playlist.length];

      if (!next) return state;
      return {
        ...state,
        current: next.id,
      };
    }
    case actionTypes.SKIP_PREVIOUS: {
      const {
        playlist,
        current,
        repeat,
      } = state;

      const currentIndex = findIndex(playlist, { id: current });
      // TODO: Missing repeat-once case
      const prev = repeat === 'no-repeat' ? playlist[currentIndex - 1] : playlist[(currentIndex - 1) % playlist.length];

      if (!prev) return state;
      return {
        ...state,
        current: prev.id,
      };
    }
    case actionTypes.CLOSE: {
      return {
        ...state,
        visibility: 'closed',
      };
    }
    case actionTypes.DOCK: {
      return {
        ...state,
        visibility: 'docked',
      };
    }
    case actionTypes.EXPAND: {
      return {
        ...state,
        visibility: 'expanded',
      };
    }
    case actionTypes.ORDER_SHUFFLE: {
      return {
        ...state,
        order: 'shuffle',
      };
    }
    case actionTypes.ORDER_NATURAL: {
      return {
        ...state,
        order: 'natural',
      };
    }
    case actionTypes.REPEAT: {
      return {
        ...state,
        repeat: 'repeat',
      };
    }
    case actionTypes.NO_REPEAT: {
      return {
        ...state,
        repeat: 'no-repeat',
      };
    }
    case actionTypes.REPEAT_ONCE: {
      return {
        ...state,
        repeat: 'repeat-once',
      };
    }
    case actionTypes.GET_PLAYLIST: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case actionTypes.SET_PLAYLIST: {
      const {
        playlist,
      } = payload;
      return {
        ...state,
        isLoading: false,
        playlist,
      };
    }
    case actionTypes.SET_SEEK_POSITION: {
      const {
        seekProgress,
      } = payload;
      return {
        ...state,
        seekProgress,
      };
    }
    default: {
      return state;
    }
  }
};

import * as actionTypes from './actionTypes';

export const INITIAL_STATE = {
  scrollPosition: 0,
  page: 0,
  pageSize: 10,
  isLoading: true,
  isLoadingMore: false,
  content: [ // content blocks of [article, music, sermon, devotionals, etc]
    // { // ContentBlock
    //   id: String
    //   hasLike: Bool
    //   title: String
    //   imageUrl: String
    //   channel: String // oneOf article, music, sermon, devotionals, etc
    // }
  ],
};

export default (state = INITIAL_STATE, { type, payload } = {}) => {
  switch (type) {
    case actionTypes.GET_FEED: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case actionTypes.SET_FEED: {
      const {
        content,
      } = payload;
      return {
        ...state,
        isLoading: false,
        content,
      };
    }
    default: {
      return state;
    }
  }
};

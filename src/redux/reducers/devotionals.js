const INITIAL_STATE = {
  items: [],
};

export default (state = INITIAL_STATE, { type, payload } = {}) => {
  switch (type) {
    case 'DEVOTIONALS/GET':
      return {
        items: [
          { _id: 1, type: 'article', title: 'An article about stuff 1' },
          { _id: 2, type: 'article', title: 'An article about stuff 2' },
          { _id: 3, type: 'article', title: 'An article about stuff 3' },
        ],
      };
    default:
      return state;
  }
};

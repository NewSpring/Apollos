import { graphql } from 'react-apollo';
import { FOLLOWABLE_TOPICS } from '@data/constants';
import homeFeedQuery from './homeFeedQuery';

export default graphql(homeFeedQuery, {
  options: () => ({
    variables: {
      filters: ['CONTENT'],
      options: JSON.stringify({ content: { channels: FOLLOWABLE_TOPICS } }),
      limit: 20,
      skip: 0,
      cache: true,
    },
  }),
  props: ({ data: { feed } }) => ({
    feed,
  }),
});


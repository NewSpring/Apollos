import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import identifyCategory from '@data/utils/identifyCategory';
import { contentCard, groupCard } from './fragments';

export const recentLikesQuery = gql`
  query RecentlyLiked {
    recentlyLiked(limit: 10, skip: 0) {
      ... ContentCard
      ... GroupCard
    }
  }
  ${contentCard}
  ${groupCard}
`;

export default graphql(recentLikesQuery, {
  props: ({ data } = {}) => ({
    error: data.error,
    content: data.recentlyLiked && data.recentlyLiked.map(identifyCategory),
    isLoading: data.loading,
    refetch: data.refetch,
  }),
});

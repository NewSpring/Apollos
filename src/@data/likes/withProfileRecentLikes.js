import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import identifyCategory from '@data/utils/identifyCategory';
import { contentCard, groupCard } from './fragments';

export const QUERY = gql`
  query RecentlyLiked {
    recentlyLiked(limit: 10, skip: 0) {
      ... ContentCard
      ... GroupCard
    }
  }
  ${contentCard}
  ${groupCard}
`;

export default graphql(QUERY, {
  props: ({ ownProps, data } = {}) => ({
    error: data.error || ownProps.error,
    content: data.recentlyLiked && data.recentlyLiked.map(identifyCategory),
    isLoading: ownProps.isLoading || data.loading,
    refetch: data.refetch,
  }),
});

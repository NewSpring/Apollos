import gql from 'graphql-tag';
import { contentCard, groupCard } from './fragments';

export default gql`
  query RecentlyLiked {
    recentlyLiked(limit: 10, skip: 0) {
      ... ContentCard
      ... GroupCard
    }
  }
  ${contentCard}
  ${groupCard}
`;

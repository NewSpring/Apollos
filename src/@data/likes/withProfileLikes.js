import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { contentCard, groupCard } from './fragments';

export const QUERY = gql`
  query UserLikes {
    userFeed(filters:["LIKES"]) {
      ... ContentCard
      ... GroupCard
    }
  }
  ${contentCard}
  ${groupCard}
`;

export default graphql(QUERY);

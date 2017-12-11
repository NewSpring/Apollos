import gql from 'graphql-tag';
import { contentCard, groupCard } from './fragments';

export default gql`
  query UserLikes {
    userFeed(filters:["LIKES"]) {
      ... ContentCard
      ... GroupCard
    }
  }
  ${contentCard}
  ${groupCard}
`;

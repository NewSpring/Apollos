import { graphql } from 'react-apollo';
import likesQuery from './likesQuery';
import recentLikesQuery from './recentLikesQuery';

export const withProfileLikes = graphql(likesQuery);
export const withProfileRecentLikes = graphql(recentLikesQuery);


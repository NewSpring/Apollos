import { withClientState } from 'apollo-link-state';
import * as MediaPlayerQueryResolvers from '@data/mediaPlayer/queries';
import * as MediaPlayerMutationResolvers from '@data/mediaPlayer/mutations';

export default withClientState({
  Query: {
    ...MediaPlayerQueryResolvers,
  },
  Mutation: {
    ...MediaPlayerMutationResolvers,
  },
});

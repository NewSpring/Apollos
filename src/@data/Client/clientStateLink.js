import { withClientState } from 'apollo-link-state';
import * as MediaPlayerQueryResolvers from '@data/mediaPlayer/queries';
import * as MediaPlayerMutationResolvers from '@data/mediaPlayer/mutations';
import * as GiveQueryResolvers from '@data/withGive/queries';
import * as GiveMutationResolvers from '@data/withGive/mutations';

export default withClientState({
  Query: {
    ...MediaPlayerQueryResolvers,
    ...GiveQueryResolvers,
  },
  Mutation: {
    ...MediaPlayerMutationResolvers,
    ...GiveMutationResolvers,
  },
});

import { withClientState } from 'apollo-link-state';
import * as MediaPlayerQueryResolvers from '@data/mediaPlayer/queries';
import * as MediaPlayerMutationResolvers from '@data/mediaPlayer/mutations';
import * as GiveQueryResolvers from '@data/withGive/resolvers/queries';
import * as GiveMutationResolvers from '@data/withGive/resolvers/mutations';
import * as OnboardingQueryResolvers from '@data/withOnboarding/queryResolvers';
import * as OnboardingMutationResolvers from '@data/withOnboarding/mutationResolvers';
import cache from './cache';

export default withClientState({
  cache,
  resolvers: {
    Query: {
      ...MediaPlayerQueryResolvers,
      ...GiveQueryResolvers,
      ...OnboardingQueryResolvers,
    },
    Mutation: {
      ...MediaPlayerMutationResolvers,
      ...GiveMutationResolvers,
      ...OnboardingMutationResolvers,
    },
  },
});

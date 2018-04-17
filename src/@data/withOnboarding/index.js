import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { compose } from 'recompose';
import query from './query';

const didOnboard = gql`
  mutation didOnboard {
    didOnboard @client
  }
`;

const showOnboarding = gql`
  mutation showOnboarding {
    showOnboarding @client
  }
`;

export const withDidOnboard = graphql(didOnboard, {
  props: ({ mutate }) => ({
    didOnboard: () => mutate(),
  }),
});

export const withShowOnboarding = graphql(showOnboarding, {
  props: ({ mutate }) => ({
    showOnboarding: () => mutate(),
  }),
});

const withOnboarding = graphql(query, {
  props: ({ data: { error, onboarded, loading }, ownProps = {} }) => ({
    error: error || ownProps.error,
    onboarded,
    isLoading: loading || ownProps.isLoading,
  }),
});

export default compose(withOnboarding, withDidOnboard, withShowOnboarding);

import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

export const MUTATION = gql`
  mutation setOrder($url: String!) {
    setOrder(url: $url) @client
  }
`;

// NOTE: Payment info is sent to the URL
export default graphql(MUTATION, {
  props: ({ mutate }) => ({
    setOrder: props => (mutate({
      variables: {
        url: props.url,
      },
    })),
  }),
});

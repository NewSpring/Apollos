import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import fetchMoreResolver from '@data/utils/fetchMoreResolver';

const searchQuery = gql`
  query Search($term: String!, $first: Int, $skip: Int, $site: String) {
    content: search(query: $term, first: $first, after: $skip, site: $site) {
      total
      items {
        id
        title
        htmlTitle
        htmlDescription
        link
        image
        displayLink
        description
        type
        section
      }
    }
  }
`;

export default graphql(searchQuery, {
  options: (ownProps = {}) => ({
    skip: !ownProps.term,
    variables: {
      term: ownProps.term,
      site: ownProps.site || 'https://newspring.cc',
    },
  }),
  props: ({ data, ownProps } = {}) => ({
    content: (data.content && data.content.items) || [],
    total: data.content && data.content.total,
    isLoading: data.loading || ownProps.isLoading,
    refetch: data.refetch,
    error: data.error || ownProps.error,
    fetchMore: fetchMoreResolver({
      collectionName: 'content.items',
      data,
    }),
  }),
});

import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
// import fetchMoreResolver from '@data/utils/fetchMoreResolver';

const searchQuery = gql`
  query Search($term: String!, $first: Int, $after: Int, $site: String) {
    content: search(query: $term, first: $first, after: $after, site: $site) {
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
    variables: {
      term: ownProps.term,
      site: ownProps.site || 'https://newspring.cc',
    },
  }),
  props: ({ data } = {}) => ({
    content: data.content,
    isLoading: data.loading,
    refetch: data.refetch,
    // fetchMore: fetchMoreResolver({
    //   collectionName: 'content',
    //   data,
    // }),
  }),
});

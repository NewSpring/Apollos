import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { merge } from 'lodash';

const cachedContentQuery = gql`
  query getCachedContent($id: ID!) {
    content: node(id: $id) {
      id
      ... on Content {
        title
        channelName
        content {
          isLiked
          isLight
          images(sizes: ["large"]) {
            fileName
            fileType
            fileLabel
            url
          }
          colors {
            value
            description
          }
        }
      }
    }
  }
`;

const cachedContentParentQuery = gql`
  query getCachedParentContent($id: ID!) {
    content: node(id: $id) {
      id
      ... on Content {
        parent {
          content {
            isLight
            images(sizes: ["large"]) {
              fileName
              fileType
              fileLabel
              url
            }
            colors {
              value
              description
            }
          }
        }
      }
    }
  }
`;

const withQuery = query => graphql(query, {
  props: ({ data: { content, loading }, ownProps }) => ({
    content: merge({}, (content || {}), (ownProps.content || {})),
    isLoading: ownProps.isLoading || loading,
  }),
  options: (ownProps = {}) => ({
    variables: {
      id: ownProps.id,
    },
    fetchPolicy: 'cache-only',
  }),
});

export default withQuery(cachedContentQuery);
export const withCachedParentContent = withQuery(cachedContentParentQuery);

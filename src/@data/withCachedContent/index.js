import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { merge } from 'lodash';
import { contentDataImagesFragment } from '@data/fragments';

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
          ...ContentDataImagesFragment
          colors {
            value
            description
          }
        }
      }
    }
  }
  ${contentDataImagesFragment}
`;

const cachedContentParentQuery = gql`
  query getCachedParentContent($id: ID!) {
    content: node(id: $id) {
      id
      ... on Content {
        parent {
          content {
            isLight
            ...ContentDataImagesFragment
            colors {
              value
              description
            }
          }
        }
      }
    }
  }
  ${contentDataImagesFragment}
`;

const withQuery = query => graphql(query, {
  props: ({ data: { error, content, loading }, ownProps }) => ({
    error: error || ownProps.error,
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

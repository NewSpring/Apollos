import { gql } from 'react-apollo';

export default gql`
  query getSeriesSingle($id: ID!) {
    content: node(id: $id) {
      id
      ... on Content {
        entryId: id
        title
        status
        channelName
        meta {
          urlTitle
          siteId
          date
          channelId
        }
        content {
          description
          tags
          isLight
          images(sizes: ["large"]) {
            fileName
            fileType
            fileLabel
            url
          }
          ooyalaId
          colors {
            id
            value
            description
          }
        }
      }
    }
  }
`;

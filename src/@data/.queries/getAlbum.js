import { gql } from 'react-apollo';

export default gql`
  query getAlbum($id: ID!) {
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
          tracks {
            title
            duration
            file: s3
          }
          images(sizes: ["large", "medium", "small", "xsmall"]) {
            fileName
            fileType
            fileLabel
            size
            url
          }
          colors {
            value
            description
          }
          isLight
        }
      }
    }
  }
`;

import gql from 'graphql-tag';

export default gql`
  query getAlbum($id: ID!) {
    playlist: node(id: $id) {
      id
      ... on Content {
        id
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
          isLiked
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

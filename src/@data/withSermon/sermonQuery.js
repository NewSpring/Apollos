import gql from 'graphql-tag';

export default gql`
  query getSermon($id: ID!) {
    content: node(id: $id) {
      ... on Content {
        entryId: id
        title
        status
        channelName
        parent {
          entryId: id
          title
          content {
            isLight
            colors {
              value
              description
            }
            images(sizes: ["large", "medium"]) {
              fileName
              fileType
              fileLabel
              url
            }
          }
        }
        meta {
          urlTitle
          siteId
          date
          actualDate
          channelId
        }
        content {
          audio {
            duration
            file: s3
          }
          description
          speaker
          ooyalaId
        }
      }
    }
  }
`;

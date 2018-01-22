import gql from 'graphql-tag';

export default gql`
  query getSermon($id: ID!) {
    content: node(id: $id) {
      ... on Content {
        id
        title
        status
        channelName
        parent {
          id
          title
          content {
            isLiked
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
          children(channels: ["sermons"]) {
            id
            title
            channelName
            meta {
              date
            }
            content {
              speaker
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
          isLiked
          audio {
            duration
            file: s3
          }
          description
          speaker
          video {
            embedUrl
          }
        }
      }
    }
  }
`;

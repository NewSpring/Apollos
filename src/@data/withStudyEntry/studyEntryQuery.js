import gql from 'graphql-tag';

export default gql`
  query GetStudyEntry($id: ID!) {
    content: node(id: $id) {
      ... on Content {
        id
        title
        status
        channelName
        meta {
          urlTitle
          siteId
          date
          actualDate
          channelId
        }
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
        }
        content {
          isLiked
          audio {
            duration
            file: s3
          }
          images(sizes: ["large", "medium"]) {
            fileName
            fileType
            fileLabel
            url
            size
          }
          scripture {
            book
            passage
          }
          body
          tags
          speaker
          video {
            embedUrl
          }
        }
      }
    }
  }
`;

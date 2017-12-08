import gql from 'graphql-tag';

export default gql`
  query GetStudyEntry($id: ID!) {
    content: node(id: $id) {
      ... on Content {
        entryId: id
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
        content {
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
          ooyalaId
        }
      }
    }
  }
`;

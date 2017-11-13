import { gql } from 'react-apollo';

export default gql`
  query GetStudyEntry($studyEntryId: ID!) {
    content: node(id: $studyEntryId) {
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
        content {
          audio {
            duration
            file: s3
          }
          images(sizes: ["large", "medium", "small"]) {
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

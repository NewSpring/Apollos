import { gql } from 'react-apollo';

export default gql`
  query getDevotional($id: ID!) {
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
          body
          tags
          scripture {
            book
            passage
          }
          images(sizes: ["large"]) {
            fileName
            fileType
            fileLabel
            url
          }
        }
      }
    }
  }
`;

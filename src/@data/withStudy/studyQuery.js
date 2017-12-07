import gql from 'graphql-tag';

export default gql`
  query GetSingleStudy($id: ID!) {
    content: node(id: $id) {
      id
      ... on Content {
        entryId: id
        title
        status
        channelName
        children {
          id
        }
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
            value
            description
          }
        }
      }
    }
  }
`;

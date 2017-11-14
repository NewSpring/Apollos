import gql from 'graphql-tag';

export default gql`
  query getArticle($id: ID!) {
    content: node(id: $id) {
      id
      ... on Content {
        title
        status
        channelName
        authors
        meta {
          urlTitle
          siteId
          date
          channelId
        }
        content {
          body
          ooyalaId
          tags
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

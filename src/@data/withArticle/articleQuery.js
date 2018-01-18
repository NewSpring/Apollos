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
          isLiked
          body
          video {
            embedUrl
          }
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

import gql from 'graphql-tag';

export default gql`
  query getContent($id: ID!) {
    content: node(id: $id) {
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
    live {
      live
      embedCode
    }
  }
`;

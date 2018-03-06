import gql from 'graphql-tag';

export default gql`
  query GetSingleStudy($id: ID!) {
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
          description
          tags
          isLight
          images(sizes: ["large"]) {
            fileName
            fileType
            fileLabel
            url
          }
          video {
            embedUrl
            videoUrl
          }
          colors {
            value
            description
          }
        }
        children(channels: ["study_entries"], showFutureEntries: true) {
          id
          title
          channelName
          parent {
            id
          }
          meta {
            date
            urlTitle
          }
          content {
            speaker
          }
        }
      }
    }
  }
`;

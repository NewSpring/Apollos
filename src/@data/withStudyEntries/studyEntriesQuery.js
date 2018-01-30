import gql from 'graphql-tag';

export default gql`
  query GetEntriesFromStudy($id: ID!) {
    content: node(id: $id) {
      ... on Content {
        studyEntries: children(channels: ["study_entries"], showFutureEntries: true) {
          id
          id
          title
          status
          channelName
          parent {
            id
            meta {
              urlTitle
            }
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
          meta {
            urlTitle
            siteId
            date
            channelId
          }
          content {
            isLiked
            speaker
          }
        }
      }
    }
  }
`;

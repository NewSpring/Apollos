import gql from 'graphql-tag';

export default gql`
  query GetSermonsFromSeries($id: ID!) {
    content: node(id: $id) {
      ... on Content {
        sermons: children(channels: ["sermons"]) {
          id
          entryId: id
          title
          status
          channelName
          parent {
            entryId: id
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
          meta {
            urlTitle
            siteId
            date
            channelId
          }
          content {
            speaker
          }
        }
      }
    }
  }
`;

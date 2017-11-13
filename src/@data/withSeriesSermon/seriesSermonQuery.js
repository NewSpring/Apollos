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

import gql from 'graphql-tag';

export default gql`
  query GetPromotions($setName: String!) {
    content: lowReorderSets(setName: $setName) {
      entryId: id
      title
      id
      status
      channelName
      category: channelName
      meta {
        urlTitle
        date
      }
      content {
        images(sizes: ["large"]) {
          fileName
          fileLabel
          url
        }
      }
    }
  }
`;

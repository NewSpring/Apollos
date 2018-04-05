import gql from 'graphql-tag';

export default gql`
  query GetPromotions($setName: String!) {
    content: lowReorderSets(setName: $setName) {
      title
      id
      status
      channelName
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
        isLiked
        colors {
          value
          description
        }
        isLight
      }
    }
  }
`;

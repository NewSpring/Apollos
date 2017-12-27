import gql from 'graphql-tag';

export default gql`
  query getSeries($limit: Int!, $skip: Int!){
    content(channel: "studies", limit: $limit, skip: $skip) {
      id
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
        images(sizes: ["large"]) {
          fileName
          fileType
          fileLabel
          url
        }
        isLight
        colors {
          value
          description
        }
      }
    }
  }
`;

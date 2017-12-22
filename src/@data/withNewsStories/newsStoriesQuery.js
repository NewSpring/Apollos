import gql from 'graphql-tag';

export default gql`
  query GetNews($limit: Int!, $skip: Int!) {
    content(channel: "news", limit: $limit, skip: $skip) {
      id
      entryId: id
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
        hasLike
        body
        images(sizes: ["large"]) {
          fileName
          fileType
          fileLabel
          url
        }
        ooyalaId
      }
    }
  }
`;

import gql from 'graphql-tag';

export default gql`
  query getDevotionals($limit: Int!, $skip: Int!) {
    content(channel: "devotionals", limit: $limit, skip: $skip) {
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
        isLiked
        body
        images(sizes: ["large"]) {
          fileName
          fileType
          fileLabel
          url
        }
      }
    }
  }
`;

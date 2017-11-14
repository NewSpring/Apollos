import gql from 'graphql-tag';

export default gql`
  query getArticles($limit: Int!, $skip: Int!) {
    content(channel: "articles", limit: $limit, skip: $skip) {
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
        body
        scripture {
          book
          passage
        }
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

import gql from 'graphql-tag';

export default gql`
  query getStories($limit: Int!, $skip: Int!) {
    content(channel: "stories", limit: $limit, skip: $skip) {
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
        body
        images(sizes: ["large"]) {
          fileName
          fileType
          fileLabel
          url
        }
        video {
          embedUrl
        }
      }
    }
  }
`;

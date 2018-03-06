import gql from 'graphql-tag';

export default gql`
  query GetNews($limit: Int!, $skip: Int!) {
    content(channel: "news", limit: $limit, skip: $skip) {
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
        body
        images(sizes: ["large"]) {
          fileName
          fileType
          fileLabel
          url
        }
        video {
          embedUrl
          videoUrl
        }
      }
    }
  }
`;

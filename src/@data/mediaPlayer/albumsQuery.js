import gql from 'graphql-tag';

export default gql`
  query getAlbums($limit: Int!, $skip: Int!) {
    library: content(channel: "newspring_albums", limit: $limit, skip: $skip) {
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
        tracks {
          file: s3
        }
      }
    }
  }
`;

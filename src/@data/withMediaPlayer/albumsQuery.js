import gql from 'graphql-tag';

export default gql`
  query getAlbums($limit: Int!, $skip: Int!) {
    content(channel: "newspring_albums", limit: $limit, skip: $skip) {
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

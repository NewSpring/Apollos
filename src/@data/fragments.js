import gql from 'graphql-tag';

export const imageFragment = gql`
  fragment ImageFragment on File {
    fileName
    fileType
    fileLabel
    url
    size
  }
`;

export const contentDataImagesFragment = gql`
  fragment ContentDataImagesFragment on ContentData {
    images(sizes: ["large", "medium"]) {
      ...ImageFragment
    }
    thumbnailImage: images(sizes: ["xsmall"]) {
      ...ImageFragment
    }
  }
  ${imageFragment}
`;

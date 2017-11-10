import { gql } from 'react-apollo';

export default gql`
  query GetFinancialAccounts {
    accounts {
      description
      name
      id: entityId
      summary
      image
      order
      images {
        fileName
        fileType
        fileLabel
        s3
        cloudfront
      }
    }
  }
`;

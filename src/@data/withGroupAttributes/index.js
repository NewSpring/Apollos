import { graphql } from 'react-apollo';
import groupAttributesQuery from './groupAttributesQuery';


export default graphql(groupAttributesQuery, {
  props: ({ ownProps, data } = {}) => ({
    error: data.error || ownProps.error,
    groupAttributes: data.groupAttributes,
    isLoading: ownProps.isLoading || data.loading,
  }),
});

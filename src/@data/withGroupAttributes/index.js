import { graphql } from 'react-apollo';
import groupAttributesQuery from './groupAttributesQuery';


export default graphql(groupAttributesQuery, {
  props: ({ data } = {}) => console.log({ data }) || ({
    groupAttributes: data.groupAttributes,
    isLoading: data.loading,
  }),
});

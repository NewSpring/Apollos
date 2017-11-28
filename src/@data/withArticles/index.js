import { graphql } from 'react-apollo';
import fetchMoreResolver from '@data/utils/fetchMoreResolver';
import identifyCategory from '@data/utils/identifyCategory';
import articlesQuery from './articlesQuery';

export default graphql(articlesQuery, {
  options: (ownProps = {}) => ({
    variables: {
      limit: ownProps.limit || 20,
      skip: ownProps.skip || 0,
    },
  }),
  props: ({ data } = {}) => ({
    content: data.content && data.content.map(identifyCategory),
    isLoading: data.loading,
    fetchMore: fetchMoreResolver({
      collectionName: 'content',
      data,
    }),
  }),
});


import { graphql } from 'react-apollo';
import { compose } from 'recompose';
import fetchMoreResolver from '@data/utils/fetchMoreResolver';
import articleQuery from './articleQuery';
import articlesQuery from './articlesQuery';


const articles = graphql(articlesQuery, {
  props: ({ data } = {}) => ({
    articles: {
      content: data.content,
      isLoading: data.loading,
      fetchMore: fetchMoreResolver({
        mapTo: 'articles',
        collectionName: 'content',
        data,
      }),
    },
  }),
});

const article = graphql(articleQuery, {
  props: ({ data: { content } }) => ({
    article: content,
  }),
});

export default compose(
  articles,
  article,
);

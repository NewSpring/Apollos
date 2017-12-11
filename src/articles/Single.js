import { compose, mapProps, pure } from 'recompose';
import DebugView from '@ui/DebugView';
import withArticle from '@data/withArticle';

const ArticleSingle = compose(
  pure,
  mapProps(({ match: { params: { id } } }) => ({ id })),
  withArticle,
)(DebugView);

export default ArticleSingle;

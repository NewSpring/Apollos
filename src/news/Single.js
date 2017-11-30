import { compose, mapProps, pure } from 'recompose';
import DebugView from '@primitives/DebugView';
import withNewsStory from '@data/withNewsStory';

const NewsSingle = compose(
  pure,
  mapProps(({ match: { params: { id } } }) => ({ id })),
  withNewsStory,
)(DebugView);

export default NewsSingle;

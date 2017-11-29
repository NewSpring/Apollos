import { compose, mapProps, pure } from 'recompose';
import DebugView from '@primitives/DebugView';
import withStory from '@data/withStory';

const StorySingle = compose(
  pure,
  mapProps(({ match: { params: { id } } }) => ({ id })),
  withStory,
)(DebugView);

export default StorySingle;

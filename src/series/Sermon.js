import { compose, mapProps, pure } from 'recompose';
import DebugView from '@primitives/DebugView';
import withSermon from '@data/withSermon';

const enhance = compose(
  pure,
  mapProps(({ match: { params: { id } } }) => ({ id })),
  withSermon,
);

const Sermon = enhance(DebugView);

export default Sermon;

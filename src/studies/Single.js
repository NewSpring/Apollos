import { compose, mapProps, pure } from 'recompose';
import DebugView from '@primitives/DebugView';
import withStudy from '@data/withStudy';

const enhance = compose(
  pure,
  mapProps(({ match: { params: { id } } }) => ({ id })),
  withStudy,
);

const Study = enhance(DebugView);

export default Study;

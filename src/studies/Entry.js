import { compose, mapProps, pure } from 'recompose';
import DebugView from '@ui/DebugView';
import withStudyEntry from '@data/withStudyEntry';

const enhance = compose(
  pure,
  mapProps(({ match: { params: { id } } }) => ({ id })),
  withStudyEntry,
);

const StudiesEntry = enhance(DebugView);

export default StudiesEntry;

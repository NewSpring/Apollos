import { compose, mapProps, pure } from 'recompose';
import DebugView from '@primitives/DebugView';
import withSeriesContent from '@data/withSeriesContent';

const enhance = compose(
  pure,
  mapProps(({ match: { params: { id } } }) => ({ id })),
  withSeriesContent,
);

const Series = enhance(DebugView);

export default Series;

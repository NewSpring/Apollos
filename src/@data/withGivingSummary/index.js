import { graphql } from 'react-apollo';
import moment from 'moment';
import givingSummaryQuery from './givingSummaryQuery';

export default graphql(givingSummaryQuery, {
  props: ({ data: { content } }) => ({
    content,
  }),
  options: (ownProps = {}) => ({
    variables: {
      start: ownProps.start || moment().startOf('year').format(),
      end: ownProps.end || moment().endOf('year').format(),
    },
  }),
});


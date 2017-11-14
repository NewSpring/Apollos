import { graphql } from 'react-apollo';
import studyEntriesQuery from './studyEntriesQuery';

export default graphql(studyEntriesQuery, {
  props: ({ data: { content } }) => ({
    content,
  }),
  options: (ownProps = {}) => ({
    variables: {
      id: ownProps.id,
    },
  }),
});


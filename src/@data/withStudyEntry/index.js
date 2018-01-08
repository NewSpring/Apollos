import { graphql } from 'react-apollo';
import studyEntryQuery from './studyEntryQuery';

export default graphql(studyEntryQuery, {
  props: ({ data: { content, loading } }) => ({
    content,
    isLoading: loading,
  }),
  options: (ownProps = {}) => ({
    variables: {
      id: ownProps.id,
    },
  }),
});


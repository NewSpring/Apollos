import { graphql } from 'react-apollo';
import studyEntryQuery from './studyEntryQuery';

export default graphql(studyEntryQuery, {
  props: ({ ownProps, data: { error, content, loading } }) => ({
    error: error || ownProps.error,
    content,
    isLoading: ownProps.isLoading || loading,
  }),
  options: (ownProps = {}) => ({
    variables: {
      id: ownProps.id,
    },
  }),
});


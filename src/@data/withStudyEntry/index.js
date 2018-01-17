import { graphql } from 'react-apollo';
import studyEntryQuery from './studyEntryQuery';

export default graphql(studyEntryQuery, {
  props: ({ ownProps, data: { content, loading } }) => ({
    content,
    isLoading: ownProps.isLoading || loading,
  }),
  options: (ownProps = {}) => ({
    variables: {
      id: ownProps.id,
    },
  }),
});


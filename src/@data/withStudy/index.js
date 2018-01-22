import { graphql } from 'react-apollo';
import studyQuery from './studyQuery';

export default graphql(studyQuery, {
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

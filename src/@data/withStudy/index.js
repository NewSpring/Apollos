import { graphql } from 'react-apollo';
import studyQuery from './studyQuery';

export default graphql(studyQuery, {
  props: ({ data: { content } }) => ({
    content,
  }),
  options: (ownProps = {}) => ({
    variables: {
      id: ownProps.id,
    },
  }),
});


import PropTypes from 'prop-types';
import { compose, pure, branch, setPropTypes, defaultProps, renderNothing } from 'recompose';

import withRelatedContent from '@data/withRelatedContent';

import RelatedContentWithoutData from './RelatedContentWithoutData';

export { RelatedContentWithoutData };

const enhance = compose(
  pure,
  setPropTypes({
    excludedIds: PropTypes.arrayOf(PropTypes.string).isRequired,
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
    sectionTitle: PropTypes.string,
    isLoading: PropTypes.bool,
  }),
  defaultProps({
    isLoading: false,
    excludedIds: [],
    tags: [],
  }),
  // TODO: Condsider refactoring the branches below!
  // only run query if we have required data!
  branch(({ tags, excludedIds }) => (!tags.length || !excludedIds.length), renderNothing),
  withRelatedContent,
  // only render if query returns data!
  branch(({ content }) => (typeof content === 'undefined' || !content.length), renderNothing),
);

const RelatedContent = enhance(RelatedContentWithoutData);

export default RelatedContent;

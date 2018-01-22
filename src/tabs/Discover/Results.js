import React from 'react';
import PropTypes from 'prop-types';
import { compose, withProps } from 'recompose';
import { Link } from '@ui/NativeWebRouter';
import withSearch from '@data/withSearch';
import FeedView from '@ui/FeedView';
import ThumbnailCard from '@ui/ThumbnailCard';

const ResultItem = ({ item }) => (
  <Link to={item.link}>
    <ThumbnailCard
      title={item.title || ' '}
      description={item.description ? `${item.description.substr(0, 20)}…` : ' '}
      images={item.image || []}
      isLoading={item.isLoading}
    />
  </Link>
);

ResultItem.propTypes = {
  item: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    images: PropTypes.any, // eslint-disable-line
  }),
};

const Results = compose(
  withSearch,
  withProps({
    numColumns: 1,
    renderItem: ResultItem,
  }),
)(FeedView);

export default Results;

import React from 'react';
import PropTypes from 'prop-types';
import { uniqBy } from 'lodash';
import { compose, withProps } from 'recompose';
import withSearch from '@data/withSearch';
import FeedView from '@ui/FeedView';
import ThumbnailCard from '@ui/ThumbnailCard';
import ItemLink from './ItemLink';

const ResultItem = ({ item }) => (
  <ItemLink to={item.link}>
    <ThumbnailCard
      title={item.title || ' '}
      images={item.image || []}
      isLoading={item.isLoading}
    />
  </ItemLink>
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
  withProps(({ content = [] } = {}) => ({
    numColumns: 1,
    renderItem: ResultItem,
    content: uniqBy(content, ({ link }) => link),
    keyExtractor: item => item.link || item.id,
  })),
)(FeedView);

export default Results;

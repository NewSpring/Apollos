import React from 'react';
import {
  Text,
  View,
} from 'react-native';
import PropTypes from 'prop-types';
import { Link } from '@ui/NativeWebRouter';
import {
  pure,
  compose,
  branch,
  renderComponent,
  componentFromProp,
  withProps,
} from 'recompose';
import { map, get } from 'lodash';

import { getLinkPath } from '@utils/content';
import FeedItemCard from '@ui/FeedItemCard';
import { enhancer as mediaQuery } from '@ui/MediaQuery';
import FeedList from './FeedList';

const getItemBgColor = (item) => {
  let color = get(item, 'content.colors[0].value');
  if (!color) color = get(item, 'parent.content.colors[0].value');
  if (!color) return null;
  return `#${color}`;
};

const getItemImages = (item) => {
  let images = get(item, 'content.images');
  if (!images.length) images = get(item, 'parent.content.images');
  return images;
};

const getItemIsLight = (item) => {
  let isLight = get(item, 'content.isLight');
  if (typeof isLight !== 'boolean' ||
    !get(item, 'content.colors[0].value') // we want to use parent's isLight value if relying on parent's colors
  ) {
    isLight = get(item, 'parent.content.isLight');
  }
  return isLight;
};

const defaultFeedItemRenderer = ({ item }) => ( // eslint-disable-line
  <Link to={getLinkPath(item)}>
    <FeedItemCard
      title={item.title}
      category={item.category}
      images={getItemImages(item)}
      backgroundColor={getItemBgColor(item)}
      isLight={getItemIsLight(item)}
    />
  </Link>
);

// TODO: replace with component from #115
const defaultEmptyStateRenderer = () => map([1, 2, 3], key => (
  <View key={key} style={{ height: 250, margin: 10, backgroundColor: 'rgba(0,0,0,0.1)' }}>
    <Text>...</Text>
  </View>
));

const renderEmptyState = renderComponent(componentFromProp('renderEmptyState'));

const enhance = compose(
  pure,
  branch(({ isLoading, content }) => isLoading && !content.length, renderEmptyState),
  mediaQuery(({ md }) => ({ maxWidth: md }), withProps({ numColumns: 1 })),
  mediaQuery(({ md, lg }) => ({ minWidth: md, maxWidth: lg }), withProps({ numColumns: 2 })),
  mediaQuery(({ lg }) => ({ minWidth: lg }), withProps({ numColumns: 3 })),
);

const FeedView = enhance(({
  isLoading,
  refetch,
  content,
  fetchMore,
  numColumns,
  ...otherProps
}) => (
  <FeedList
    {...otherProps}
    refreshing={isLoading}
    onRefresh={refetch}
    onEndReached={fetchMore}
    numColumns={numColumns}
    data={content}
  />
));

FeedView.defaultProps = {
  isLoading: false,
  onEndReachedThreshold: 0.7,
  keyExtractor: item => item.entryId,
  content: [],
  refetch: undefined,
  fetchMore: undefined,
  renderItem: defaultFeedItemRenderer,
  renderEmptyState: defaultEmptyStateRenderer,
  numColumns: 1,
};

FeedView.propTypes = {
  isLoading: PropTypes.bool,
  content: PropTypes.array, // eslint-disable-line
  refetch: PropTypes.func,
  fetchMore: PropTypes.func,
  renderItem: PropTypes.func,
  renderEmptyState: PropTypes.func,
  numColumns: PropTypes.number,
};

export default FeedView;

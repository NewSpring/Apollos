import React from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import PropTypes from 'prop-types';
import { Link } from '@ui/NativeWebRouter';
import { pure, compose, branch, withProps, defaultProps } from 'recompose';
import { get } from 'lodash';

import { getLinkPath, getItemBgColor, getItemImages, getItemIsLight } from '@utils/content';
import FeedItemCard from '@ui/FeedItemCard';
import { enhancer as mediaQuery } from '@ui/MediaQuery';
import FeedList from './FeedList';

export const defaultFeedItemRenderer = (CardComponent = FeedItemCard) => (
  { item }, // eslint-disable-line
) => (
  <Link to={getLinkPath(item)} component={TouchableWithoutFeedback}>
    <CardComponent
      id={item.id}
      title={item.title || item.name || ' '}
      category={item.category}
      images={getItemImages(item)}
      backgroundColor={getItemBgColor(item)}
      isLight={getItemIsLight(item)}
      isLoading={item.isLoading}
      isLiked={item.isLiked || get(item, 'content.isLiked', false)}
    />
  </Link>
);

const generateLoadingStateData = (numberOfItems = 1) => {
  const itemData = () => ({
    title: '',
    category: '',
    content: {
      images: [],
      backgroundColor: null,
      isLight: null,
    },
    isLoading: true,
    id: 'fakeId0',
  });

  const loadingStateData = [itemData()];

  while (loadingStateData.length < numberOfItems) {
    const newData = itemData();
    newData.id = `fakeId${loadingStateData.length}`;
    loadingStateData.push(newData);
  }

  return loadingStateData;
};

const enhance = compose(
  pure,
  branch(
    ({ isLoading, content }) => isLoading && !content.length,
    withProps({
      isLoading: true,
      content: generateLoadingStateData(10),
      fetchMore: false,
    }),
  ),
  mediaQuery(
    ({ md }) => ({ maxWidth: md }),
    defaultProps({ numColumns: 1 }),
    defaultProps({ numColumns: 2 }),
  ),
);

const FeedView = enhance(
  ({
    isLoading,
    refetch,
    content,
    fetchMore,
    numColumns,
    renderItem,
    ItemComponent,
    ...otherProps
  }) => {
    let itemRenderer = renderItem;
    if (!itemRenderer) {
      itemRenderer = defaultFeedItemRenderer(ItemComponent);
    }
    return (
      <FeedList
        {...otherProps}
        renderItem={itemRenderer}
        refreshing={isLoading}
        onRefresh={refetch}
        onEndReached={fetchMore}
        numColumns={numColumns}
        data={content}
      />
    );
  },
);

FeedView.defaultProps = {
  isLoading: false,
  onEndReachedThreshold: 0.7,
  keyExtractor: item => item.id || item.entryId,
  content: [],
  refetch: undefined,
  fetchMore: undefined,
  ItemComponent: FeedItemCard,
};

FeedView.propTypes = {
  isLoading: PropTypes.bool,
  content: PropTypes.array, // eslint-disable-line
  refetch: PropTypes.func,
  fetchMore: PropTypes.func,
  renderItem: PropTypes.func,
  renderEmptyState: PropTypes.func,
  numColumns: PropTypes.number,
  ItemComponent: PropTypes.any, // eslint-disable-line
};

export default FeedView;

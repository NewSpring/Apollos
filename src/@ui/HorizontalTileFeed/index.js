import React from 'react';
import { Dimensions } from 'react-native';
import PropTypes from 'prop-types';
import { compose, pure, branch, withProps, setPropTypes, defaultProps } from 'recompose';

import { Link } from '@ui/NativeWebRouter';
import { getLinkPath } from '@utils/content';
import CardTile from '@ui/CardTile';

import TileFeed from './TileFeed';

const generateLoadingStateData = (numberOfItems = 1) => {
  const itemData = () => ({
    id: 'fakeId0',
    title: '',
    meta: {
      date: '',
    },
    content: {
      speaker: '',
    },
    isLoading: true,
  });

  const loadingStateData = [itemData()];

  while (loadingStateData.length < numberOfItems) {
    const newData = itemData();
    newData.id = `fakeId${loadingStateData.length}`;
    loadingStateData.push(newData);
  }

  return loadingStateData;
};

const defaultItemRenderer = ({ item, showTileMeta, index }) => ( // eslint-disable-line
  <Link to={getLinkPath(item)}>
    <CardTile
      number={index + 1}
      title={item.title}
      showDetails={showTileMeta}
      byLine={item.content.speaker}
      date={item.meta.date}
      isLoading={item.isLoading}
    />
  </Link>
);

const enhance = compose(
  setPropTypes({
    isLoading: PropTypes.bool,
    content: PropTypes.array,
    showTileMeta: PropTypes.bool,
    refetch: PropTypes.func,
    fetchMore: PropTypes.func,
    renderItem: PropTypes.func,
  }),
  defaultProps({
    keyExtractor: item => item.id,
    content: [],
    showTileMeta: false,
    isLoading: false,
  }),
  branch(({ isLoading, content }) => isLoading && !content.length, withProps({
    content: generateLoadingStateData(5),
    fetchMore: false,
  })),
  pure,
);

const getTileWidth = () => {
  const { width } = Dimensions.get('window');
  /*
   * 80% of width + baseUnit which is used for padding on the tile. This padding was added to fix a
   * shadow clipping bug on Android so the additional math here was added to maintain an 80% view.
   * Below snapToInterval was also adjusted to account for half of that padding on each swipe.
   * TODO: find better shadow clipping fix that doesn't affect this math.
   */
  return (width * 0.8) + 20;
};

const HorizontalTileFeed = enhance(({
  content,
  isLoading,
  showTileMeta,
  ...otherProps
}) => (
  <TileFeed
    renderItem={renderItemProps => defaultItemRenderer({ ...renderItemProps, showTileMeta })}
    data={content}
    horizontal
    initialScrollIndex={0}
    refreshing={isLoading}
    showsHorizontalScrollIndicator={false}
    tileHeight={getTileWidth()} // passed into TileFeed styles. Height is equal to 80% of width
    // passed down to rendered ScrollView. See comment on line 74 explaining math.
    snapToInterval={(getTileWidth() - 10)}
    snapToAlignment={'start'} // passed down to rendered ScrollView
    decelerationRate={'fast'} // passed down to rendered ScrollView
    {...otherProps}
  />
));

export default HorizontalTileFeed;

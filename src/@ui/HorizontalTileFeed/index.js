import React from 'react';
import { FlatList, Dimensions } from 'react-native';
import PropTypes from 'prop-types';
import { compose, pure, branch, withProps, setPropTypes, defaultProps } from 'recompose';

import { Link } from '@ui/NativeWebRouter';
import { getLinkPath } from '@utils/content';
import styled from '@ui/styled';
import CardTile from '@ui/CardTile';

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
    newData.entryId = `fakeId${loadingStateData.length}`;
    loadingStateData.push(newData);
  }

  return loadingStateData;
};

const defaultItemRenderer = ({ item }) => ( // eslint-disable-line
  <Link to={getLinkPath(item)}>
    <CardTile
      // number={}
      title={item.title}
      byLine={item.content.speaker}
      date={item.meta.date}
      isLoading={item.isLoading}
    />
  </Link>
);

const enhance = compose(
  pure,
  branch(({ isLoading, content }) => isLoading && !content.length, withProps({
    content: generateLoadingStateData(10),
    fetchMore: false,
  })),
  setPropTypes({
    isLoading: PropTypes.bool,
    content: PropTypes.array, // eslint-disable-line
    refetch: PropTypes.func,
    fetchMore: PropTypes.func,
    renderItem: PropTypes.func,
    numColumns: PropTypes.number,
  }),
  defaultProps({
    renderItem: defaultItemRenderer,
    keyExtractor: item => item.id,
    content: [],
    isLoading: false,
  }),
);

const getTileWidth = () => {
  const { width } = Dimensions.get('window');
  return width * 0.8;
};

const Boom = styled(({ theme, getHeight }) => ({
  height: getHeight,
  paddingHorizontal: theme.sizing.baseUnit / 2,
}))(FlatList);

const HorizontalTileFeed = enhance(({
  content,
  isLoading,
  ...otherProps
}) => (
  <Boom
    renderItem={defaultItemRenderer}
    data={content}
    // getItemLayout={(data, index) => ({ length, offset, index })}
    horizontal
    initialScrollIndex={0}
    refreshing={isLoading}
    showsHorizontalScrollIndicator
    showsVerticalScrollIndicator={false}
    getHeight={getTileWidth()} // height is equal to 80% of width
    snapToInterval={getTileWidth()} // passed down to rendered ScrollView
    snapToAlignment={'start'} // passed down to rendered ScrollView
    decelerationRate={'fast'} // passed down to rendered ScrollView
    {...otherProps}
  />
));

export default HorizontalTileFeed;

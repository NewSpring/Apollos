import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { compose, pure, setPropTypes } from 'recompose';

import styled from '@ui/styled';

const TiledFeed = styled(({ theme }) => ({
  flexDirection: 'row',
  flexWrap: 'wrap',
  paddingVertical: theme.sizing.baseUnit / 2,
  paddingHorizontal: theme.sizing.baseUnit / 2,
}))(View);

const enhance = compose(
  pure,
  setPropTypes({
    data: PropTypes.array, // eslint-disable-line
    renderItem: PropTypes.func,
  }),
);

const itemRenderer = (data, renderItem) => (
  data.map((item, index) => (
    <View key={item.id}>
      {renderItem({ item, index })}
    </View>
  ))
);

const TileFeed = enhance(({
  data,
  renderItem,
}) => (
  <TiledFeed>
    {itemRenderer(data, renderItem)}
  </TiledFeed>
));

export default TileFeed;
